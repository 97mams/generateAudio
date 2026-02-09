# GenerateAudio 🎧🧠

**GenerateAudio** is a full-stack application that converts text into downloadable audio files.  
It is built with **AdonisJS** for the backend and **React** for the frontend.

This project demonstrates how to create a simple Text-To-Speech (TTS) workflow using a modern JavaScript stack.

---

## 🚀 Features

- 🎙️ Convert text into audio
- 📥 Download generated audio files
- ⚛️ Frontend built with React
- 🛠️ Backend API built with AdonisJS
- 🔌 Easily extensible with external Text-To-Speech services (Google, Azure, ElevenLabs, etc.)

---

## 📦 Installation

This project uses a **monorepo structure** with separate `backend` and `frontend` folders.

### Clone the repository

```bash
git clone https://github.com/97mams/generateAudio.git
cd generateAudio
```
### Install dependances

```bash
pnpm install
```

### Create your environment file

```bash
cp .env.example .env
```

### Start the server

```bash
pnpm -r dev
```

## 🛠️ Tech Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Backend         | AdonisJS (Node.js)      |
| Frontend        | React.js                |
| Language        | TypeScript / JavaScript |
| Package Manager | npm / pnpm              |

