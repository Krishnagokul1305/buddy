# 📝 Notes Sharing Platform

A simple, modern note-sharing platform built with **Next.js App Router**, **Prisma**, **NeonDB**, **shadcn/ui**, and **React Markdown Lite**. Authenticated users can create, edit, and share notes with others — no real-time collaboration, just a clean and fast experience.

---

## 🚀 Features

- 🔐 User authentication with **NextAuth.js**
- 📝 Create, edit, and delete notes
- 📤 Share notes securely with other users
- ✍️ Write in **markdown** with preview support (\`react-markdown-lite\`)
- 💅 Clean and responsive UI built with **shadcn/ui** and **Tailwind CSS**
- ⚡ Serverless Postgres DB powered by **NeonDB**

---

## 🧰 Tech Stack

| Tech | Description |
|------|-------------|
| [Next.js](https://nextjs.org/) | Fullstack React framework (App Router) |
| [Prisma](https://www.prisma.io/) | Type-safe ORM for PostgreSQL |
| [Neon](https://neon.tech/) | Serverless PostgreSQL database |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible & composable UI components |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [React Markdown Lite](https://github.com/HarryChen0506/react-markdown-editor-lite) | Lightweight markdown editor |

---

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login, register layouts and pages
│   ├── (root)/            # Home, notes, profile, settings
│   ├── api/               # Route handlers (NextAuth, search)
│   └── _sections/         # Page sections and layouts
│
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── services/              # API call logic
│   ├── api.service.ts
│   ├── auth.service.ts
│   ├── notes.service.ts
│   └── user.service.ts
├── prisma/                # Prisma schema & client
│   └── schema.prisma
├── lib/                   # Utility functions
├── types/                 # Shared TypeScript types
├── styles/                # Global styles
└── public/                # Static assets (e.g. logo, icons)
\`\`\`

---

## ⚙️ Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Krishnagokul1305/buddy.git
cd notes-sharing-platform
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment Variables

Create a \`.env\` file in the root directory and add:

\`\`\`env
DATABASE_URL="postgresql://<your-user>:<your-password>@<your-neon-host>/<your-db>?sslmode=require"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. Setup Prisma

Generate the Prisma client and push the schema to NeonDB:

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

*(Optional - Add these in your Canva export or GitHub repo)*

- ✨ Home page UI
- 📝 Markdown Editor
- 🔐 Login/Register
- 📤 Share note modal

---

## 📌 Example .env

\`\`\`ini
DATABASE_URL="postgresql://your-user:your-password@your-db.neon.tech/your-db?sslmode=require"
NEXTAUTH_SECRET="a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

---

## ✅ TODOs

- [x] Basic note CRUD
- [x] Markdown support
- [x] Note sharing
- [x] Auth with NextAuth
- [ ] Tags & note search
- [ ] Dark mode support

---

## 👨‍💻 Author

Built with 💙 by **Gokul Krishnan**

---

## 📄 License

This project is licensed under the MIT License.
\`\`\`
