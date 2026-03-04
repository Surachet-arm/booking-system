import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get("/events");
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          ค้นพบอีเวนต์สุดพิเศษ
        </h1>
        <p className="text-xl opacity-90">
          จองบัตรคอนเสิร์ต สัมมนา และกิจกรรมอื่น ๆ ได้ง่าย ๆ
        </p>
      </div>

      {/* Events */}
      <div className="max-w-7xl mx-auto px-8 py-16">

        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          อีเวนต์ที่กำลังจะมาถึง
        </h2>

        {events.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              ยังไม่มีอีเวนต์ในขณะนี้
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((e) => (
            <div
              key={e._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  {e.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {e.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  📅 {new Date(e.date).toLocaleDateString("th-TH")}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">

                <span className="text-indigo-600 font-bold text-xl">
                  ฿{e.price}
                </span>

                <button
                  onClick={() => navigate(`/event/${e._id}`)}
                  className="!bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  จองเลย
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}