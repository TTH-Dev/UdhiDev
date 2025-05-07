import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const WardMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/ward/ward-management"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Ward Management
          </NavLink>
          <NavLink
            to="/ward/ward-setup"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Ward Setup
          </NavLink>
          <NavLink
            to="/ward/ward-report"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Ward Report
          </NavLink>
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default WardMain;
