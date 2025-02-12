const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function generatePDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('Hello, PDF!', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: font,
        color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./output.pdf', pdfBytes);
    console.log('PDF generated successfully!');
}

module.exports = generatePDF;