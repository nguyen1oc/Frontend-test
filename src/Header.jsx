import React from "react";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-10">
        <a href ="/albums">
        <img 
        src="https://geekup.vn/Icons/geekup-logo-general.svg" 
        alt="GeekUp Logo"
        className="w-24 h-20 ml-5"
      />
        </a>
      
    </header>
  );
}

export default Header;
