import { NavLink, Outlet } from "react-router-dom";

const MDoctorNotes = () => {
    const nav = [
      
        {
          name: "Anterior Segment",
          path: "manage-anterior-segment",
        },
        {
          name: "Posterior Segment",
          path: "manage-posterior-segment",
        },
        {
          name: "Provisional Diagnosis",
          path: "manage-provisional-diagnosis",
        },
      ];
      

  return (
    <>
      <div className="emr-section-nav pt-4 mh-nav-m">
        {nav.map((item, index) => (
          <NavLink
            key={index}
            to={`/emr/manage-emr/manage-doctor-notes/${item.path}`}
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

export default MDoctorNotes;
