import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const OToperationManagementMain: React.FC = () => {
  return (
    <>
      <div className="">
      

        <div
          className="act-cont-ot  ms-4"
          style={{ marginBottom: "50px", color: "#595959" }}
        >
          <div className="emr-nav-doc ps-3">
          <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/operation-management/product-usage"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Product Usage
            </NavLink>
          <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/operation-management/ward-ot-usage"

              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Ward & Ot usage
            </NavLink>
          <NavLink
              to="/operation-theater/surgery-management/surgery-management-setup/operation-management/sterlization"

              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Sterilization
            </NavLink>
       
        
          
          </div>
        </div>

        <div className="dynamic-content mt-1">
        
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default OToperationManagementMain;
