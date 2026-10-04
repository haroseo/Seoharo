import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { parsePageBootstrap } from './data/pageBootstrap.ts'

const root = document.getElementById('root')!
let bootstrap = null
try { bootstrap = parsePageBootstrap(JSON.parse(document.getElementById('site-bootstrap')?.textContent ?? 'null')) } catch { /* Invalid public bootstrap uses safe client rendering. */ }
const application = <StrictMode><App {...(bootstrap ?? { initialPath: window.location.pathname, initialLanguage: 'ko' })} /></StrictMode>
if (bootstrap && root.hasChildNodes()) hydrateRoot(root, application)
else createRoot(root).render(application)
