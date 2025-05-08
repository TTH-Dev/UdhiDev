import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import WardDetail from "./WardDetail";


const WardSetUp = () => {
    

  return (
    <>
    <div className="mx-2 mb-5">
    <Tabs
        defaultActiveKey="1stfloor"
        id="uncontrolled-tab-example"
        className="ms-2"
      >
          <Tab title="1stfloor"  eventKey="1stfloor">
            <WardDetail cfloor="1stfloor" />
          </Tab>
          <Tab title="2ndfloor"  eventKey="2ndfloor">

            <WardDetail cfloor="2ndfloor" />
          </Tab>
      </Tabs>

    </div>
      
    </>
  );
};

export default WardSetUp;