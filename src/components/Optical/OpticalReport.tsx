import React from "react";

import { Tab, Tabs } from "react-bootstrap";
import PurchaseUsage from "./PurchaseUsage";
import SalesDetails from "./SalesDetails";

const OpticalReport: React.FC = () => {
  


  return (

    <Tabs
    defaultActiveKey="Product Usage"
    id="uncontrolled-tab-example"
    className="ms-4"
  >
    <Tab eventKey="Product Usage" title="Product Usage">
      <PurchaseUsage/>
    </Tab>
    <Tab eventKey="Sales Report" title="Sales Report">
      <SalesDetails/>
    </Tab>
  </Tabs>
   
  );
};

export default OpticalReport;
