import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoAlbumsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbMathGreater } from "react-icons/tb"; 
import { LiaEyeSolid } from "react-icons/lia";
import { PiLessThan } from "react-icons/pi";

function DetailAlbum() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [photos, setPhotos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { album, user } = location.state;
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setLoading(true); 
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, [album.id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-60" : "w-20"
        } bg-white transition-all duration-200 fixed top-20 left-0 h-full shadow-lg flex flex-col`}
      >
        <div className="flex flex-col p-4 space-y-2 mt-5">
          <button
            className="flex items-center text-blue-500 bg-blue-100 p-3 rounded"
            onClick={() => navigate("/albums")}
          >
            <IoAlbumsOutline size={24} />
            {isSidebarOpen && <span className="ml-5">Albums</span>}
          </button>
          <button
            className="flex items-center text-black hover:bg-gray-200 p-3 rounded"
            onClick={() => navigate("/users")}
          >
            <FaUsersRectangle size={24} />
            {isSidebarOpen && <span className="ml-5">Users</span>}
          </button>
        </div>

        {/* Sidebar Toggle */}
        <div className="flex-grow mt-auto p-4 flex justify-center">
          <button onClick={toggleSidebar} className="text-blue-400">
            {isSidebarOpen ? <PiLessThan size={20} /> : <TbMathGreater size={20} />}
          </button>
        </div>
      </div>

      {/* Album Details Content */}
      <div className={`flex-1 p-6 ${isSidebarOpen ? "ml-60" : "ml-20"} mt-20`}>
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center text-black hover:bg-gray-200"
            onClick={() => navigate("/users")}
          >
            <IoAlbumsOutline size={24} />
            {isSidebarOpen && <span className="ml-2">Albums</span>}
          </button>
          <p className="ml-2">/ Show</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="flex items-center text-black hover:bg-gray-200"
            onClick={() => navigate("/user-details/*", { state: user })}
          >
            <IoIosArrowRoundBack size={40} />
          </button>
          <h2 className="font-bold text-2xl mt-5 mb-5">Show Album</h2>
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
                <p className="text-blue-700 text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-4" />
            <div className="font-bold text-xl mb-5">{album.title}</div>

            {/* Display Photos */}
            <div className="grid grid-cols-10 gap-2 justify-center">
              {loading ? (
                <p>Loading photos...</p>
              ) : (
                photos.slice(0, 10).map((photo) => ( 
                  <div key={photo.id} className="relative group w-full h-auto">
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      className="w-full h-auto rounded-lg transition duration-300 ease-in-out transform group-hover:scale-105"
                    />
                    {/* Overlay khi hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white flex items-center">
                        <LiaEyeSolid size={20} className="mr-2" /> Preview
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAlbum;
