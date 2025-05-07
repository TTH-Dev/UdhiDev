import React, { useState } from "react";
import CreateEMRMain from "./CreateEMRMain";
import ManageEMRMain from "./ManageEMRMain";

const EMR: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("create");

  return (
    <div className="cont">
      <div
        className="act-cont mt-3 ms-4"
        style={{ marginBottom: "100px", color: "#595959" }}
      >
        <div className="emr-nav">
          <button
            style={{ background: "transparent", border: "none" }}
            className={`emr-link ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create EMR
          </button>
          <button
            style={{ background: "transparent", border: "none" }}
            className={`emr-link ms-3 ${
              activeTab === "manage" ? "active" : ""
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage EMR
          </button>
        </div>

        {activeTab === "create" ? <CreateEMRMain /> : <ManageEMRMain />}
      </div>
    </div>
  );
};

export default EMR;
