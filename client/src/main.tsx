import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>
)
