import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const InventoryTemp: React.FC = () => {
  const nav = [
    { name: "Product Detail", path: "product-detail" },
    { name: "Vendor Detail", path: "vendor-detail" },
    { name: "Purchase Order", path: "purchase-order" },
  ];


  return (
    <>
      <div className="cont  pt-5 mt-5">
      
        <div
          className="act-cont-c  ms-4"
          style={{ marginBottom: "100px", color: "#595959" }}
        >
          <div className="emr-section-nav ">
            {nav.map((item, index) => (
              <NavLink
                key={index}
                to={`/inventory/${item.path}`}
                className="emr-link ms-3"
              >
                <span className="ms-1 me-5 my-3 create-emr-nav text-wrap d-inline-block">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </div>



          <div className="dynamic-content mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryTemp;
