# 🏡 Surya Nikunjam Community Website

A modern full-stack MERN application for **Surya Nikunjam Community**, featuring a responsive public website and a secure admin dashboard for managing all website content.

---

# ✨ Features

## 🌐 Public Website

- Home Page
- Hero Banner Slider
- About Us
- Mission & Vision
- Why Choose Us
- Location Advantages
- Villas
- Amenities
- Lifestyle
- Gallery
- Events
- Testimonials
- FAQ
- Contact Page
- Book Site Visit
- Fully Responsive Design

---

## 🔐 Admin Dashboard

The admin panel allows administrators to manage:

- Hero Banners
- About Content
- Mission & Vision
- Why Choose
- Location Advantages
- Villas
- Amenities
- Lifestyle
- Gallery
- Events
- Testimonials
- FAQ
- Contact Information
- Site Visit Bookings

---

# 🛠 Tech Stack

## Frontend

- React.js
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Lucide React
- SweetAlert2

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Bcrypt

---

# 📁 Project Structure

```text
Surya-Nikunjam/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/Surya-Nikunjam.git

cd Surya-Nikunjam
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

SETUP_SECRET=your_setup_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd ../frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

# 🔐 Admin Setup

The project includes a secure **one-time Admin Setup API**.

Create the first administrator using Postman.

**Endpoint**

```http
POST /api/admin/create-admin
```

**Headers**

```text
x-setup-secret: YOUR_SETUP_SECRET
```

**Request Body**

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123"
}
```

After the first administrator is created, the endpoint is automatically disabled.

---

# 🔑 Admin Login

```text
/admin/login
```

Use the administrator credentials created during the setup process.

---

# 📸 Image Uploads

All images uploaded through the Admin Dashboard are stored securely on **Cloudinary**.

Images include:

- Hero Banners
- About
- Amenities
- Lifestyle
- Villas
- Gallery
- Events
- Testimonials
- Why Choose
- Location Advantages

Cloudinary provides:

- Secure cloud storage
- Optimized image delivery
- Fast CDN access
- Automatic image transformations

---

# 🚀 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

### Image Storage

- Cloudinary

---

# 📄 License

This project is developed for the **Surya Nikunjam Community**.