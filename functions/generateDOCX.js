const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs');

function generateDOCX() {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello, DOCX!"),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun("Hello I am here"),
                    ],
                }),
            ],
        }]
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync('./output.docx', buffer);
        console.log('DOCX generated successfully!');
    });
}

module.exports = generateDOCX;