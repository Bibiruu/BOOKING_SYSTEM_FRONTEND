import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Registration from './components/Registration'
import Order from './components/Order'
import Bookings from './components/Bookings'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/order" element={<Order />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
