# Elite Event ERP

Elite Event ERP is a full-stack event management and administration platform designed for managing bookings, clients, staff, inventory, gallery uploads, quotations, payments, expenses, and lead tracking for event businesses.

## Overview

This project combines a React + Vite frontend with an Express + MongoDB backend to provide a modern dashboard for event operations. It is built to help teams track event workflows, financial records, and customer inquiries from a single system.

## Features

- Booking management and status tracking
- Staff and payroll management
- Inventory tracking
- Lead collection and inquiry processing
- Event gallery upload and management
- Quotation generation and management
- Payment tracking
- Expense tracking
- Admin login dashboard
- Public tracking page for clients to check booking or inquiry status

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for image uploads
- CORS and dotenv configuration

## Project Structure

```text
Elite-event-erp/
├── backend/
│   ├── models/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── .gitignore
├── README.md
└── package.json
```

## Prerequisites

Before running the project, make sure you have installed:

- Node.js (v18 or above)
- npm
- MongoDB database (local or cloud MongoDB Atlas)
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ParmarVaibhav2608/Elite-Event.git
cd Elite-Event
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder with the following values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/elite-event
```

If you are using MongoDB Atlas, replace the value with your connection string.

## Run the Application

### Start the backend

```bash
cd backend
node server.js
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Open the frontend in your browser at:

```text
http://localhost:5173
```

The backend API will run at:

```text
http://localhost:5000
```

## Admin Login

Default admin credentials:

```text
Email: admin@eliteevent.com
Password: admin123
```

## Default Routes

- `POST /api/login` – Admin login
- `GET /api/bookings` – Fetch bookings
- `POST /api/bookings` – Create booking
- `GET /api/staff` – Fetch staff
- `GET /api/inventory` – Fetch inventory
- `GET /api/gallery` – Fetch gallery
- `GET /api/leads` – Fetch leads
- `GET /api/expenses` – Fetch expenses
- `GET /api/quotations` – Fetch quotations
- `GET /api/payments` – Fetch payments

## GitHub Setup

This project is configured to be pushed to GitHub using the repository URL:

```bash
git remote add origin https://github.com/ParmarVaibhav2608/Elite-Event.git
```

## License

This project is for educational and business use. You may modify and extend it as needed.

## Author

Parmar Vaibhav

## Notes

This project is a working event management ERP demo for learning and business process automation. You can extend its modules and customize them for your own event company workflow.
