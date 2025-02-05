import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import App from './App.jsx'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@/context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    <Toaster />
  </StrictMode>,
)
