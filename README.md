# Vedified - Blog Management Platform

A modern, full-stack blog management platform built with React and Node.js, featuring an admin dashboard, rich text editor, AI-powered content creation, and beautiful responsive design.

## 🌟 Live Demo

- **Frontend**: [https://vedified-blogs.vercel.app/](https://vedified.vercel)
- **Admin Panel**: Login with demo credentials below

## 🚀 Tech Stack

### Frontend (Client)
- **React 19** - Modern React with latest features and hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework with custom design system
- **React Router DOM 7** - Client-side routing with protected routes
- **TipTap** - Rich text editor with extensions (bold, italic, headings, lists, etc.)
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Beautiful toast notifications
- **Axios** - HTTP client with interceptors for API calls
- **JWT Decode** - Token parsing for authentication

### Backend (Server)
- **Node.js** - JavaScript runtime environment
- **Express.js 5** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling with schema validation
- **JWT** - JSON Web Token authentication and authorization
- **Multer** - File upload middleware for image handling
- **ImageKit** - Professional image hosting and optimization
- **Google Gemini AI** - AI-powered content generation
- **CORS** - Cross-origin resource sharing for API access
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
Vedified/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── vite.svg
│   │   └── favicon files
│   ├── src/
│   │   ├── assets/                  # Images, icons, and static files
│   │   │   ├── blog_pic_*.png       # Blog images
│   │   │   ├── dashboard_icon_*.svg # Dashboard icons
│   │   │   ├── logo.svg             # Application logo
│   │   │   └── ...                  # Other assets
│   │   ├── components/              # Reusable UI components
│   │   │   ├── admin/               # Admin-specific components
│   │   │   │   ├── AdminAccounts.jsx
│   │   │   │   ├── BlogList.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── BlogCard.jsx         # Blog post card component
│   │   │   ├── BlogList.jsx         # Blog listing component
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── Header.jsx           # Header component
│   │   │   ├── Navbar.jsx           # Navigation component
│   │   │   └── Newsletter.jsx       # Newsletter signup
│   │   ├── contexts/                # React context providers
│   │   │   └── AppContext.jsx       # Global application state
│   │   ├── pages/                   # Page components
│   │   │   ├── admin/               # Admin panel pages
│   │   │   │   ├── AddBlog.jsx      # Create new blog post
│   │   │   │   ├── BlogList.jsx     # Manage blog posts
│   │   │   │   ├── Comments.jsx     # Manage comments
│   │   │   │   ├── Dashboard.jsx    # Admin dashboard
│   │   │   │   └── Layout.jsx       # Admin layout wrapper
│   │   │   ├── Blog.jsx             # Individual blog post view
│   │   │   └── Home.jsx             # Homepage
│   │   ├── App.jsx                  # Main application component
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Application entry point
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite configuration
│
├── server/                          # Backend Node.js application
│   ├── configs/                     # Configuration files
│   │   ├── db.js                    # Database connection
│   │   ├── gemini.js                # Google Gemini AI config
│   │   └── imagekit.js              # ImageKit configuration
│   ├── controlers/                  # Route controllers (Note: typo in folder name)
│   │   ├── admincontrole.js         # Admin operations
│   │   └── blogControler.js         # Blog operations
│   ├── middleware/                   # Express middleware
│   │   ├── auth.js                  # Authentication middleware
│   │   └── multur.js                # File upload middleware
│   ├── models/                      # Database models
│   │   ├── blog.js                  # Blog post model
│   │   └── comments.js              # Comment model
│   ├── routes/                      # API routes
│   │   ├── adminRoutes.js           # Admin API endpoints
│   │   └── blogRouter.js            # Blog API endpoints
│   ├── uploads/                     # File upload directory
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Server entry point
│
└── README.md                        # This file
```

## 🛠️ Features

### 🌐 Public Features
- **Modern Landing Page** - Beautiful homepage with gradient backgrounds and animations
- **Blog Discovery** - Browse and search through all published blog posts
- **Rich Blog Reading** - Individual blog post view with newspaper-style layout
- **Interactive Elements** - Clickable images, hover effects, and smooth transitions
- **Newsletter Signup** - Email subscription with modern UI
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Comment System** - Users can comment on blog posts (with admin moderation)

### 🔐 Admin Features
- **Secure Authentication** - JWT-based login system with Google OAuth support
- **Analytics Dashboard** - Overview of blog statistics, comments, and drafts
- **Blog Management** - Create, edit, publish, and delete blog posts
- **Rich Text Editor** - TipTap-powered editor with AI assistance
- **Image Management** - ImageKit integration for optimized image hosting
- **Comment Moderation** - Approve, delete, and manage user comments
- **User Management** - Admin account administration and role management
- **AI Content Generation** - Google Gemini AI integration for content creation

### 🎨 Design Features
- **Modern UI/UX** - Clean, professional design with warm color palette
- **Smooth Animations** - Framer Motion for delightful user interactions
- **Glassmorphism Effects** - Modern design trends with backdrop blur
- **Gradient Elements** - Eye-catching gradients throughout the interface
- **Icon Integration** - Relevant icons for better visual communication

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** (recommended)
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)

### 🔧 Required Services

You'll need accounts for these services (all have free tiers):

1. **MongoDB Atlas** (Free) - [Sign up here](https://www.mongodb.com/atlas)
2. **ImageKit** (Free tier) - [Sign up here](https://imagekit.io/)
3. **Google Cloud Console** (Free) - [Sign up here](https://console.cloud.google.com/)
4. **Vercel** (Free) - [Sign up here](https://vercel.com/) (for deployment)

### 📥 Installation Guide

#### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/vedified.git

# Navigate to the project directory
cd vedified

# Verify you're in the correct directory
ls -la
# You should see: client/ server/ README.md
```

#### Step 2: Install Dependencies

**Install Backend Dependencies:**
```bash
# Navigate to server directory
cd server

# Install dependencies (this may take a few minutes)
npm install
# or if you prefer pnpm:
# pnpm install

# Verify installation
npm list --depth=0
```

**Install Frontend Dependencies:**
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install
# or if you prefer pnpm:
# pnpm install

# Verify installation
npm list --depth=0
```

#### Step 3: Environment Configuration

**Create Backend Environment File:**

```bash
# Navigate back to server directory
cd ../server

# Create .env file
touch .env
# On Windows: type nul > .env
```

**Add the following content to `server/.env`:**

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vedified?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Admin Configuration (choose one)
ADMIN_EMAIL=your-admin-email@domain.com
# OR for multiple admins:
# ADMIN_EMAILS=admin1@domain.com,admin2@domain.com,editor@domain.com

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

**Create Frontend Environment File:**

```bash
# Navigate to client directory
cd ../client

# Create .env file
touch .env
# On Windows: type nul > .env
```

**Add the following content to `client/.env`:**

```env
# API Configuration
VITE_API_URL=http://localhost:4000

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

#### Step 4: Service Setup

**1. MongoDB Atlas Setup:**
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free account
- Create a new cluster (choose the free tier)
- Create a database user
- Whitelist your IP address (or use 0.0.0.0/0 for development)
- Get your connection string and replace in `.env`

**2. ImageKit Setup:**
- Go to [ImageKit](https://imagekit.io/)
- Create a free account
- Get your Public Key, Private Key, and URL Endpoint
- Add them to your `.env` file

**3. Google Cloud Setup:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable Google+ API and Gemini API
- Create OAuth 2.0 credentials
- Get your Client ID and add to `.env`

**4. Gemini AI Setup:**
- In Google Cloud Console, enable the Gemini API
- Create an API key
- Add it to your `.env` file

#### Step 5: Start the Application

**Terminal 1 - Start Backend Server:**
```bash
# Navigate to server directory
cd server

# Start the development server
npm run dev
# or: pnpm dev

# You should see:
# Server is running on port 4000
# MongoDB connected successfully
```

**Terminal 2 - Start Frontend Server:**
```bash
# Navigate to client directory
cd client

# Start the development server
npm run dev
# or: pnpm dev

# You should see:
# Local:   http://localhost:5173/
# Network: http://192.168.x.x:5173/
```

#### Step 6: Verify Installation

1. **Open your browser** and go to `http://localhost:5173`
2. **You should see** the Vedified homepage
3. **Click "Login"** to access the admin panel
4. **Use demo credentials:**
   - Email: `manager@vedified.com`
   - Password: `manager123`

### 🎯 Quick Start Commands

```bash
# Clone and setup everything
git clone https://github.com/yourusername/vedified.git
cd vedified

# Install all dependencies
cd server && npm install && cd ../client && npm install

# Start both servers (in separate terminals)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

**Frontend Deployment:**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = your backend URL
   - `VITE_GOOGLE_CLIENT_ID` = your Google client ID
4. Deploy automatically on every push

**Backend Deployment:**
1. Deploy to Vercel, Railway, or Heroku
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `GOOGLE_CLIENT_ID`
   - `IMAGEKIT_PUBLIC_KEY`
   - `IMAGEKIT_PRIVATE_KEY`
   - `IMAGEKIT_URL_ENDPOINT`
   - `GEMINI_API_KEY`

### Environment Variables Summary

**Backend (.env):**
```env
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your-email@domain.com
GOOGLE_CLIENT_ID=your_google_client_id
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 📚 API Documentation

### Admin Routes (`/api/admin`)
- `POST /login` - Admin authentication with JWT
- `POST /signup` - Admin registration (if enabled)
- `GET /dashboard` - Dashboard statistics and data
- `GET /admin-accounts` - List admin accounts
- `DELETE /admin-account` - Delete admin account

### Blog Routes (`/api/blog`)
- `GET /` - Get all published blog posts (sorted by newest)
- `GET /:id` - Get specific blog post with comments
- `POST /` - Create new blog post (admin only)
- `PUT /:id` - Update blog post (admin only)
- `DELETE /:id` - Delete blog post (admin only)
- `POST /:id/togglePublish` - Toggle publish status
- `POST /addComment` - Add comment to blog post
- `GET /:id/comments` - Get comments for blog post
- `DELETE /comment/:id` - Delete comment (blog author only)

### Authentication
- JWT tokens are required for admin routes
- Tokens are automatically refreshed
- Google OAuth integration available

## 🔧 Development

### Available Scripts

**Backend (`server/`):**
```bash
npm start          # Start production server
npm run dev         # Start development server with nodemon
npm test           # Run tests (if available)
```

**Frontend (`client/`):**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Development Workflow

1. **Make changes** to the code
2. **Test locally** with `npm run dev`
3. **Commit changes** with descriptive messages
4. **Push to GitHub** for automatic deployment

### Code Structure

- **Components** (`src/components/`) - Reusable UI components
- **Pages** (`src/pages/`) - Full route components
- **Contexts** (`src/contexts/`) - Global state management
- **Models** (`server/models/`) - Database schemas
- **Controllers** (`server/controlers/`) - Business logic
- **Middleware** (`server/middleware/`) - Request processing
- **Routes** (`server/routes/`) - API endpoints

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use:**
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
# or on Windows:
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**2. MongoDB Connection Issues:**
- Check your connection string
- Ensure IP is whitelisted in MongoDB Atlas
- Verify database user credentials

**3. ImageKit Upload Issues:**
- Verify ImageKit credentials
- Check file size limits
- Ensure proper CORS settings

**4. Google OAuth Issues:**
- Verify client ID in both frontend and backend
- Check authorized redirect URIs
- Ensure APIs are enabled in Google Cloud Console

**5. Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. **Check the logs** in your terminal
2. **Verify environment variables** are set correctly
3. **Test API endpoints** with Postman or curl
4. **Check browser console** for frontend errors
5. **Open an issue** on GitHub with error details

## 🎯 Demo Credentials

For testing the application, use these demo accounts:

- **Blog Manager**: `manager@vedified.com` / `manager123`
- **Test Account**: `test@vedified.com` / `test123`
- **Demo User**: `demo@vedified.com` / `demo123`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Ensure all tests pass

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Community

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Email**: Contact the development team
- **Documentation**: Check this README and code comments

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Vite** for the lightning-fast build tool
- **MongoDB** for the flexible database
- **ImageKit** for image optimization
- **Google** for AI and OAuth services

---

**Built with ❤️ by the Vedified Team**

*Last updated: January 2025*
