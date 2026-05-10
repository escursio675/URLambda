import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import AppRoutes from '../routes/appRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContextProvider } from '../store/auth/authContextProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
