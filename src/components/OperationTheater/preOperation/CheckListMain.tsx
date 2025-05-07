import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CheckListMain: React.FC = () => {
  return (
    <>
      <div className="">
        <div
          className=" mt-4  ms-4"
          style={{ marginBottom: "50px", color: "#595959" }}
        >
          <div className="emr-nav-doc-cl ps-3">
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/pre-anesthetic-fitness"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Pre Anesthetic Fitness
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/admission-form"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Admission Form
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/pre-operative-check-list"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Pre-Operative Checklist
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/anesthetic-assessment"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Anesthetics Assessment
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/surgery-notes"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
             Surgery Notes
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/surgical-safety-check-list"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
             Surgical Safety Check List
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/anesthetist-notes"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
           Anesthetist Notes 
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/discharge-consent"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
           Discharge Consent
            </NavLink>
            <NavLink
              to="/operation-theater/pre-operation/pre-operation-setup/check-list/discharge-summary"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
           Discharge Summary
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

export default CheckListMain;
