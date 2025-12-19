# 🐾 Pet Adoption System - Backend API

Node.js/Express REST API for the Pet Adoption Management System.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with sample data
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

Server runs on: `http://localhost:5000`

---

## 📦 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **express-validator** - Input validation

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── petController.js     # Pet CRUD operations
│   └── applicationController.js  # Application management
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── upload.js            # File upload config
├── models/
│   ├── User.js              # User schema
│   ├── Pet.js               # Pet schema
│   └── Application.js       # Application schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── petRoutes.js         # Pet endpoints
│   └── applicationRoutes.js # Application endpoints
├── utils/
│   └── generateToken.js     # JWT token generation
├── seed.js                  # Database seeding
├── server.js                # Entry point
└── package.json
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint              | Description    | Auth Required |
| ------ | --------------------- | -------------- | ------------- |
| POST   | `/api/auth/register`  | Register user  | No            |
| POST   | `/api/auth/login`     | Login user     | No            |
| GET    | `/api/auth/profile`   | Get profile    | Yes           |
| PUT    | `/api/auth/profile`   | Update profile | Yes           |

### Pets

| Method | Endpoint            | Description       | Auth Required |
| ------ | ------------------- | ----------------- | ------------- |
| GET    | `/api/pets`         | Get all pets      | No            |
| GET    | `/api/pets/:id`     | Get single pet    | No            |
| POST   | `/api/pets`         | Create pet        | Admin         |
| PUT    | `/api/pets/:id`     | Update pet        | Admin         |
| DELETE | `/api/pets/:id`     | Delete pet        | Admin         |

### Applications

| Method | Endpoint                  | Description              | Auth Required |
| ------ | ------------------------- | ------------------------ | ------------- |
| POST   | `/api/applications`       | Submit application       | User          |
| GET    | `/api/applications/my`    | Get user's applications  | User          |
| GET    | `/api/applications`       | Get all applications     | Admin         |
| GET    | `/api/applications/:id`   | Get single application   | User/Admin    |
| PUT    | `/api/applications/:id`   | Update application status| Admin         |

---

## 🗄️ Database Schema

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Pet

```javascript
{
  name: String,
  species: String,
  breed: String,
  age: Number,
  gender: String,
  size: String,
  description: String,
  healthStatus: String,
  vaccinationStatus: String,
  image: String,
  status: String (available/pending/adopted),
  addedBy: ObjectId (User),
  createdAt: Date
}
```

### Application

```javascript
{
  user: ObjectId (User),
  pet: ObjectId (Pet),
  reason: String,
  experience: String,
  livingSpace: String,
  hasOtherPets: Boolean,
  status: String (pending/approved/rejected),
  adminNotes: String,
  createdAt: Date
}
```

---

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Login Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Using Token:**

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

---

## 🌱 Seeding Database

Populate the database with sample data:

```bash
npm run seed
```

**Sample Accounts Created:**

- **Admin:** admin@petadopt.com / admin123
- **User:** john@example.com / password123

**Sample Data:**

- 12 pets with various species
- Ready to test all features

---

## 🚀 Deployment

### Deploy to Railway

1. Push code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables
5. Deploy automatically

### Deploy to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect repository
5. Add environment variables
6. Deploy

**Important:** Update `CLIENT_URL` in production to your frontend URL.

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start

# Seed database
npm run seed
```

---

## 📝 API Request Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Get Pets with Filters

```bash
GET /api/pets?species=Dog&status=available&page=1&limit=10
```

### Submit Application

```bash
POST /api/applications
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "pet": "pet_id_here",
  "reason": "I love dogs and want to provide a good home",
  "experience": "5 years",
  "livingSpace": "house",
  "hasOtherPets": false
}
```

---

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

---

## 📚 Dependencies

### Production

- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - CORS middleware
- dotenv - Environment variables
- express-validator - Input validation
- multer - File upload handling

### Development

- nodemon - Auto-reload server

---

## ⚙️ Configuration

### CORS

Configured to accept requests from frontend URL specified in `CLIENT_URL`.

### File Uploads

Multer configured for image uploads in `middleware/upload.js`.

### Error Handling

Global error handler in `middleware/errorHandler.js`.

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution:** Make sure MongoDB is running locally or check your MONGODB_URI.

### JWT Authentication Failed

```
Error: jwt must be provided
```

**Solution:** Include `Authorization: Bearer TOKEN` header in requests.

### Port Already in Use

```
Error: listen EADDRINUSE
```

**Solution:** Kill process on port 5000 or change PORT in .env.

---

## 📖 Additional Documentation

For complete project documentation, see the main repository README.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ for pets and their future families 🐾**
