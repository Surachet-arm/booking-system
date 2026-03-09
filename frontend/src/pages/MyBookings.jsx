import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {

            try {

                const res = await api.get("/bookings");

                // filter booking ของ user คนนี้
                const myBookings = res.data.filter(
                    (b) => b.user === user.id || b.user === user._id
                );

                setBookings(myBookings);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchBookings();

    }, [user, navigate]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">

            <div className="max-w-6xl mx-auto">

                <h2 className="text-4xl font-bold mb-10 text-gray-800">
                    การจองของฉัน
                </h2>


                {bookings.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-2xl mx-auto">

                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                            คุณยังไม่มีรายการจอง
                        </h3>

                        <p className="text-gray-500 mb-6">
                            เริ่มต้นจองอีเวนต์ที่คุณสนใจได้เลย
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                        >
                            ไปเลือกอีเวนต์
                        </button>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {bookings.map((b) => (

                            <div
                                key={b._id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                            >

                                {/* Event title */}

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {b.event?.title || "Event"}
                                </h3>


                                {/* Date */}

                                {b.event?.date && (

                                    <p className="text-gray-500 mb-2">

                                        📅 {new Date(b.event.date).toLocaleDateString("th-TH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        })}

                                    </p>

                                )}


                                {/* Quantity */}

                                <p className="text-gray-600 mb-1">
                                    🎫 จำนวน:
                                    <span className="font-semibold ml-1">
                                        {b.quantity}
                                    </span>
                                </p>


                                {/* Price */}

                                <p className="text-indigo-600 font-bold text-lg mt-4">
                                    รวมทั้งหมด ฿{b.totalPrice || (b.event?.price * b.quantity)}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}