import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Frame from "./Frame";
import Lens from "./Lens";

const OpticalProductMain = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="Frame"
        id="uncontrolled-tab-example"
        className="ms-4"
      >
        <Tab eventKey="Frame" title="Frame">
          <Frame />
        </Tab>
        <Tab eventKey="Lens" title="Lens">
          <Lens />
        </Tab>
      </Tabs>
    </>
  );
};

export default OpticalProductMain;
