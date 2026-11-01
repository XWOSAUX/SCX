import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './supabaseClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
