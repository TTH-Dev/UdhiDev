import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ManualPurchase from "./ManualPurchase";
import PurchaseApproval from "./PurchaseApproval";

const Purchase = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="Manual Purchase"
        id="uncontrolled-tab-example"
        className="ms-4"
      >
        <Tab eventKey="Manual Purchase" title="Manual Purchase">
          <ManualPurchase />
        </Tab>
        <Tab eventKey="Purchase Approval" title="Purchase Approval">
          <PurchaseApproval />
        </Tab>
        {/* <Tab eventKey="Purchase Received" title="Purchase Received">
      <PurchaseRecieved/>
      </Tab> */}
      </Tabs>
    </>
  );
};

export default Purchase;
