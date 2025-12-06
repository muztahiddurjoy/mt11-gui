import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Autonomous from './pages/run/autonmous.tsx'
import RunIndexPage from './pages/run/index.tsx'
import DebugIndexPage from './pages/debug/index.tsx'
import Vision from './pages/run/vision.tsx'
import Science from './pages/run/science.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="run" element={<RunIndexPage/>}>
          <Route index path="autonomous" element={<Autonomous/>}/>
          <Route path="vision" element={<Vision/>}/>
          <Route path="science" element={<Science/>}/>
        </Route>
        <Route path="debug" element={<DebugIndexPage/>}>
          <Route index path="autonomous" element={<Autonomous/>}/>
          <Route path="vision" element={<Vision/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
