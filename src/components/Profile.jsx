import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logoutFunction = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center m-auto p-10">
        <div className="">
          <img
            src="https://robohash.org/perferendisideveniet.png"
            width={200}
            alt="Profile picture"
            className="rounded-full bg-white border-2 border-gray-500"
          />
        </div>
        <div className="p-5 font-bold font-mono">@username</div>
        <div className="">
          <div className="font-semibold">Name: Jeanne</div>
          <div className="font-semibold">Email: jeanne@email.in</div>
          <div className="font-semibold">Gender: Female</div>
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
