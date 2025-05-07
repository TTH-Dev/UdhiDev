import { Layout, Menu, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaHome, FaHospital, FaHospitalUser } from "react-icons/fa";
import { LogoutOutlined } from "@ant-design/icons";
import { FaArrowsToEye, FaBedPulse, FaHandHoldingMedical, FaHouseChimneyMedical, FaNotesMedical, FaUserDoctor, FaUserInjured, FaUserNurse } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { api_url } from "./Config";
import axios from "axios";
import { PiEyeglassesFill } from "react-icons/pi";
import { IoSettingsOutline, IoStorefront } from "react-icons/io5";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { RiHealthBookFill } from "react-icons/ri";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const [subAdmin, setSubAdmin] = useState(false);
  const [isAccess, setIsAccess] = useState<string[]>([]);

  // Define base paths for menu selection
  const getSelectedKey = () => {
    if (currentPath.startsWith("/home")) return "/home";
    if (currentPath.startsWith("/doctors")) return "/doctors";
    if (currentPath.startsWith("/emr")) return "/emr";
    if (currentPath.startsWith("/out-patient")) return "/out-patient";
    if (currentPath.startsWith("/optometry")) return "/optometry";
    if (currentPath.startsWith("/nurse-station")) return "/nurse-station";
    if (currentPath.startsWith("/optical")) return "/optical";
    if (currentPath.startsWith("/billing")) return "/billing";
    if (currentPath.startsWith("/settings")) return "/settings";
    if (currentPath.startsWith("/laboratory")) return "/laboratory";
    if (currentPath.startsWith("/counsellor")) return "/counsellor";
    if (currentPath.startsWith("/in-patient")) return "/in-patient";
    if (currentPath.startsWith("/ward")) return "/ward";
    if (currentPath.startsWith("/operation-theater")) return "/operation-theater";
    if (currentPath.startsWith("/tpa")) return "/tpa";
    if (currentPath.startsWith("/pharmacy")) return "/pharmacy";
    if (currentPath.startsWith("/inventory")) return "/inventory";
    if (currentPath.startsWith("/setting")) return "/setting";
    return "/home";
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  
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

      const access = res?.data?.subAdmin?.access;
      if (access.length>0) {
        setIsAccess(access); 
        navigate("/home")
      }
    } catch (error: any) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const subAdminCheck = localStorage.getItem("isSubadmin");
    if (subAdminCheck === "subAdmin") {
      setSubAdmin(true);
      getSubMe();
    }
  }, []);

  const menuItems = [
    { key: "/doctors", label: "Doctor", icon: <FaUserDoctor /> },
    { key: "/emr", label: "EMR", icon: <FaNotesMedical /> },
    { key: "/out-patient", label: "Out Patient", icon: <FaUserInjured /> },
    { key: "/optometry", label: "Optometry", icon: <FaBedPulse /> },
    { key: "/nurse-station", label: "Nurse Station", icon: <FaUserNurse /> },
    { key: "/optical", label: "Optical Store", icon: <PiEyeglassesFill /> },
    { key: "/billing", label: "Billing", icon: <FaHandHoldingMedical /> },
    { key: "/counsellor", label: "Counsellor", icon: <FaChalkboardTeacher /> },
    { key: "/in-patient", label: "In Patient", icon: <MdOutlinePersonalInjury /> },
    { key: "/operation-theater", label: "Operation Theater", icon: <FaHospitalUser /> },
    { key: "/ward", label: "Ward", icon:<FaHospital /> },
    { key: "/tpa", label: "TPA Management", icon: <RiHealthBookFill /> },
    { key: "/laboratory", label: "Laboratory", icon: <FaArrowsToEye /> },
    { key: "/pharmacy", label: "Pharmacy", icon: <FaHouseChimneyMedical /> },
    { key: "/inventory", label: "Inventory", icon: <IoStorefront /> },
    { key: "/setting", label: "Setting", icon: <IoSettingsOutline /> },
  ];

  const renderMenuItems = () => {
    const filteredItems = subAdmin
      ? menuItems.filter((item) => isAccess.includes(item.label))
      : menuItems;

    return filteredItems.map(({ key, label, icon }) => (
      <Menu.Item key={key} icon={icon}>
        <Link to={key}>{label}</Link>
      </Menu.Item>
    ));
  };

  return (
    <Sider
      className="sidebar"
      style={{ backgroundColor: "white" }}
      width={250}
    >
      <div
        className="logo"
        style={{
          color: "white",
          textAlign: "center",
          padding: 16,
          backgroundColor: "white",
        }}
      >
        <img src="/assets/logo.png" style={{width:"100px"}}/>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        style={{ backgroundColor: "white",height:"80vh",overflowY:"scroll" ,overflowX:"hidden"}}
      >
         <Menu.Item key="home" icon={<FaHome />}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        {renderMenuItems()}

        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
