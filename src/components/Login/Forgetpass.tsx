import { Button } from "@mui/material";
import { Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { api_url } from "../../Config";
import { useNavigate } from "react-router-dom";

const Forgetpass = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const handleForget = async () => {
    try {
      if (!data) {
        message.error("All fields required!");
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(data)) {
        message.error("Invalid email format!");
        return;
      }

      const res = await axios.post(`${api_url}/api/admin/forgotPassword`, {
        email: data,
      });

      sessionStorage.setItem("userEmail",data)
      if (res.status === 200) {
        navigate("/otp");
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
                    Forgot Password
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
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />

                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="login"
                      onClick={handleForget}
                    >
                      Send OTP
                    </Button>
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

export default Forgetpass;
