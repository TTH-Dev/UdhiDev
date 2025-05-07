import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import RWardManagement from "./wardReportTabs/RWardManagement";
import RAdmissionRecords from "./wardReportTabs/RAdmissionRecords";
import RFeedBack from "./wardReportTabs/RFeedBack";
import RInjectionReport from "./wardReportTabs/RInjectionReport";
import RDisposalReport from "./wardReportTabs/RDisposalReport";

const WardReport = () => {
  return (
    <div className="mx-2 mb-5">
      <Tabs
        defaultActiveKey="Ward Management"
        id="uncontrolled-tab-example"
        className=""
      >
        <Tab title="Ward Management" eventKey="Ward Management">
          <RWardManagement />
        </Tab>

        <Tab title="Admission Record" eventKey="Admission Record">
          <RAdmissionRecords />
        </Tab>

        <Tab title="Feedback" eventKey="Feedback">
          <RFeedBack />{" "}
        </Tab>

        <Tab title="Injection Report" eventKey="Injection Report">
          <RInjectionReport />{" "}
        </Tab>

        <Tab title="Disposal Report" eventKey="Disposal Report">
          <RDisposalReport />{" "}
        </Tab>
      </Tabs>
    </div>
  );
};

export default WardReport;
