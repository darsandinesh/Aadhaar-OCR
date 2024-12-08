import './App.css'
import AadhaarOCR from './Components/AadhaarOCR'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ocr' element={<AadhaarOCR />} />
        <Route path='/*' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
