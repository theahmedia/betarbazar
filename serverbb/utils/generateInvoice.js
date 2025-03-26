
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInvoice = async (invoicePath, order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(invoicePath);
    doc.pipe(stream);

    const subtotal = Number(order.subtotal) || 0;
    const deliveryCharge = Number(order.deliveryCharge) || 0;
    const total = Number(order.total) || subtotal + deliveryCharge;

    // **Fix Logo Path Issue**
    const logoPath = path.resolve(__dirname, '../../client/src/assets/tr/BetarBazarlogo.png');

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 100 });
    } else {
      console.warn('⚠️ Logo image not found:', logoPath);
    }

    // **Company Name & Address**
    doc.fontSize(14).text('Betar Bazar', 200, 50, { align: 'right' });
    doc.fontSize(10).text('123 Business Street, City, Country', 200, 65, { align: 'right' });
    doc.text('Email: contact@betarbazar.com | Phone: +1234567890', 200, 80, { align: 'right' });

    doc.moveDown(2);

    // **Invoice Title**
    doc.fontSize(22).text('Invoice', { align: 'center' }).moveDown(1);

    // **User Details**
    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Customer Name: ${order.userName}`);
    doc.text(`Phone: ${order.userPhone}`);
    doc.text(`Billing Address: ${order.userAddress}`);
    doc.text(`Delivery Address: ${order.deliveryLocation}`);

    doc.moveDown(0.5);

    // **Order Summary**
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`);
    doc.text(`Delivery Charge: $${deliveryCharge.toFixed(2)}`);
    doc.text(`Total: $${total.toFixed(2)}`).moveDown(0.5);

    // **Separator Line**
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(0.5);

    // **Items Section**
    doc.fontSize(14).text('Items:', { underline: true }).moveDown(0.5);

    order.items.forEach((item, index) => {
      const itemPrice = Number(item.price) || 0;
      doc.fontSize(12)
        .text(`${index + 1}. ${item.name}`, { continued: true })
        .text(` - Quantity: ${item.quantity}`, { continued: true })
        .text(` - Price: $${itemPrice.toFixed(2)}`);
    });

    doc.moveDown(1);

    // **Separator Line**
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(0.5);

    // **Received & Delivered By**
    doc.fontSize(12).text(`Received By: ________________________`, 50, doc.y + 20);
    doc.fontSize(12).text(`Delivered By: __________________________`, 350, doc.y);

    doc.moveDown(2);

    // **Notes Section**
    doc.fontSize(12).text('Note:', { underline: true }).moveDown(0.2);
    doc.fontSize(10).text(order.note || 'Thank you for your purchase! If you have any questions, contact us.');

    doc.end();

    stream.on('finish', () => resolve(invoicePath));
    stream.on('error', reject);
  });
};

export default generateInvoice;

// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const generateInvoice = async (invoicePath, order) => {
//     return new Promise((resolve, reject) => {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(invoicePath);
//       doc.pipe(stream);
  
//       const subtotal = Number(order.subtotal) || 0;
//       const deliveryCharge = Number(order.deliveryCharge) || 0;
//       const total = Number(order.total) || subtotal + deliveryCharge;
  
//       // **Fix Logo Path Issue**
//       const logoPath = path.resolve(__dirname, '../../client/src/assets/tr/BetarBazarlogo.png');
//       if (fs.existsSync(logoPath)) {
//         doc.image(logoPath, 50, 40, { width: 80 });
//       } else {
//         console.warn('⚠️ Logo image not found:', logoPath);
//       }
  
//       // **Header Background**
//       doc.rect(50, 40, 500, 50).fill('#f8f9fa'); // Light gray background
//       doc.fillColor('black').fontSize(14).text('Betar Bazar', 200, 50, { align: 'right' });
//       doc.fontSize(10).text('123 Business Street, City, Country', 200, 65, { align: 'right' });
//       doc.text('Email: contact@betarbazar.com | Phone: +1234567890', 200, 80, { align: 'right' });
  
//       doc.moveDown(2);
  
//       // **Invoice Title**
//       doc.fillColor('#1d3557').fontSize(22).text('INVOICE', { align: 'center' }).moveDown(1);
  
//       // **User Details Section**
//       doc.fontSize(12).fillColor('black').text(`Order ID: ${order._id}`);
//       doc.text(`Customer: ${order.userName}`);
//       doc.text(`Phone: ${order.userPhone}`);
//       doc.text(`Billing Address: ${order.userAddress}`);
//       doc.text(`Delivery Address: ${order.deliveryLocation}`).moveDown(0.5);
  
//       // **Items Table Header**
//       doc.fillColor('white').rect(50, doc.y, 500, 30).fill('#2a9d8f'); // Green Header
//       doc.fillColor('white').fontSize(12).text('Item', 60, doc.y + 10);
//       doc.text('Quantity', 250, doc.y + 10);
//       doc.text('Price', 400, doc.y + 10);
  
//       // **Items List**
//       let yPos = doc.y + 30;
//       order.items.forEach((item, index) => {
//         const itemPrice = Number(item.price) || 0;
//         const bgColor = index % 2 === 0 ? '#f1faee' : '#ffffff'; // Alternate row colors
  
//         doc.fillColor(bgColor).rect(50, yPos, 500, 30).fill();
//         doc.fillColor('black').fontSize(12);
//         doc.text(`${item.name}`, 60, yPos + 10);
//         doc.text(`${item.quantity}`, 250, yPos + 10);
//         doc.text(`$${itemPrice.toFixed(2)}`, 400, yPos + 10);
//         yPos += 30;
//       });
  
//       doc.moveDown(2);
  
//       // **Summary Section (Subtotal, Delivery Charge, Net Amount, Total Amount)**
//       const advance = 100; // Fixed Advance Amount
//       const netAmount = total - advance;
  
//       // **Summary Box**
//       doc.rect(50, doc.y, 500, 90).fill('#e9ecef').stroke(); // Light Gray Box
//       doc.fillColor('black').fontSize(14);
//       doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 60, doc.y + 10);
//       doc.text(`Delivery Charge: $${deliveryCharge.toFixed(2)}`, 60, doc.y + 30);
//       doc.text(`Net Amount: $${netAmount.toFixed(2)}`, 60, doc.y + 50); // Net Amount
//       doc.fontSize(16).fillColor('#e63946').text(`Total Amount: $${total.toFixed(2)}`, 60, doc.y + 70); // Highlight Total Amount
//       doc.text(`Advance: $${advance.toFixed(2)}`, 60, doc.y + 90); // Advance
  
//       doc.moveDown(2);
  
//       // **Received & Delivered By**
//       doc.fontSize(12).text(`Received By: ________________________`, 50, doc.y + 20);
//       doc.fontSize(12).text(`Delivered By: __________________________`, 350, doc.y);
  
//       doc.moveDown(2);
  
//       // **Notes Section**
//       doc.fontSize(12).fillColor('#1d3557').text('Note:', { underline: true }).moveDown(0.2);
//       doc.fontSize(10).fillColor('black').text(order.note || 'Thank you for your purchase! If you have any questions, contact us.');
  
//       doc.end();
  
//       stream.on('finish', () => resolve(invoicePath));
//       stream.on('error', reject);
//     });
//   };
  
//   export default generateInvoice;
  
