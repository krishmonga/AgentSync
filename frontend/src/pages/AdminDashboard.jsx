import { useState } from "react";
import AddAgent from "../components/AddAgent";
import AgentList from "../components/AgentList";

const AdminDashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshAgents = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddAgent onAgentAdded={refreshAgents} />
      <AgentList key={refresh} />
    </div>
  );
};

export default AdminDashboard;
