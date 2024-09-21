import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from "./states/AuthContext"
import './assets/index.css'
import router from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NextUIProvider>
  </StrictMode>,
)
