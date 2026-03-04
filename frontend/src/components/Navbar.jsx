import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const link =
    "px-3 py-2 text-gray-600 hover:text-indigo-600 transition";

  const active =
    "px-3 py-2 text-indigo-600 font-semibold border-b-2 border-indigo-600";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center">

        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          EventBooking
        </NavLink>

        <div className="flex items-center space-x-6 text-lg">

          <NavLink to="/" className={({ isActive }) => isActive ? active : link}>
            Events
          </NavLink>

          {user && user.role === "admin" && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? active : link}>
                Dashboard
              </NavLink>

              <NavLink to="/create-event" className={({ isActive }) => isActive ? active : link}>
                Create Event
              </NavLink>

              <NavLink to="/admin/users" className={({ isActive }) => isActive ? active : link}>
                Users
              </NavLink>
            </>
          )}

          {user && user.role !== "admin" && (
            <NavLink to="/my-bookings" className={({ isActive }) => isActive ? active : link}>
              My Bookings
            </NavLink>
          )}

          {!user && (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? active : link}>
                Login
              </NavLink>

              <NavLink to="/register" className={({ isActive }) => isActive ? active : link}>
                Register
              </NavLink>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 !bg-red-500 text-white rounded-xl hover:bg-red-600 hover:shadow-lg transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}