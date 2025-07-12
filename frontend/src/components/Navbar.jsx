import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let dropdownTimeout;

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => setDropdownVisible(false), 200);
  };

  return (
    <div className="flex items-center justify-between mx-4 text-sm mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-72 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Navigation Links */}
<ul className="hidden md:flex items-start gap-5 font-medium">
  <NavLink to="/">
    <li className="py-1">HOME</li>
  </NavLink>
  <NavLink to="/doctors">
    <li className="py-1">ALL DOCTORS</li>
  </NavLink>
  <NavLink to="/about">
    <li className="py-1">ABOUT</li>
  </NavLink>
  <NavLink to="/contact">
    <li className="py-1">CONTACT</li>
  </NavLink>
  
  {/* Admin Login Button */}
<li>
  <a
    href="https://healthmate-admin-usjs.onrender.com"
    target="_blank"
    rel="noopener noreferrer"
    title="Admin credentials required to access the panel"
    className="whitespace-nowrap ml-2 px-3 py-1.5 rounded-full text-sm font-semibold text-blue-600 border border-blue-500 bg-white shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
  >
    Admin Panel
  </a>
</li>
</ul>


      {/* Profile and Menu Icon */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-8 rounded-full mr-1"
              src={userData.image}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-4 m-1">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Always Visible Menu Icon (Mobile) */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden ml-4"
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        {/* Mobile Menu */}
        <div
          className={` ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-56" src={assets.logo} alt="" />
            <img
              className="w-8"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>

            <a
  href="https://healthmate-admin-usjs.onrender.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 w-full max-w-[200px] text-center px-4 py-2 rounded-full text-sm font-semibold text-blue-600 border border-blue-500 bg-white shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
>
  Admin Panel
</a>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
