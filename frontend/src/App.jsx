import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Users from "./pages/Users";
import EventDetail from "./pages/EventDetail";
import Payment from "./pages/Payment";
import EditEvent from "./pages/EditEvent";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="w-screen min-h-screen">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}