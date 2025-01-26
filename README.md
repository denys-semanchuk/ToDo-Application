# Todo App

## Overview

Modern task management application built with React and TypeScript.

## Features

- ✨ Add, edit, and delete tasks
- 🔍 Filter tasks by status
- 💾 Local storage persistence
- 📱 Responsive design
- 🎯 Error handling
- 🎭 Smooth animations

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/todo-app.git

# Install dependencies
npm install

# Start development server
npm start
##Project Structure
src/
├── components/
│   ├── TaskList/
│   ├── TaskForm/
│   ├── FilterButtons/
│   └── Notification/
├── store/
│   └── store.ts
├── slices/
│   └── taskSlice.ts
├── types/
│   └── index.ts
└── styles/
    └── index.css
