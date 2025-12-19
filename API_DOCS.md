# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City, State"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St, City, State",
    "role": "user"
  }
}
```

---

### Login User

**POST** `/auth/login`

Login with existing credentials.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Get Profile

**GET** `/auth/profile`

Get current user profile (Protected).

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "role": "user"
  }
}
```

---

## Pet Endpoints

### Get All Pets

**GET** `/pets`

Get all pets with optional filters and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `search` (optional): Search by name or breed
- `species` (optional): Filter by species (Dog, Cat, Bird, Rabbit, Other)
- `breed` (optional): Filter by breed
- `minAge` (optional): Minimum age
- `maxAge` (optional): Maximum age
- `status` (optional): Filter by status (available, pending, adopted)

**Example:**

```
GET /pets?page=1&limit=12&species=Dog&status=available
```

**Response (200):**

```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "totalPages": 4,
  "currentPage": 1,
  "pets": [
    {
      "_id": "pet_id",
      "name": "Max",
      "species": "Dog",
      "breed": "Golden Retriever",
      "age": 3,
      "gender": "Male",
      "size": "Large",
      "color": "Golden",
      "description": "Friendly and energetic dog",
      "healthStatus": "Healthy",
      "vaccinated": true,
      "image": "image_url",
      "status": "available",
      "addedBy": {
        "name": "Admin",
        "email": "admin@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Pet by ID

**GET** `/pets/:id`

Get detailed information about a specific pet.

**Response (200):**

```json
{
  "success": true,
  "pet": {
    "_id": "pet_id",
    "name": "Max",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "gender": "Male",
    "size": "Large",
    "color": "Golden",
    "description": "Friendly and energetic dog...",
    "healthStatus": "Healthy",
    "vaccinated": true,
    "image": "image_url",
    "status": "available",
    "addedBy": {
      "name": "Admin",
      "email": "admin@example.com"
    }
  }
}
```

---

### Create Pet (Admin Only)

**POST** `/pets`

Add a new pet to the system.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "name": "Max",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 3,
  "gender": "Male",
  "size": "Large",
  "color": "Golden",
  "description": "Friendly and energetic dog looking for a loving home",
  "healthStatus": "Healthy",
  "vaccinated": true,
  "image": "https://example.com/image.jpg",
  "status": "available"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Pet added successfully",
  "pet": { ...pet_data }
}
```

---

### Update Pet (Admin Only)

**PUT** `/pets/:id`

Update pet information.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:** (same as Create Pet)

**Response (200):**

```json
{
  "success": true,
  "message": "Pet updated successfully",
  "pet": { ...updated_pet_data }
}
```

---

### Delete Pet (Admin Only)

**DELETE** `/pets/:id`

Delete a pet from the system.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Pet deleted successfully"
}
```

---

## Application Endpoints

### Submit Application

**POST** `/applications`

Submit an adoption application for a pet.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Request Body:**

```json
{
  "petId": "pet_id",
  "reason": "I want to adopt this pet because...",
  "experience": "I have experience with dogs for 5 years...",
  "livingSpace": "House",
  "hasOtherPets": false
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "application": {
    "_id": "application_id",
    "user": { ...user_info },
    "pet": { ...pet_info },
    "status": "pending",
    "reason": "...",
    "experience": "...",
    "livingSpace": "House",
    "hasOtherPets": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get My Applications

**GET** `/applications/my-applications`

Get all applications submitted by the current user.

**Headers:**

```
Authorization: Bearer <user_token>
```

**Response (200):**

```json
{
  "success": true,
  "count": 3,
  "applications": [
    {
      "_id": "application_id",
      "pet": {
        "name": "Max",
        "species": "Dog",
        "breed": "Golden Retriever",
        "image": "...",
        "status": "pending"
      },
      "status": "pending",
      "reason": "...",
      "experience": "...",
      "adminNotes": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get All Applications (Admin Only)

**GET** `/applications/all`

Get all applications with optional status filter.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Query Parameters:**

- `status` (optional): Filter by status (pending, approved, rejected)

**Response (200):**

```json
{
  "success": true,
  "count": 15,
  "applications": [
    {
      "_id": "application_id",
      "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "address": "..."
      },
      "pet": {
        "name": "Max",
        "species": "Dog",
        "breed": "Golden Retriever",
        "image": "...",
        "status": "pending"
      },
      "status": "pending",
      "reason": "...",
      "experience": "...",
      "livingSpace": "House",
      "hasOtherPets": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Update Application Status (Admin Only)

**PATCH** `/applications/:id/status`

Approve or reject an adoption application.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "status": "approved",
  "adminNotes": "Great candidate for adoption"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Application approved successfully",
  "application": { ...updated_application }
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**

```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized:**

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**403 Forbidden:**

```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

**404 Not Found:**

```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Server Error:**

```json
{
  "success": false,
  "message": "Server Error"
}
```

---
