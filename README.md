# 🚚 Courier Desk — Client Side

**Courier Desk** is a modern courier and parcel management system built using the MERN stack. It offers parcel booking, status tracking, role-based dashboards, and admin parcel management with a clean and responsive UI.

---

## 🌐 Live Links

- **Client Web App:** [https://courier-desk.netlify.app](https://courier-desk.netlify.app/)
- **Server API:** [https://courier-desk-server.vercel.app](https://courier-desk-server.vercel.app/)
- **Server GitHub Repo:** [https://github.com/amirsayeed/Courier-Desk-Server](https://github.com/amirsayeed/Courier-Desk-Server)

---

## 🎯 Features

### 👤 Authentication & Authorization

- User registration & login using **Firebase Auth**
- Role-based access:
  - **Customer**
  - **Admin**
  - **Delivery Agent**
- JWT secured routes using Firebase-issued tokens

### 📦 Customer Portal

- Book a parcel with:
  - Pickup & delivery address
  - Parcel type, size, weight
  - COD or prepaid selection
- View booking history with statuses
- Tracking ID generation for each parcel

### 🧑‍💼 Admin Dashboard

- Overview of total bookings, in transit parcels, delivered parcels, total parcels, COD stats, and failed deliveries
- View all users and bookings
- Assign delivery agents to parcels

### 🚚 Delivery Agent Panel

- View assigned parcels
- Update parcel status:
  - Picked Up
  - In Transit
  - Delivered
  - Failed

---

## 🚧 Features Coming Soon

- Real-time tracking on map (based on coordinates)
- Live updates using **Socket.IO**
- Optimized delivery route using **Google Maps Directions API**
- PDF/CSV report export for admins
- QR code & barcode functionality for tracking
- Email & SMS notifications
- Multi-language support (English & Bengali)

---

## 🧰 Tech Stack

### Frontend

- **React.js**
- **React Router DOM**
- **Tailwind CSS**
- **DaisyUI**
- **React Hook Form**
- **SweetAlert2**
- **Axios**

### Authentication & Security

- **Firebase Authentication**
- **JWT (via Firebase tokens)**
- **Firebase Admin SDK on backend for verification**

### Backend (Connected)

- **Node.js + Express.js**
- **MongoDB**

---

## 📦 Dependencies

```bash
"axios"
"react"
"react-router"
"firebase"
"react-hook-form"
"react-toastify"
"sweetalert2"
"tailwindcss"
"daisyui"
"vite"
```

🛠️ Getting Started – Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/amirsayeed/Courier-Desk-Client
cd Courier-Desk-Client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a .env.local file in the root with:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

App runs at: http://localhost:5173

⚙️ Server Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/amirsayeed/Courier-Desk-Server
cd Courier-Desk-Server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a .env file in the root with:

```bash
DB_USER=your_mongodb_project_username
DB_PASS=your_mongodb_project_password
FB_SERVICE_KEY=convert_firebase_admin_service_key_to_base64
```

### 4. Run Development Server

```bash
nodemon index.js
```

API runs at: http://localhost:5000
