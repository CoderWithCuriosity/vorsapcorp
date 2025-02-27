
# File Upload & Question Workflow API

## Overview
This project implements a file upload system using **Express.js** and **Multer** for handling file uploads. Once a file is successfully uploaded, the API returns a series of questions to guide the user through a structured analysis process.

## Features
- Upload a file and trigger a question-based workflow.
- Dynamic question progression based on user responses.
- API endpoints for fetching questions and processing answers.

## Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/CoderWithCuriosity/vorsapcorp
cd vorsapcorp
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Start the Server**
```sh
npm start
```
By default, the server runs on **port 3000**.

## API Endpoints

### **1. Upload File**
**Endpoint:** `POST /upload`

Uploads a file and returns the first question.

#### **Request**
- Form-data with a file (key: `file`)

#### **Response**
```json
{
    "message": "File uploaded successfully!",
    "filename": "uploadedfile.csv",
    "originalFilename": "data.csv",
    "nextQuestion": {
        "question": "Type of Distribution",
        "options": ["Yes", "No", "Unsure"],
        "followUp": {
            "Unsure": ["Upload dataset", "Upload metadata (optional)"]
        }
    }
}
```

### **2. Get All Questions**
**Endpoint:** `GET /questions`

Returns the list of questions.

#### **Response**
```json
[
    {
        "question": "Type of Distribution",
        "options": ["Yes", "No", "Unsure"],
        "followUp": {
            "Unsure": ["Upload dataset", "Upload metadata (optional)"]
        }
    },
    ...
]
```

### **3. Get Next Question**
**Endpoint:** `POST /next-question`

Takes the user's response and returns the next question based on logic.

#### **Request**
```json
{
    "currentQuestion": "Type of Distribution",
    "answer": "Yes"
}
```

#### **Response**
```json
{
    "nextQuestion": {
        "question": "Type of Study",
        "options": ["Yes", "No", "Unsure"],
        "followUp": {
            "Unsure": ["Upload metadata"],
            "Yes": ["Number of Timepoints?", "Number of Groups", "Total Number of Samples"],
            "No": ["Number of Groups", "Total Number of Samples"]
        }
    }
}
```

## Folder Structure
```
project-root/
│── server.js        # Main server file
│── routes/
│   ├── upload.js    # Handles file upload & initial question
│   ├── questions.js # Handles question retrieval
│── questions.js     # Contains the list of questions
│── uploads/         # Directory where uploaded files are stored
```

## Technologies Used
- **Node.js** (Backend)
- **Express.js** (Server framework)
- **Multer** (File upload handling)
- **JSON** (Data structure for questions & responses)

## How It Works
1. The user uploads a file via the `/upload` endpoint.
2. The server verifies the file and returns the first question.
3. The user submits responses to questions using `/next-question`.
4. The system dynamically determines the next question based on the previous answer.

## Future Enhancements
- Store user responses in a database.
- Implement authentication.
- Provide AI-generated suggestions based on answers.

## Author
**Nwankwo Chidera David**

## License
This project is licensed under the **MIT License**.

