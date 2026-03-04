import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EventDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    const fetchEvent = async () => {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    };

    fetchEvent();

  }, [id]);

  const bookTicket = () => {

    navigate("/payment", {
      state: {
        event,
        quantity
      }
    });

  };

  if (!event) return <p className="p-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-28">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden grid md:grid-cols-2">

        {/* Image */}
        <img
          src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"}
          className="w-full h-full object-cover"
          alt="event"
        />

        {/* Detail */}
        <div className="p-10">

          <h1 className="text-3xl font-bold mb-4">
            {event.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {event.description}
          </p>

          <p className="mb-2">
            📅 {new Date(event.date).toLocaleDateString("th-TH")}
          </p>

          <p className="mb-2">
            👥 คนจองแล้ว {event.booked}
          </p>

          <p className="mb-6 text-green-600 font-semibold">
            🎟 เหลือ {event.remaining} ที่นั่ง
          </p>

          <p className="text-2xl font-bold text-indigo-600 mb-6">
            ฿{event.price}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">

            <span>จำนวนตั๋ว</span>

            <input
              type="number"
              value={quantity}
              min="1"
              max={event.remaining}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-2 w-20 rounded"
            />

          </div>

          {/* Total */}
          <p className="mb-6 text-lg font-semibold">
            รวมราคา: ฿{event.price * quantity}
          </p>

          <button
            onClick={bookTicket}
            className="w-full !bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            ไปหน้าชำระเงิน
          </button>

        </div>

      </div>

    </div>
  );
}