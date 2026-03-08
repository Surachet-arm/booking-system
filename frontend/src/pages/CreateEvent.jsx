import { useState } from "react";
import api from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvent() {

  const [date, setDate] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("date", date);
    formData.append("image", form.image);

    try {

      await api.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("สร้างอีเวนต์สำเร็จ");

    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-gray-50">

      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          สร้างอีเวนต์
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            name="title"
            placeholder="ชื่ออีเวนต์"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="รายละเอียด"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800"
          />

          {/* Date */}
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            wrapperClassName="w-full"
            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="ราคา"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800"
          />

          {/* Upload Image */}
          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              รูปอีเวนต์
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 bg-white"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-4 rounded-lg shadow w-full h-48 object-cover"
              />
            )}

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            บันทึก
          </button>

        </form>

      </div>

    </div>
  );
}