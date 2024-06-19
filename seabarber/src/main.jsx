import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Reservation from './components/Reservation.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import BranchDashboard from './components/BranchDashboard.jsx'
import CreateBranch from './components/CreateBranch.jsx'
import EditBranch from './components/EditBranch.jsx'
import BranchInfo from './components/BranchInfo.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/reserve",
    element: <Reservation />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/branchDashboard",
    element: <BranchDashboard />
  },
  {
    path: "/createBranch",
    element: <CreateBranch />
  },
  {
    path: "/editBranch",
    element: <EditBranch />
  },
  {
    path: "/branch",
    element: <BranchInfo />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
