# 🤖 Support AI — AI-Powered Customer Support Chatbot Platform

A full-stack SaaS platform that lets businesses add an AI-powered customer support chatbot to their website with a single script tag. Built with Next.js, Google Gemini AI, ScaleKit authentication, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blue?style=for-the-badge&logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- 🔐 **Enterprise Authentication** — ScaleKit powered SSO login
- 🤖 **AI-Powered Responses** — Google Gemini AI answers customer queries using your business knowledge
- 🎤 **Voice Chat** — Speak to the chatbot and get voice responses (Speech to Text + Text to Speech)
- ⚡ **Live Chat Feel** — Typing indicators, typewriter effect, instant responses
- 📋 **Knowledge Base** — Add your FAQs, policies, delivery info, refund rules
- 🔌 **Easy Embed** — One script tag to add chatbot to any website
- 📊 **Admin Dashboard** — Manage your chatbot settings and knowledge base
- 🌙 **Beautiful UI** — Clean, modern design with smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **MongoDB Atlas** | Database |
| **Google Gemini AI** | AI chat responses |
| **ScaleKit** | Enterprise authentication |
| **Framer Motion** | Animations |
| **Vercel** | Deployment |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Atlas](https://cloud.mongodb.com/) account
- [Google Gemini API Key](https://aistudio.google.com/apikey)
- [ScaleKit](https://app.scalekit.com/) account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/saksham9336/support-ai.git
cd support-ai
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env.local` file in root directory:**
```env
SCALEKIT_ENVIRONMENT_URL=your_scalekit_environment_url
SCALEKIT_CLIENT_ID=your_scalekit_client_id
SCALEKIT_CLIENT_SECRET=your_scalekit_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

**4. Add callback URL in ScaleKit dashboard:**
```
http://localhost:3000/api/auth/callback
```

### Running Locally

```bash
# Development (first time setup)
npm run build
npm run start

# Access at
http://localhost:3000
```

---

## 📁 Project Structure

```
support-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── callback/   # ScaleKit OAuth callback
│   │   │   │   ├── login/      # Login redirect
│   │   │   │   └── logout/     # Logout handler
│   │   │   ├── chat/           # AI chat endpoint (Gemini)
│   │   │   ├── settings/       # Save chatbot settings
│   │   │   └── settings/get/   # Get chatbot settings
│   │   ├── dashboard/          # Admin dashboard page
│   │   ├── embed/              # Embed code page
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── HomeClient.tsx      # Homepage UI
│   │   ├── DashboardClient.tsx # Dashboard UI
│   │   └── EmbedClient.tsx     # Embed page UI
│   └── lib/
│       ├── scalekit.ts         # ScaleKit client
│       ├── getSession.ts       # Session helper
│       └── mongodb.ts          # MongoDB connection
└── public/
    └── chatBot.js              # Embeddable chatbot widget
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `SCALEKIT_ENVIRONMENT_URL` | ScaleKit environment URL | ✅ |
| `SCALEKIT_CLIENT_ID` | ScaleKit client ID | ✅ |
| `SCALEKIT_CLIENT_SECRET` | ScaleKit client secret | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your app URL | ✅ |
| `MONGODB_URL` | MongoDB connection string | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |

---

## 🎯 How It Works

1. **Business signs up** → Logs in via ScaleKit SSO
2. **Sets up chatbot** → Adds business name, email, knowledge base (FAQs, policies)
3. **Gets embed code** → One script tag with unique owner ID
4. **Adds to website** → Paste before `</body>` tag
5. **Customers chat** → AI answers using business knowledge base
6. **Voice support** → Click 🎤 to speak, AI responds with voice too

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import repo on [Vercel](https://vercel.com)
3. Add all environment variables
4. Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
5. Update ScaleKit callback URL with: `https://your-app.vercel.app/api/auth/callback`
6. Deploy!

---

## 👨‍💻 Developer

**Saksham Singh**
- GitHub: [@saksham9336](https://github.com/saksham9336)
- LinkedIn: [saksham-singh93](https://linkedin.com/in/saksham-singh93)
- Email: work.saksham93@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).