import Header from "./Header"
import Album from "./Album"
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./User";
import DetailUser from "./DetailUser";
import { Link } from "react-router-dom";
import DetailAlbum from "./DetailAlbum";
function App() {
  return (
    <>
      <Header className="fixed"/>
      <Router>
          <Routes>


            <Route path="/albums" element={<Album/>} />
            <Route path="/album-details/*" element={<DetailAlbum />} />

            <Route path="/users" element={<User />} />
            <Route path="/user-details/*" element={<DetailUser />} />
          </Routes>
      </Router>
      
    </>
  )
}

export default App
