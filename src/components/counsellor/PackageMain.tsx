import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CPgeneral from "./packageTabs/CPgeneral";
import CPcorporate from "./packageTabs/CPcorporate";
import CPinsurance from "./packageTabs/CPinsurance";

const PackageMain = () => {
  return (
    <div className="ms-3 me-2 mb-5">
      <Tabs defaultActiveKey="General" id="package-tab-example" className="">
        <Tab eventKey="General" title="General">
          <CPgeneral />
        </Tab>
        <Tab eventKey="Corporate" title="Corporate">
          <CPcorporate />
        </Tab>
        <Tab eventKey="Insurance" title="Insurance">
          <CPinsurance />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PackageMain;
