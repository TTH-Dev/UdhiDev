import React, { useState } from "react";
import TPApatient from "./TPA/TPApatient";
import TPAmanagement from "./TPA/TPAmanagement";



const TPAmanagementMain: React.FC = () => {
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
            TPA Patient
          </button>
          <button
            style={{ background: "transparent", border: "none" }}
            className={`emr-link ms-3 ${
              activeTab === "manage" ? "active" : ""
            }`}
            onClick={() => setActiveTab("manage")}
          >
            TPA Management
          </button>
        </div>

        {activeTab === "create" ? <TPApatient /> : <TPAmanagement />}
      </div>
    </div>
  );
};

export default TPAmanagementMain;
