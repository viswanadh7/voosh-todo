import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Tasks from './components/Tasks'
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import TaskDetails from "./components/TaskDetails";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="965950225748-ndrscnb1ugk5ehp1fjtovrdg46i03vdj.apps.googleusercontent.com">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/:id" element={<TaskDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

export default App
