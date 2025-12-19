# 🐾 Pet Adoption System - Backend API

Node.js/Express REST API with MongoDB for pet adoption management.

---

## 🚀 Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Other:** bcryptjs, Multer, express-validator, CORS

---

## 📋 Overview

- **Authentication:** JWT-based with role-based authorization (User/Admin)
- **Pets API:** CRUD operations with search, filter, pagination (10 per page)
- **Applications:** Submit, track, approve/reject adoption applications
- **Auto Workflow:** Pet status updates, auto-reject conflicting applications

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start development server
npm run dev     # Runs on http://localhost:5000

# Start production server
npm start
```

**Environment Variables (.env):**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

---

## 🔑 Test Credentials

After running `npm run seed`:

- **Admin:** admin@petadopt.com / admin123
- **User:** john@example.com / password123

Sample data includes 12 pets ready for testing.

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Pets

- `GET /api/pets` - Get all pets (filters: search, species, age, status)
- `GET /api/pets/:id` - Get single pet
- `POST /api/pets` - Create pet (Admin only)
- `PUT /api/pets/:id` - Update pet (Admin only)
- `DELETE /api/pets/:id` - Delete pet (Admin only)

### Applications

- `POST /api/applications` - Submit application (User)
- `GET /api/applications/my` - Get user's applications (User)
- `GET /api/applications` - Get all applications (Admin)
- `PUT /api/applications/:id` - Update status (Admin)

---

## 📌 Important Notes

- **MongoDB Required:** Must be running locally or use MongoDB Atlas
- **JWT Secret:** Change in production for security
- **CORS:** CLIENT_URL must match frontend URL
- **Pagination:** Returns 10 items per page by default
- **Password Hashing:** Automatic with bcryptjs pre-save hook
- **Seed Script:** Creates admin, user, and 12 sample pets

---

**Important:** Update `CLIENT_URL` to your deployed frontend URL.

---

## 🔗 Frontend Repository

https://github.com/mypixelcode/Pet-Adoption---client

---
