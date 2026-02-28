# 🎓 College Placement Tracker System

A modern, production-grade placement management platform built with the **MERN + SQL** stack. Connects students, recruiters, and administrators through a clean, analytics-driven interface.

---

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 · Redux Toolkit · React Router v7 · Vite · Chart.js |
| **Backend** | Node.js · Express *(coming soon)* |
| **Database** | SQL *(coming soon)* |

### Roles

- **Admin** — Full system management, analytics, student/recruiter oversight
- **Student** — Browse jobs, track applications, manage resume & profile
- **Recruiter** — Post jobs, review applicants, track hiring metrics

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Frontend Setup

```bash
cd frontend
npm install
npm run dev          # Starts dev server → http://localhost:5173
```

### Build for Production

```bash
cd frontend
npm run build        # Outputs to frontend/dist/
npm run preview      # Preview production build
```

---

## 📁 Project Structure

```
College-Placement-Tracker-System/
├── .gitignore
├── README.md
│
└── frontend/                     # React Frontend Application
    ├── .env.example              # Environment variable template
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── app/                  # Config, constants, Redux store
        ├── assets/               # Static assets
        ├── components/           # Reusable UI + layout components
        ├── features/             # Redux slices + API services
        ├── hooks/                # Custom React hooks
        ├── layouts/              # Page layouts (Auth, Dashboard)
        ├── pages/                # Route-level page components
        ├── routes/               # Router config + route guards
        ├── services/             # Axios API instance
        ├── styles/               # Design tokens + global CSS
        └── utils/                # Helper functions + validators
```

---

## 🎨 Design System

Inspired by [Edway Template](https://edway-template.webflow.io/) — featuring:

- **Inter** font family with modular type scale
- Professional navy blue palette (`#133E6D`)
- Pill-shaped buttons with soft shadows
- Generous white spacing and clean academic aesthetic
- CSS custom properties for full theming control

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the `frontend/` directory:

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_ENV` | Environment | `development` |
| `VITE_APP_NAME` | App display name | `College Placement Tracker` |
| `VITE_DEBUG` | Enable debug logging | `true` |
| `VITE_AUTH_TOKEN_KEY` | localStorage JWT key | `cpts_auth_token` |
| `VITE_MAX_UPLOAD_SIZE` | Max upload size (bytes) | `5242880` |

---

## 📜 License

This project is for educational and institutional use.
