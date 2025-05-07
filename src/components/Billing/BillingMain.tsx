import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const BillingMain: React.FC = () => {
  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav-doc ps-3">
          <NavLink
            to="/billing/op-bills"
            className={({ isActive }) => `emr-link ${isActive ? "active" : ""}`}
          >
            OP Bills
          </NavLink>
          {/* <NavLink
            to="/billing/ip-bills"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            IP Bills
          </NavLink>
          <NavLink
            to="/billing/due-billing"
            className={({ isActive }) =>
              `emr-link ms-3 ${isActive ? "active" : ""}`
            }
          >
            Due Billing
          </NavLink> */}
        </div>
      </div>

      <div className="dynamic-content mt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default BillingMain;
