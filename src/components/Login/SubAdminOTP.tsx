import { Button } from "@mui/material";
import { Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { api_url } from "../../Config";
import { useNavigate } from "react-router-dom";

const SubAdminOTP = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const handleOtp = async () => {
    try {
      if (!data) {
        message.error("All fields required!");
        return;
      }

      const email = sessionStorage.getItem("subEmail");

      if (/^\d*$/.test(data)) {
        const res = await axios.post(`${api_url}/api/subadmin/otp-verify`, {
          email: email,
          otp: data,
        });

        if (res.status === 200&&res.data.data.subAdmin.isActive) {
          message.success("OTP verified successfully!");
          localStorage.setItem("authToken", res.data.data.token);
          message.success("Login successfull!");
          localStorage.setItem("isSubadmin","subAdmin")
          window.dispatchEvent(new Event("storage"));
          navigate("/home");
        }
        else{
          message.error("Login Denied!")
        }
      } else {
        message.error("Only numbers allowed!");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error?.response?.data?.message||"Something went wrong!");
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
                style={{ height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div
              className="row justify-content-center align-items-center mx-0"
              style={{ height: "100vh" }}
            >
              <div className="col-lg-5">
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
                    OTP <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />

                  <Input.OTP
                    length={4}
                    inputMode="numeric"
                    onChange={(value) => setData(value)}
                  />

                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="login"
                      onClick={handleOtp}
                    >
                      Submit
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

export default SubAdminOTP;
