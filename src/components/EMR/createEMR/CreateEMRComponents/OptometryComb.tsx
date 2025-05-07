import React, { lazy, Suspense } from "react";
import { Collapse, Spin } from "antd";
const SLasik = lazy(() => import("./sheet/SLasik"));
const SSquint = lazy(() => import("./sheet/SSquint"));
const SGlaucoma = lazy(() => import("./sheet/SGlaucoma"));
const SContact = lazy(() => import("./sheet/SContact"));
const ChiefComplaint = lazy(() => import("./ChiefComplaint"));
const AssociatedComplaints = lazy(() => import("./AssociatedComplaints"));
const PastOcularHistory = lazy(() => import("./PastOcularHistory"));
const HistoryOfMajorIllness = lazy(() => import("./PastHistory/HistoryOfMajorIllness"));
const NutritionalAssessment = lazy(() => import("./PastHistory/NutritionalAssessment"));
const ImmunizationForAdults = lazy(() => import("./PastHistory/ImmunizationForAdults"));
const FamilyHistory = lazy(() => import("./PastHistory/FamilyHistory"));
const RecentInvestigations = lazy(() => import("./PastHistory/RecentInvestigations"));
const ScreenUsage = lazy(() => import("./PastHistory/ScreenUsage"));
const AnyRegularMedication = lazy(() => import("./PastHistory/AnyRegularMedication"));
const PreviousSurgeries = lazy(() => import("./PastHistory/PreviousSurgeries"));
const Typeofallergies = lazy(() => import("./PastHistory/Typeofallergies"));
const Refractionsheet = lazy(() => import("./Refractionsheet"));
const NonContactTonoMetry = lazy(() => import("./OtherRoutineTest/NonContactTonoMetry"));
const ColorVision = lazy(() => import("./OtherRoutineTest/ColorVision"));
const Confrontation = lazy(() => import("./OtherRoutineTest/CONFRONTATION"));
const OcularMovements = lazy(() => import("./OtherRoutineTest/OcularMovements"));
const CoverTest = lazy(() => import("./OtherRoutineTest/CoverTest"));
// const AnteriorSegment = lazy(() => import("./OtherRoutineTest/AnteriorSegment"));
// const PosteriorSegment = lazy(() => import("./OtherRoutineTest/PosteriorSegment"));

const { Panel } = Collapse;

const OptometryComb: React.FC = () => {
  return (
    <Collapse accordion expandIcon={() => null} className="custom-collapse">
      <Panel header="Complaints" key="1" className="accord-label">
        <Suspense fallback={<Spin />}>
          <ChiefComplaint />
          <AssociatedComplaints />
        </Suspense>
      </Panel>

      <Panel header="History" key="2" className="accord-label">
        <Suspense fallback={<Spin />}>
          <PastOcularHistory />
          <HistoryOfMajorIllness />
          <Typeofallergies />
          <NutritionalAssessment />
          <ImmunizationForAdults />
          <FamilyHistory />
          <RecentInvestigations />
          <ScreenUsage />
          <AnyRegularMedication />
          <PreviousSurgeries />
        </Suspense>
      </Panel>

      <Panel header="Refraction Sheet" key="3" className="accord-label">
        <Suspense fallback={<Spin />}>
          <Refractionsheet />
        </Suspense>
      </Panel>

      <Panel header="Other Routine Tests" key="4" className="accord-label">
        <Suspense fallback={<Spin />}>
          <NonContactTonoMetry />
          <ColorVision />
          <Confrontation />
          <OcularMovements />
          <CoverTest />
          {/* <AnteriorSegment />
          <PosteriorSegment /> */}
        </Suspense>
      </Panel>

      <Panel header="Sheet" key="5" className="accord-label">
        <Suspense fallback={<Spin />}>
       <SLasik/>
       <SSquint/>
       <SContact/>
       <SGlaucoma/>
       
        </Suspense>
      </Panel>
    </Collapse>
  );
};

export default OptometryComb;
