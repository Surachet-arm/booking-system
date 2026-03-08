// src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);

      toast.success("สมัครสมาชิกสำเร็จ");
      navigate("/login");

    } catch (err) {
      toast.error("สมัครสมาชิกไม่สำเร็จ");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          สมัครสมาชิก
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              ชื่อ
            </label>

            <input
              name="name"
              type="text"
              placeholder="กรอกชื่อของคุณ"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              อีเมล
            </label>

            <input
              name="email"
              type="email"
              placeholder="กรอกอีเมล"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              รหัสผ่าน
            </label>

            <input
              name="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
            hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            มีบัญชีอยู่แล้ว?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              เข้าสู่ระบบ
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}