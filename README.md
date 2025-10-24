# 🧾 Credit Report Analyzer (MERN Stack)

A fullstack **MERN** application that processes **XML files** containing soft credit pull data.  
Users can upload XML files, automatically extract key credit details, and view structured credit reports through a clean React UI.

---

## 🚀 Live Demo
🔗 [https://xml-parser-three.vercel.app/](https://xml-parser-three.vercel.app/)

---

## 🧠 Project Overview

This app allows users to:
1. Upload **XML files** containing soft credit data.
2. Automatically extract details such as:
   - **Basic Info:** Name, PAN, Mobile, Credit Score  
   - **Report Summary:** Total accounts, Active/Closed accounts, Current balance, etc.  
   - **Credit Accounts Info:** Banks, Card Types, Account Numbers, Overdue, Balances  
3. View all uploaded reports and detailed breakdowns in a professional web interface.

---

## 🏗️ Tech Stack

**Frontend:** React, Axios  
**Backend:** Node.js, Express.js, Multer, xml2js  
**Database:** MongoDB (Mongoose)  
**Deployment:**  
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites
- Node.js (v18+ recommended)  
- MongoDB Atlas account  
- Git  

---

### 🖥️ Clone the Repository

```bash
git clone https://github.com/<your-username>/xml-parser.git
cd xml-parser
```

### 📦 Backend Setup

```bash
cd server
npm install
```
Create a .env file inside the server/ directory with:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run the backend:
```bash
npm run dev
```
Server runs at → http://localhost:5000

💻 Frontend Setup
---

```bash
cd ../client
npm install
```
Update the backend API URL in client/src/utils/api.js:

export const API_URL = "https://xml-parser-backend.onrender.com/api";
Run the frontend:
```bash
npm start
```
Frontend runs at → http://localhost:3000

### 🧰 Scripts
---
| Command | Description |
|----------|-------------|
| `npm run dev` (in server) | Starts backend with Nodemon |
| `npm start` (in client) | Runs React frontend |
| `npm run build` (in client) | Builds production-ready frontend |

---

## 📊 Features Implemented

✅ XML file upload with validation  
✅ XML parsing using **xml2js**  
✅ Extracts and stores credit details in **MongoDB**  
✅ RESTful APIs for upload and retrieval  
✅ Responsive React UI with detailed credit report view  
✅ Deployed frontend & backend  
✅ Error handling and modular architecture  

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/upload` | Upload XML file & parse data |
| **GET** | `/api/reports` | Fetch all uploaded reports |
| **GET** | `/api/reports/:id` | Fetch detailed report by ID |

---

## 📸 Screenshots


<img width="1920" height="1080" alt="Screenshot (743)" src="https://github.com/user-attachments/assets/6481c503-f0a7-495b-8363-98daa23f2d21" />

<img width="1920" height="1080" alt="Screenshot (744)" src="https://github.com/user-attachments/assets/66aab79d-a045-4acf-896e-bdeed4f39f5f" />

<img width="1920" height="1080" alt="Screenshot (745)" src="https://github.com/user-attachments/assets/6e33a873-6875-447f-bb6d-c9561fd851d3" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/264475cc-077e-4824-9476-1f49edd37077" />



---

## 🧠 Future Enhancements
- Add user authentication (JWT-based login/signup)  
- Enable PDF export of credit reports  
- Add filters and search for credit accounts  
- Integrate AI-based credit risk scoring  

---

## 👨‍💻 Developer

**Hari Babuji**  
🎓 Final Year CSE @ BIT Mesra  
💼 Passionate about MERN & Backend Development  
📧 [haribabuji2004@gmail.com](mailto:haribabuji2004@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/hari-babuji-pasalapudi-47997b257/)

---

⭐ *If you found this project interesting, consider giving it a star on GitHub!*


