import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {

    const fetchEvent = async () => {

      const res = await api.get(`/events/${id}`);
      const e = res.data;

      setTitle(e.title);
      setDescription(e.description);
      setDate(e.date.substring(0,10));
      setPrice(e.price);
      setCapacity(e.capacity);

    };

    fetchEvent();

  }, [id]);

  const updateEvent = async (e) => {

    e.preventDefault();

    await api.put(`/events/${id}`, {
      title,
      description,
      date,
      price,
      capacity
    });

    alert("อัพเดต Event สำเร็จ");

    navigate("/dashboard");

  };

  return (

    <div className="min-h-screen bg-gray-100 pt-28 flex justify-center items-start">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[520px]">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold text-indigo-600">
            แก้ไข Event
          </h1>


        </div>

        <form onSubmit={updateEvent} className="space-y-5">

          {/* Title */}

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              ชื่อ Event
            </label>

            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              รายละเอียด
            </label>

            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Date */}

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              วันที่จัดงาน
            </label>

            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Price */}

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              ราคา (บาท)
            </label>

            <input
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Capacity */}

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              จำนวนที่นั่ง
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e)=>setCapacity(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-4">

            <button
              type="submit"
              className="flex-1 !bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              อัพเดต
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 !bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              ยกเลิก
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}