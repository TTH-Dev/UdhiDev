import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const InPatientMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/in-patient/new-ip"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            New IP
          </NavLink>
          <NavLink
            to="/in-patient/patient-management"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Patient Management
          </NavLink>
          <NavLink
            to="/in-patient/ip-billing"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            IP Billing
          </NavLink>
          <NavLink
            to="/in-patient/reports"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Reports
          </NavLink>
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default InPatientMain;
