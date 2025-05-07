import { NavLink, Outlet } from "react-router-dom";

const NurseActivity = () => {
  return (
    <>
      <div className="emr-complaints-box ms-3 mb-4 rounded p-4">
        <div
          className="cont mb-4 mt-0 ms-4"
          style={{ marginBottom: "100px", color: "#595959",width:"100%" }}
        >
          <div className="emr-nav-doc">
            <NavLink
              to="/ward/ward-management/nurse-activity/vital-chart"
              className={({ isActive }) =>
                `emr-link ${isActive ? "active" : ""}`
              }
            >
              Vital Chart
            </NavLink>
            <NavLink
              to="/ward/ward-management/nurse-activity/diet"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Diet
            </NavLink>
            <NavLink
              to="/ward/ward-management/nurse-activity/patch"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Patch
            </NavLink>
            <NavLink
              to="/ward/ward-management/nurse-activity/post-care"
              className={({ isActive }) =>
                `emr-link ms-3 ${isActive ? "active" : ""}`
              }
            >
              Post Care
            </NavLink>
          </div>
        </div>

        <div className="dynamic-content mt-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NurseActivity;
