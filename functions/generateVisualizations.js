const { createCanvas } = require('canvas');
const fs = require('fs');

function generateVisualizations() {
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // Example bar chart
    const data = [200, 150, 125, 100, 75, 50, 25];
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 400, 400);

    data.forEach((value, index) => {
        ctx.fillStyle = 'rgba(54, 162, 235, 0.2)';
        ctx.fillRect(50 + index * 50, 400 - value, 40, value);
        ctx.fillStyle = 'black';
        ctx.fillText(labels[index], 65 + index * 50, 395);
    });

    const out = fs.createWriteStream('./visualization.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Visualization generated successfully!'));
}

module.exports = generateVisualizations;