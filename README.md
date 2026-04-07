# 💬 Koola Chat

Koola Chat is a modern web-based messaging application inspired by WhatsApp Web. It allows users to communicate in real time with a clean and simple interface using light blue and white theme.

---

## 🚀 Features

* 🔐 User Authentication (Email & Password)
* 💬 Real-time messaging
* 📱 Responsive UI (Mobile & Desktop)
* 🎨 WhatsApp-like interface
* ⚡ Fast performance with modern tools

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Backend:** Firebase (Authentication & Firestore)
* **Hosting:** Netlify

---

## 📸 UI Overview

* Sidebar (users & navigation)
* Chat area (messages display)
* Message input box
* Clean WhatsApp-inspired layout

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/realmadede/koola-chat-web.git
cd koola-chat-web
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Firebase

Create a project in Firebase and enable:

* Authentication (Email/Password)
* Firestore Database

Then update your firebase config:

```ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
```

---

### 4. Run the app

```bash
npm run dev
```

---

## 🌍 Deployment

This app is deployed using Netlify.

To deploy:

* Connect GitHub repository to Netlify
* Set build command: `npm run build`
* Set publish directory: `dist`

---

## 📌 Notes

* Ensure Firebase config is correctly added
* Add `_redirects` file in `public/` for routing:

```text
/* /index.html 200
```

---

## 🎯 Project Purpose

This project was developed as part of a team assignment to build a WhatsApp-like web application using React, Tailwind CSS, Firebase, and Netlify.

---

## 👨‍💻 Author

* MADEDE

---

## 📄 License

This project is for educational purposes.


TODO: Document your project here
