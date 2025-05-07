import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RProductUsage from "./reports/RProductUsage";
import RRequestingProduct from "./reports/RRequestingProduct";
import RSteamSterilization from "./reports/RSteamSterilization";
import RSurgeryDetail from "./reports/RSurgeryDetail";
import RSurgeryTime from "./reports/RSurgeryTime";

const OTReportsMain = () => {
  return (
    <div className="mx-2 mb-5">
      <Tabs
        defaultActiveKey="Surgery Time"
        id="uncontrolled-tab-example"
        className="ms-4"
      >
        <Tab title="Surgery Time" eventKey="Surgery Time">
          <RSurgeryTime/>
        </Tab>
        <Tab title="Surgery Detail" eventKey="Surgery Detail">
          <RSurgeryDetail/>
        </Tab>
        <Tab title="Product Usage" eventKey="Product Usage">
          <RProductUsage/>
        </Tab>
        <Tab title="Steam Sterilization" eventKey="Steam Sterilization">
          <RSteamSterilization/>
        </Tab>
        <Tab title="Requesting Product" eventKey="Requesting Product">
          <RRequestingProduct/>
        </Tab>

      
      </Tabs>
    </div>
  );
};

export default OTReportsMain;



