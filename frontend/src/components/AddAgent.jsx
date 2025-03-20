import { useState } from "react";
import { createAgent } from "../api/agents";

const AddAgent = ({ onAgentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  async function addAgent(e) {
    e.preventDefault();
    try {
      const newAgent = { name, email, mobile, password };
      const response = await axios.post("http://localhost:5000/api/agents", newAgent);
      
      setAgents([...agents, response.data]);
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      toast.success("Agent added successfully!");
    } catch (error) {
      console.error("Error adding agent:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add agent");
    }
  }
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAgent(formData);
      alert("Agent added successfully!");
      onAgentAdded(); // Refresh agent list
      setFormData({ name: "", email: "", mobile: "", password: "" });
    } catch (error) {
      alert("Failed to add agent");
    }
  };

  return (
    <div>
      <h2>Add Agent</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
};

export default AddAgent;
