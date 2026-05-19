# ChatX  

**Real-time chat application built with React, Vite, Tailwind CSS, Express, Socket.io, and MongoDB.**  

![GitHub license](https://img.shields.io/github/license/kaihere14/ChatX) ![Node version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen) ![Backend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/backend-ci.yml?label=backend%20CI) ![Frontend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/frontend-ci.yml?label=frontend%20CI)  

[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/ChatX/issues) • [Pull Requests](https://github.com/kaihere14/ChatX/pulls)

---

## Overview  

ChatX is a full-stack, real-time messaging platform that enables users to register, log in, and instantly exchange messages. It combines a modern React UI with a lightweight Express API and Socket.io for bidirectional communication, with data persisted in MongoDB.

**Key Features**  
- Zero-config development (`npm run dev` starts both client and server)  
- Secure authentication with JWT and bcrypt  
- Real-time messaging with typing indicators  
- Responsive UI with Tailwind and DaisyUI  
- Cloudinary integration for image uploads  
- Arcjet-based security and rate limiting  

**Target Audience**  
Developers seeking a starter kit for real-time chat, online classrooms, or collaborative tools.  

**Current Version:** v1.0.0 (production ready for local development)

---

## Features  

| Feature | Status | Description |
|---------|--------|-------------|
| **User Authentication** | ✅ Stable | Register/login with email/password, JWT stored in HTTP-only cookies |
| **Real-Time Messaging** | ✅ Stable | Socket.io-powered chat rooms with instant delivery and typing indicators |
| **Chat History** | ✅ Stable | Messages stored in MongoDB and fetched on room join |
| **Responsive UI** | ✅ Stable | Tailwind + DaisyUI components for mobile and desktop |
| **Image Upload** | 🟡 Beta | Cloudinary integration for sending images |
| **Email Notifications** | 🟡 Beta | Resend API for welcome and password-reset emails |
| **Security** | 🟡 Experimental | Arcjet middleware for request inspection and throttling |

---

## Tech Stack  

| Layer | Technologies | Purpose |
|-------|--------------|---------|
| **Frontend** | React 19, Vite 7, Tailwind 4, DaisyUI, Zustand | Fast HMR, utility-first styling, state management |
| **Backend** | Node 20, Express 5, Socket.io 4, Mongoose 8 | Modern API, real-time sockets, ORM |
| **Database** | MongoDB (via Mongoose) | Flexible schema for messages and users |
| **File Storage** | Cloudinary | CDN-backed image hosting |
| **Email** | Resend | Transactional email service |
| **Security** | Arcjet | Bot protection and request throttling |

---

## Architecture  

```
root/
├── backend/                # Express API + Socket.io server
│   ├── src/
│   │   ├── controller/     # Request handlers
│   │   ├── database/       # Mongoose connection & socket.io init
│   │   ├── middleware/     # Auth, validation, Arcjet
│   │   ├── model/          # Mongoose schemas (User, Message)
│   │   └── routes/         # /api/auth, /api/message
│   └── server.js           # Entry point
│
├── frontend/               # React SPA
│   ├── src/
│   │   ├── Components/     # UI components (ChatBox, MessageList)
│   │   ├── Pages/          # Route pages (Login, Register)
│   │   ├── Store/          # Zustand stores
│   │   └── lib/            # Helper utilities
│   └── main.jsx            # React entry point
│
└── package.json            # Monorepo scripts
```

**Data Flow**  
1. Client authenticates via `/api/auth`  
2. JWT cookie is set upon success  
3. React app opens a Socket.io connection with JWT verification  
4. Messages are emitted to the server, persisted via Mongoose, and broadcast to room participants

---

## Getting Started  

### Prerequisites  

| Tool | Minimum Version |
|------|-----------------|
| Node | 20.0.0 |
| npm | 10.x |
| MongoDB | 6.x (Atlas or local) |
| Cloudinary | Optional (for image uploads) |
| Resend | Optional (for email) |

### Setup  

1. Clone the repo:  
   ```bash
   git clone https://github.com/kaihere14/ChatX.git
   cd ChatX
   ```

2. Create `.env` in `backend/` (copy from `.env.example` if available):  
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatx
   JWT_SECRET=yourSuperSecretKey
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   RESEND_API_KEY=your_resend_api_key
   ```

3. Install and build:  
   ```bash
   npm run build   # Installs dependencies and builds frontend
   ```

### Development Mode  

```bash
# Terminal 1: Start backend with hot-reload
npm run dev --prefix backend

# Terminal 2: Start frontend
npm run dev --prefix frontend
```

- API: `http://localhost:5000/api/...`  
- React app: `http://localhost:5173`

### Production Mode  

```bash
# Build frontend (already done by `npm run build`)
npm run build --prefix frontend

# Start backend
npm start --prefix backend
```

---

## Usage  

### API Endpoints  

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| **POST** | `/api/auth/register` | Register user (email, password, username) | ❌ |
| **POST** | `/api/auth/login` | Log in user | ❌ |
| **POST** | `/api/auth/logout` | Clear JWT cookie | ✅ |
| **GET** | `/api/auth/me` | Get user profile | ✅ |
| **GET** | `/api/message/:roomId` | Fetch messages for room | ✅ |
| **POST** | `/api/message` | Send message (roomId, content, image) | ✅ |

### Socket.io Events  

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `joinRoom` | Client → Server | `{ roomId }` | Joins room and fetches history |
| `chatMessage` | Client → Server | `{ roomId, content, image? }` | Broadcasts message to room |
| `newMessage` | Server → Clients | Message object | Updates UI with new message |
| `typing` | Client → Server | `{ roomId, userId, isTyping }` | Broadcasts typing status |
| `typingStatus` | Server → Clients | `{ userId, isTyping }` | Shows "User is typing..." |

#### Example: Sending a Message  

```jsx
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

function sendMessage(roomId, text) {
  socket.emit("chatMessage", { roomId, content: text });
}

// Listen for new messages
socket.on("newMessage", (msg) => {
  console.log("Received:", msg);
});
```

---

## Development  

### Environment Setup  

1. **Code Style**: Run `npm run lint` for ESLint checks  
2. **Hot-Reloading**: Backend uses `nodemon`, frontend uses Vite HMR  
3. **Testing**: Add Jest/Vitest and run `npm test`  

### Adding a New Route  

1. Create route in `backend/src/routes/` (e.g., `profile.route.js`)  
2. Register in `server.js`:  
   ```js
   app.use("/api/profile", profileRouter);
   ```
3. Add controller functions in `backend/src/controller/`

---

## Deployment  

### VPS/Cloud  

1. **Build frontend**:  
   ```bash
   npm run build --prefix frontend
   ```

2. **Install backend dependencies**:  
   ```bash
   npm install --prefix backend
   ```

3. **Set environment variables** (use `pm2` or `systemd`)  

4. **Start server**:  
   ```bash
   npm start --prefix backend
   ```

### Performance Tips  

- Enable **gzip compression** in Express  
- Add **MongoDB indexes** on `roomId` and `createdAt`  
- Use **Redis adapter** for Socket.io in multi-instance setups  

---

## API Documentation  

```yaml
openapi: 3.0.3
info:
  title: ChatX API
  version: 1.0.0
paths:
  /api/auth/register:
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password, username]
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
                username:
                  type: string
      responses:
        '201':
          description: User created, JWT cookie set
  /api/auth/login:
    post:
      summary: Log in an existing user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
      responses:
        '200':
          description: Auth successful, JWT cookie set
  /api/message/{roomId}:
    get:
      summary: Get recent messages for a room
      parameters:
        - in: path
          name: roomId
          required: true
          schema:
            type: string
      security:
        - cookieAuth: []
      responses:
        '200':
          description: List of messages
```

*Authentication is handled via HTTP-only cookies; no `Authorization` header required.*

---

## Contributing  

1. **Fork** the repository  
2. **Create a feature branch**: `git checkout -b feat/your-feature`  
3. **Install dependencies**: `npm run build`  
4. **Make changes** and ensure they pass `npm run lint`  
5. **Write tests** (if applicable)  
6. **Commit** with clear message: `git commit -m "feat: add typing indicator"`  
7. **Push** to your fork and open a PR against `main`  

### Code Style  

- Run ESLint: `npm run lint`  
- Follow folder conventions (`src/controller`, `src/routes`)  
- Use absolute imports where possible  

---

## Troubleshooting  

| Issue | Solution |
|-------|----------|
| **MONGO_URI not defined** | Ensure `.env` contains a valid MongoDB connection string |
| **CORS error** | Verify `FRONTEND_URL` matches the client URL |
| **Socket.io connection fails** | Check backend port accessibility and cookie settings |
| **Images not uploading** | Confirm Cloudinary credentials are correct |
| **Server crashes on start** | Check for missing env vars or port conflicts |

For more help, open an issue or join the repository's **Discussions** tab.

---

## Roadmap  

- **Docker & docker-compose** for easy deployment  
- **Comprehensive test suite** with Jest/Vitest  
- **Swagger UI** for API documentation  
- **Push notifications** via Web Push API  
- **Admin dashboard** for moderation  
- **Internationalization (i18n)** support  

---

## License & Credits  

**License:** ISC – see [LICENSE](LICENSE)  

### Authors & Contributors  

- **Kaihere14** – Project creator & maintainer  

### Acknowledgments  

- [Arcjet](https://arcjet.com) – Request inspection and rate limiting  
- [Cloudinary](https://cloudinary.com) – Image storage  
- [Resend](https://resend.com) – Transactional email service  
- Open-source libraries in `package.json` (React, Express, Tailwind, etc.)  

---

*Happy coding! 🎉*