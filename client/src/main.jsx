import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './context/Theme.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>
)
