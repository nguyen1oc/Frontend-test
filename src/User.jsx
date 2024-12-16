import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbMathGreater } from "react-icons/tb"; 
import { PiLessThan } from "react-icons/pi";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoAlbumsOutline } from "react-icons/io5";
import { LiaEyeSolid } from "react-icons/lia";

function User() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleClick = (user) => {
    navigate(`/user-details/${user.id}`, { state: user });
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-60" : "w-20"
          } bg-white transition-all duration-200 fixed top-20 left-0 h-full shadow-lg flex flex-col`}
        >
          <div className="flex flex-col p-4 space-y-2 mt-5">
            <button
              className="flex items-center text-black hover:bg-gray-200 p-3 rounded"
              onClick={() => navigate("/albums")}
            >
              <IoAlbumsOutline size={24} />
              {isSidebarOpen && <span className="ml-5">Albums</span>}
            </button>
            <button
              className="flex items-center text-blue-500 bg-blue-100 p-3 rounded"
              onClick={() => navigate("/users")}
            >
              <FaUsersRectangle size={24} />
              {isSidebarOpen && <span className="ml-5">Users</span>}
            </button>
          </div>
          <div className="flex-grow mt-auto p-4 flex justify-center">
            <button onClick={toggleSidebar} className="text-blue-400">
              {isSidebarOpen ? <PiLessThan size={20} /> : <TbMathGreater size={20} />}
            </button>
          </div>
        </div>

        {/* Nội dung Users */}
        <div className={`flex-1 p-6 ${isSidebarOpen ? "ml-60" : "ml-20"} mt-20`}>
          <h2 className="font-bold text-2xl mb-5">Users</h2>
          <table className="min-w-full bg-[#F8FAFC] border-spacing-4 border-gray-200 rounded shadow-sm table-fixed">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="w-1/12 px-3 py-3 border-r border-gray-300 text-left">ID</th>
                <th className="w-2/12 px-6 py-3 border-r border-gray-300 text-left">Avatar</th>
                <th className="w-2/12 px-6 py-3 border-r border-gray-300 text-left">Name</th>
                <th className="w-3/12 px-6 py-3 border-r border-gray-300 text-left">Email</th>
                <th className="w-2/12 px-6 py-3 border-r border-gray-300 text-left">Phone</th>
                <th className="w-2/12 px-6 py-3 border-r border-gray-300 text-left">Website</th>
                <th className="w-2/12 px-3 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="px-3 py-3 text-left">{user.id}</td>
                  <td className="px-6 py-3 text-left">
                    <img
                      src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                      alt="Avatar"
                      className="rounded-full w-12 h-12"
                    />
                  </td>
                  <td className="px-6 py-3 text-left">{user.name}</td>
                  <td className="px-6 py-3 text-left text-blue-500">
                        <a
                        href="https://geekup.vn/"
                        >
                        {user.email}
                        </a>
                  </td>
                  <td className="px-6 py-3 text-left text-blue-500">
                    <a
                        href="https://geekup.vn/"
                        >
                        {user.phone}
                        </a>
                    </td>
                  <td className="px-6 py-3 text-left">
                    <a
                      href="https://geekup.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {user.website}
                    </a>
                  </td>
                  <td className="px-3 py-3 text-left">
                    <button className="flex items-center text-black hover:text-blue-700 border border-black hover:border-blue-700 rounded-lg px-3 py-1 transition duration-200"
                    onClick={() => handleClick(user)}
                    >
                      <LiaEyeSolid size={20} />
                      <span className="ml-2">Show</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
