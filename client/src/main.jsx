import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply initial theme based on localStorage or system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('nutrify-theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // If no saved preference, check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

// Apply theme class to document
document.documentElement.classList.add(`theme-${getInitialTheme()}`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
