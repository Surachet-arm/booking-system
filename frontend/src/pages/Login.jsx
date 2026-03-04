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

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login(form.email, form.password);

            const loggedUser = res?.user || JSON.parse(localStorage.getItem("user"));

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    เข้าสู่ระบบ
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-gray-600">อีเมล</label>
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-600">รหัสผ่าน</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full !bg-indigo-600 !text-white py-3 rounded-lg"
                    >
                        เข้าสู่ระบบ
                    </button>

                    <p className="text-center text-sm mt-4">
                        ฉันยังไม่มีสมาชิก{" "}
                        <Link to="/register" className="text-indigo-600 font-semibold">
                            สมัครสมาชิก
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}