import React, { useEffect } from "react";
import Navbar from "../components/admin/layout/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/admin/layout/Footer";
import { useDispatch } from "react-redux";
import { getUserListThunkMiddleware } from "../redux/features/user";

const Admin = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListThunkMiddleware(navigate));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#c2c0c0] min-h-[100dvh]">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Admin;
