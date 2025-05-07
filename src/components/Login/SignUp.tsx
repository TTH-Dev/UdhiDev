import { Button } from "@mui/material";
import { Divider, Input, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        message.error("All fields required!");
        return;
      }

      if (data.password !== data.confirmPassword) {
        message.error("Password and Confirm Password must be same!");
        return;
      }

      if (!emailRegex.test(data.email)) {
        message.error("Invalid email format!");
        return;
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
                    Welcome ! 👋
                  </p>
                  <h5
                    style={{
                      color: "#595959",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    Register your account
                  </h5>
                  <label
                    className="py-2"
                    style={{
                      color: "#595959",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input
                    placeholder="Enter your name"
                    style={{ height: 40 }}
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
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
                    placeholder="Enter your email"
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
                    placeholder="Enter password"
                    style={{ height: 40 }}
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
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
                    Enter confirm password{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Input.Password
                    placeholder="Enter confirm password"
                    style={{ height: 40 }}
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                  />

                  <div className="text-center mt-4">
                    <Button
                      variant="contained"
                      className="login"
                      onClick={handleSignUp}
                    >
                      Register
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
                      Already have an account? <Link to={"/"}>Login</Link>
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

export default SignUp;
