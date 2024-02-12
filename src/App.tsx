import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./App.css"
import { AppLayout } from "./layouts/AppLayout"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { IsAuth } from "./components/IsAuth"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
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
                element={<IsAuth Child={Login} requireAuth={true} />}
              />
            </Routes>
          </QueryClientProvider>
        </AppLayout>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
