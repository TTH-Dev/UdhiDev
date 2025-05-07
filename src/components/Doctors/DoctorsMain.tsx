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
            to="/doctors/doctors-management"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Doctors Management
          </NavLink>
          <NavLink
            to="/doctors/doctors-appointment"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Doctors Appointment
          </NavLink>
          <NavLink
            to="/doctors/doctors-availability"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Doctors Availability
          </NavLink>
          <NavLink
            to="/doctors/consultancy-fees"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Consultancy Fees
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
