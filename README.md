# Event Management API (Backend)

A backend system built with **Node.js, Express, TypeScript, MongoDB, Redis, and BullMQ** for managing events with authentication, caching, file uploads, and background jobs.

---

## 🚀 Features

- User Registration & Login (JWT Auth)
- Event CRUD (Create, Read, Update, Delete)
- Role-based protection using JWT middleware
- Redis caching (cache-aside pattern)
- Cache HIT / MISS logging
- Cache invalidation on update/delete/create
- Background job processing with BullMQ
- File upload support (Multer - event banner)
- MongoDB Atlas integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Redis
- BullMQ
- Zod (validation)
- Multer (file upload)
- JWT (authentication)

---

## 📁 Project Structure

```bash
event-mgmt-api/
├─ src/
│ ├─ app.ts
│ ├─ server.ts
│ ├─ config/
│ │ ├─ db.ts
│ │ └─ redis.ts
│ ├─ middleware/
│ │ ├─ validate.ts
│ │ ├─ requireAuth.ts
│ │ └─ upload.ts
│ ├─ cache/
│ │ └─ cache.service.ts
│ ├─ queues/
│ │ └─ event.queue.ts
│ ├─ workers/
│ │ └─ event.worker.ts
│ ├─ auth/
│ │ ├─ controller/
│ │ ├─ routes/
│ │ ├─ service/
│ │ ├─ model/
│ │ └─ schema/
│ └─ event/
│ ├─ controller/
│ ├─ routes/
│ ├─ service/
│ ├─ model/
│ └─ schema/
├─ uploads/
├─ exports/
├─ .env.example
└─ README.md

```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd event-mgmt-api
```
### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File
Create .env file:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event-mgmt
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
PORT=3000
```
### 4️⃣ Start MongoDB Redis

MongoDB Atlas
Use your cluster connection string

Redis (Docker)

```bash
docker run -p 6379:6379 redis:7-alpine
```

### 5️⃣ Run Server

```bash
npm run dev
```
### 6️⃣ Run Worker (BullMQ)

```bash
npm run worker
```

Auth APIs

Register

```bash
POST /auth/register
```
Login
```bash
POST /auth/login
```

Returns:

```bash
{
  "token": "jwt_token_here"
}
```

# Event APIs

Create Event (Protected)

```bash
POST /events
Authorization: Bearer <token>
```
Get Published Events (Public + Cached)

```bash
GET /events
```

✔ First request → CACHE MISS
✔ Second request → CACHE HIT


Get Event by ID

```bash
GET /events/:id
```
Update Event (Protected)

```bash
PATCH /events/:id
```

Delete Event (Protected)

```bash
DELETE /events/:id
```

Banner Upload

```bash
POST /events/:id/banner
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

File stored in:

```bash
/uploads
```

# Background Jobs (BullMQ)

When an event is published:

Job is added to queue
Worker processes job
Output saved in /exports/

# Redis Cache Behavior

Action	                     Result
GET /events	                 Cache MISS (first time)
GET /events	                 Cache HIT (next time)
Create/Update/Delete	       Cache cleared


# Example Test Flow

```bash
# 1. Register
# 2. Login (get token)
# 3. Create event
# 4. Get events (MISS)
# 5. Get events (HIT)
# 6. Update event → cache cleared
```

# Multer Configuration 

Banner Image uploaded (Need to install Multer)

```bash
npm install multer
npm install -D @types/multer
```

# Author

Student Project – Event Management API
Built for Week 7 Capstone Assignment

# Notes
Do NOT commit .env
Ensure Redis is running before starting worker
Ensure MongoDB connection is valid

---

# Done
