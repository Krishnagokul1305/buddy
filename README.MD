# 📝 Notes App

A modern, full-featured notes sharing application built with Next.js 15, allowing users to create, edit, share, and collaborate on markdown notes with a beautiful, responsive interface.

## ✨ Features

- **📝 Rich Markdown Editor**: Create and edit notes with full markdown support
- **🔗 Note Sharing**: Share notes with other users via unique shareable links
- **👥 Collaboration**: Share notes with specific users and manage permissions
- **🔍 Search & Discovery**: Find notes quickly with powerful search functionality
- **👤 User Profiles**: Personalized user profiles and settings
- **🎨 Beautiful UI**: Modern, responsive design with dark/light mode support
- **🔐 Secure Authentication**: Robust user authentication and authorization
- **📱 Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Forms**: React Hook Form with validation
- **Database**: NeonDB (PostgreSQL), Prisma ORM
- **Authentication**: NextAuth.js
- **Markdown**: ReactMarkdown with remark-gfm
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- A NeonDB account (or any PostgreSQL database)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (root)/                   # Main application routes
│   ├── home/                     # Home page
│   ├── notes/                    # Notes management
│   │   ├── (index)/             # Notes listing
│   │   ├── [slug]/              # Individual note pages
│   │   ├── create/              # Create new note
│   │   └── edit/                # Edit existing note
│   ├── shared-notes/            # shared notes listing page
│   ├── profile/                  # User profile pages
│   │   ├── settings/             # User setting
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui components
│   ├── sections/                # Page sections
│   │   ├── DemoSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── HeroSection.tsx
│   ├── BackButton.tsx
│   ├── MarkDownPreviewer.tsx
│   ├── ReusableModal.tsx
│   ├── SharedWithList.tsx
│   └── UserSearchForm.tsx
├── lib/                         # Utility functions and configurations
│   ├── auth.ts                  # Authentication configuration
│   ├── db.ts                    # Database connection
│   └── utils.ts                 # Utility functions
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── services/                    # API service functions
│   └── notes.service.ts
├── types/                       # TypeScript type definitions
│   └── note.ts
└── public/                      # Static assets
```

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: User accounts and profiles
- **Note**: Individual notes with content and metadata
- **Share**: Note sharing relationships between users

## 🔧 Configuration

### Database Setup (NeonDB)

1. Create a new project at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Add it to your `.env.local` file as `DATABASE_URL`

### Authentication Setup

The app supports multiple authentication providers:

- **Email/Password**: Built-in authentication
- **Google OAuth**: Configure in Google Cloud Console
- **GitHub OAuth**: Configure in GitHub Developer Settings

## 📝 Usage

### Creating Notes

1. Sign in to your account
2. Click "Create Note" or navigate to `/notes/create`
3. Write your note using Markdown syntax
4. Save and optionally share with others

### Sharing Notes

1. Open any note you own
2. Click the share button (Share2 icon)
3. Search for users by username or email
4. Grant access to specific users

### Managing Notes

- **Edit**: Click edit button on any note you own
- **Delete**: Remove notes from your profile/settings
- **View Shared**: See all notes shared with you

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production

Make sure to set these in your production environment:

```env
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://prisma.io/) - Next-generation ORM
- [NeonDB](https://neon.tech/) - Serverless PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/notes-app/issues) page
2. Create a new issue if your problem isn't already reported
3. Reach out to the maintainers

---

**Happy note-taking! 📝✨**

```

This comprehensive README includes all the essential information for your notes app, including installation instructions, project structure, deployment guidelines, and more. You can customize the repository URLs, add specific features, or modify sections based on your exact implementation details.

```
