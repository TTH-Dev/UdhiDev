import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PILensDetail from "./productInductsTabs/PILensDetail";
import PIProductDetail from "./productInductsTabs/PIProductDetail";
import PIReceived from "./productInductsTabs/PIReceived";
import PIRequest from "./productInductsTabs/PIRequest";

const OTProductIndentsMain = () => {
  return (
    <div className="mx-2 mb-5">
      <Tabs
        defaultActiveKey="Product Detail"
        id="uncontrolled-tab-example"
        className="ms-4"
      >
        <Tab title="Product Detail" eventKey="Product Detail">
          <PIProductDetail />
          <PILensDetail />
        </Tab>

        <Tab title="Request" eventKey="Request">
          <PIRequest/>
        </Tab>

        <Tab title="Received" eventKey="Received">
          <PIReceived/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default OTProductIndentsMain;
