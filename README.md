# Mindy - AI Chat Bot (MERN Stack with Google Gemini)

## Overview

**Mindy** is an AI-powered chatbot built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Google Gemini API** integration. The chatbot supports **authentication via JWT tokens**, **chat history storage in MongoDB**, and **dynamic UI rendering with Material-UI**.

## Features

- **User Authentication**
  - Sign up and log in using email and password
  - Authentication via **JWT tokens**
  - Tokens are stored as cookies and remain valid for **7 days**
  - After expiration, the user must log in again
- **Chat Functionality**
  - Load previous chat history from **MongoDB Cloud**
  - Chats are stored in the `chats` array of MongoDB
  - Automatic chat reload on redirection to the chat page
  - Ability to **clear conversations**
- **AI-Powered Responses**
  - Integrated with **Google Gemini API** for AI responses
  - User messages are **sent to Gemini**, and responses are returned
  - Application **detects code snippets** and formats them properly
  - Regular text messages are displayed as chat messages
- **Modern UI/UX**
  - Designed using **Material-UI (MUI)** for a clean and responsive experience

## Tech Stack

### **Frontend:**

- React.js
- Material-UI (MUI)
- HTML, CSS
- JWT authentication (stored in cookies)

### **Backend:**

- TypeScript
- Node.js
- Express.js
- MongoDB (Cloud Database)
- Google Gemini API (AI Integration)
- JWT authentication

## Installation

### **Prerequisites:**

Ensure you have **Node.js** and **MongoDB** installed on your machine.

### **Clone the Repository**

```sh
git clone https://github.com/yourusername/mindy-ai-chatbot.git
cd mindy-ai-chatbot
```

### **Backend Setup**

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup**

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

## Usage

1. Open **[http://localhost:3000/](http://localhost:3000/)** in your browser.
2. Sign up or log in.
3. Once authenticated, you can start chatting with Mindy.
4. Previous chats will automatically load from MongoDB.
5. Clear conversations if needed.

## API Endpoints

### **Authentication**

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in and receive a JWT token
- `GET /api/auth/logout` - Log out the user

### **Chat**

- `GET /api/chat/history` - Fetch previous chat history
- `POST /api/chat/send` - Send a message to Gemini API and get a response
- `DELETE /api/chat/clear` - Clear conversation history

## Deployment

- Use **Vercel/Netlify** for frontend deployment
- Use **Render/Heroku** for backend deployment
- Store `.env` variables securely in the hosting platform

## Contributing

Feel free to fork the repository, submit issues, or contribute with pull requests!

## License

MIT License

## Author

Harsh Tiwari

