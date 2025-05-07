import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MSummaryPrint: React.FC = () => {
  const nav = [
    { name: "Past Visit", path: "past-visit" },
  ];

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/create-emr/summary-print/${item.path}`}
            className="emr-link-mh ms-3"
          >
            <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
              {item.name}
            </span>
          </NavLink>
        ))}
        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MSummaryPrint;
