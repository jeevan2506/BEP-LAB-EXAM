# Custom Express Form App

Small Express application demonstrating form handling with validation and optional file upload.

Features:
- EJS templates
- POST form handling with express-validator
- File upload using multer (saved to `public/uploads`)
- Static assets served from `public`

Prerequisites
- Node.js (16+ recommended)

Install & run (PowerShell on Windows):

```powershell
cd "c:\Users\jeeva\OneDrive\Pictures\Documents\New folder\BEP Exam"
npm install
npm start
```

Open http://localhost:3000 in your browser.

Notes:
- Uploaded files are stored in `public/uploads`.
- To run in development with auto-reload (if you have nodemon): `npm run dev`.
