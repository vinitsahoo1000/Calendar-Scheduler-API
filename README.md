# 🗓️ Calendar Scheduler API

A RESTful calendar scheduling API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**, supporting user authentication, event management, reminders, recurring events, and time zones.

---

## 🚀 Features

- ✅ User registration & login with JWT auth
- 📆 Calendar management (multiple per user)
- 📝 Event CRUD with recurrence, reminders, and time zone support
- 🔐 Secure authentication middleware
- 📚 Swagger-based API documentation
- 🧪 Postman collection for testing
- 🧰 Zod for request validation

---

## 🏗️ Project Architecture

```
src/
├── controllers/       # Route logic
├── db/                # MongoDB connection logic (Mongoose)
├── routes/            # Express route definitions (with Swagger JSDoc)
├── models/            # Mongoose schemas (User, Calendar, Event)
├── validators/        # Zod schemas for input validation
├── middleware/        # JWT auth middleware
├── docs/              # Swagger config + Postman collection
└── server.ts          # Application entry point
```

---

## 🧠 Design Decisions

- **RESTful routing**: Each entity (`/user`, `/calendar`, `/event`) follows standard HTTP verbs.
- **JWT auth**: Supports both `Authorization` header and `httpOnly` cookie.
- **Time zones**: Events are saved with per-user timezone settings.
- **Security**: Cookie-based auth with `secure` and `httpOnly` flags.
- **Docs**: Swagger UI with JWT bearer support at `/api-docs`.

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/calendar-scheduler-api.git
cd calendar-scheduler-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Use the example below:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/calendar-scheduler
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm run dev   # for development with ts-node
npm run build && npm start   # for production
```

---

## 🧪 API Testing

### 🧾 Swagger Documentation

- Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Click **Authorize** and paste your JWT token
- Try all endpoints directly from the browser

### 📬 Postman Collection

A complete [Postman collection](./docs/CalendarSchedulerAPI.postman_collection.json) is included.

To use:

1. Open Postman → `File > Import`
2. Import the file above
3. Set environment variables:
   - `token`: JWT from login
   - `calendarId`: from calendar creation response
   - `eventId`: from event creation response

---

## 📚 API Endpoints Overview

| Method | Endpoint                 | Description                 | Auth Required |
|--------|--------------------------|-----------------------------|----------------|
| POST   | `/user/register`         | Register new user           | ❌             |
| POST   | `/user/login`            | Login user                  | ❌             |
| GET    | `/calendar`              | Get all calendars           | ✅             |
| POST   | `/calendar`              | Create a new calendar       | ✅             |
| DELETE | `/calendar/:id`          | Delete a calendar           | ✅             |
| GET    | `/event`                 | Get all events              | ✅             |
| POST   | `/event`                 | Create new event            | ✅             |
| PUT    | `/event/:id`             | Update an event             | ✅             |
| DELETE | `/event/:id`             | Delete an event             | ✅             |

---

## ✅ Assignment Highlights

- ✅ All core features implemented
- ✅ Swagger UI + Postman collection included
- ✅ Clean, maintainable TypeScript structure
- ✅ Scalable design with modular controllers and validation
- 🔄 Ready for future Google Calendar sync / reminders / notifications

---

## 🧑‍💻 Author

**Vinit Sahoo**  
Full Stack Developer  
GitHub: [github.com/vinitsahoo1000](https://github.com/vinitsahoo1000)  
Email: vinitsahoo100@gmail.com

---

## 📝 License

MIT © Vinit Sahoo
