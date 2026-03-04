import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    capacity: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEvent = async (e) => {
    e.preventDefault();
    await api.post("/events", form);
    setForm({ title: "", description: "", date: "", price: "", capacity: "" });
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <form onSubmit={createEvent} className="bg-white shadow p-6 rounded mb-6 space-y-3">
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} className="w-full border p-2" required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} className="w-full border p-2" required />
        <input name="date" type="datetime-local" onChange={handleChange} value={form.date} className="w-full border p-2" required />
        <input name="price" type="number" onChange={handleChange} value={form.price} className="w-full border p-2" required />
        <input name="capacity" type="number" onChange={handleChange} value={form.capacity} className="w-full border p-2" required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {events.map((e) => (
          <div key={e._id} className="bg-white shadow p-4 rounded">
            <h2 className="font-bold">{e.title}</h2>
            <p>{e.description}</p>
            <button
              onClick={() => deleteEvent(e._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}