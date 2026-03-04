import { useState } from "react";
import api from "../api";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    price: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/events", form);
    alert("สร้างอีเวนต์สำเร็จ");
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          สร้างอีเวนต์
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="ชื่ออีเวนต์"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <textarea name="description" placeholder="รายละเอียด"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <input type="datetime-local" name="date"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <input type="number" name="price"
            placeholder="ราคา"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <button className="w-full !bg-indigo-600 text-white py-3 rounded-lg">
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
}