import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbMathGreater } from "react-icons/tb"; 
import { PiLessThan } from "react-icons/pi";
import { FaUsersRectangle } from "react-icons/fa6";
import { IoAlbumsOutline } from "react-icons/io5";
import { LiaEyeSolid } from "react-icons/lia";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function Album() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(0); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
        setTotalPages(Math.ceil(data.length / perPage));
        setLoading(false); 
      })
      .catch((error) => console.error("Error fetching albums:", error));
      

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [perPage]); 

  const currentAlbums = albums.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleClick = (album, user) => {
    navigate(`/album-details/${album.id}`, { state: { album, user} });
  };

  const handleUserClick = (user) => {
    navigate(`/user-details/${user.id}`, { state: user });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const displayPageNumbers = pageNumbers.filter(
    (pageNumber) => pageNumber >= Math.max(currentPage - 2, 1) && 
                    pageNumber <= Math.min(currentPage + 2, totalPages)
  );

  const handlePagination = (direction) => {
    const newPage = currentPage + direction * 5;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(direction === 1 ? totalPages : 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-60" : "w-20"
        } bg-white transition-all duration-200 fixed top-20 left-0 h-full shadow-lg flex flex-col`}
      >
        <div className="flex flex-col p-4 space-y-2 mt-5">
          <button className="flex items-center text-blue-500 bg-blue-100 p-3 rounded" onClick={() => navigate("/albums")}>
            <IoAlbumsOutline size={24} />
            {isSidebarOpen && <span className="ml-5">Albums</span>}
          </button>
          <button className="flex items-center text-black hover:bg-gray-200 p-3 rounded" onClick={() => navigate("/users")}>
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

      {/* Content */}
       {loading ? (
                      <p>Loading informations...</p>
                    ) : (
                        <div className={`flex-1 p-6 ${isSidebarOpen ? "ml-60" : "ml-20"} mt-20`}>
                        <table className="min-w-full bg-[#F8FAFC] border-spacing-4 border-gray-200 rounded shadow-sm table-fixed">
                          <thead>
                            <tr className="bg-gray-100 text-left">
                              <th className="w-1/12 px-3 py-3 border-r border-gray-300 text-left">ID</th>
                              <th className="w-6/12 px-6 py-3 border-r border-gray-300 text-left">Title</th>
                              <th className="w-3/12 px-6 py-3 border-r border-gray-300 text-left">User</th>
                              <th className="w-2/12 px-3 py-3 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentAlbums.map((album) => {
                              const user = users.find((user) => user.id === album.userId);
                              return (
                                <tr key={album.id} className="border-b hover:bg-gray-100">
                                  <td className="px-3 py-3 text-left">{album.id}</td>
                                  <td className="px-6 py-3 text-left">{album.title}</td>
                                  <td className="px-6 py-3 text-left">
                                    <button onClick={() => handleUserClick(user)}>
                                      <div className="flex items-center space-x-3 justify-start">
                                        {user ? (
                                          <img
                                            src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                                            alt="Avatar"
                                            className="rounded-full w-12 h-12"
                                          />
                                        ) : (
                                          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                                        )}
                                        <span className="text-blue-500">{user ? user.name : 'Unknown'}</span>
                                      </div>
                                    </button> 
                                  </td>
                                  <td className="px-3 py-3 text-left">
                                    <button
                                      className="flex items-center text-black hover:text-blue-700 border border-black hover:border-blue-700 rounded-lg px-3 py-1 transition duration-200"
                                      onClick={() => handleClick(album, user)}
                                    >
                                      <LiaEyeSolid size={20} />
                                      <span className="ml-2">Show</span>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                
                        {/* Pagination */}
                        <div className="flex justify-end items-center mt-4 space-x-4">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-1 py-1 text-gray-400 border-gray-300 hover:bg-gray-200"
                          >
                            <PiLessThan size={20} />
                          </button>
                
                          <div className="flex items-center space-x-2">
                            {currentPage > 3 && (
                              <button
                                onClick={() => handlePageChange(1)}
                                className="px-3 py-1 text-gray-500 hover:bg-gray-300"
                              >
                                1
                              </button>
                            )}
                            {currentPage > 3 && (
                              <button
                                onClick={() => handlePagination(-1)}
                                className="px-3 py-1 text-gray-500 hover:bg-gray-300"
                                title="Go 5 pages back"
                                onMouseEnter={() => setIsHovered(true)}  
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                {isHovered ? (
                                    <MdKeyboardDoubleArrowRight size={24} className="text-blue-500" />
                                ) : (
                                    <HiOutlineDotsHorizontal size={24} className="text-gray-400" />
                                )}
                              </button>
                            )}
                            {displayPageNumbers.map((pageNumber) => (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-3 py-1  ${pageNumber === currentPage ? "bg-white text-blue-500 border border-blue-500" : "text-gray-500 hover:bg-gray-300"}`}
                              >
                                {pageNumber}
                              </button>
                            ))}
                            {currentPage < totalPages - 2 && (
                              <button
                                onClick={() => handlePagination(1)}
                                className="px-3 py-1 text-gray-500 hover:bg-gray-300"
                                title="Go 5 pages forward"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                {isHovered ? (
                                    <MdKeyboardDoubleArrowRight size={24} className="text-blue-500" />
                                ) : (
                                    <HiOutlineDotsHorizontal size={24} className="text-gray-400" />
                                )}
                              </button>
                            )}
                            {currentPage < totalPages - 3 && (
                              <button
                                onClick={() => handlePageChange(totalPages)}
                                className="px-3 py-1 text-gray-500 hover:bg-gray-300"
                              >
                                {totalPages}
                              </button>
                            )}
                          </div>
                
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-gray-400 border-gray-300 hover:border-blue-500"
                          >
                            <TbMathGreater size={20} />
                          </button>
                
                          <select
                            id="perPage"
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="p-2 border rounded"
                          >
                            <option value={10}>10 /page</option>
                            <option value={20}>20 /page</option>
                            <option value={50}>50 /page</option>
                            <option value={100}>100 /page</option>
                          </select>
                        </div>
                      </div>
                      )
                    }
      
    </div>
  );
}

export default Album;
