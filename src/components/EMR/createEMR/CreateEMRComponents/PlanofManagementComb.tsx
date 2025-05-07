import React, { lazy, Suspense } from "react";
import { Collapse, Spin } from "antd";

const CPlanofmanagement = lazy(() => import("./CPlanofmanagement"));
const PrescribeTest = lazy(() => import("./PrescribeTests"));
const LabReports = lazy(() => import("./LabReports"));
const Attachments = lazy(() => import("./Attachments"));
const Prescriptions = lazy(() => import("./Prescriptions"));

const { Panel } = Collapse;

const PlanofManagementComb: React.FC = () => {
  return (
    <Collapse accordion expandIcon={() => null} className="custom-collapse">
      <Panel header="Plan of Management" key="1" className="accord-label">
        <Suspense fallback={<Spin />}>
          <CPlanofmanagement />
        </Suspense>
      </Panel>
      <Panel header="Prescribe Test" key="2" className="accord-label">
        <Suspense fallback={<Spin />}>
          <PrescribeTest />
        </Suspense>
      </Panel>

      <Panel header="Lab Reports" key="3" className="accord-label">
        <Suspense fallback={<Spin />}>
          <LabReports />
        </Suspense>
      </Panel>
      <Panel header="Attachments" key="4" className="accord-label">
        <Suspense fallback={<Spin />}>
          <Attachments />
        </Suspense>
      </Panel>
      <Panel header="Prescription" key="5" className="accord-label">
        <Suspense fallback={<Spin />}>
          < Prescriptions/>
        </Suspense>
      </Panel>
    </Collapse>
  );
};

export default PlanofManagementComb;
