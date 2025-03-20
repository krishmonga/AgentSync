import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserPlus, Trash2 } from "lucide-react";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Fetch agents from the backend
  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get("http://localhost:5000/api/agents"); // ✅ Correct endpoint
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
        toast.error("Failed to load agents");
      }
    }
    fetchAgents();
  }, []);

  // ✅ Add agent to the backend
  async function addAgent(e) {
    e.preventDefault();
    try {
      const newAgent = { name, email, mobile, password };
      const response = await axios.post("http://localhost:5000/api/agents/add", newAgent);
      setAgents([...agents, response.data]); // Update UI with the new agent
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      toast.success("Agent added successfully!");
    } catch (error) {
      console.error("Error adding agent:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add agent");
      alert(JSON.stringify(error.response?.data, null, 2)); // Show error details
    }
  }
  

  // ✅ Delete agent from the backend
  async function deleteAgent(id) {
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`); // ✅ Correct endpoint
      setAgents(agents.filter((agent) => agent._id !== id)); // Update UI
      toast.success("Agent deleted successfully");
    } catch (error) {
      console.error("Error deleting agent:", error.response?.data || error.message);
      toast.error("Failed to delete agent");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Agents</h1>
      </div>

      <form onSubmit={addAgent} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Add New Agent</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </form>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agent.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => deleteAgent(agent._id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
