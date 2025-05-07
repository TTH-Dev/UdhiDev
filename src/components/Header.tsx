import { Breadcrumb, message } from "antd";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { api_url } from "../Config";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/").filter(Boolean);

  const breadcrumbItems =
    pathSegments.length === 1 && pathSegments[0] === "home"
      ? [
          {
            title: (
              <Link to="/home" style={{ textDecoration: "none" }}>
                HOME
              </Link>
            ),
            key: "home",
          },
        ]
      : [
          {
            title: (
              <Link to="/home" style={{ textDecoration: "none" }}>
                HOME
              </Link>
            ),
            key: "home",
          },
          ...pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return {
              title: (
                <Link to={path} style={{ textDecoration: "none" }}>
                  {segment.toUpperCase().replace(/-/g, " ")}
                </Link>
              ),
              key: segment,
            };
          }),
        ];

  const [data, setData] = useState({
    email: "",
    phoneNo: "",
    role: "",
    name: "",
    profileImage: null,
    position: "",
  });

  const getMe = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/admin/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.admin);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  const [subName,setSubName]=useState("")
  const getSubMe = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      localStorage.clear();
      message.error("Login required!");
      return;
    }
    try {
      const res = await axios.get(`${api_url}/api/subadmin/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.subAdmin);
      setSubName(res.data.subAdmin.fullName)
      
      setData(res.data.subAdmin);
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };


  useEffect(() => {
    const isSubadmin = localStorage.getItem("isSubadmin");

    if (isSubadmin === "subAdmin") {
      getSubMe();
    } else {
      getMe();
    }
  }, []);

  return (
    <div className="cont">
      <div className="head align-items-center">
        <div className="ms-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="user-box me-4">
          {data?.profileImage && (
            <img
              src={`${api_url}/public/images/${data.profileImage}`}
              className="user-img img-fluid"
              alt="img"
              loading="lazy"
            />
          )}
          {data?.name && <p className="pt-3 ps-3 user-text">{data?.name}</p>
          
          }
          {subName && <p className="pt-3 ps-3 user-text">{subName}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
