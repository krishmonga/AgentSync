import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { read, utils } from "xlsx";
import axios from "axios";
import { Upload, FileSpreadsheet, ChevronDown, ChevronUp } from "lucide-react";

export default function DataDistribution() {
  const [agents, setAgents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [distributions, setDistributions] = useState({});
  const [expandedAgent, setExpandedAgent] = useState(null);

  // ✅ Fetch Agents from Backend
  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get("http://localhost:5000/api/agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
        toast.error("Failed to fetch agents.");
      }
    }
    fetchAgents();
  }, []);

  // ✅ Handle File Selection
  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed file types
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file format. Please upload a CSV or XLSX file.");
      return;
    }

    console.log("Selected file:", file.name); // Debugging
    setSelectedFile(file);
  }

  // ✅ Handle Data Distribution
  async function distributeData() {
    if (!selectedFile || agents.length === 0) {
      toast.error("Please select a file and ensure agents are available.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);

        if (!jsonData.length) {
          toast.error("No data found in the file.");
          return;
        }

        // Evenly distribute data among agents
        const chunkSize = Math.ceil(jsonData.length / agents.length);
        const distributedData = agents.map((agent, index) => ({
          agent_id: agent.id, 
          data: jsonData.slice(index * chunkSize, (index + 1) * chunkSize),
        }));

        // ✅ Use FormData to send both file & JSON
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("distributions", JSON.stringify(distributedData));

        // ✅ Send Data to Backend
        const response = await axios.post("http://localhost:5000/api/distribute", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Data distributed successfully");

        // ✅ Update UI
        setDistributions(
          distributedData.reduce((acc, entry) => {
            acc[entry.agent_id] = {
              file_name: selectedFile.name,
              created_at: new Date().toISOString(),
              data: entry.data,
            };
            return acc;
          }, {})
        );

        setSelectedFile(null);
        document.getElementById("fileInput").value = "";
      } catch (error) {
        console.error("Processing Error:", error?.response?.data || error);
        toast.error("Failed to process file.");
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Data Distribution</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-lg font-medium text-gray-900">
          Upload and Distribute Data
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select CSV/XLSX File
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-gray-50 file:text-gray-700
                hover:file:bg-gray-100"
            />
          </div>
          <button
            onClick={distributeData}
            disabled={!selectedFile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 mr-2" />
            Distribute Data
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Distribution History
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="border rounded-lg">
                <button
                  onClick={() =>
                    setExpandedAgent(expandedAgent === agent.id ? null : agent.id)
                  }
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {agent.name}
                    </h4>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                  {expandedAgent === agent.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedAgent === agent.id && distributions[agent.id] && (
                  <div className="px-4 py-3 border-t">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              File Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Records
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {distributions[agent.id]?.file_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {distributions[agent.id]?.data.length} records
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(distributions[agent.id]?.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
