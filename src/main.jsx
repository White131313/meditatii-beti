import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { InitialDataContext, readInitialData } from './lib/initialData'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <InitialDataContext.Provider value={readInitialData()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InitialDataContext.Provider>
  </StrictMode>
)

// Paginile publice vin pre-randate (scripts/prerender.mjs): React preia HTML-ul existent.
// Paginile doar-browser (login, admin, quiz) și `npm run dev` pornesc de la un #root gol.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
