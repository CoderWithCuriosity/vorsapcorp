const questions = [
    {
        question: "Type of Distribution",
        text: "Determine how the data is distributed",
        options: ["Yes", "No", "Unsure"],
        followUp: {
            Unsure: ["Upload dataset"],
            Yes: ["Type of Study"],
            No: ["exit"]
        }
    },
    {
        question: "Type of Study",
        text: "Analysis on Victims",
        options: ["Yes", "No", "Unsure"],
        followUp: {
            Unsure: ["Upload metadata"],
            Yes: ["Number of Timepoints?", "Number of groups", "Total Number of Samples"],
            No: ["Number of groups", "Total Number of Samples"]
        }
    },
    {
        question: "Type of analysis",
        text: "Choosing the type of statistical analysis",
        options: ["Yes", "No"],
        followUp: {
            Yes: ["Between", "Within", "Both"]
        }
    },
    {
        question: "Between Groups (independent variables)",
        text: "Comparison between different groups",
        options: ["Quantitative", "Qualitative"],
        followUp: {
            Quantitative: ["One to one", "One to many", "Many to many (>2)"],
            Qualitative: ["One to one", "One to many", "Many to many (>2)"]
        }
    },
    {
        question: "Within Groups",
        text: "Comparison within the same group",
        options: ["One to one", "One to many", "Many to many (>2)"]
    },
    {
        question: "Timepoints Comparison",
        text: "Assessing changes over different time points",
        options: ["Yes", "No"],
        followUp: {
            Yes: ["Between", "Within", "Both"]
        }
    },
    {
        question: "Between Timepoints (paired test-dependent variables)",
        text: "Analyzing changes between different time points",
        options: ["Quantitative", "Qualitative"],
        followUp: {
            Quantitative: ["One to one", "One to many", "Many to many (>2)"],
            Qualitative: ["One to one", "One to many", "Many to many (>2)"]
        }
    },
    {
        question: "Within Timepoints (sample to sample)",
        text: "Analyzing changes within the same time period",
        options: ["One to one", "One to many", "Many to many (>2)"]
    }
];

module.exports = questions;
