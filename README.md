# Vedified - Blog Management Platform

A full-stack blog management platform built with React and Node.js, featuring an admin dashboard, rich text editor, and modern UI design.

## 🚀 Tech Stack

### Frontend (Client)
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **TipTap** - Rich text editor with extensions
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client for API calls
- **Moment.js** - Date manipulation

### Backend (Server)
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload middleware
- **ImageKit** - Image hosting and optimization
- **Google Gemini AI** - AI integration
- **CORS** - Cross-origin resource sharing
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

### Public Features
- **Homepage** - Landing page with featured content
- **Blog Listing** - Browse all published blog posts
- **Blog Reading** - Individual blog post view with rich content
- **Newsletter Signup** - Email subscription functionality
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Admin Features
- **Authentication** - Secure login/signup system
- **Dashboard** - Overview of blog statistics
- **Blog Management** - Create, edit, and delete blog posts
- **Rich Text Editor** - TipTap-powered content editor
- **Image Upload** - ImageKit integration for media management
- **Comment Management** - Moderate and manage user comments
- **User Management** - Admin account administration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- ImageKit account (for image hosting)
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vedified
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   # Admin allowlist (one of the following)
   # ADMIN_EMAIL=admin@yourdomain.com
   # ADMIN_EMAILS=admin@yourdomain.com,editor@yourdomain.com
   # Optional display names
   # ADMIN_NAME=Admin Name
   # ADMIN_NAMES=Admin,Editor
   
   # Google Sign-In
   GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will start on `http://localhost:4000`

6. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   Client will start on `http://localhost:5173`

## 📚 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /login` - Admin authentication
- `POST /signup` - Admin registration
- `GET /dashboard` - Dashboard data
- `GET /accounts` - User management

### Blog Routes (`/api/blog`)
- `GET /` - Get all blog posts
- `GET /:id` - Get specific blog post
- `POST /` - Create new blog post
- `PUT /:id` - Update blog post
- `DELETE /:id` - Delete blog post
- `POST /:id/comments` - Add comment
- `GET /:id/comments` - Get comments

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Google Authentication

- The admin login page supports Google Sign-In. Only emails listed in `ADMIN_EMAIL` or `ADMIN_EMAILS` are allowed.
- Client requires `VITE_GOOGLE_CLIENT_ID` (set in Vercel or local `.env` at repo root).
- Server verifies Google ID tokens and issues a JWT used for admin APIs.

### Code Structure
- **Components** are organized by feature and reusability
- **Pages** represent full route components
- **Contexts** manage global state
- **Models** define database schemas
- **Controllers** handle business logic
- **Middleware** processes requests before reaching routes

## 🌟 Key Features

- **Modern React 19** with latest features
- **Rich Text Editor** with TipTap extensions
- **AI Integration** via Google Gemini
- **Image Management** with ImageKit
- **JWT Authentication** for secure admin access
- **Responsive Design** with Tailwind CSS
- **Real-time Updates** with React context
- **File Upload** support for media content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note:** The project uses modern JavaScript with ES modules. Ensure your Node.js version supports ES modules (v14+ recommended).
