import { Button } from "@mui/material";
import {  Divider, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../../Config";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!data.email || !data.password) {
        message.error("All fields required!");
        return;
      }

      if (!emailRegex.test(data.email)) {
        message.error("Invalid email format!");
        return;
      }

      const res = await axios.post(`${api_url}/api/admin/login`, data);

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        message.success("Login successfull!");
        window.dispatchEvent(new Event("storage"));
        navigate("/home")
      }
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <>
      <section
        style={{ backgroundColor: "#fff", height: "100vh", overflow: "hidden" }}
      >
        <div className="row mx-0">
          <div className="col-lg-4 px-0">
            <div style={{ height: "100%" }}>
              <img
                src="/assets/Left side panel.png"
                alt="img"
                className="img-fluid"
                loading="lazy"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div
              className="row justify-content-center align-items-center mx-0"
              style={{ height: "100vh" }}
            >
              <div className="col-lg-8">
                <div>
                <img src="/assets/logo.png" className="pb-4" style={{width:"100px"}}/>
                  <p
                    className="mb-0"
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    Welcome back! 👋
                  </p>
                  <h5
                    style={{
                      color: "#595959",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    Login to your account
                  </h5>
                  <label
                    className="py-2"
                    style={{
                      color: "#595959",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input
                    placeholder="Enter Email"
                    style={{ height: 40 }}
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <label
                    className="py-2"
                    style={{
                      color: "#595959",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input.Password
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    placeholder="Enter Password"
                    style={{ height: 40 }}
                  />
                  <Link
                    to="/forget-password"
                    style={{
                      color: "#0066FF",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    Forget Password?
                  </Link>
                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="login"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </div>
                  <Divider
                    style={{
                      color: "#757575",
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    Or
                  </Divider>
                  <div className="text-center">
                    <p
                      style={{
                        color: "#757575",
                        fontSize: "12px",
                        fontWeight: 400,
                      }}
                    >
                      Login As ?
                      <Link
                        to={"/sub-admin"}
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        Sub Admin
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
