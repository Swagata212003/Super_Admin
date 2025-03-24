// Hooks
import React, { useState } from "react";
import "./Authentication.css";
// import loginbg from "../Images/LoginBG.jpeg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEyeSlash, FaHome } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import AuthService from "../Services/AuthService";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passord, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const passWord = passord.length >= 4 && passord.length <= 15;

  // >>>Handle Login<<<
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = email.trim() !== "" && passord.trim() !== "";
    if (isValid) {
      if (!email.match(mailFormat)) {
        toast.error("Invalid Email")
      } else {
        const data = {
          email: email,
          password: passord,
        };
        const res = await AuthService.getLogin(data);

        console.log("this data is during login", res?.data);

        if (res && res?.status) {
          toast.success("Logged in successfully!")
          navigate('/')
          localStorage.setItem("token", res?.data?.token)
          localStorage.setItem("role", res?.data?.role || "superadmin")
          localStorage.setItem("city", res?.data?.city?._id || "")
          localStorage.setItem("uid", res?.data?._id || "")
          console.log("6df5g6f4dg646fd", res)
        } else {
          toast.error(res?.message)
        }

      }
    } else {
      toast.error("Please fill all the Inputs..")
    }
  };

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  return (
    <>
      <section
        className="LoginPage"
      // style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="LoginBgOverlay" />
        <div className="LoginForm">
          <div className="LoginTop">
            <h5 className="LoginHead">Sign in</h5>
          </div>
          <div className="LoginBtm">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="email"
                  id="exampleEmail"
                  placeholder="Email here..."
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group pass_input">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={passord}
                  name="password"
                  id="examplePassword"
                  placeholder="Password here..."
                  type={show ? "text" : "password"}
                  className="form-control"
                />
                <div className="eye_icon" onClick={togglePasswordVisibility}>
                  {show ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button
                className="LoginBtn mt-5"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
}
