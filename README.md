# Findly - Lost & Found Travel App

A stylish Lost and Found web app for travelers, inspired by iOS 26's Liquid Glass design. Built with React (Vite + Tailwind CSS), Node.js/Express, and MongoDB.

## Features
- Report lost items with images.
- View/paginate/delete items.
- iOS 26-inspired UI: Translucent glassmorphism, fluid animations, adaptive light/dark mode.
- Responsive design with smooth transitions.

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (install as service + Compass)
- Git

### Installation
1. Clone or set up in `E:/nir2/findly`:
   ```bash
   mkdir E:/nir2/findly
   cd E:/nir2/findly
   npm create vite@latest . -- --template react
   npm install react-router-dom framer-motion react-paginate axios clsx tailwindcss postcss autoprefixer @tailwindcss/forms
   npx tailwindcss init -p
   mkdir backend
   cd backend
   npm init -y
   npm install express mongoose cors body-parser
   cd ..