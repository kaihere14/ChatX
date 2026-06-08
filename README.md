# ChatX  

Real-time chat application built with React, Vite, Tailwind CSS, Express, Socket.io, and MongoDB.  

[![License](https://img.shields.io/github/license/kaihere14/ChatX)](LICENSE)  
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)  
[![Backend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/backend-ci.yml?label=backend%20CI)](https://github.com/kaihere14/ChatX/actions)  
[![Frontend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/frontend-ci.yml?label=frontend%20CI)](https://github.com/kaihere14/ChatX/actions)  

[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/ChatX/issues) • [Pull Requests](https://github.com/kaihere14/ChatX/pulls)

---

## Overview  

ChatX is a full-stack real-time messaging platform enabling user registration, authentication, and instant message exchange. It combines a React frontend with an Express backend using Socket.io for real-time communication, with MongoDB for data persistence.

**Key Features**  
- Zero-config development (`npm run dev` starts both client and server)  
- JWT-based authentication with bcrypt  
- Real-time messaging with typing indicators  
- Responsive UI with Tailwind and DaisyUI  
- Cloudinary integration for image uploads  
- Arcjet-powered security and rate limiting  

**Target Audience**  
Developers seeking a starter kit for real-time chat applications, collaborative tools, or online classrooms.  

**Current Version:** v1.0.0 (production ready for local development)

---

## Features  

| Feature | Status | Description |
|---------|--------|-------------|
| **User Authentication** | ✅ Stable | JWT authentication via HTTP-only cookies |
| **Real-Time Messaging** | ✅ Stable | Socket.io-powered chat rooms with message history |
| **Image Upload** | 🟡 Beta | Cloudinary integration for image uploads |
| **Email Notifications** | 🟡 Beta | Resend API for transactional emails |
| **Security** | 🟡 Experimental | Arcjet middleware for bot protection and throttling |

---

## Tech Stack  

| Layer | Technologies | Purpose |
|-------|--------------|---------|
| **Frontend** | React 19, Vite 7, Tailwind 4, DaisyUI | UI components and routing |
| **Backend** | Node 20, Express 5, Socket.io 4, Mongoose 8 | API and real-time communication |
| **Database** | MongoDB (Atlas or local) | Message and user storage |
| **File Storage** | Cloudinary | Image hosting and CDN |
| **Email** | Resend | Transactional email service |
| **Security** | Arcjet | Request validation and rate limiting |

---

## Architecture  

```
root/
├── backend/                # Express API + Socket.io server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── database/       # Mongoose connection
│   │   ├── middleware/     # Auth and validation
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # API endpoints
│   └── server.js           # Entry point
│
├── frontend/               # React SPA
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route components
│   │   └── store/          # Zustand state management
│   └── main.jsx            # React entry point
│
└── package.json            # Monorepo scripts
```

**Data Flow**  
1. Client authenticates via `/api/auth`  
2. JWT cookie is set upon success  
3. Socket.io connection is established with JWT verification  
4. Messages are persisted in MongoDB and broadcast to room participants

---

## Getting Started  

### Prerequisites  

| Tool | Minimum Version |
|------|-----------------|
| Node | 20.0.0 |
| npm | 10.x |
| MongoDB | 6.x (Atlas or local) |
| Cloudinary | Optional |
| Resend | Optional |

### Setup  

1. Clone the repo:  
   ```bash
   git clone https://github.com/kaihere14/ChatX.git
   cd ChatX
   ```

2. Create `.env` in `backend/` (copy from `.env.example`):  
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

---

## Contributing  

1. **Fork** the repository  
2. **Create a feature branch**: `git checkout -b feat/your-feature`  
3. **Install dependencies**: `npm run build`  
4. **Make changes** and ensure they pass `npm run lint`  
5. **Write tests** (if applicable)  
6. **Commit** with clear message: `git commit -m "feat: add typing indicator"`  
7. **Push** to your fork and open a PR against `main`  

**Code Style**  
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

## License  

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