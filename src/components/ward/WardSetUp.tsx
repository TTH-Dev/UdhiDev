import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import WardDetail from "./WardDetail";

const WardSetUp = () => {
  const Floors = 2;

  const FloorNo = Array.from({ length: Floors }, (_, i) => i + 1);
  return (
    <>
      <div className="mx-2 mb-5">
        <Tabs
          defaultActiveKey="Floor 1"
          id="uncontrolled-tab-example"
          className="ms-2"
        >
          {FloorNo.map((val: any) => (
            <Tab title={`Floor ${val}`} key={val} eventKey={`Floor ${val}`}>
              <WardDetail />
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default WardSetUp;
