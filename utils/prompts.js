const getSAPPrompt = `
You are an expert in statistical analysis and clinical research. Based on the structure provided below, generate a detailed **Statistical Analysis Plan (SAP)** for a clinical study. The SAP should include all sections (Introduction, Data Source, Analysis Objectives, Analysis Sets/Populations/Subgroups, Endpoints and Covariates, Handling of Missing Values, Statistical Methodology, and Appendices). Each section should be detailed, professional, and suitable for a clinical research document.

Additionally:
1. Include **references** for statistical methods, clinical guidelines, or other relevant sources. Use placeholders like [Reference 1], [Reference 2], etc., if specific references are not available.
2. Include **table data** where appropriate (e.g., baseline characteristics, statistical methods, or subgroup analyses). Format tables in Markdown or JSON format.

Return the response in a structured JSON format, where each section is a key and the generated content is the value. For example:
{
  "introduction": "[Generated introduction text...]",
  "data_source": "[Generated data source text...]",
  "analysis_objectives": "[Generated analysis objectives text...]",
  "analysis_sets_populations_subgroups": "[Generated text...]",
  "endpoints_and_covariates": "[Generated text...]",
  "handling_of_missing_values": "[Generated text...]",
  "statistical_methodology": "[Generated text...]",
  "appendices": "[Generated text...]",
  "references": "[Generated references...]",
  "tables": {
    "table_1": {
      "title": "Baseline Characteristics",
      "data": [
        {"Variable": "Age", "Treatment Group": "Mean (SD)", "Control Group": "Mean (SD)"},
        {"Variable": "Gender", "Treatment Group": "n (%)", "Control Group": "n (%)"}
      ]
    }
  }
}

Generate the SAP now and return the response in JSON format.
`;

const getQuestionsPrompt = `
You are an expert in SAP data analysis and structured decision-making.
Based on the provided SAP Excel dataset, generate a **structured list of Yes/No questions**  
that help users accurately analyze and validate the dataset.

The questions should be:
- Direct and relevant to SAP data integrity, accuracy, and completeness  
- Hierarchical (Yes or No answers should lead to relevant follow-up questions)  
- Focused on key SAP modules 

Return the response in **structured JSON format** like this:  

[
    {
        "question": "[Main Question]",
        "text": "[Detailed Description]",
        "options": ["Yes", "No"],
        "followUp": {
            "Yes": ["Follow-up Question for Yes"],
            "No": ["Follow-up Question for No"]
        }
    },
    ...
]

Ensure the questions cover:
- Data completeness and accuracy  
- Financial reconciliation and categorization  
- Duplicate transaction checks  
- Consistency across SAP modules  
- Data validation and compliance checks  

Keep the questions structured, insightful, and aligned with SAP best practices.
`;

module.exports = {
    getSAPPrompt,
    getQuestionsPrompt
};