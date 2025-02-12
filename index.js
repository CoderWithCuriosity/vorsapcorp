const generatePDF = require('./functions/generatePDF');
const generateDOCX = require('./functions/generateDOCX');
const generateExcel = require('./functions/generateExcel');
const generateVisualizations = require('./functions/generateVisualizations');

(async () => {
    await generatePDF();
    generateDOCX();
    generateExcel();
    generateVisualizations();
})();