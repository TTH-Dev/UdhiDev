import { Tabs, Tab } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import IManualPurchase from "./IManualPurchase";
import IPurchaseApproval from "./IPurchaseApproval";

const PurchaseTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("tab") || "manual-purchase";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    if (location.pathname === "/inventory/purchase-order/") {
      navigate("?tab=manual-purchase", { replace: true });
    }
    setActiveTab(getActiveTab());
  }, [location]);

  const handleSelect = (key: string | null) => {
    if (key) {
      navigate(`?tab=${key}`);
    }
  };

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={handleSelect}
      id="purchase-tabs"
      className="ms-4"
    >
      <Tab eventKey="manual-purchase" title="Manual Purchase">
        <IManualPurchase />
      </Tab>
      <Tab eventKey="purchase-approval" title="Purchase Approval">
        <IPurchaseApproval />
      </Tab>
      {/* <Tab eventKey="purchase-received" title="Purchase Received">
        <IPurchaseReceived />
      </Tab> */}
    </Tabs>
  );
};

export default PurchaseTabs;
