import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const DoctorsMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/out-patient/op-management"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            OP Management
          </NavLink>
          <NavLink
            to="/out-patient/op-appointment"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Appointment
          </NavLink>
          <NavLink
            to="/out-patient/patient-details"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Patient Details
          </NavLink>
          <NavLink
            to="/out-patient/op-billing"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            OP Billing
          </NavLink>
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorsMain;
