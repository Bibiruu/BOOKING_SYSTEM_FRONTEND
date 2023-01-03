import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Services from './components/Services'
import Bookings from './components/Bookings'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
