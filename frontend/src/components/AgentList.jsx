import { useState, useEffect } from "react";
import { fetchAgents } from "../api/agents";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const data = await fetchAgents();
      setAgents(data);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
  };

  return (
    <div>
      <h2>Agents List</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - {agent.email} - {agent.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
