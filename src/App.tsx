import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "./features/userSlice"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./App.css"
import { AppLayout } from "./layouts/AppLayout"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { IsAuth } from "./components/IsAuth"
import { Account } from "./pages/Account/Account"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    if (token && userData) {
      const user = JSON.parse(userData)
      dispatch(login({ ...user, token }))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppLayout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/login"
                element={<IsAuth Child={Login} requireAuth={false} />}
              />
              <Route
                path="/account"
                element={<IsAuth Child={Account} requireAuth={true} />}
              />
            </Routes>
          </QueryClientProvider>
        </AppLayout>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
