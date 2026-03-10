import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    capacity: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const res = await api.get(`/events/${id}`);
        const e = res.data;

        setForm({
          title: e.title || "",
          description: e.description || "",
          date: e.date ? e.date.substring(0,10) : "",
          price: e.price || "",
          capacity: e.capacity || ""
        });

        if (e.image) {
          setPreview(`https://booking-system-72uy.onrender.com/uploads/${e.image}`);
        }

      } catch (err) {
        console.error(err);
      }

    };

    fetchEvent();

  }, [id]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  const updateEvent = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("date", form.date);
      data.append("price", form.price);
      data.append("capacity", form.capacity);

      if (image) {
        data.append("image", image);
      }

      await api.put(`/events/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("อัพเดต Event สำเร็จ");

      navigate("/dashboard");

    } catch (err) {

      console.error(err);
      alert("เกิดข้อผิดพลาด");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 pt-28 flex justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[520px]">

        <h1 className="text-2xl font-bold text-indigo-600 mb-6">
          แก้ไข Event
        </h1>

        <form onSubmit={updateEvent} className="space-y-5">

          {/* Title */}

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="ชื่อ Event"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* Description */}

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="รายละเอียด"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* Date */}

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* Price */}

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="ราคา"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* Capacity */}

          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="จำนวนที่นั่ง"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
          />

          {/* IMAGE UPLOAD */}

          <div>

            <label className="block mb-2 text-gray-700 font-medium">
              รูป Event
            </label>

            <input
              type="file"
              onChange={handleImage}
              className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white"
            />

            {preview && (
              <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            อัพเดต
          </button>

        </form>

      </div>

    </div>
  );
}