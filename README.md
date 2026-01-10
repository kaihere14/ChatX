# ChatX
A real-time chat application built with Node.js, Express, and MongoDB.

## Header & Badges
[![Build Status](https://img.shields.io/travis/kaihere14/ChatX.svg?style=flat-square)](https://travis-ci.org/kaihere14/ChatX)
[![Code Coverage](https://img.shields.io/codecov/c/github/kaihere14/ChatX.svg?style=flat-square)](https://codecov.io/gh/kaihere14/ChatX)
[![License](https://img.shields.io/github/license/kaihere14/ChatX.svg?style=flat-square)](https://github.com/kaihere14/ChatX/blob/master/LICENSE)
[![Version](https://img.shields.io/npm/v/chatx.svg?style=flat-square)](https://www.npmjs.com/package/chatx)

## Overview
ChatX is a real-time chat application that allows users to communicate with each other in real-time. It is built using Node.js, Express, and MongoDB.

## Features
* Real-time messaging
* User authentication
* Message storage in MongoDB
* Support for multiple chat rooms

## Tech Stack
* Node.js
* Express
* MongoDB
* Socket.io

## Architecture
The application is divided into two main components: the backend and the frontend. The backend is built using Node.js, Express, and MongoDB, and is responsible for handling user authentication, message storage, and real-time messaging. The frontend is built using React, and is responsible for rendering the chat interface and handling user input.

### Backend
The backend is built using Node.js, Express, and MongoDB. It uses the following dependencies:
* `@arcjet/inspect`: for inspecting and debugging the application
* `@arcjet/node`: for creating and managing Node.js processes
* `bcrypt`: for hashing and verifying user passwords
* `cloudinary`: for storing and serving user avatars
* `cookie-parser`: for parsing and setting cookies
* `cors`: for enabling cross-origin resource sharing
* `dotenv`: for loading environment variables from a `.env` file
* `express`: for creating and managing the Express application
* `jsonwebtoken`: for generating and verifying JSON Web Tokens
* `mongoose`: for interacting with the MongoDB database
* `nodemon`: for restarting the application when changes are made to the code
* `resend`: for sending and receiving messages
* `socket.io`: for enabling real-time messaging

### Frontend
The frontend is built using React, and uses the following dependencies:
* `@tailwindcss/vite`: for styling the application using Tailwind CSS
* `axios`: for making HTTP requests to the backend
* `lucide-react`: for rendering icons and graphics
* `react`: for building and rendering the React application
* `react-dom`: for rendering the React application to the DOM
* `react-hot-toast`: for displaying toast notifications
* `react-router-dom`: for managing client-side routing
* `socket.io-client`: for connecting to the Socket.io server
* `tailwindcss`: for styling the application using Tailwind CSS
* `zustand`: for managing global state using Zustand

## Getting Started
To get started with ChatX, follow these steps:

### Prerequisites
* Node.js (version 20 or higher)
* MongoDB (version 5 or higher)
* A code editor or IDE

### Installation
1. Clone the repository using `git clone https://github.com/kaihere14/ChatX.git`
2. Install the dependencies using `npm install`
3. Create a `.env` file and add the following environment variables:
	* `MONGO_URI`: the URI of your MongoDB database
	* `FRONTEND_URL`: the URL of your frontend application
4. Start the application using `npm start`

### Configuration
To configure the application, you can modify the following environment variables:
* `MONGO_URI`: the URI of your MongoDB database
* `FRONTEND_URL`: the URL of your frontend application
* `PORT`: the port number to use for the application

## Usage
To use the application, follow these steps:

1. Open a web browser and navigate to the URL of your frontend application
2. Log in to the application using a valid username and password
3. Create a new chat room or join an existing one
4. Send and receive messages with other users in the chat room

## Development
To develop the application, follow these steps:

1. Clone the repository using `git clone https://github.com/kaihere14/ChatX.git`
2. Install the dependencies using `npm install`
3. Start the application using `npm start`
4. Make changes to the code and test the application using `npm test`

## Deployment
To deploy the application, follow these steps:

1. Build the application using `npm run build`
2. Deploy the application to a server or cloud platform
3. Configure the environment variables and dependencies as needed

## API Documentation
The application uses the following API endpoints:
* `POST /api/auth/login`: log in to the application
* `POST /api/auth/register`: register a new user
* `GET /api/chat/rooms`: get a list of all chat rooms
* `POST /api/chat/rooms`: create a new chat room
* `GET /api/chat/messages`: get a list of all messages in a chat room
* `POST /api/chat/messages`: send a new message in a chat room

## Contributing
To contribute to the application, follow these steps:

1. Fork the repository using `git fork https://github.com/kaihere14/ChatX.git`
2. Make changes to the code and test the application using `npm test`
3. Submit a pull request to the main repository

## Troubleshooting
To troubleshoot the application, follow these steps:

1. Check the console logs for errors
2. Check the MongoDB database for errors
3. Check the environment variables and dependencies for errors

## Roadmap
The application roadmap includes the following features:
* Support for multiple chat rooms
* Support for user avatars and profiles
* Support for file sharing and uploads
* Support for video and audio conferencing

## License & Credits
The application is licensed under the ISC license. The following dependencies are used:
* `@arcjet/inspect`: for inspecting and debugging the application
* `@arcjet/node`: for creating and managing Node.js processes
* `bcrypt`: for hashing and verifying user passwords
* `cloudinary`: for storing and serving user avatars
* `cookie-parser`: for parsing and setting cookies
* `cors`: for enabling cross-origin resource sharing
* `dotenv`: for loading environment variables from a `.env` file
* `express`: for creating and managing the Express application
* `jsonwebtoken`: for generating and verifying JSON Web Tokens
* `mongoose`: for interacting with the MongoDB database
* `nodemon`: for restarting the application when changes are made to the code
* `resend`: for sending and receiving messages
* `socket.io`: for enabling real-time messaging

The application is maintained by [kaihere14](https://github.com/kaihere14).