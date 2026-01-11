# ChatX  

**Real‑time chat application built with React, Vite, Tailwind CSS, Express 5, Socket.io 4 and MongoDB.**  

![GitHub license](https://img.shields.io/github/license/kaihere14/ChatX) ![Node version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen) ![Backend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/backend-ci.yml?label=backend%20CI) ![Frontend CI](https://img.shields.io/github/actions/workflow/status/kaihere14/ChatX/frontend-ci.yml?label=frontend%20CI)  

[Demo](#) • [Documentation](#) • [Issues](https://github.com/kaihere14/ChatX/issues) • [Pull Requests](https://github.com/kaihere14/ChatX/pulls)

---  

## Overview  

ChatX is a full‑stack, **real‑time** messaging platform that lets users register, log in, and exchange messages instantly. It combines a modern React UI with a lightweight Express 5 API and Socket.io for bidirectional communication. All data is persisted in MongoDB, and the project ships with Docker‑ready scripts for easy deployment.

**Why ChatX?**  

- **Zero‑config dev experience** – `npm run dev` boots both client and server.  
- **Scalable architecture** – separate backend & frontend, ready for containerisation.  
- **Secure authentication** – JWT + bcrypt, HTTP‑only cookies.  
- **Rich UI** – Tailwind 4, DaisyUI, Lucide icons, and sound effects for keypresses.  

**Target audience** – developers who need a starter‑kit for real‑time chat, online classrooms, or collaborative tools.  

**Current version:** **v1.0.0** (production ready for local development).

---  

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **User authentication** | Register / login with email & password, JWT stored in HTTP‑only cookie. | ✅ Stable |
| **Real‑time messaging** | Socket.io powered chat rooms, instant delivery, typing indicators. | ✅ Stable |
| **Persisted chat history** | Messages stored in MongoDB, fetched on room join. | ✅ Stable |
| **Responsive UI** | Tailwind 4 + DaisyUI components, works on mobile & desktop. | ✅ Stable |
| **Keyboard sound effects** | Custom hook (`useKeyboardSound`) plays click sounds on keypress. | ✅ Stable |
| **File & image upload** | Integrated Cloudinary support for sending images. | 🟡 Beta |
| **Email notifications** | Uses Resend API to send welcome / password‑reset emails. | 🟡 Beta |
| **Rate‑limiting & security** | Arcjet middleware for request inspection and throttling. | 🟡 Experimental |
| **Docker support** | `Dockerfile` & `docker-compose.yml` (to be added) for containerised deployment. | 🟠 Planned |

---  

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend** | React 19, Vite 7, Tailwind 4, DaisyUI, Lucide‑react, Zustand, Axios, socket.io‑client | Fast HMR, utility‑first styling, lightweight state management |
| **Backend** | Node 20, Express 5, Socket.io 4, Mongoose 8, JWT, Bcrypt, Cookie‑Parser, CORS, dotenv | Modern, promise‑based API, real‑time sockets, robust ORM |
| **Database** | MongoDB (via Mongoose) | Flexible schema for messages & users |
| **File storage** | Cloudinary | CDN‑backed image hosting |
| **Email** | Resend | Simple transactional email service |
| **Security / Rate limiting** | Arcjet (inspect + node) | Bot protection & request throttling |
| **Testing / Linting** | ESLint, Jest (future) | Code quality |
| **Containerisation** | Docker (planned) | Easy production rollout |

---  

## Architecture  

```
root
├─ backend/                # Express API + Socket.io server
│  ├─ src/
│  │  ├─ controller/       # Request handlers
│  │  ├─ database/         # Mongoose connection & socket.io init
│  │  ├─ middleware/       # Auth, validation, Arcjet
│  │  ├─ model/            # Mongoose schemas (User, Message)
│  │  ├─ routes/           # /api/auth, /api/message
│  │  └─ server.js         # Entry point, static file serving
│  └─ package.json
│
├─ frontend/               # React SPA
│  ├─ src/
│  │  ├─ Components/       # UI components (ChatBox, MessageList, …)
│  │  ├─ Pages/            # Route pages (Login, Register, Chat)
│  │  ├─ Store/            # Zustand stores (authStore, chatStore)
│  │  ├─ lib/              # Helper utilities (api.js)
│  │  └─ main.jsx          # React entry point
│  └─ package.json
│
└─ package.json            # Root scripts for monorepo‑style install/build
```

**Data flow** – The client authenticates via `/api/auth`. Upon success a JWT cookie is set. The React app opens a Socket.io connection (`socket.io-client`) that sends the JWT for verification. Messages are emitted to the server, persisted via Mongoose, and broadcast to all participants in the same room.

---  

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| Node | **20.0.0** |
| npm | 10.x |
| MongoDB | 6.x (cloud Atlas or local) |
| Cloudinary account | (optional – for image uploads) |
| Resend account | (optional – for email) |

### Environment variables  

Create a `.env` file in the **backend** folder (copy from `.env.example` if present):

```dotenv
# Server
PORT=5000
NODE_ENV=development

# Frontend URL (used for CORS)
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatx?retryWrites=true&w=majority

# JWT
JWT_SECRET=yourSuperSecretKey
JWT_EXPIRES_IN=7d

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend (optional)
RESEND_API_KEY=your_resend_api_key
```

### Installation  

```bash
# Clone the repo
git clone https://github.com/kaihere14/ChatX.git
cd ChatX

# Install both backend and frontend dependencies and build the frontend
npm run build   # runs npm install in both sub‑projects and builds the frontend
```

> **Note:** `npm run build` also creates the production‑ready `frontend/dist` folder that the backend serves in production.

### Development mode  

```bash
# Terminal 1 – start backend with hot‑reload
npm run dev --prefix backend

# Terminal 2 – start Vite dev server for the frontend
npm run dev --prefix frontend
```

- API: `http://localhost:5000/api/...`  
- React app: `http://localhost:5173`

### Production mode  

```bash
# Build the frontend (already done by `npm run build`)
npm run build --prefix frontend

# Start the backend (serves static files from frontend/dist)
npm start
```

The server listens on the port defined in `PORT` (default **5000**) and serves the compiled React app.

---  

## Usage  

### API Endpoints  

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| **POST** | `/api/auth/register` | Register a new user (email, password, username). Returns JWT cookie. | ❌ |
| **POST** | `/api/auth/login` | Log in existing user. Returns JWT cookie. | ❌ |
| **POST** | `/api/auth/logout` | Clears JWT cookie. | ✅ |
| **GET** | `/api/auth/me` | Returns current user profile. | ✅ |
| **GET** | `/api/message/:roomId` | Fetch last 50 messages for a chat room. | ✅ |
| **POST** | `/api/message` | Send a new message (roomId, content, optional image URL). | ✅ |

> All protected routes require the JWT cookie (`httpOnly`) and are validated by the `auth` middleware.

### Real‑time Socket.io events  

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `joinRoom` | client → server | `{ roomId }` | Joins a chat room; server emits `previousMessages`. |
| `chatMessage` | client → server | `{ roomId, content, image? }` | Server saves to DB and broadcasts `newMessage`. |
| `newMessage` | server → clients | Message object | Received by all clients in the room. |
| `typing` | client → server | `{ roomId, userId, isTyping }` | Broadcasted as `typingStatus`. |
| `typingStatus` | server → clients | `{ userId, isTyping }` | UI shows “User is typing…”. |

#### Example: Sending a message from the client  

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
  // Update Zustand store or local state
  console.log("Received:", msg);
});
```

### Frontend quick start (React)  

```bash
# Inside the frontend folder
npm run dev
```

Open `http://localhost:5173` – you’ll see the login screen. After authenticating, you’ll be redirected to the chat interface where you can create/join rooms and start messaging.

---  

## Development  

### Setting up the development environment  

1. **Code style** – ESLint is configured (`npm run lint`).  
2. **Hot‑reloading** – Backend uses `nodemon`; frontend uses Vite HMR.  
3. **Testing** – No tests are shipped yet; add Jest or Vitest and run `npm test`.  

### Running tests (placeholder)  

```bash
npm test --prefix backend   # currently a stub
npm test --prefix frontend  # currently a stub
```

### Debugging  

* **Backend** – `node --inspect src/server.js` or use VS Code “Attach” configuration.  
* **Frontend** – Chrome DevTools + React DevTools.  

### Adding a new route  

1. Create a file in `backend/src/routes/` (e.g., `profile.route.js`).  
2. Export an Express router and register it in `server.js` with `app.use("/api/profile", profileRouter);`.  
3. Add corresponding controller functions in `backend/src/controller/`.  

---  

## Deployment  

### Docker (recommended)  

> Dockerfiles are planned but not yet included. When they become available, you’ll be able to run:

```bash
docker compose up --build
```

### Deploying to a VPS / Cloud  

1. **Build the frontend**  

   ```bash
   npm run build --prefix frontend
   ```

2. **Install backend dependencies**  

   ```bash
   npm install --prefix backend
   ```

3. **Set environment variables** on the host (use a process manager like `pm2` or `systemd`).  

4. **Start the server**  

   ```bash
   npm start --prefix backend
   ```

The backend will serve the static files from `frontend/dist` when `NODE_ENV=production`.

### Performance tips  

* Enable **gzip** compression in Express (`app.use(compression())`).  
* Add **MongoDB indexes** on `roomId` and `createdAt` for fast message queries.  
* Scale Socket.io with a **Redis adapter** when running multiple instances.

---  

## API Documentation  

A full Swagger/OpenAPI UI is not shipped yet. Below is a concise reference for the current endpoints.

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

*Authentication is handled via an HTTP‑only cookie; no `Authorization` header is required.*

---  

## Contributing  

1. **Fork** the repository.  
2. **Create a feature branch** (`git checkout -b feat/awesome-feature`).  
3. **Install dependencies** (`npm run build`).  
4. **Make your changes** – ensure they pass lint (`npm run lint`).  
5. **Write tests** (if applicable) and run them.  
6. **Commit** with a clear message (`git commit -m "feat: add typing indicator"`).  
7. **Push** to your fork and open a **Pull Request** against `main`.  

### Code style  

* Run ESLint (`npm run lint`).  
* Follow existing folder conventions (`src/controller`, `src/routes`, etc.).  
* Prefer absolute imports where possible (`import auth from "./routes/auth.route.js"`).  

### Review process  

* PRs are reviewed by at least one maintainer.  
* CI runs linting (and future tests) automatically.  
* Merge only after approvals and passing CI.

---  

## Troubleshooting  

| Issue | Solution |
|-------|----------|
| **`MONGO_URI not defined`** | Ensure `.env` contains a valid `MONGO_URI`. |
| **CORS error** | Verify `FRONTEND_URL` matches the URL you’re accessing the client from. |
| **Socket.io connection fails** | Check that the backend port is reachable and that cookies are sent (`withCredentials: true`). |
| **Images not uploading** | Confirm Cloudinary credentials are correct and that the `cloudinary` package is installed. |
| **Server crashes on start** | Look at the console output; most crashes are due to missing env vars or port conflicts. |

For more help, open an issue or join the discussion in the repository’s **Discussions** tab.

---  

## Roadmap  

- **Docker & docker‑compose** for one‑command local/production deployment.  
- **Comprehensive test suite** (Jest/Vitest + Supertest).  
- **Swagger UI** auto‑generated from OpenAPI spec.  
- **Push notifications** via Web Push API.  
- **Admin dashboard** for user & message moderation.  
- **Internationalisation (i18n)** support.  

---  

## License & Credits  

**License:** ISC – see the [LICENSE](LICENSE) file.  

### Authors & Contributors  

- **Kaihere14** – Project creator & primary maintainer.  

### Acknowledgments  

- [Arcjet](https://arcjet.com) – request inspection & rate limiting.  
- [Cloudinary](https://cloudinary.com) – image storage.  
- [Resend](https://resend.com) – transactional email service.  
- All open‑source libraries listed in `package.json` (React, Express, Tailwind, etc.).  

---  

*Happy coding! 🎉*