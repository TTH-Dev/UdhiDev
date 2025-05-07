import React, { lazy, Suspense } from "react";
import { Collapse, Spin } from "antd";


const AnteriorSegment = lazy(() => import("./OtherRoutineTest/AnteriorSegment"));
const PosteriorSegment = lazy(() => import("./OtherRoutineTest/PosteriorSegment"));
const ProvisionalDiagnosis = lazy(() => import("./ProvisionalDiagnosis"));

const { Panel } = Collapse;

const OptometryComb: React.FC = () => {
  return (
    <Collapse accordion expandIcon={() => null} className="custom-collapse">
      <Panel header="Anterior Segment" key="1" className="accord-label">
        <Suspense fallback={<Spin />}>
          <AnteriorSegment/>
        </Suspense>
      </Panel>
      <Panel header="Posterior Segment" key="2" className="accord-label">
        <Suspense fallback={<Spin />}>
        
          <PosteriorSegment/>
          
        </Suspense>
      </Panel>
      <Panel header="Provisional  Diagnosis" key="3" className="accord-label">
        <Suspense fallback={<Spin />}>
        
     <ProvisionalDiagnosis/>
          
        </Suspense>
      </Panel>

   
    </Collapse>
  );
};

export default OptometryComb;
