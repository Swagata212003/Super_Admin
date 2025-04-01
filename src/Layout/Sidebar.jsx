import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/noImage.jpg";
import toast from "react-hot-toast";
import HomeService from "../Services/HomeService";
import profileP from "../Images/profile-pic.png";
function Sidebar({ HideSidebar }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState("")
  const [toggle, setoggle] = useState(false)
  const [toggleExpenses, setToggleExpenses] = useState(false)
  const userRole = localStorage.getItem("role");
  // const handleClick = () => {
  //   if (document.querySelector("#DarkSwitch").checked) {
  //     document.body.classList.add("drakmode");
  //   } else {
  //     document.body.classList.remove("drakmode");
  //   }
  // };
  const fetchAdminLoginData = async () => {
    const res = await HomeService.getLoginProfile();
    // console.log("this is login profile data", res);

    if (res && res?.status) {
      console.log("GTR23", res);

      setProfileData(res?.data)
    }
  }
  const handlClick = () => {
    const sidebar = document.querySelector(".sidebarwrap");
    if (sidebar) {
      sidebar.classList.remove("show");
    }
  };

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
      <div className="sidebarwrap" >
        <i style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          color: 'rgb(133, 218, 79)',
          cursor: 'pointer',
          fontSize: '25px'
        }} class="fa-solid fa-caret-left left_arrow" onClick={HideSidebar}></i>
        <div className="sidebar_logo_div">
          <p style={{
            color: "#fff",
            fontSize: "30px",
            fontWeight: "600",
            textAlign: 'left',
            marginTop: '20px',
            marginLeft: '20px',
          }}><span style={{
            color: 'rgb(172, 216, 65)'
          }}>Web</span>hibe</p>
        </div>
        <p style={{
          color: "#fff",
          fontSize: "15px",
          fontWeight: "600",
          textAlign: 'left',
          marginTop: '20px',
          marginLeft: '15px',
        }}>MENU</p>
        <div className="sidebar_menu">
          <ul className="nav Menu_Nav accordion" id="sidemenu">
            {/* **Menu 1 Dashboard** */}
            <li className="menuline">
              <NavLink to="/" className="" onClick={handlClick}>
                <i class="fa-solid fa-cubes"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* City */}
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead2">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu2"
                  aria-expanded="true"
                  aria-controls="sidemenu2"
                >

                  <i class="fa-solid fa-city"></i>
                  <span>City</span>
                </Link>
              </div>
              <div
                id="sidemenu2"
                className="collapse"
                aria-labelledby="sidemenuhead2"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="/add-city" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add & Manage Cities
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/manage-cities" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      City
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </li>


            {/* Apartment */}
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead2">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu2"
                  aria-expanded="true"
                  aria-controls="sidemenu2"
                >

                  <i class="fa-solid fa-city"></i>
                  <span>Apartment</span>
                </Link>
              </div>
              <div
                id="sidemenu2"
                className="collapse"
                aria-labelledby="sidemenuhead2"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="/manage-locality" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                       Manage Apartment
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/manage-cities" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      City
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </li>




           

            {/* Lead */}
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead-sales-pipeline">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu-sales-pipeline"
                  aria-expanded="true"
                  aria-controls="sidemenu-sales-pipeline"
                >

                  <i class="fa-solid fa-filter"></i>
                  <span>Leads</span>
                </Link>
              </div>
              <div
                id="sidemenu-sales-pipeline"
                className="collapse"
                aria-labelledby="sidemenuhead-sales-pipeline"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="/add-sales-pipeline" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add
                      Lead
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage-sales-pipeline" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      Lead
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>


            {/* Banner */}
            <li className="menuline">
        <div className="menu-head" id="sidemenuhead3">
    <Link
      to="#"
      className="btn btn-header-link"
      data-toggle="collapse"
      data-target="#sidemenu3"
      aria-expanded="true"
      aria-controls="sidemenu3"
    >
      <i className="fa-solid fa-image"></i>
      <span>Banner</span>
    </Link>
  </div>
  <div
    id="sidemenu3"
    className="collapse"
    aria-labelledby="sidemenuhead3"
    data-parent="#sidemenu"
  >
    <ul className="Submenu">
      <li>
        <NavLink to="/manage-banner" onClick={handlClick}>
          <i className="fa-solid fa-angles-right mr-2"></i>
          Banners
        </NavLink>
      </li>
    </ul>
  </div>
</li>

{/* New Locality */}
<li className="menuline">
        <div className="menu-head" id="sidemenuhead3">
    <Link
      to="#"
      className="btn btn-header-link"
      data-toggle="collapse"
      data-target="#sidemenu3"
      aria-expanded="true"
      aria-controls="sidemenu3"
    >
      <i className="fa-solid fa-image"></i>
      <span>New Locality</span>
    </Link>
  </div>
  <div
    id="sidemenu3"
    className="collapse"
    aria-labelledby="sidemenuhead3"
    data-parent="#sidemenu"
  >
    <ul className="Submenu">
      <li>
        <NavLink to="/new-locality" onClick={handlClick}>
          <i className="fa-solid fa-angles-right mr-2"></i>
          New Locality
        </NavLink>
      </li>
    </ul>
  </div>
</li>

          </ul>

        </div>
        <hr className="hr_line" />
        <div className="general_div5658 sidebar_menu"
          style={{
            display: "none"
          }}
        >
          <p style={{
            color: "#fff",
            fontSize: "15px",
            fontWeight: "600",
            textAlign: 'left',
            marginTop: '15px',
            marginLeft: '15px',
          }}>GENERAL</p>
          <ul className="nav Menu_Nav accordion" id="sidemenu">
            {/***Menu 1 Dashboard***/}
            <li className="menuline">
              <NavLink to="/cc" className="" onClick={handlClick}>
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
              </NavLink>
            </li>
            <li className="menuline">
              <NavLink to="/cc" className="" onClick={handlClick}>
                <i class="fa-solid fa-shield"></i>
                <span>Security</span>
              </NavLink>
            </li>

          </ul>

        </div>


        <div style={{
          paddingBottom: '5px'
        }}>
          <hr className="hr_line" style={{
            marginTop: '0px',
            marginBottom: '10px'
          }} />
          <div className="Accountdetails" style={{

            width: "85%",
            marginInline: 'auto'
          }}>
            <div className="profile_pic" style={{
              width: '30px',
              minWidth: '30px',
              height: '30px',
            }}>
              <img src={profileP} className="img-fluid" alt="user" />
            </div>
            <div className="namearea">
              <div className="dropdown">
                <Link
                  className="dropdown-toggle"
                  href="#"
                  id="accountDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <p style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: '#fff',
                    marginBottom: '0px'
                  }}>{profileData?.name}</p>
                  <p style={{
                    fontSize: "10px",
                    fontWeight: "600",

                    marginTop: '0px',
                    color: 'grey'
                  }}>{profileData?.email}</p>
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="accountDropdown"
                >
                  {/* <Link className="dropdown-item"><i className="fa-solid fa-user mr-1"></i> Profile</Link> */}

                  <div className="" >
                    <button className="dropdown-item" onClick={handleLogOut}><i className="fa-solid fa-right-from-bracket mr-1"></i> Log Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
    </>
  );
}

export default Sidebar;













