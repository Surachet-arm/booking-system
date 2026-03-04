import { useEffect, useState } from "react";
import api from "../api";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-10">

      <h1 className="text-3xl font-bold mb-8 text-indigo-600">
        ผู้ใช้ทั้งหมด
      </h1>

      <div className="bg-white rounded-xl shadow divide-y">

        {users.map((u) => (
          <div
            key={u._id}
            className="flex justify-between p-4"
          >
            <span>{u.email}</span>

            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm">
              {u.role}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}