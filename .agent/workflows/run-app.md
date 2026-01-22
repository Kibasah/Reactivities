---
description: how to run the application
---

To run the complete Reactivities application (Backend and Frontend), follow these steps:

### 1. Run the Backend (API)
Navigate to the `API` directory and run the following command to start the server in watch mode.
```powershell
cd API
dotnet watch
```
> [!NOTE]
> The backend handles database migrations and seeding automatically on startup.

### 2. Run the Frontend (React)
Navigate to the `client-app` directory and run the following command to start the development server.
```powershell
cd client-app
npm start
```
> [!TIP]
> Make sure you have run `npm install` in the `client-app` directory if this is your first time running it.
