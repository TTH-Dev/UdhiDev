import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const OperationTheaterMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/operation-theater/pre-operation"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            Pre-Operation
          </NavLink>
          <NavLink
            to="/operation-theater/surgery-management"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Surgery Management
          </NavLink>
          <NavLink
            to="/operation-theater/product-indents"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Product Indents
          </NavLink>
          <NavLink
            to="/operation-theater/reports"
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

export default OperationTheaterMain;
