import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartSize } = useAuth();
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="bg-gradient-to-r from-gray-300 to-gray-100 shadow-lg">
        <div className="  sm:py-4 sm:px-10 p-3 flex items-center justify-between  sm:max-w-5xl sm:mx-auto">
          {/* Search filter */}
          <div className="bg-white py-2 px-4 rounded-full flex items-center space-x-2 border-2 border-gray-500">
            <input type="text" className=" outline-none" placeholder="Search" />
            <div className="border-r-2 border-gray-500"></div>
            <button>
              <CiSearch />
            </button>
          </div>
          <div className="">
            <div className="hidden sm:flex items-center justify-evenly space-x-16">
              {/* Logo */}
              <div className="">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-700"
                  }
                >
                  <IoMdHome className="text-4xl" />
                </NavLink>
              </div>
              {/* Cart */}
              <div className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-700"
                  }
                >
                  <p className="absolute -top-4 right-3 font-semibold text-center">
                    {cartSize}
                  </p>
                  <FaCartShopping className="text-4xl" />
                </NavLink>
              </div>
              {/* Navbar */}
              <div className="">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "bg-black " : "text-slate-300"
                  }
                >
                  <img
                    src={userProfile?.image || "/profile.png"}
                    width={45}
                    alt=""
                    className="rounded-full bg-white border-2 border-gray-500 p-1"
                  />
                </NavLink>
              </div>
            </div>
            {/* Hamburger Menu */}
            <div className="sm:hidden">
              {!isOpen ? (
                <button type="button" onClick={handleHamburger}>
                  <GiHamburgerMenu className="text-4xl text-gray-600" />
                </button>
              ) : (
                <button type="button" onClick={handleHamburger}>
                  <MdClose className="text-4xl text-gray-600" />
                </button>
              )}

              <div
                className={`${
                  !isOpen ? "hidden" : "block"
                } absolute top-[67px] right-0 bg-gray-200 shadow-lg  rounded-bl-lg w-1/4 py-2`}
                onClick={(prev) => {
                  setIsOpen(!prev);
                }}
              >
                <div className="flex flex-col items-center justify-center space-y-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-gray-700"
                    }
                  >
                    <IoMdHome className="text-4xl" />
                  </NavLink>
                  <div className="">
                    <NavLink to="/profile">
                      <img
                        src={userProfile?.image || "/profile.png"}
                        width={45}
                        alt=""
                        className="rounded-full bg-white border-2 border-gray-500 p-1"
                      />
                    </NavLink>
                  </div>

                  <div className="relative">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "text-black" : "text-gray-700"
                      }
                    >
                      <p className="absolute -top-4 right-3 font-semibold text-center">
                        {cartSize}
                      </p>
                      <FaCartShopping className="text-4xl" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
