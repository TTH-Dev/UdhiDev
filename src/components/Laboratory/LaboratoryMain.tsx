import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const LaboratoryMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/laboratory/op-ip-test"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            OP/ IP Test
          </NavLink>
          <NavLink
            to="/laboratory/products"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/laboratory/vendor"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Vendor
          </NavLink>
          <NavLink
            to="/laboratory/purchase"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Purchase
          </NavLink>
          <NavLink
            to="/laboratory/quality-standard"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Quality standard
          </NavLink>
          {/* <NavLink
            to="/laboratory/report"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Report
          </NavLink> */}
          <NavLink
            to="/laboratory/test-setup"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Test Setup
          </NavLink>
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default LaboratoryMain;
