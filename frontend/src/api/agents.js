import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Agents = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  // Fetch agents from backend
  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Failed to load agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle agent creation
  const handleAddAgent = async (e) => {
    e.preventDefault(); // Prevents page refresh
  
    console.log("Adding agent..."); // Debugging
  
    try {
      const response = await axios.post("http://localhost:5000/api/add", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      console.log("Agent added:", response.data);
      toast.success("Agent added successfully!");
      setFormData({ name: "", email: "", mobile: "", password: "" }); // Reset form
      fetchAgents(); // Refresh the list
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error(error.response?.data?.message || "Failed to add agent");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Agents</h2>

      {/* Add Agent Form */}
      <form onSubmit={handleAddAgent} className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Add Agent
        </button>
      </form>

      {/* Agents List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id} className="text-center">
              <td className="border p-2">{agent.name}</td>
              <td className="border p-2">{agent.email}</td>
              <td className="border p-2">{agent.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agents;
