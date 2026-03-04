import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const { event, quantity } = location.state;

  const total = event.price * quantity;

  const confirmPayment = async () => {

    await api.post("/bookings", {
      eventId: event._id,
      quantity
    });

    alert("จองสำเร็จ");

    navigate("/");

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-28 flex justify-center items-start">

      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-10 text-center">

        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          ชำระเงิน
        </h1>

        {/* QR */}
        <div className="bg-gray-100 p-6 rounded-xl mb-6">

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=EVENTBOOKING"
            className="mx-auto"
          />

        </div>

        {/* Event Info */}

        <div className="text-left mb-6 space-y-2">

          <p className="font-medium text-gray-700">
            🎫 {event.title}
          </p>

          <p className="text-gray-600">
            จำนวนตั๋ว : {quantity}
          </p>

          <p className="text-lg font-semibold text-indigo-600">
            รวมราคา : ฿{total}
          </p>

        </div>

        <button
          onClick={confirmPayment}
          className="w-full !bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
        >
          ยืนยันการโอน
        </button>

      </div>

    </div>
  );
}