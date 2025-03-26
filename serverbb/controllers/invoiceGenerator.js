import PDFDocument from 'pdfkit';
import fs from 'fs';

const generateInvoice = (order, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc.fontSize(20).text("Invoice", { align: "center" });
    doc.moveDown();

    // Customer Details
    doc.fontSize(14).text(`Invoice ID: ${order._id}`);
    doc.text(`Customer: ${order.userId?.name || "Guest"}`);
    doc.text(`Address: ${order.shippingInfo.address}`);
    doc.text(`Phone: ${order.shippingInfo.phone}`);
    doc.moveDown();

    // Order Items
    doc.fontSize(16).text("Order Summary", { underline: true });
    doc.moveDown();

    order.cartItems.forEach((item, index) => {
      doc.fontSize(12).text(`${index + 1}. ${item.name} x${item.quantity} - $${item.price * item.quantity}`);
    });

    doc.moveDown();
    doc.fontSize(14).text(`Subtotal: $${order.totalAmount}`);
    doc.text("Shipping: $5");
    doc.text(`Total: $${order.totalAmount + 5}`);
    doc.moveDown();

    doc.text("Thank you for your purchase!", { align: "center" });

    doc.end();
    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
};

export default generateInvoice;