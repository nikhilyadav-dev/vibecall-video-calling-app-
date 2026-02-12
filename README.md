## 🎥 Vibe Call - Real-Time Video Calling App
*🚀 Full-Stack WebRTC Communication Platform (MERN + Socket.io)*

A production-ready real-time video calling application built using modern web technologies.
This project demonstrates **advanced knowledge of WebRTC, real-time communication, authentication, and scalable backend architecture.**

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge&logo=json-web-tokens" />
</p>

---

## 🧠 Key Engineering 

- Built a peer-to-peer video communication system
- Implemented real-time signaling using Socket.io
- Designed a secure JWT authentication system
- Managed online presence & call notifications
- Structured backend for scalability and clean architecture
- Implemented production-level separation of concerns

--- 

## 🚀 Core Features

| Features                          |
|-------------------------------------|
| 🎥 Real-Time Peer-to-Peer Video Calls (WebRTC) |
| 🟢 Live User Online Status |
| 📞 Incoming Call Notifications (WhatsApp-style UX) |
| 🔇 Audio / Video Mute Controls |
| ❌ Call End & Cleanup Handling |
| 🔐 Secure JWT-Based Authentication|
| 📱 Fully Responsive UI (Tailwind CSS) |

---

## 🏗️ Architecture Design

This application follows a real-time client-server architecture where:
- React handles the UI
- WebRTC handles peer-to-peer media streaming
- Socket.io handles signaling
- Node.js + Express manage backend logic
- MongoDB stores user data & call logs
- JWT secures authentication

***🧠 Architecture Diagram:***
 ```

                ┌────────────────────────┐
                │        Client A        │
                │  React + WebRTC        │
                └───────────┬────────────┘
                            │
                            │  (Signaling via Socket.io)
                            ▼
                ┌────────────────────────┐
                │  Node.js + Express     │
                │  Socket.io Server      │
                └───────────┬────────────┘
                            │
                            │
                ┌───────────▼────────────┐
                │        MongoDB         │
                │  Users + Call Logs     │
                └────────────────────────┘
                            ▲
                            │
                ┌───────────┴────────────┐
                │        Client B        │
                │  React + WebRTC        │
                └────────────────────────┘

 ```


***🎥 WebRTC Flow (Peer-to-Peer):***

 ```
Caller creates Offer
        ↓
Send via Socket.io
        ↓
Receiver creates Answer
        ↓
Exchange ICE Candidates
        ↓
Direct P2P Media Stream

 ```
---

## 🎯 Future Improvements

📲 Group Video Calls

💬 Real-Time Chat During Calls

📊 Call History Dashboard

🔔 Push Notifications

🌍 Deployment on Cloud (Render / AWS / Vercel)

---
## 👨‍💻 Author

**Nikhil Yadav**<br/>
*Full-Stack Developer | MERN Stack Enthusiast*<br/><br/>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikhilyadav-developer)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nikhilyadav-dev)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nikhilyadav.prof@gmail.com)



