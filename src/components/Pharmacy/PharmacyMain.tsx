import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const PharmacyMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/pharmacy/service-billing"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Service Billing
          </NavLink>
          <NavLink
            to="/pharmacy/request-indents"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Request Indents
          </NavLink>
          <NavLink
            to="/pharmacy/ip-billing"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            IP Billing
          </NavLink>
         
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default PharmacyMain;
