import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import profileP from "../Images/profile-pic.png";
import toast from "react-hot-toast";
import HomeService from "../Services/HomeService";

const Header = () => {
  const [profileData, setProfileData] = useState("")

  const navigate = useNavigate()



  const [Searchmodal, setSearchmodal] = useState(false);
  const responSearch = () => {
    setSearchmodal(!Searchmodal);
  };

  const ShowSidebar = () => {
    if (document.querySelector("#responsiveMenu").click) {
      document.querySelector(".sidebarwrap").classList.add("show");

    } else {
      document.querySelector(".sidebarwrap").classList.remove("show");

    }
  };
  const HideSidebar = () => {
    document.querySelector(".sidebarwrap").classList.remove("show");
  }
  // >>>>Fetch Admin Login Data<<<<
  const fetchAdminLoginData = async () => {
    const res = await HomeService.getLoginProfile();
    // console.log("this is login profile data", res);

    if (res && res?.status) {
      setProfileData(res?.data)
    }
  }

  // >>>Handle Admin Logout<<< 
  const handleLogOut = () => {
    toast.success("Logout SuccessFull");
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchAdminLoginData()
  }, [])
  return (

    <>
      <section className="mainheader_sec">
        <button
          className="responsive_menu"
          id="responsiveMenu"
          onClick={ShowSidebar}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <button className="responsSearch_btn" onClick={responSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <div className=" sales_admin_div">
          <h3
            style={{
              textTransform: "capitalize"
            }}
          >Super Admin</h3>
          <i class="fa-solid fa-angle-left fa-rotate-270"></i>
        </div>

      </section>

      {Searchmodal && (
        <div className="responsiveSearch_box">
          <form className="form-inline">
            <input
              className="form-control"
              type="search"
              placeholder="Search here...."
              aria-label="Search"
            />
            <button
              className="Search_icon"
              type="submit"
              onClick={() => setSearchmodal(false)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      )}





      <Sidebar HideSidebar={HideSidebar} />
    </>
  )
}

export default Header