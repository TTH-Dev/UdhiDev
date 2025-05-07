import { NavLink, Outlet } from "react-router-dom";

const OTDoctorNotes = () => {
    const nav = [
      
        {
          name: "Anterior Segment",
          path: "operation-theater-anterior-segment",
        },
        {
          name: "Posterior Segment",
          path: "operation-theater-posterior-segment",
        },
        {
          name: "Provisional Diagnosis",
          path: "operation-theater-provisional-diagnosis",
        },
      ];
      

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav-m mt-5 mx-3">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/operation-theater/pre-operation/pre-operation-setup/doctor-notes/${item.path}`}
            className="emr-link-mh ms-3"
          >
            <span className="mx-3 my-3 create-emr-nav text-wrap d-inline-block">
              {item.name}
            </span>
          </NavLink>
        ))}
        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
   
      </div>
    </>
  );
};

export default OTDoctorNotes;
