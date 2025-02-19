const questions = [
    {
        question: "Type of Distribution",
        options: ["Yes", "No", "Unsure"],
        followUp: {
            Unsure: ["Upload dataset", "Upload metadata (optional)"]
        }
    },
    {
        question: "Type of Study",
        options: ["Yes", "No", "Unsure"],
        followUp: {
            Unsure: ["Upload metadata"],
            Yes: ["Number of Timepoints?", "Number of groups", "Total Number of Samples"],
            No: ["Number of groups", "Total Number of Samples"]
        }
    },
    {
        question: "Type of analysis",
        options: ["Yes", "No"],
        followUp: {
            Yes: ["Between", "Within", "Both"]
        }
    },
    {
        question: "Between Groups (independent variables)",
        options: ["Quantitative", "Qualitative"],
        followUp: {
            Quantitative: ["One to one", "One to many", "Many to many (>2)"],
            Qualitative: ["One to one", "One to many", "Many to many (>2)"]
        }
    },
    {
        question: "Within Groups",
        options: ["One to one", "One to many", "Many to many (>2)"]
    },
    {
        question: "Timepoints Comparison",
        options: ["Yes", "No"],
        followUp: {
            Yes: ["Between", "Within", "Both"]
        }
    },
    {
        question: "Between Timepoints (paired test-dependent variables)",
        options: ["Quantitative", "Qualitative"],
        followUp: {
            Quantitative: ["One to one", "One to many", "Many to many (>2)"],
            Qualitative: ["One to one", "One to many", "Many to many (>2)"]
        }
    },
    {
        question: "Within Timepoints (sample to sample)",
        options: ["One to one", "One to many", "Many to many (>2)"]
    }
];


export default questions;