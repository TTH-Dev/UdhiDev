import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import VendorFrame from "./VendorFrame";
import VendorLens from "./VendorLens";

const OpticalVendor = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="Frame"
        id="uncontrolled-tab-example"
        className="ms-4"
      >
        <Tab eventKey="Frame" title="Frame">
          <VendorFrame/>
        </Tab>
        <Tab eventKey="Lens" title="Lens">
          <VendorLens/>
        </Tab>
      </Tabs>
    </>
  );
};

export default OpticalVendor;
