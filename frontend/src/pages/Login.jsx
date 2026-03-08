// src/pages/Login.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form.email, form.password);

      const loggedUser =
        res?.user || JSON.parse(localStorage.getItem("user"));

      toast.success("เข้าสู่ระบบสำเร็จ");

      if (loggedUser?.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          เข้าสู่ระบบ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              อีเมล
            </label>

            <input
              name="email"
              type="email"
              placeholder="กรอกอีเมลของคุณ"
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

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
            hover:bg-indigo-700 transition"
          >
            เข้าสู่ระบบ
          </button>

          {/* Register link */}
          <p className="text-center text-black text-sm mt-4">
            ฉันยังไม่มีสมาชิก{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              สมัครสมาชิก
            </Link>
          </p>

        </form>

        {/* Demo accounts */}
        <div className="mt-8 bg-gray-50 border rounded-xl shadow p-5">

          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            บัญชีสำหรับทดลองใช้งาน
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-red-600 font-semibold">
                สถานะ: Admin
              </p>
              <p className="text-gray-700">Email: surachet@gmail.com</p>
              <p className="text-gray-700">Password: 1234</p>
            </div>

            <div>
              <p className="text-blue-600 font-semibold">
                สถานะ: User
              </p>
              <p className="text-gray-700">Email: user@gmail.com</p>
              <p className="text-gray-700">Password: 1234</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}