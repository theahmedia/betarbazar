import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Order from "../models/order.model.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import generateInvoice from '../utils/generateInvoice.js'; // Import the function

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new order
// export const createOrder = async (req, res) => {
//   const { items, subtotal, deliveryCharge, total, userId, paymentNumber, deliveryLocation } = req.body;

//   // Validate required fields
//   if (!userId || !items || !subtotal || !deliveryCharge || !total || !paymentNumber || !deliveryLocation) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // Check if userId is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: "Invalid userId." });
//   }

//   // Create the order in the database
//   const newOrder = new Order({
//     userId,
//     items,
//     subtotal,
//     deliveryCharge,
//     total,
//     deliveryLocation,
//     paymentNumber,
//   });

//   try { 
//     // Save the order to the database
//     const savedOrder = await newOrder.save();

//      // Ensure the invoices directory exists
//      if (!fs.existsSync("invoices")) {
//       fs.mkdirSync("invoices");
//     }

//     // Ensure the invoices directory exists
//     if (!fs.existsSync("invoices")) {
//       fs.mkdirSync("invoices");
//     }

//     // Generate invoice PDF
//     const invoiceUrl = `/invoices/order-${orderId}.pdf`;
//     const pdfPath = path.join(__dirname, 'invoices', `order-${orderId}.pdf`);
//     await generateInvoice(pdfPath); // your logic to generate the PDF

//     res.json({ invoiceUrl });
//     const invoicePath = `invoices/order-${savedOrder._id}.pdf`;
//     console.log("Invoice path:", invoicePath);
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream(invoicePath));

//     // Add content to the PDF (customize as needed)
//     doc.fontSize(16).text(`Invoice for Order ${savedOrder._id}`, { align: "center" });
//     doc.fontSize(12).text(`Subtotal: ৳ ${subtotal}`, { align: "left" });
//     items.forEach((item) => {
//       doc.text(`${item.name} - Quantity: ${item.quantity} - Price: ৳ ${item.price}`);
//     });
//     doc.text(`Delivery Charge: ৳ ${deliveryCharge}`, { align: "left" });
//     doc.text(`Total: ৳ ${total}`, { align: "left" });

//     doc.end();


//     // Save the invoice URL to the order document
//     savedOrder.invoiceUrl = `/invoices/order-${savedOrder._id}.pdf`;
//     await savedOrder.save();

//     res.status(201).json({
//       message: "Order created successfully.",
//       invoiceUrl: `/invoices/order-${savedOrder._id}.pdf`,
//     });
//   } catch (error) {
//     console.error("Order Creation Error:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// };

// Create a new order
export const createOrder = async (req, res) => {
  const { items, subtotal, deliveryCharge, total, userId, paymentNumber, deliveryLocation } = req.body;

  // Validate required fields
  if (!userId || !items || !subtotal || !deliveryCharge || !total || !paymentNumber || !deliveryLocation) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId." });
  }

  // Create the order in the database
  const newOrder = new Order({
    userId,
    items,
    subtotal,
    deliveryCharge,
    total,
    deliveryLocation,
    paymentNumber,
  });

  try {
    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Ensure the invoices directory exists (on server side)
    const invoicesDir = path.join(__dirname, '../invoices'); // Ensure it is outside controllers

    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }

    // Generate invoice PDF after saving the order
    const invoicePath = join(invoicesDir, `order-${savedOrder._id}.pdf`);
    const invoiceUrl = `/invoices/order-${savedOrder._id}.pdf`;

    // Call the generateInvoice function to create the PDF
    await generateInvoice(invoicePath, savedOrder); // invoicePath is a string, savedOrder is the order object

    // Save the invoice URL to the order document
    savedOrder.invoiceUrl = invoiceUrl;
    await savedOrder.save();

    res.status(201).json({
      message: "Order created successfully.",
      invoiceUrl: invoiceUrl,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name phone");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID." });
    }

    const order = await Order.findById(req.params.id).populate("user", "name phone");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "shipped", "delivered", "cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete associated invoice file
    const invoicePath = `invoices/order-${order._id}.pdf`;
    if (fs.existsSync(invoicePath)) {
      fs.unlinkSync(invoicePath);
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

export const updateUserInvoiceUrl = async (req, res) => {
  const { userId } = req.params;
  const { invoiceUrl } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { invoiceUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "Invoice URL updated successfully.", user });
  } catch (error) {
    console.error("Error updating invoice URL:", error);
    res.status(500).json({ message: "Failed to update invoice URL." });
  }
};