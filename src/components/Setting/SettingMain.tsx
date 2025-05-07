import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const SettingMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/setting/admin-info"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Admin Info
          </NavLink>
          <NavLink
            to="/setting/organization-info"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Organization Info
          </NavLink>
          <NavLink
            to="/setting/sub-admin"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
          Sub Admin
          </NavLink>
         
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingMain;
