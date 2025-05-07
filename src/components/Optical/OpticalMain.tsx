import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const OpticalMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/optical/patient"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Patients
          </NavLink>
          <NavLink
            to="/optical/product"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/optical/vendor"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Vendor
          </NavLink>
          <NavLink
            to="/optical/purchase"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Purchase
          </NavLink>
          <NavLink
            to="/optical/report"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Report
          </NavLink>
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default OpticalMain;
