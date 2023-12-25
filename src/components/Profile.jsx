import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logoutFunction = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, [setUser]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-auto p-10">
        <div className="">
          <img
            src={user.image || "/profile.png"}
            width={200}
            alt="Profile picture"
            className="rounded-full bg-white border-2 border-gray-500"
          />
        </div>
        <div className="p-5 font-bold font-mono">
          @{user.username || "username"}
        </div>
        <div className="">
          <div className="font-semibold">
            Name:{" "}
            {`${user.firstName}  ${user.lastName}` || "nameisnotavailable"}
          </div>
          <div className="font-semibold">
            Email: {user.email || "notavailble@email.com"}
          </div>
          <div className="font-semibold">
            Gender: {capitalize(user.gender) || "N.A."}
          </div>
        </div>
        <div className="p-5">
          <button
            onClick={logoutFunction}
            type="submit"
            className="py-2 px-3 bg-red-500 rounded-xl text-white text-xl hover:bg-red-600 active:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
