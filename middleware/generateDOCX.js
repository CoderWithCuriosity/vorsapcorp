const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType,
  HeadingLevel
} = require("docx");
const fs = require("fs");

function generateDocx(data, fileName) {
  const titleText = "DETAILED STATISTICAL ANALYSIS PLAN (SAP)";
  const titleImages = [
    "./images/Black_logo_-_no_background.png",
    "./images/Color_logo_-_no_background.png",
    "./images/Color_logo_with_background.png",
    "./images/White_logo_with_background.png"
  ];

  const formattedText = titleText
    .split(" ")
    .map(word => [
      new TextRun({
        text: word.charAt(0),
        bold: true,
        size: 56,
        font: "Times New Roman"
      }),
      new TextRun({
        text: word.slice(1) + " ",
        bold: true,
        size: 44,
        font: "Times New Roman"
      })
    ])
    .flat();

  const sections = [
    { title: "1 INTRODUCTION", key: "introduction" },
    { title: "2 DATA SOURCE", key: "data_source" },
    { title: "3 ANALYSIS OBJECTIVES", key: "analysis_objectives" },
    { title: "4 ANALYSIS SETS/POPULATIONS/SUBGROUPS", key: "analysis_sets_populations_subgroups" },
    { title: "5 ENDPOINTS AND COVARIATES", key: "endpoints_and_covariates" },
    { title: "6 HANDLING OF MISSING VALUES", key: "handling_of_missing_values" },
    { title: "7 STATISTICAL METHODOLOGY", key: "statistical_methodology" },
    { title: "13 APPENDICES", key: "appendices" },
    // { title: "14 REFERENCES", key: "references" }
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          ...Array(4).fill(
            new Paragraph({
              children: [new TextRun({ text: "\u00A0", size: 44 })]
            })
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: fs.readFileSync(titleImages[1]),
                transformation: { width: 400, height: 200 }
              })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            children: formattedText
          }),
          ...Array(4).fill(
            new Paragraph({
              children: [new TextRun({ text: "\u00A0", size: 44 })]
            })
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Author: ", bold: true, size: 38 }),
              new TextRun({
                text: data.author || "VorsapCorp",
                bold: true,
                size: 38
              })
            ]
          }),
          new Paragraph({
            children: [new TextRun({ text: "\u00A0", size: 24 })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Date: ", bold: true, size: 38 }),
              new TextRun({
                text:
                  data.date ||
                  new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }),
                bold: true,
                size: 38
              })
            ]
          }),
          new Paragraph({
            pageBreakBefore: true,
            children: [
              new TextRun({
                text: "\u00A0",
                size: 2
              })
            ]
          }),
          ...sections
            .map(section => {
              const content = data[section.key];
              if (typeof content === "object") {
                return [
                  new Paragraph({
                    children: [new TextRun({ text: section.title, bold: true, size: 36 })]
                  }),
                  ...Object.values(content).map(item =>
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: Array.isArray(item) ? "\u2022 " + item.join("\n\u2022 ") : item,
                          size: 24
                        })
                      ]
                    })
                  ),
                  new Paragraph({
                    children: [new TextRun({ text: "\u00A0", size: 24, break: true })]
                  }),
                ];
              } else {
                return [
                  new Paragraph({
                    children: [new TextRun({ text: section.title, bold: true, size: 36 })]
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: content
                          ? content.replace(/(\d+\.)\s([^]+?)(?=\s\d+\.|$)|(\u2022)\s([^]+?)(?=\s\u2022|$)/g, "\n$1$3 $2$4\n")
                          : "",
                        size: 24
                      })                            
                    ]
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: "\u00A0", size: 24, break: true })]
                  }),
                ];
              }
            })
            .flat()
        ]
      }
    ]
  });

  Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(`${fileName}_SAP.docx`, buffer);
    console.log("Generated DOCX file");
  });
}

module.exports = generateDocx;
