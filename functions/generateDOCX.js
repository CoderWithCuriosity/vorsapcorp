const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Alignment,
  AlignmentType,
  HeadingLevel,
} = require("docx");
const fs = require("fs");

function generateDocx() {
  const titleText = "STATISTICAL ANALYSIS PLAN";
  const titleImages = [
    "./images/Black_logo_-_no_background.png",
    "./images/Color_logo_-_no_background.png",
    "./images/Color_logo_with_background.png",
    "./images/White_logo_with_background.png"
  ];

  // Convert text into words, format first letter separately
  const formattedText = titleText
    .split(" ")
    .map(word => [
      new TextRun({
        text: word.charAt(0), // First letter
        bold: true,
        size: 56, // Slightly larger (28pt)
        font: "Times New Roman",
        color: "000000"
      }),
      new TextRun({
        text: word.slice(1) + " ", // Rest of the word + space
        bold: true,
        size: 44, // Normal size (22pt)
        font: "Times New Roman",
        color: "000000"
      })
    ])
    .flat(); // Flatten the array to merge all words

  // Create a new Document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Add 4 empty paragraphs with font size
          // Add 4 empty paragraphs with font size
          ...Array(4).fill(
            new Paragraph({
              children: [new TextRun({ text: "\u00A0", size: 44 })]
            })
          ),

          // Add the title image of the document
          // Add image on top (adjust path as needed)
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                // type: "png",
                data: fs.readFileSync(titleImages[1]), // Adjust this path
                transformation: {
                  width: 400, // Set width of the image
                  height: 200 // Set height of the image
                }
              })
            ]
          }),

          //the title of the document
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            children: formattedText
          }),

          // Add 4 empty paragraphs with font size
          ...Array(4).fill(
            new Paragraph({
              children: [new TextRun({ text: "\u00A0", size: 44 })]
            })
          ),

          // Add Author of the SAP
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Author: ",
                bold: true,
                size: 38
              }),
              new TextRun({
                text: "Chidera",
                bold: true,
                size: 38
              })
            ]
          }),

          // Give Space
          new Paragraph({
            children: [new TextRun({ text: "\u00A0", size: 24 })]
          }),

          // Add Date of the SAP
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Date: ",
                bold: true,
                size: 38
              }),
              new TextRun({
                text: new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }),
                bold: true,
                size: 38,
              })
            ]
          }),


          // Add page break (this will force the next content to start on a new page)
          new Paragraph({
            pageBreakBefore: true,
            children: [
              new TextRun({
                text: "1 INTRODUCTION",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Text describing the purpose and scope of the statistical analysis plan...]",
                size: 24
              })
            ]
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "2 DATA SOURCE",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Description of data origin, collection methods, and storage...]",
                size: 24
              })
            ]
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "3 ANALYSIS OBJECTIVES",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Clear statement of primary and secondary objectives...]",
                size: 24
              })
            ]
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "4 ANALYSIS SETS/POPULATIONS/SUBGROUPS",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Definitions of ITT, PP, safety populations and subgroup analyses...]",
                size: 24
              })
            ]
          }),

          // Continue this pattern for remaining sections
          new Paragraph({
            children: [
              new TextRun({
                text: "5 ENDPOINTS AND COVARIATES",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "[Primary/secondary endpoints, covariates adjustment...]",
                size: 24
              })
            ]
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "6 HANDLING OF MISSING VALUES",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Methods for handling missing data: multiple imputation, LOCF...]",
                size: 24
              })
            ]
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "7 STATISTICAL METHODOLOGY",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  "[Detailed description of statistical methods and models...]",
                size: 24
              })
            ]
          }),

          // Add remaining sections (8-13) following same pattern
          new Paragraph({
            children: [
              new TextRun({
                text: "13 APPENDICES",
                bold: true,
                size: 36
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "[Supplementary materials, tables, figures...]",
                size: 24
              })
            ]
          })
        ]
      }
    ]
  });

  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("SAP.docx", buffer);
    console.log("Generated DOCX file");
  });
}

// Export the function
module.exports = generateDocx;
