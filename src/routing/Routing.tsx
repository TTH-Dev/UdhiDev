import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "../Sidebar";
import Home from "../components/Home";
import EMR from "../components/EMR/EMR";
import ChiefComplaint from "../components/EMR/createEMR/CreateEMRComponents/ChiefComplaint";
import Vitals from "../components/EMR/createEMR/CreateEMRComponents/Vitals";
import Diagnosis from "../components/EMR/createEMR/CreateEMRComponents/Diagnosis";
import MedicalHistory from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory";
import Examination from "../components/EMR/createEMR/CreateEMRComponents/Examination";
import Attachments from "../components/EMR/createEMR/CreateEMRComponents/Attachments";
import PrescribeTests from "../components/EMR/createEMR/CreateEMRComponents/PrescribeTests";
import LabResults from "../components/EMR/createEMR/CreateEMRComponents/LabReports";
import Prescriptions from "../components/EMR/createEMR/CreateEMRComponents/Prescriptions";
import SummaryPrint from "../components/EMR/createEMR/CreateEMRComponents/SummaryPrint";
import Allergies from "../components/EMR/createEMR/CreateEMRComponents/Allergies";
import HistoryofPresentIllness from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/HistoryofPresentIllness";
import PastHistory from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/PastHistory";
import TayerOrganInvolvement from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/TayerOrganInvolvement";
import RenalHistory from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/RenalHistory";
import PersonalHistory from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/PersonalHistory";
import IPAdmission from "../components/EMR/createEMR/CreateEMRComponents/IPAdmission";
import ThisVisit from "../components/EMR/createEMR/CreateEMRComponents/SummaryAndPrint/ThisVisit";
import PastVisit from "../components/EMR/createEMR/CreateEMRComponents/SummaryAndPrint/PastVisit";
import CreateEMR from "../components/EMR/createEMR/CreateEMRTemp";
import ManageEMR from "../components/EMR/ManageEMR/ManageEMRTemp";
import MAllergies from "../components/EMR/ManageEMR/ManageEMRComponents/MAllergies";
import MAttachments from "../components/EMR/ManageEMR/ManageEMRComponents/MAttachments";
import MChiefComplaint from "../components/EMR/ManageEMR/ManageEMRComponents/MChiefComplaint";
import MDiagnosis from "../components/EMR/ManageEMR/ManageEMRComponents/MDiagnosis";
import MExamination from "../components/EMR/ManageEMR/ManageEMRComponents/MExamination";
import MIPAdmission from "../components/EMR/ManageEMR/ManageEMRComponents/MIPAdmission";
import MLabResults from "../components/EMR/ManageEMR/ManageEMRComponents/MLabResults";
import MMedicalHistory from "../components/EMR/ManageEMR/ManageEMRComponents/MMedicalHistory";
import MPrescribeTests from "../components/EMR/ManageEMR/ManageEMRComponents/MPrescribeTests";
import MPrescriptions from "../components/EMR/ManageEMR/ManageEMRComponents/MPrescriptions";
import MSummaryPrint from "../components/EMR/ManageEMR/ManageEMRComponents/MSummaryPrint";
import MVitals from "../components/EMR/ManageEMR/ManageEMRComponents/MVitals";
import MHistoryofPresentIllness from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MHistoryofPresentIllness";
import MPastHistory from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MPastHistory";
import MPersonalHistory from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MPersonalHistory";
import MRenalHistory from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MRenalHistory";
import MTayerOrganInvolvement from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MTayerOrganInvolvement";
import MPastVisit from "../components/EMR/ManageEMR/ManageEMRComponents/ManageSummaryAndPrint/MPastVisit";
import DiabetesandItsComplication from "../components/EMR/createEMR/CreateEMRComponents/MedicalHistory/DiabetiesanditsComplication";
import MDiabetesandItsComplication from "../components/EMR/ManageEMR/ManageEMRComponents/ManageMedicalHistory/MDiabetiesanditsComplication";
import DoctorsAvailability from "../components/Doctors/DoctorsAvailability";
import DoctorsAppointment from "../components/Doctors/DoctorsAppointment";
import ConsultancyFees from "../components/Doctors/ConsultancyFees";
import DoctorsManagement from "../components/Doctors/DoctorsManagement";
import DoctorsMain from "../components/Doctors/DoctorsMain";
import DoctorsDetails from "../components/Doctors/DoctorsDetails";
import AddDoctors from "../components/Doctors/AddDoctors";
import AddConsultancyFees from "../components/Doctors/AddConsultancyFees";
import AddTiming from "../components/Doctors/AddTiming";
import OutPatientMain from "../components/OutPatient/OutPatientMain";
import OPManagement from "../components/OutPatient/OPManagement";
import OutPatientDetails from "../components/OutPatient/OutPatientDetails";
import OPAppointment from "../components/OutPatient/OPAppointment";
import AddOutPatient from "../components/OutPatient/AddOutPatient";
import NavPatientDetails from "../components/OutPatient/NavPatientDetails";
import NavAddOutPatient from "../components/OutPatient/NavAddOutPatient";
import OPBilling from "../components/OutPatient/OPBilling";
import CreateBill from "../components/OutPatient/CreateBill";
import Login from "../components/Login/Login";
import Forgetpass from "../components/Login/Forgetpass";
import Header from "../components/Header";
import AssociatedComplaints from "../components/EMR/createEMR/CreateEMRComponents/AssociatedComplaints";
import HistoryOfMajorIllness from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/HistoryOfMajorIllness";
import Typeofallergies from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/Typeofallergies";
import NutritionalAssessment from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/NutritionalAssessment";
import ImmunizationForAdults from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/ImmunizationForAdults";
import FamilyHistory from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/FamilyHistory";
import RecentInvestigations from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/RecentInvestigations";
import ScreenUsage from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/ScreenUsage";
import AnyRegularMedication from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/AnyRegularMedication";
import PreviousSurgeries from "../components/EMR/createEMR/CreateEMRComponents/PastHistory/PreviousSurgeries";
import PastHistorys from "../components/EMR/createEMR/CreateEMRComponents/PastHistorys";
import PosteriorSegment from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/PosteriorSegment";
import AnteriorSegment from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/AnteriorSegment";
import CoverTest from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/CoverTest";
import OcularMovements from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/OcularMovements";
import ColorVision from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/ColorVision";
import NonContactTonoMetry from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/NonContactTonoMetry";
import OtherRoutineTestMain from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutinetestMain";
import PastOcularHistory from "../components/EMR/createEMR/CreateEMRComponents/PastOcularHistory";
import Refractionsheet from "../components/EMR/createEMR/CreateEMRComponents/Refractionsheet";
import MAssociatedComplaints from "../components/EMR/ManageEMR/ManageEMRComponents/MAssociatedComplaints";
import MPastHistorys from "../components/EMR/ManageEMR/ManageEMRComponents/MPastHistorys";
import MHistoryOfMajorIllness from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MHistoryOfMajorIllness";
import MTypeofallergies from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MTypeofallergies";
import MNutritionalAssessment from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MNutritionalAssessment";
import MImmunizationForAdults from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MImmunizationForAdults";
import MFamilyHistory from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MFamilyHistory";
import MRecentInvestigations from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MRecentInvestigations";
import MScreenUsage from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MScreenUsage";
import MAnyRegularMedication from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MAnyRegularMedication";
import MPreviousSurgeries from "../components/EMR/ManageEMR/ManageEMRComponents/PastHistory/MPreviousSurgeries";
import MRefractionSheet from "../components/EMR/ManageEMR/ManageEMRComponents/MRefractionSheet";
import MOcularHistory from "../components/EMR/ManageEMR/ManageEMRComponents/MOcularHistory";
import MOtherRoutineTestsMain from "../components/EMR/ManageEMR/ManageEMRComponents/MOtherRoutineTestsMain";
import MNonContactTonoMetry from "../components/EMR/ManageEMR/ManageEMRComponents/ManageOtherRoutineTest/MNonContactTonoMetry";
import MColorVision from "../components/EMR/ManageEMR/ManageEMRComponents/ManageOtherRoutineTest/MColorVision";
import MOcularMovements from "../components/EMR/ManageEMR/ManageEMRComponents/ManageOtherRoutineTest/MOcularMovements";
import MCoverTest from "../components/EMR/ManageEMR/ManageEMRComponents/ManageOtherRoutineTest/MCoverTest";
import MConfrontation from "../components/EMR/ManageEMR/ManageEMRComponents/ManageOtherRoutineTest/MConfrontation";
import Confrontation from "../components/EMR/createEMR/CreateEMRComponents/OtherRoutineTest/CONFRONTATION";
import OPreviousSurgeries from "../components/Optometry/OptometryComp/OPastHistory/OPreviousSurgeries";
import OAnyRegularMedication from "../components/Optometry/OptometryComp/OPastHistory/OAnyRegularMedication";
import OScreenUsage from "../components/Optometry/OptometryComp/OPastHistory/OScreenUsage";
import ORecentInvestigations from "../components/Optometry/OptometryComp/OPastHistory/ORecentInvestigations";
import OFamilyHistory from "../components/Optometry/OptometryComp/OPastHistory/OFamilyHistory";
import OImmunizationForAdults from "../components/Optometry/OptometryComp/OPastHistory/OImmunizationForAdults";
import ONutritionalAssessment from "../components/Optometry/OptometryComp/OPastHistory/ONutritionalAssessment";
import OTypeofallergies from "../components/Optometry/OptometryComp/OPastHistory/OTypeofallergies";
import OHistoryOfMajorIllness from "../components/Optometry/OptometryComp/OPastHistory/OHistoryOfMajorIllness";
import OPastHistorys from "../components/Optometry/OptometryComp/OPastHistorys";
import OPosteriorSegment from "../components/Optometry/OptometryComp/OOtherRoutineTest/OPosteriorSegment";
import OAnteriorSegment from "../components/Optometry/OptometryComp/OOtherRoutineTest/OAnteriorSegment";
import OCoverTest from "../components/Optometry/OptometryComp/OOtherRoutineTest/OCoverTest";
import OColorVision from "../components/Optometry/OptometryComp/OOtherRoutineTest/OColorVision";
import ONonContactTonoMetry from "../components/Optometry/OptometryComp/OOtherRoutineTest/ONonContactTonoMetry";
import OOtherRoutinetestMain from "../components/Optometry/OptometryComp/OOtherRoutinetestMain";
import OAssociatedComplaints from "../components/Optometry/OptometryComp/OAssociatedComplaints";
import OChiefComplaint from "../components/Optometry/OptometryComp/OChiefComplaint";
import ORefractionsheet from "../components/Optometry/OptometryComp/ORefractionsheet";
import OPastOcularHistory from "../components/Optometry/OptometryComp/OPastOcularHistory";
import OptometryTemp from "../components/Optometry/OptometryTemp";
import OOPDetails from "../components/Optometry/OOPDetails";
import BillingMain from "../components/Billing/BillingMain";
import OPbills from "../components/Billing/OPbills";
import IPbills from "../components/Billing/IPbills";
import DueBills from "../components/Billing/DueBills";
import AddOPBills from "../components/Billing/AddOPBills";
import LaboratoryMain from "../components/Laboratory/LaboratoryMain";
import OPIPTest from "../components/Laboratory/OPIPTest";
import Products from "../components/Laboratory/Products";
import Vendor from "../components/Laboratory/Vendor";
import Purchase from "../components/Laboratory/Purchase";
import QualityStandard from "../components/Laboratory/QualityStandard";
import TestSetup from "../components/Laboratory/TestSetup";
import Report from "../components/Laboratory/Report";
import EditOPIPtest from "../components/Laboratory/EditOPIPtest";
import AddProduct from "../components/Laboratory/AddProduct";
import AddProductUsageMonitor from "../components/Laboratory/AddProductUsageMonitor";
import AddTestSetup from "../components/Laboratory/AddTestSetup";
import Servicebilling from "../components/Pharmacy/Servicebilling";
import PharmacyMain from "../components/Pharmacy/PharmacyMain";
import EditServiceBilling from "../components/Pharmacy/EditServiceBilling";
import OConfrontation from "../components/Optometry/OptometryComp/OOtherRoutineTest/OConfrontation";
import ProvisionalDiagnosis from "../components/EMR/createEMR/CreateEMRComponents/ProvisionalDiagnosis";
import SettingMain from "../components/Setting/SettingMain";
import AdminInfo from "../components/Setting/AdminInfo";
import OrgInfo from "../components/Setting/OrgInfo";
import Subadmin from "../components/Setting/Subadmin";
import AddSubAdmin from "../components/Setting/AddSubadmin";
import MProvisionalDiagnosis from "../components/EMR/ManageEMR/ManageEMRComponents/MProvisionalDiagnosis";
import MPlanOfManagement from "../components/EMR/ManageEMR/ManageEMRComponents/MPlanOfManagement";
import Otp from "../components/Login/Otp";
import SubadminLogin from "../components/Login/Subadmin";
import PasswordUpdate from "../components/Login/PasswordUpdate";
import { useEffect, useState } from "react";
import AddVendor from "../components/Laboratory/AddVendor";
import OLasik from "../components/Optometry/OptometryComp/OLasik";
import OGlaucoma from "../components/Optometry/OptometryComp/OGlaucoma";
import OContact from "../components/Optometry/OptometryComp/OContact";
import Osquint from "../components/Optometry/OptometryComp/OSquint";
import Notes from "../components/Optometry/OptometryComp/ONotes";
import OptometryComb from "../components/EMR/createEMR/CreateEMRComponents/OptometryComb";
import InventoryTemp from "../components/Inventory/InventoryTemp";
import IProductDetail from "../components/Inventory/ProductDetail.tsx/IProductDetail";
import IVendorDetail from "../components/Inventory/VendorDetail/IVendorDetail";
import IPurchaseOrderTemp from "../components/Inventory/PurchaseOrder/IPurchaseOrderTemp";
import IAddProduct from "../components/Inventory/ProductDetail.tsx/IAddProduct";
import IAddVendor from "../components/Inventory/VendorDetail/IAddVendor";
import IViewVendor from "../components/Inventory/VendorDetail/IViewVendor";
import DoctorNotesComb from "../components/EMR/createEMR/CreateEMRComponents/DoctorNotesComb";
import PlanofManagementComb from "../components/EMR/createEMR/CreateEMRComponents/PlanofManagementComb";
import MDoctorNotes from "../components/EMR/ManageEMR/ManageEMRComponents/MDoctorNotes/MDoctorNotesMain";
import MSheets from "../components/EMR/ManageEMR/ManageEMRComponents/MSheets";
import OOcularMovements from "../components/Optometry/OptometryComp/OOtherRoutineTest/OOcularMovements";
import MVisitDetails from "../components/EMR/ManageEMR/ManageEMRComponents/ManageSummaryAndPrint/MVisitDetails";
import MAnteriorSegment from "../components/EMR/ManageEMR/ManageEMRComponents/MDoctorNotes/MAnteriorSegment";
import MPosteriorSegment from "../components/EMR/ManageEMR/ManageEMRComponents/MDoctorNotes/MPosteriorSegment";
import SubAdminOTP from "../components/Login/SubAdminOTP";
import Nursing from "../components/Nursing/Nursing";
import NursingDetails from "../components/Nursing/NursingDetails";
import OpticalPatient from "../components/Optical/OpticalPatient";
import OpticalVendor from "../components/Optical/OpticalVendor";
import OpticalPurchase from "../components/Optical/OpticalPurchase";
import OpticalReport from "../components/Optical/OpticalReport";
import OpticalMain from "../components/Optical/OpticalMain";
import OpticalPatientDetails from "../components/Optical/OpticalPatientDetails";
import OpticalProductMain from "../components/Optical/OpticalProductMain";
import AddFrame from "../components/Optical/AddFrame";
import AddLens from "../components/Optical/AddLens";
import AddVendorFrame from "../components/Optical/AddVendorFrame";
import AddVendorLens from "../components/Optical/AddVendorLens";
import VendorProduct from "../components/Optical/VendorProduct";
import OOptical from "../components/Optometry/OptometryComp/OOptical";
import WardManagement from "../components/ward/WardManagement";
import WardSetUp from "../components/ward/WardSetUp";
import WardReport from "../components/ward/WardReport";
import WardMain from "../components/ward/WardMain";
import PreOperation from "../components/OperationTheater/PreOperation";
import OperationTheaterMain from "../components/OperationTheater/OperationTheaterMain";
import PatientManagement from "../components/InPatient/PatientManagement";
import IpBilling from "../components/InPatient/IpBilling";
import NewIp from "../components/InPatient/NewIp";
import InPatientMain from "../components/InPatient/InPatientMain";
import TPAprescription from "../components/TPAmanagement/TPA/TpaPatient/TPAprescription";
import TPAdischargeSummary from "../components/TPAmanagement/TPA/TpaPatient/TPAdischargeSummary";
import TPAbilling from "../components/TPAmanagement/TPA/TpaPatient/TPAbilling";
import TPApatientTemp from "../components/TPAmanagement/TPA/TpaPatient/TPApatientTemp";
import TPAmanagementMain from "../components/TPAmanagement/TPAmangementMain";
import PreAuthorizationFormMain from "../components/TPAmanagement/TPA/TpaPatient/PreAuthorizationForm/PreAuthorizationFormMain";
import OBiometryworkupSheet from "../components/Optometry/OptometryComp/OBiometryworkupSheet";
import SurgeryManagement from "../components/counsellor/SurgeryManagement";
import TestResult from "../components/counsellor/TestResult";
import SuggestedTestsComb from "../components/counsellor/SuggestedTestsComb";
import CNPplanOfManagement from "../components/counsellor/CNPplanOfManagement";
import CnewPatientDetailsMain from "../components/counsellor/CnewPatientDetailsMain";
import CeditReport from "../components/counsellor/CeditReport";
import CReport from "../components/counsellor/CReport";
import CPackageAdd from "../components/counsellor/packageTabs/CPackageAdd";
import PackageMain from "../components/counsellor/PackageMain";
import NewPatient from "../components/counsellor/NewPatient";
import CounsellorMain from "../components/counsellor/CounsellorMain";
import DisChargeMain from "../components/ward/Discharge/DischargeMain";
import DoctorActivity from "../components/ward/Discharge/DoctorActivity";
import NurseActivity from "../components/ward/Discharge/NurseActivity";
import Medicine from "../components/ward/Discharge/Medicine";
import DischargeNote from "../components/ward/Discharge/DischargeNote";
import OTnote from "../components/ward/Discharge/OTnote";
import VitalChart from "../components/ward/NurseActivity/VitalChart";
import Diet from "../components/ward/NurseActivity/Diet";
import Patch from "../components/ward/NurseActivity/Patch";
import PostCare from "../components/ward/NurseActivity/PostCare";
import DischargeConsent from "../components/OperationTheater/preOperation/checklist/DischargeConsent";
import AnesthetistsNotes from "../components/OperationTheater/preOperation/checklist/AnesthetistsNotes";
import SurgicalSafetyCheckList from "../components/OperationTheater/preOperation/checklist/SurgicalSafetyCheckList";
import SurgeryNotesMain from "../components/OperationTheater/preOperation/checklist/SurgeryNotesMain";
import PreOperativeCheckList from "../components/OperationTheater/preOperation/checklist/PreOperativeCheckList";
import AnestheticAssessment from "../components/OperationTheater/preOperation/checklist/AnestheticAssessment";
import AdmissionForm from "../components/OperationTheater/preOperation/checklist/AdmissionForm";
import PreAnestheticFitness from "../components/OperationTheater/preOperation/checklist/PreAnestheticFitness";
import CheckListMain from "../components/OperationTheater/preOperation/CheckListMain";
import CounsellorReport from "../components/OperationTheater/preOperation/CounsellorReport";
import OTPlanOfManagement from "../components/OperationTheater/preOperation/OTPlanofManagement";
import OTProvisionalDiagnosis from "../components/OperationTheater/preOperation/OTDoctorNotes/OTProvisionalDiagnosis";
import OTPosteriorSegment from "../components/OperationTheater/preOperation/OTDoctorNotes/OTPosteriorSegment";
import OTAnteriorSegment from "../components/OperationTheater/preOperation/OTDoctorNotes/OTAnteriorSegment";
import OTDoctorNotes from "../components/OperationTheater/preOperation/OTDoctorNotes/OTDoctorNotesMain";
import PreOperationSetupMain from "../components/OperationTheater/preOperation/PreOperationSetupMain";
import Sterlization from "../components/OperationTheater/surgeryManagement.tsx/operationManagement/Sterlization";
import WardOtUsage from "../components/OperationTheater/surgeryManagement.tsx/operationManagement/WardOtUsage";
import ProductUsage from "../components/OperationTheater/surgeryManagement.tsx/operationManagement/ProductUsage";
import OToperationManagementMain from "../components/OperationTheater/surgeryManagement.tsx/OToperationManagementMain";
import OTNotes from "../components/OperationTheater/surgeryManagement.tsx/OTNotes";
import OTPrescription from "../components/OperationTheater/OTPrescription";
import SMCheckListMain from "../components/OperationTheater/surgeryManagement.tsx/SMCheckListMain";
import OTAssign from "../components/OperationTheater/surgeryManagement.tsx/OTAssign";
import OTSurgeryManagementMain from "../components/OperationTheater/OTSurgeryManagementMain";
import PIAddLens from "../components/OperationTheater/productInductsTabs/PIAddLens";
import OTReportsMain from "../components/OperationTheater/OTReportsMain";
import OTProductIndentsMain from "../components/OperationTheater/OTProductIndentsMain";
import OTSurgeryManagement from "../components/OperationTheater/OTSurgeryManagement";
import PIAddproduct from "../components/OperationTheater/productInductsTabs/PIAddproduct";
import IpReportDetails from "../components/InPatient/IpReportDetails";
import IpReports from "../components/InPatient/IpReports";
import IpCreateBill from "../components/InPatient/IpCreateBill";
import PmSummary from "../components/InPatient/patientMangementTabs/PmSummary";
import PmProcedure from "../components/InPatient/patientMangementTabs/PmProcedure";
import PmBedManagement from "../components/InPatient/patientMangementTabs/PmBedManagement";
import PmPersonalInfo from "../components/InPatient/patientMangementTabs/PmPersonalInfo";
import IPpmPatientDetailsMain from "../components/InPatient/IPpmPatientDetailsMain";
import EditNewIp from "../components/InPatient/EditNewIp";
import AddWard from "../components/ward/AddWard";

const { Content } = Layout;

const Routing: React.FC = () => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const adminToken = localStorage.getItem("authToken");

      if (adminToken) {
        setIsUser(true);
      } else setIsUser(false);
    };

    checkToken();

    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      {!isUser ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sub-admin" element={<SubadminLogin />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/subadmin-otp" element={<SubAdminOTP />} />
            <Route path="/forget-password" element={<Forgetpass />} />
            <Route path="/update-password" element={<PasswordUpdate />} />
          </Routes>
        </>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Content>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/emr" element={<EMR />} />

                {/* optometry */}

                <Route path="/optometry" element={<OOPDetails />} />
                <Route path="/optometry-details" element={<OptometryTemp />}>
                  <Route
                    index
                    element={<Navigate to="chief-complaint" replace />}
                  />

                  <Route
                    path="past-ocular-history"
                    element={<OPastOcularHistory />}
                  />

                  <Route
                    path="refraction-sheet"
                    element={<ORefractionsheet />}
                  />
                  <Route
                    path="biometry-workup-sheet"
                    element={<OBiometryworkupSheet />}
                  />

                  <Route path="chief-complaint" element={<OChiefComplaint />} />

                  <Route path="optical-store" element={<OOptical />} />
                  <Route path="lasik" element={<OLasik />} />
                  <Route path="squint" element={<Osquint />} />
                  <Route path="glaucoma" element={<OGlaucoma />} />
                  <Route path="contact-lens-trail" element={<OContact />} />
                  <Route path="notes" element={<Notes />} />
                  <Route
                    path="associated-complaints"
                    element={<OAssociatedComplaints />}
                  />

                  <Route
                    path="other-routine-test"
                    element={<OOtherRoutinetestMain />}
                  >
                    <Route
                      index
                      element={<Navigate to="non-contact-tonometry" replace />}
                    />
                    <Route
                      path="non-contact-tonometry"
                      element={<ONonContactTonoMetry />}
                    />
                    <Route path="color-vision" element={<OColorVision />} />
                    <Route
                      path="ocular-movements"
                      element={<OOcularMovements />}
                    />
                    <Route path="cover-test" element={<OCoverTest />} />
                    <Route
                      path="anterior-segment"
                      element={<OAnteriorSegment />}
                    />
                    <Route
                      path="posterior-segment"
                      element={<OPosteriorSegment />}
                    />
                    <Route path="confrontation" element={<OConfrontation />} />
                  </Route>

                  <Route path="past-history" element={<OPastHistorys />}>
                    <Route
                      index
                      element={
                        <Navigate to="history-of-major-illness" replace />
                      }
                    />
                    <Route
                      path="history-of-major-illness"
                      element={<OHistoryOfMajorIllness />}
                    />
                    <Route
                      path="type-of-allergies"
                      element={<OTypeofallergies />}
                    />
                    <Route
                      path="nutritional-assessment"
                      element={<ONutritionalAssessment />}
                    />
                    <Route
                      path="immunization-for-adults"
                      element={<OImmunizationForAdults />}
                    />
                    <Route path="family-history" element={<OFamilyHistory />} />
                    <Route
                      path="recent-investigations"
                      element={<ORecentInvestigations />}
                    />
                    <Route path="screen-usage" element={<OScreenUsage />} />
                    <Route
                      path="any-regular-medication"
                      element={<OAnyRegularMedication />}
                    />
                    <Route
                      path="previous-surgeries"
                      element={<OPreviousSurgeries />}
                    />
                  </Route>
                </Route>

                {/* Create emr */}

                <Route path="/emr/create-emr" element={<CreateEMR />}>
                  <Route index element={<Navigate to="optometry" replace />} />

                  <Route
                    path="past-ocular-history"
                    element={<PastOcularHistory />}
                  />

                  <Route
                    path="refraction-sheet"
                    element={<Refractionsheet />}
                  />
                  <Route
                    path="provisional-diagnosis"
                    element={<ProvisionalDiagnosis />}
                  />
                  {/* <Route
                    path="plan-of-management"
                    element={<Planofmanagement />}
                  /> */}

                  <Route path="chief-complaint" element={<ChiefComplaint />} />
                  <Route path="optometry" element={<OptometryComb />} />
                  <Route path="doctor-notes" element={<DoctorNotesComb />} />
                  <Route
                    path="plan-of-management"
                    element={<PlanofManagementComb />}
                  />

                  <Route
                    path="associated-complaints"
                    element={<AssociatedComplaints />}
                  />
                  <Route path="create-vitals" element={<Vitals />} />
                  <Route path="create-allergies" element={<Allergies />} />
                  <Route path="create-diagnosis" element={<Diagnosis />} />

                  <Route
                    path="create-medical-history"
                    element={<MedicalHistory />}
                  >
                    <Route
                      index
                      element={
                        <Navigate
                          to="create-history-of-present-illness"
                          replace
                        />
                      }
                    />
                    <Route
                      path="create-history-of-present-illness"
                      element={<HistoryofPresentIllness />}
                    />
                    <Route
                      path="create-past-history"
                      element={<PastHistory />}
                    />
                    <Route
                      path="create-diabetes-complications"
                      element={<DiabetesandItsComplication />}
                    />
                    <Route
                      path="create-tayer-organ-involvement"
                      element={<TayerOrganInvolvement />}
                    />
                    <Route
                      path="create-renal-history"
                      element={<RenalHistory />}
                    />
                    <Route
                      path="create-personal-history"
                      element={<PersonalHistory />}
                    />
                  </Route>

                  <Route
                    path="other-routine-test"
                    element={<OtherRoutineTestMain />}
                  >
                    <Route
                      index
                      element={<Navigate to="non-contact-tonometry" replace />}
                    />
                    <Route
                      path="non-contact-tonometry"
                      element={<NonContactTonoMetry />}
                    />

                    <Route path="confrontation" element={<Confrontation />} />

                    <Route path="color-vision" element={<ColorVision />} />
                    <Route
                      path="ocular-movements"
                      element={<OcularMovements />}
                    />
                    <Route path="cover-test" element={<CoverTest />} />
                    <Route
                      path="anterior-segment"
                      element={<AnteriorSegment />}
                    />
                    <Route
                      path="posterior-segment"
                      element={<PosteriorSegment />}
                    />
                  </Route>

                  <Route path="past-history" element={<PastHistorys />}>
                    <Route
                      index
                      element={
                        <Navigate to="history-of-major-illness" replace />
                      }
                    />
                    <Route
                      path="history-of-major-illness"
                      element={<HistoryOfMajorIllness />}
                    />
                    <Route
                      path="type-of-allergies"
                      element={<Typeofallergies />}
                    />
                    <Route
                      path="nutritional-assessment"
                      element={<NutritionalAssessment />}
                    />
                    <Route
                      path="immunization-for-adults"
                      element={<ImmunizationForAdults />}
                    />
                    <Route path="family-history" element={<FamilyHistory />} />
                    <Route
                      path="recent-investigations"
                      element={<RecentInvestigations />}
                    />
                    <Route path="screen-usage" element={<ScreenUsage />} />
                    <Route
                      path="any-regular-medication"
                      element={<AnyRegularMedication />}
                    />
                    <Route
                      path="previous-surgeries"
                      element={<PreviousSurgeries />}
                    />
                  </Route>

                  <Route path="create-examination" element={<Examination />} />
                  <Route path="attachments" element={<Attachments />} />
                  <Route path="ip-Admission" element={<IPAdmission />} />
                  <Route path="prescribe-tests" element={<PrescribeTests />} />
                  <Route path="lab-results" element={<LabResults />} />
                  <Route path="prescriptions" element={<Prescriptions />} />
                  <Route path="summary-print" element={<SummaryPrint />}>
                    <Route
                      index
                      element={<Navigate to="this-visit" replace />}
                    />
                    <Route path="this-visit" element={<ThisVisit />} />
                    <Route path="visit-details" element={<ThisVisit />} />
                    <Route path="past-visit" element={<PastVisit />} />
                  </Route>
                </Route>

                {/* Manage EMR */}

                <Route path="/emr/manage-emr" element={<ManageEMR />}>
                  <Route
                    index
                    element={<Navigate to="manage-chief-complaint" replace />}
                  />

                  <Route
                    path="manage-past-ocular-history"
                    element={<MOcularHistory />}
                  ></Route>
                  <Route
                    path="manage-other-routine-test"
                    element={<MOtherRoutineTestsMain />}
                  >
                    <Route
                      index
                      element={
                        <Navigate to="manage-non-contact-tonometry" replace />
                      }
                    />
                    <Route
                      path="manage-non-contact-tonometry"
                      element={<MNonContactTonoMetry />}
                    />
                    <Route
                      path="manage-color-vision"
                      element={<MColorVision />}
                    />
                    <Route
                      path="manage-ocular-movements"
                      element={<MOcularMovements />}
                    />
                    <Route
                      path="manage-confrontation"
                      element={<MConfrontation />}
                    />
                    <Route path="manage-cover-test" element={<MCoverTest />} />
                  </Route>
                  <Route path="manage-doctor-notes" element={<MDoctorNotes />}>
                    <Route
                      index
                      element={
                        <Navigate to="manage-anterior-segment" replace />
                      }
                    />

                    <Route
                      path="manage-anterior-segment"
                      element={<MAnteriorSegment />}
                    />
                    <Route
                      path="manage-posterior-segment"
                      element={<MPosteriorSegment />}
                    />
                    <Route
                      path="manage-provisional-diagnosis"
                      element={<MProvisionalDiagnosis />}
                    />
                  </Route>

                  <Route
                    path="manage-chief-complaint"
                    element={<MChiefComplaint />}
                  />
                  <Route
                    path="manage-associated-complaints"
                    element={<MAssociatedComplaints />}
                  />
                  <Route path="manage-sheets" element={<MSheets />} />
                  <Route path="manage-vitals" element={<MVitals />} />
                  <Route path="manage-allergies" element={<MAllergies />} />
                  <Route path="manage-diagnosis" element={<MDiagnosis />} />

                  <Route
                    path="manage-medical-history"
                    element={<MMedicalHistory />}
                  >
                    <Route
                      index
                      element={
                        <Navigate
                          to="manage-history-of-present-illness"
                          replace
                        />
                      }
                    />
                    <Route
                      path="manage-history-of-present-illness"
                      element={<MHistoryofPresentIllness />}
                    />
                    <Route
                      path="manage-past-history"
                      element={<MPastHistory />}
                    />
                    <Route
                      path="manage-diabetes-complications"
                      element={<MDiabetesandItsComplication />}
                    />
                    <Route
                      path="manage-tayer-organ-involvement"
                      element={<MTayerOrganInvolvement />}
                    />
                    <Route
                      path="manage-renal-history"
                      element={<MRenalHistory />}
                    />
                    <Route
                      path="manage-personal-history"
                      element={<MPersonalHistory />}
                    />
                  </Route>
                  <Route
                    path="manage-refraction-sheet"
                    element={<MRefractionSheet />}
                  />
                  <Route
                    path="manage-plan-of-management"
                    element={<MPlanOfManagement />}
                  />
                  <Route
                    path="manage-provisional-diagnosis"
                    element={<MProvisionalDiagnosis />}
                  />

                  <Route path="manage-past-history" element={<MPastHistorys />}>
                    <Route
                      index
                      element={
                        <Navigate
                          to="manage-history-of-major-illness"
                          replace
                        />
                      }
                    />

                    <Route
                      path="manage-history-of-major-illness"
                      element={<MHistoryOfMajorIllness />}
                    />
                    <Route
                      path="manage-type-of-allergies"
                      element={<MTypeofallergies />}
                    />
                    <Route
                      path="manage-nutritional-assessment"
                      element={<MNutritionalAssessment />}
                    />
                    <Route
                      path="manage-immunization-for-adults"
                      element={<MImmunizationForAdults />}
                    />
                    <Route
                      path="manage-family-history"
                      element={<MFamilyHistory />}
                    />
                    <Route
                      path="manage-recent-investigations"
                      element={<MRecentInvestigations />}
                    />
                    <Route
                      path="manage-screen-usage"
                      element={<MScreenUsage />}
                    />
                    <Route
                      path="manage-any-regular-medication"
                      element={<MAnyRegularMedication />}
                    />
                    <Route
                      path="manage-previous-surgeries"
                      element={<MPreviousSurgeries />}
                    />
                  </Route>

                  <Route path="manage-examination" element={<MExamination />} />
                  <Route path="manage-attachments" element={<MAttachments />} />
                  <Route
                    path="manage-ip-Admission"
                    element={<MIPAdmission />}
                  />
                  <Route
                    path="manage-prescribe-tests"
                    element={<MPrescribeTests />}
                  />
                  <Route path="manage-lab-results" element={<MLabResults />} />
                  <Route
                    path="manage-prescriptions"
                    element={<MPrescriptions />}
                  />
                  <Route
                    path="manage-summary-print"
                    element={<MSummaryPrint />}
                  >
                    <Route
                      index
                      element={<Navigate to="manage-past-visit" replace />}
                    />
                    <Route path="visit-details" element={<MVisitDetails />} />
                    <Route path="manage-past-visit" element={<MPastVisit />} />
                  </Route>
                </Route>

                {/* Doctor */}

                <Route path="/doctors" element={<DoctorsMain />}>
                  <Route
                    index
                    element={<Navigate to="doctors-management" replace />}
                  />
                  <Route
                    path="doctors-management"
                    element={<DoctorsManagement />}
                  />
                  <Route
                    path="doctors-availability"
                    element={<DoctorsAvailability />}
                  />
                  <Route
                    path="doctors-appointment"
                    element={<DoctorsAppointment />}
                  />
                  <Route
                    path="consultancy-fees"
                    element={<ConsultancyFees />}
                  />
                </Route>
                <Route
                  path="/doctors/doctors-management/doctors-details"
                  element={<DoctorsDetails />}
                />
                <Route
                  path="/doctors/doctors-management/add-doctor"
                  element={<AddDoctors />}
                />
                <Route
                  path="/doctors/consultancy-fees/add-fees"
                  element={<AddConsultancyFees />}
                />
                <Route
                  path="/doctors/consultancy-fees/edit-fees"
                  element={<AddConsultancyFees />}
                />
                <Route
                  path="/doctors/doctors-availability/add-timing"
                  element={<AddTiming />}
                />
                <Route
                  path="/doctors/doctors-availability/edit-timing"
                  element={<AddTiming />}
                />

                {/* Out Patient */}

                <Route path="/out-patient" element={<OutPatientMain />}>
                  <Route
                    index
                    element={<Navigate to="op-management" replace />}
                  />
                  <Route path="op-management" element={<OPManagement />} />
                  <Route
                    path="patient-details"
                    element={<NavPatientDetails />}
                  />
                  <Route path="op-appointment" element={<OPAppointment />} />
                  <Route path="op-billing" element={<OPBilling />} />
                </Route>

                <Route
                  path="/out-patient/op-billing/create"
                  element={<CreateBill />}
                />
                <Route
                  path="/out-patient/patient-details/details"
                  element={<NavAddOutPatient />}
                />
                <Route
                  path="/out-patient/op-management/patient-detail"
                  element={<OutPatientDetails />}
                />
                <Route
                  path="/out-patient/op-appointment/patient-detail"
                  element={<OutPatientDetails />}
                />
                <Route
                  path="/out-patient/op-management/add-out-patient"
                  element={<AddOutPatient />}
                />

                <Route path="/billing" element={<BillingMain />}>
                  <Route index element={<Navigate to="op-bills" replace />} />
                  <Route path="op-bills" element={<OPbills />} />
                  <Route path="ip-bills" element={<IPbills />} />
                  <Route path="due-billing" element={<DueBills />} />
                </Route>

                <Route
                  path="/billing/op-bills/add-op-bills"
                  element={<AddOPBills />}
                />

                {/* Laboratory */}

                <Route path="/laboratory" element={<LaboratoryMain />}>
                  <Route index element={<Navigate to="op-ip-test" replace />} />
                  <Route path="op-ip-test" element={<OPIPTest />} />
                  <Route path="products" element={<Products />} />
                  <Route path="vendor" element={<Vendor />} />
                  <Route path="purchase" element={<Purchase />} />
                  <Route
                    path="quality-standard"
                    element={<QualityStandard />}
                  />
                  <Route path="test-setup" element={<TestSetup />} />
                  <Route path="report" element={<Report />} />
                </Route>
                <Route
                  path="/laboratory/op-ip-test/edit-op-ip-test"
                  element={<EditOPIPtest />}
                />
                <Route
                  path="/laboratory/products/add-product"
                  element={<AddProduct />}
                />
                <Route
                  path="/laboratory/products/edit-product"
                  element={<AddProduct />}
                />
                <Route
                  path="/laboratory/vendor/add-vendor"
                  element={<AddVendor />}
                />
                <Route
                  path="/laboratory/vendor/edit-vendor"
                  element={<AddVendor />}
                />
                <Route
                  path="/laboratory/quality-standard/add-product-usage-monitor-info"
                  element={<AddProductUsageMonitor />}
                />
                <Route
                  path="/laboratory/test-setup/add-test-setup"
                  element={<AddTestSetup />}
                />
                <Route
                  path="/laboratory/test-setup/edit-test-setup"
                  element={<AddTestSetup />}
                />

                {/* Pharmacy */}
                <Route path="/pharmacy" element={<PharmacyMain />}>
                  <Route
                    index
                    element={<Navigate to="service-billing" replace />}
                  />
                  <Route path="service-billing" element={<Servicebilling />} />
                </Route>
                <Route
                  path="/pharmacy/service-billing/edit-service-billing"
                  element={<EditServiceBilling />}
                />

                {/* Inventory */}
                <Route path="/inventory" element={<InventoryTemp />}>
                  <Route
                    index
                    element={<Navigate to="product-detail" replace />}
                  />
                  <Route path="product-detail" element={<IProductDetail />} />
                  <Route path="vendor-detail" element={<IVendorDetail />} />
                  <Route
                    path="purchase-order"
                    element={<IPurchaseOrderTemp />}
                  />
                </Route>
                <Route
                  path="/inventory/product-detail/add-product"
                  element={<IAddProduct />}
                />
                <Route
                  path="/inventory/product-detail/edit-product"
                  element={<IAddProduct />}
                />
                <Route
                  path="/inventory/vendor-detail/add-vendor"
                  element={<IAddVendor />}
                />
                <Route
                  path="/inventory/vendor-detail/edit-vendor"
                  element={<IAddVendor />}
                />
                <Route
                  path="/inventory/vendor-detail/view-vendor"
                  element={<IViewVendor />}
                />

                {/* Setting */}
                <Route path="/setting" element={<SettingMain />}>
                  <Route index element={<Navigate to="admin-info" replace />} />
                  <Route path="admin-info" element={<AdminInfo />} />
                  <Route path="organization-info" element={<OrgInfo />} />
                  <Route path="sub-admin" element={<Subadmin />} />
                </Route>

                {/* Nurse */}

                <Route path="/nurse-station" element={<Nursing />} />
                <Route
                  path="/nurse-station/nursing-procedure"
                  element={<NursingDetails />}
                />

                {/* TPA Management */}
                <Route path="/tpa" element={<TPAmanagementMain />} />

                <Route path="/tpa/tpa-patient" element={<TPApatientTemp />}>
                  <Route index element={<Navigate to="billing" replace />} />
                  <Route path="billing" element={<TPAbilling />} />
                  <Route
                    path="discharge-summary"
                    element={<TPAdischargeSummary />}
                  />
                  <Route
                    path="pre-authorization-form"
                    element={<PreAuthorizationFormMain />}
                  />
                  <Route path="prescription" element={<TPAprescription />} />
                </Route>

                {/* Inpatient */}

             
                {/* Inpatient */}

                <Route path="/in-patient" element={<InPatientMain />}>
                  <Route index element={<Navigate to="new-ip" replace />} />
                  <Route path="new-ip" element={<NewIp />} />
                  <Route path="new-ip/edit-new-ip" element={<EditNewIp />} />
                  <Route path="ip-billing" element={<IpBilling />} />
                  <Route
                    path="patient-management"
                    element={<PatientManagement />}
                  />
                  <Route
                    path="patient-management/patient-details"
                    element={<IPpmPatientDetailsMain />}
                  >
                    <Route
                      index
                      element={<Navigate to="personal-info" replace />}
                    />
                    <Route path="personal-info" element={<PmPersonalInfo />} />
                    <Route
                      path="bed-management"
                      element={<PmBedManagement />}
                    />
                    <Route path="procedure" element={<PmProcedure />} />
                    <Route path="summary" element={<PmSummary />} />
                  </Route>
                  <Route
                    path="ip-billing/create-bill"
                    element={<IpCreateBill />}
                  />
                  <Route path="reports" element={<IpReports />} />
                  <Route
                    path="reports/report-details"
                    element={<IpReportDetails />}
                  />
                </Route>

                {/* operation theater */}
                <Route
                  path="/operation-theater"
                  element={<OperationTheaterMain />}
                >
                  <Route
                    index
                    element={<Navigate to="pre-operation" replace />}
                  />
                  <Route path="pre-operation" element={<PreOperation />} />
                  <Route path="surgery-management" element={<OTSurgeryManagement />}/>
                  <Route path="product-indents" element={<OTProductIndentsMain/>}/>
                  <Route path="reports" element={<OTReportsMain/>}/>
                  
                  
  

                </Route>
                  <Route path="operation-theater/product-indents/add-product" element={<PIAddproduct/>}/>
                  <Route path="operation-theater/product-indents/add-lens" element={<PIAddLens/>}/>
                <Route
                  path="/operation-theater/surgery-management/surgery-management-setup"
                  element={<OTSurgeryManagementMain />}
                >
                  <Route index element={<Navigate to="assign" replace />} />
                  <Route path="assign" element={<OTAssign />}/>
                  <Route path="check-list" element={<SMCheckListMain />}/>
                  <Route path="prescription" element={<OTPrescription />}/>
                  <Route path="ot-notes" element={<OTNotes />}/>
                  <Route path="operation-management" element={<OToperationManagementMain />}>
                  <Route index element={<Navigate to="product-usage" replace />} />

                  <Route path="product-usage" element={<ProductUsage />}/>
                  <Route path="ward-ot-usage" element={<WardOtUsage/>}/>
                  <Route path="sterlization" element={<Sterlization />}/>
                  
                  
                  </Route>
                  <Route path="doctor-notes" element={<OTDoctorNotes />}>
                    <Route
                      index
                      element={
                        <Navigate to="operation-theater-anterior-segment" replace />
                      }
                    />

                    <Route
                      path="operation-theater-anterior-segment"
                      element={<OTAnteriorSegment />}
                    />
                    <Route
                      path="operation-theater-posterior-segment"
                      element={<OTPosteriorSegment />}
                    />
                    <Route
                      path="operation-theater-provisional-diagnosis"
                      element={<OTProvisionalDiagnosis />}
                    />
                  </Route>
                  
                  
                  
                  
                  <Route path="plan-of-management" element={<OTPlanOfManagement />}/>
                  <Route path="counsellor-report" element={<CounsellorReport />}/>

                  <Route path="check-list" element={<CheckListMain />}>
                    <Route
                      index
                      element={<Navigate to="pre-anesthetic-fitness" replace />}
                    />
                  <Route path="pre-anesthetic-fitness" element={<PreAnestheticFitness/>} />
                  <Route path="admission-form" element={<AdmissionForm/>} />
                  <Route path="pre-operative-check-list" element={<PreOperativeCheckList/>} />
                  <Route path="anesthetic-assessment" element={<AnestheticAssessment/>} />
                  <Route path="surgery-notes" element={<SurgeryNotesMain/>} />
                  <Route path="surgical-safety-check-list" element={<SurgicalSafetyCheckList />} />
                  <Route path="anesthetist-notes" element={<AnesthetistsNotes/>} />
                  <Route path="discharge-consent" element={<DischargeConsent/>} />
                  <Route path="discharge-summary" element={<TPAdischargeSummary/>} />
                    
                  </Route>
                </Route>

                <Route
                  path="/operation-theater/pre-operation/pre-operation-setup"
                  element={<PreOperationSetupMain />}
                >
                  <Route index element={<Navigate to="optometry" replace />} />
                  <Route path="optometry" element={<OptometryComb />}/>
                  <Route path="doctor-notes" element={<OTDoctorNotes />}>
                    <Route
                      index
                      element={
                        <Navigate to="operation-theater-anterior-segment" replace />
                      }
                    />

                    <Route
                      path="operation-theater-anterior-segment"
                      element={<OTAnteriorSegment />}
                    />
                    <Route
                      path="operation-theater-posterior-segment"
                      element={<OTPosteriorSegment />}
                    />
                    <Route
                      path="operation-theater-provisional-diagnosis"
                      element={<OTProvisionalDiagnosis />}
                    />
                  </Route>
                  
                  
                  
                  
                  <Route path="plan-of-management" element={<OTPlanOfManagement />}/>
                  <Route path="counsellor-report" element={<CounsellorReport />}/>

                  <Route path="check-list" element={<CheckListMain />}>
                    <Route
                      index
                      element={<Navigate to="pre-anesthetic-fitness" replace />}
                    />
                  <Route path="pre-anesthetic-fitness" element={<PreAnestheticFitness/>} />
                  <Route path="admission-form" element={<AdmissionForm/>} />
                  <Route path="pre-operative-check-list" element={<PreOperativeCheckList/>} />
                  <Route path="anesthetic-assessment" element={<AnestheticAssessment/>} />
                  <Route path="surgery-notes" element={<SurgeryNotesMain/>} />
                  <Route path="surgical-safety-check-list" element={<SurgicalSafetyCheckList />} />
                  <Route path="anesthetist-notes" element={<AnesthetistsNotes/>} />
                  <Route path="discharge-consent" element={<DischargeConsent/>} />
                  <Route path="discharge-summary" element={<TPAdischargeSummary/>} />
                    
                  </Route>
                </Route>

                {/* ward main */}
                <Route path="/ward" element={<WardMain />}>
                  <Route
                    index
                    element={<Navigate to="ward-management" replace />}
                  />
                  <Route path="ward-management" element={<WardManagement />} />

                  <Route path="ward-setup" element={<WardSetUp />} />
                  <Route path="ward-report" element={<WardReport />} />
                  <Route path="ward-setup/add-ward" element={<AddWard/>} />
                </Route>

                <Route path="/ward/ward-management" element={<DisChargeMain />}>
                
                  <Route
                    path="doctor-activity"
                    element={<DoctorActivity />}
                  ></Route>
                  <Route path="nurse-activity" element={<NurseActivity />}>
                    <Route
                      index
                      element={<Navigate to="vital-chart" replace />}
                    />

                    <Route path="vital-chart" element={<VitalChart />}></Route>
                    <Route path="diet" element={<Diet />}></Route>
                    <Route path="patch" element={<Patch />}></Route>
                    <Route path="post-care" element={<PostCare />}></Route>
                  </Route>
                  <Route path="medicine" element={<Medicine />}></Route>
                  <Route
                    path="discharge-note"
                    element={<DischargeNote />}
                  ></Route>
                  <Route path="ot-note" element={<OTnote />}></Route>
                </Route>

                {/* counsellor */}
                <Route path="/counsellor" element={<CounsellorMain />}>
                  <Route
                    index
                    element={<Navigate to="new-patient" replace />}
                  />
                  <Route path="new-patient" element={<NewPatient />} />
                  <Route path="package" element={<PackageMain />} />
                  <Route
                    path="package/add-corporate"
                    element={<CPackageAdd />}
                  />
                  <Route path="package/add-general" element={<CPackageAdd />} />
                  <Route
                    path="package/add-insurance"
                    element={<CPackageAdd />}
                  />
                  <Route
                    path="package/edit-corporate"
                    element={<CPackageAdd />}
                  />
                  <Route
                    path="package/edit-general"
                    element={<CPackageAdd />}
                  />
                  <Route
                    path="package/edit-insurance"
                    element={<CPackageAdd />}
                  />
                  <Route path="report" element={<CReport />} />
                  <Route path="report/edit-report" element={<CeditReport />} />

                  <Route
                    path="new-patient/patient-details"
                    element={<CnewPatientDetailsMain />}
                  >
                    <Route
                      index
                      element={<Navigate to="plan-of-management" replace />}
                    />
                    <Route
                      path="plan-of-management"
                      element={<CNPplanOfManagement />}
                    />
                    <Route
                      path="suggest-test"
                      element={<SuggestedTestsComb />}
                    />
                    <Route path="test-result" element={<TestResult />} />
                    <Route
                      path="surgery-management"
                      element={<SurgeryManagement />}
                    />
                  </Route>
                </Route>

                {/* Setting */}
                <Route path="/optical" element={<OpticalMain />}>
                  <Route index element={<Navigate to="patient" replace />} />
                  <Route path="patient" element={<OpticalPatient />} />
                  <Route path="product" element={<OpticalProductMain />} />
                  <Route path="vendor" element={<OpticalVendor />} />
                  <Route path="purchase" element={<OpticalPurchase />} />
                  <Route path="report" element={<OpticalReport />} />
                </Route>
                <Route
                  path="/optical/patient/patient-details"
                  element={<OpticalPatientDetails />}
                />
                <Route
                  path="/optical/product/add-product-frame"
                  element={<AddFrame />}
                />
                <Route
                  path="/optical/product/edit-product-frame"
                  element={<AddFrame />}
                />
                <Route
                  path="/optical/product/add-product-lens"
                  element={<AddLens />}
                />
                <Route
                  path="/optical/product/edit-product-lens"
                  element={<AddLens />}
                />

                <Route
                  path="/optical/vendor/add-vendor-frame"
                  element={<AddVendorFrame />}
                />
                <Route
                  path="/optical/vendor/edit-vendor-frame"
                  element={<AddVendorFrame />}
                />
                <Route
                  path="/optical/vendor/add-vendor-lens"
                  element={<AddVendorLens />}
                />
                <Route
                  path="/optical/vendor/edit-vendor-lens"
                  element={<AddVendorLens />}
                />
                <Route
                  path="/optical/vendor/vendor-details"
                  element={<VendorProduct />}
                />

                <Route
                  path="/setting/sub-admin/add-sub-admin"
                  element={<AddSubAdmin />}
                />
                <Route
                  path="/setting/sub-admin/edit-sub-admin"
                  element={<AddSubAdmin />}
                />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </Router>
  );
};

export default Routing;
