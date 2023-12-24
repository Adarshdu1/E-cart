import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  });
  return (
    <>
      <Component />
    </>
  );
}
