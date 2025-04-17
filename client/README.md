# React Frontend – BioLink
This repository contains the **frontend** code for a React-based web application.

## Overview

- This is the client-side code for the application.
- Built using [React](https://reactjs.org/).
- Designed to be served by a separate backend server after build.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed.

### 1. Install Dependencies

Navigate into the project folder and run:



### 2. Run Locally (Development Mode)

Start the local development server:

```bash
npm start
```


This will launch the app in your browser at http://localhost:3000.

The app will automatically reload if you make changes to the source code.

## Build and Deploy
Once you’ve made and tested your frontend changes, follow these steps to deploy:

### 1. Create Production Build

```bash
npm run build
```

This will generate an optimized production version of the app in the /build folder.

### 2. Move Build Folder to Backend
To deploy the frontend with the backend:

Copy the generated /build folder

Paste it inside your backend project directory

Example structure:

```bash
/backend
  └── /build         ← Place the build folder here
/frontend
  ├── /public
  ├── /src
  └── package.json
```
