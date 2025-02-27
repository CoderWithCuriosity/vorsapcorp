const doc = require("./functions/generateDOCX");

const data = {
  status: "success",
  message: "SAP generated successfully.",
  sap: {
    introduction:
      "This Statistical Analysis Plan (SAP) is designed to guide the statistical analysis for a clinical study aimed at evaluating the efficacy and safety of a specified intervention. The plan outlines the methodologies for data handling, statistical analysis, and reporting to ensure that the study objectives are met with scientific rigor and integrity.",
    data_source:
      "Data for this study will be collected from both primary and secondary sources. Primary data will be obtained directly from participant enrollment and follow-up, while secondary data may include historical control data or previously published data relevant to the study's endpoints.",
    analysis_objectives:
      "The primary objective of this analysis is to determine the effect of the intervention on the primary endpoint compared to the control. Secondary objectives include assessing the effect on secondary endpoints and exploring potential subgroups for differential effects.",
    analysis_sets_populations_subgroups: {
      text:
        "Analysis will be conducted on the following sets: 1. Full Analysis Set (FAS): All randomized participants who received at least one dose of the study treatment. 2. Per-Protocol Set (PPS): Participants who completed the study without major protocol deviations. 3. Safety Set: All participants who received at least one dose of the study treatment, for the evaluation of safety endpoints.",
      subgroups:
        "Subgroup analyses will be performed based on age, gender, baseline severity of disease, and other clinically relevant factors."
    },
    endpoints_and_covariates: {
      primary_endpoint:
        "The primary endpoint will be the change from baseline in the specific clinical score at the end of treatment.",
      secondary_endpoints: [
        "Incidence of treatment-emergent adverse events",
        "Time to progression of disease",
        "Quality of life scores"
      ],
      covariates: ["Age", "Gender", "Baseline disease severity"]
    },
    handling_of_missing_values:
      "Missing data will be handled using multiple imputation techniques if the missingness is assumed to be at random (MAR). Sensitivity analyses will be conducted to assess the impact of missing data on the study conclusions.",
    statistical_methodology: {
      primary_analysis:
        "The primary endpoint will be analyzed using an independent t-test or ANOVA, depending on the normality of the data.",
      secondary_analysis:
        "Secondary endpoints will be analyzed using appropriate parametric or non-parametric tests based on the distribution of the data and the scale of measurement.",
      post_hoc_analysis:
        "Post-hoc analyses will include Tukey's HSD for multiple comparisons if ANOVA is significant."
    },
    appendices:
      "Appendix A: List of Abbreviations. Appendix B: Detailed protocol for handling missing data. Appendix C: Codebook for statistical programming.",
    references: "[Reference 1], [Reference 2], [Reference 3]",
    tables: {
      table_1: {
        title: "Baseline Characteristics",
        data: [
          {
            Variable: "Age",
            "Treatment Group": "Mean (SD)",
            "Control Group": "Mean (SD)"
          },
          {
            Variable: "Gender",
            "Treatment Group": "n (%)",
            "Control Group": "n (%)"
          }
        ]
      }
    }
  }
};

doc(data.sap, "test");
