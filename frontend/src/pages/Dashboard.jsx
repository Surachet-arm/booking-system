import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchData();

  }, []);

  const fetchData = async () => {

    const e = await api.get("/events");
    const u = await api.get("/users");
    const b = await api.get("/bookings");

    setEvents(e.data);
    setUsers(u.data);
    setTotalBookings(b.data.length);

  };

  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm("คุณต้องการลบ Event นี้ใช่หรือไม่?");

    if (!confirmDelete) return;

    await api.delete(`/events/${id}`);

    fetchData();

  };

  return (

    <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-10">

      <h1 className="text-4xl font-bold text-indigo-600 mb-10">
        Admin Dashboard
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">จำนวนอีเวนต์</p>
          <p className="text-2xl font-bold text-indigo-600">
            {events.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">จำนวนผู้ใช้</p>
          <p className="text-2xl font-bold text-indigo-600">
            {users.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">การจองทั้งหมด</p>
          <p className="text-2xl font-bold text-indigo-600">
            {totalBookings}
          </p>
        </div>

      </div>

      {/* Event Management */}

      <h2 className="text-2xl font-semibold mb-6">
        จัดการอีเวนต์
      </h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {events.map((e) => {

          const remaining = e.capacity - (e.booked || 0);

          const percent = e.capacity
            ? (e.booked / e.capacity) * 100
            : 0;

          return (

            <div key={e._id} className="flex justify-between items-center p-5 border-b">

              <div className="w-full max-w-xl">

                <p className="font-semibold text-black text-lg">
                  {e.title}
                </p>

                <p className="text-sm text-gray-500">
                  📅 {new Date(e.date).toLocaleDateString()}
                </p>

                <div className="flex gap-6 mt-2 text-sm">

                  <span className="text-blue-600 font-medium">
                    👥 คนจอง: {e.capacity - e.remaining}
                  </span>

                  <span className="text-green-600 font-medium">
                    🎟 เหลือ: {remaining}
                  </span>

                  {remaining === 0 && (
                    <span className="text-red-500 font-semibold">
                      SOLD OUT
                    </span>
                  )}

                </div>

                <div className="w-full bg-gray-200 h-2 rounded mt-3">

                  <div
                    className="bg-indigo-600 h-2 rounded"
                    style={{ width: `${percent}%` }}
                  />

                </div>

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                <button
                  onClick={() => navigate(`/edit-event/${e._id}`)}
                  className="!bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                >
                  แก้ไข
                </button>

                <button
                  onClick={() => deleteEvent(e._id)}
                  className="!bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                >
                  ลบ
                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
}