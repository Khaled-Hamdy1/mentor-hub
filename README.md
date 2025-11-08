# 🧠 Mentor Hub

**Mentor Hub** is a modern web platform that connects mentors with learners who want to develop their skills through guided mentoring sessions or community-based study channels.

---

## 🧭 Introduction

Mentor Hub allows users to easily find mentors based on their **skills**, **rate**, and **availability**.  
Users can discuss details, set session prices and schedules, and even join **free chat channels** to learn collaboratively.

The goal is to make mentoring simple, accessible, and fair for everyone — with a smooth, modern user experience.

---

## ⚙️ Features

- 🔐 **Authentication with Better Auth** (Email & OAuth)
- 👤 **Profile creation and customization**
- 🔎 **Search** for mentors by skill and rate
- 📅 **Book and manage mentoring sessions**
- 📝 **Review system** for feedback and ratings
- 💬 **Free study channels** for open learning *(coming soon)*
- 🧭 **Dashboard** for both mentors and learners *(coming soon)*
- 📧 **Email and notification system** *(coming soon)*

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js (React 19), Tailwind CSS, TypeScript |
| **Backend** | Node.js, Prisma, PostgreSQL |
| **Authentication** | Better Auth |
| **Package Manager** | Bun |
| **Deployment** | Vercel *(in progress)* |

---

## 🗄️ Database Schema

The project uses **Prisma ORM** with a relational schema structured as follows:

- **User** → stores main user data and profile info  
- **Accounts** & **Sessions** → handled internally by Better Auth  
- **MentoringSession** → manages sessions between mentors and learners  
- **Review** → stores session feedback and ratings  
- **SocialLinks** → holds users’ social media accounts

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Khaled-Hamdy1/mentor-hub.git
cd mentor-hub
