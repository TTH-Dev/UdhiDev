import React, { lazy, Suspense } from "react";
import { Collapse, Spin } from "antd";
const LabRequisition = lazy(() => import("./suggestedCombs/LabRequisition"));
const BioMetric = lazy(() => import("./suggestedCombs/BioMetric"));

const { Panel } = Collapse;

const SuggestedTestsComb: React.FC = () => {
  return (
    <div className="my-5 mx-3">
      <Collapse accordion expandIcon={() => null} className="custom-collapse">
        <Panel header="Lab Requisition" key="1" className="accord-label">
          <Suspense fallback={<Spin />}>
            <LabRequisition />
          </Suspense>
        </Panel>

        <Panel header="BioMetric" key="2" className="accord-label">
          <Suspense fallback={<Spin />}>
            <BioMetric />
          </Suspense>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SuggestedTestsComb;
