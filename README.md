# 📱 Framez

Framez is a mobile social app built with **React Native (Expo)** that allows users to share their moments through text and images.  
It features secure authentication, real-time post updates, and personalized user profiles — all wrapped in a clean, modern UI inspired by Instagram.

---

## 🚀 Overview

This project was developed as part of **Frontend Stage 4 Task**.  
The goal is to build a fully functional, visually clean, and auth-integrated mobile app that demonstrates real-time data management, authentication, and smooth UI structure.

---

## 🧩 Core Features

### 🔐 Authentication

- User **sign-up**, **login**, and **logout** flow.
- **Secure sessions** — users stay logged in after reopening the app.
- Backed by [your chosen backend — e.g., Firebase / Supabase / Convex / Clerk].

### 📝 Posts

- Users can **create posts** with text and/or images.
- **Feed view** displays all posts (chronologically or newest first).
- Each post shows:
  - Author’s name
  - Timestamp
  - Post text or image

### 👤 Profile

- Displays the logged-in user’s info (name, email, and avatar if available).
- Shows **only the posts** created by the current user.

---

## 🧠 Technical Stack

| Category         | Technology                                                  |
| ---------------- | ----------------------------------------------------------- |
| Framework        | React Native (Expo)                                         |
| Backend          | Firebase & Convex                                           |
| Database         | Real-time or document storage from chosen backend           |
| State Management | Context API / Zustand / Redux (optional)                    |
| Design           | Inspired by Instagram                                       |
| Deployment       | Expo Go, hosted demo via [Appetize.io](https://appetize.io) |

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally:

```bash
# 1. Clone the repository
git clone https://github.com/omarologyy/HNG-Stage-4.git

# 2. Navigate into the project folder
cd framez

# 3. Install dependencies
npm install
# or
yarn install

# 4. Set up your environment variables
# Create a .env file and include your backend keys (Firebase)
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# 5. Start the development server
npx expo start
```
