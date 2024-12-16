import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbMathGreater } from "react-icons/tb"; 
import { PiLessThan } from "react-icons/pi";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoAlbumsOutline } from "react-icons/io5";
import { LiaEyeSolid } from "react-icons/lia";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";

function DetailUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); 
  const [albums, setAlbums] = useState([]); 
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
        setLoading(false);
      });
  }, [user.id]);

  const handleClick = (album, user) => {
    navigate(`/album-details/${album.id}`, { state: { album, user} });
  };

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

          {/* Nút thu gọn Sidebar */}
          <div className="flex-grow mt-auto p-4 flex justify-center">
            <button onClick={toggleSidebar} className="text-blue-400">
              {isSidebarOpen ? <PiLessThan size={20} /> : <TbMathGreater size={20} />}
            </button>
          </div>
        </div>

        {/* Nội dung Users */}
        <div className={`flex-1 p-6 ${isSidebarOpen ? "ml-60" : "ml-20"} mt-20`}>
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center text-black hover:bg-gray-200"
              onClick={() => navigate("/users")}
            >
              <FaUsersRectangle size={24} />
              {isSidebarOpen && <span className="ml-2">Users</span>}
            </button>
            <p className="ml-2">/ Show</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="flex items-center text-black hover:bg-gray-200"
              onClick={() => navigate("/albums")}
            >
              <IoIosArrowRoundBack size={40} />
            </button>
            <h2 className="font-bold text-2xl mt-5 mb-5">Show User</h2>
          </div>

          <div className="min-w-full bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="min-w-full border border-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                  alt="Avatar"
                  className="rounded-full w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                  <a href="#">
                    <p className="text-blue-700 text-sm text-gray-600">{user.email}</p>
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-300 my-4" />
              <div className="font-bold text-2xl mb-5">Albums</div>


              {loading ? (
                <div>Loading albums...</div>
              ) : (
                <table className="min-w-full bg-[#F8FAFC] border-spacing-4 border-gray-200 rounded shadow-sm table-fixed">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="w-1/5 px-2 py-3 border-r border-gray-300 text-left">ID</th>
                      <th className="w-3/5 px-6 py-3 border-r border-gray-300 text-left">Title</th>
                      <th className="w-1/5 px-3 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((album) => (
                      <tr key={album.id} className="border-b hover:bg-gray-100">
                        <td className="px-3 py-3">{album.id}</td>
                        <td className="px-6 py-3">{album.title}</td>
                        <td className="px-3 py-3">
                          <button className="flex items-center text-black hover:text-blue-700 border border-black hover:border-blue-700 rounded-lg px-3 py-1 transition duration-200"
                                onClick={() => handleClick(album, user)}
                                >
                                    <LiaEyeSolid size={20} />
                                <span className="ml-2">Show</span>
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailUser;
