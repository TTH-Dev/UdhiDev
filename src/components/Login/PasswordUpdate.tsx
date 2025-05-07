import { Button } from "@mui/material";
import { Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { api_url } from "../../Config";
import { useNavigate } from "react-router-dom";

const PasswordUpdate = () => {
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate=useNavigate()

  const handlePassword = async () => {
    try {
      if (!data.newPassword || !data.confirmPassword) {
        message.error("All fields required!");
        return;
      }
      if(data.confirmPassword!==data.newPassword){
        message.error("Password mismatch!")
      }
      if(data.newPassword.length<6){
        message.error("Password must be greater than 6 letters!")
      }
      const email=sessionStorage.getItem("userEmail")
      const res=await axios.patch(`${api_url}/api/admin/resetPassword`,{newPassword:data.newPassword,email:email})
    
      if(res.status===200){
        message.success("Password updated successfully!")
      navigate("/")
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
            <div style={{height:"100%"}}>
              <img
                src="/assets/Left side panel.png"
                alt="img"
                className="img-fluid"
                loading="lazy"
                style={{height:"100%",objectFit:"cover"}}
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
                    Enter your new password
                  </h5>
                  <label
                    className="py-2"
                    style={{
                      color: "#595959",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    New Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input.Password
                    value={data.newPassword}
                    onChange={(e) =>
                      setData({ ...data, newPassword: e.target.value })
                    }
                    placeholder="Enter New Password"
                    style={{ height: 40 }}
                  />
                  <label
                    className="py-2"
                    style={{
                      color: "#595959",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                   Confirm Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input.Password
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                    placeholder="Enter Confirm Password"
                    style={{ height: 40 }}
                  />
               
                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="login"
                      onClick={handlePassword}
                    >
                      Update
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

export default PasswordUpdate;
