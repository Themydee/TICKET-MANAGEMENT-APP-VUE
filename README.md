# TicketFlow - Vue.js Version

A modern, full-featured ticket management web application built with Vue.js 3.

## 🚀 Features

- **Landing Page**: Eye-catching hero section with wavy background and decorative elements
- **Authentication**: Secure login and signup with form validation
- **Dashboard**: Overview of ticket statistics with visual cards
- **Ticket Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Status Management**: Track tickets with color-coded statuses (Open, In Progress, Closed)
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Protected Routes**: Secure pages that require authentication
- **Toast Notifications**: Real-time feedback for user actions
- **Persistent Storage**: Data stored in browser localStorage

## 🛠️ Technologies Used

- **Vue 3**: Composition API with script setup
- **Vite**: Fast build tool and dev server
- **Lucide Vue Next**: Beautiful icon library
- **CSS3**: Custom styling with gradients, animations, and responsive design
- **LocalStorage**: Client-side data persistence

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ticket-app-vue
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5174
```

## 📁 Project Structure

```
ticket-app-vue/
├── src/
│   ├── assets/
│   │   └── styles.css             # Global styles
│   ├── components/
│   │   ├── AppHeader.vue          # Header component
│   │   ├── AppFooter.vue          # Footer component
│   │   ├── Toast.vue              # Toast notifications
│   │   ├── ConfirmModal.vue       # Confirmation dialogs
│   │   ├── TicketCard.vue         # Individual ticket display
│   │   └── TicketForm.vue         # Create/edit ticket form
│   ├── views/
│   │   ├── Landing.vue            # Landing page
│   │   ├── Auth.vue               # Login/Signup page
│   │   ├── Dashboard.vue          # Dashboard overview
│   │   └── TicketManagement.vue   # Ticket CRUD page
│   ├── stores/
│   │   └── auth.js                # Auth store (composable)
│   ├── utils/
│   │   ├── storage.js             # LocalStorage operations
│   │   └── validation.js          # Form validation functions
│   ├── App.vue                    # Main app component
│   └── main.js                    # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Features

### Max-Width Container
All content is centered with a maximum width of 1440px on large screens for optimal readability.

### Wavy Hero Background
The landing page features an SVG wave at the bottom of the hero section, creating a modern, fluid design.

### Decorative Circles
Three decorative circular elements are positioned throughout the app for visual interest:
- Large purple gradient circle in hero section
- Pink gradient circle in features section
- Blue gradient circle accent

### Status Color Coding
- **Open** → Green (#10b981)
- **In Progress** → Amber (#f59e0b)
- **Closed** → Gray (#6b7280)

## 🔐 Authentication

The app uses a simulated authentication system with localStorage:

- **Session Token**: Stored as `ticketapp_session`
- **User Data**: Stored as `ticketapp_user`
- **Users Database**: Stored as `ticketapp_users`

### Test Credentials
Create your own account using the signup form. All data is stored locally in your browser.

## ✅ Validation Rules

### Ticket Validation
- **Title**: Required, 3-100 characters
- **Description**: Optional, max 500 characters
- **Status**: Required, must be: `open`, `in_progress`, or `closed`
- **Priority**: Optional, must be: `low`, `medium`, or `high`

### Auth Validation
- **Email**: Required, valid email format
- **Username**: Required, min 3 characters (signup only)
- **Password**: Required, min 6 characters
- **Confirm Password**: Must match password (signup only)

## 🎯 Usage Guide

### Creating a Ticket
1. Navigate to "Manage Tickets" from the dashboard
2. Click "New Ticket" button
3. Fill in the form with ticket details
4. Click "Create Ticket"

### Editing a Ticket
1. Find the ticket in the ticket list
2. Click the edit icon (pencil)
3. Modify the details in the form
4. Click "Update Ticket"

### Deleting a Ticket
1. Find the ticket in the ticket list
2. Click the delete icon (trash)
3. Confirm deletion in the modal

## 🌐 Responsive Breakpoints

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (two column grid)
- **Desktop**: > 1024px (multi-column grid, max-width 1440px)

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Color contrast meets WCAG standards

## 🐛 Known Issues

- Data is stored in localStorage, so clearing browser data will delete all tickets
- No backend integration (simulated with localStorage)
- Session expires when localStorage is cleared

## 🔄 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 📝 Vue 3 Key Features Used

- **Composition API**: Modern reactive state management
- **Script Setup**: Simplified component syntax
- **Reactive References**: `ref()` and `computed()`
- **Lifecycle Hooks**: `onMounted()`, `watch()`
- **Component Events**: `defineEmits()` and `defineProps()`
- **Dynamic Components**: Route-based component rendering


## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is part of a frontend development task.

---

**Built with ❤️ using Vue 3**