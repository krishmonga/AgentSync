import { useState, useEffect } from "react";
import { Users, FileSpreadsheet, BarChart } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalDistributions: 0,
    recentDistributions: [],
  });

  useEffect(() => {
    console.log("Fetching data...");
  
    fetch("http://localhost:5000/api/distributed-data")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
  
        if (Array.isArray(data)) {
          setStats({
            totalAgents: data.length,  // Since each object seems to be an agent
            totalDistributions: data.reduce((sum, item) => sum + (item.data_count || 0), 0), // Summing all data_count values
            recentDistributions: data.slice(0, 5), // Taking only the first 5 for recent entries
          });
        } else {
          console.error("Unexpected API Response Format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  

  console.log("Component rendered with stats:", stats);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Users className="h-6 w-6 text-gray-400" />}
          title="Total Agents"
          value={stats.totalAgents}
        />

        <StatCard
          icon={<FileSpreadsheet className="h-6 w-6 text-gray-400" />}
          title="Total Distributions"
          value={stats.totalDistributions}
        />

        <StatCard
          icon={<BarChart className="h-6 w-6 text-gray-400" />}
          title="Data Distribution Rate"
          value={stats.totalAgents > 0 ? Math.round(stats.totalDistributions / stats.totalAgents) : 0}
          unit="per agent"
        />
      </div>

      {/* Recent Distributions Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Distributions</h3>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader title="Agent" />
                    <TableHeader title="File Name" />
                    <TableHeader title="Records" />
                    <TableHeader title="Date" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentDistributions.length > 0 ? (
                    stats.recentDistributions.map((distribution) => (
                      <tr key={distribution._id || distribution.id}> {/* ✅ FIXED UNIQUE KEY */}
                        <TableCell value={distribution.agent_name} />
                        <TableCell value={distribution.file_name} />
                        <TableCell value={distribution.data_count} />
                        <TableCell value={new Date(distribution.created_at).toLocaleDateString()} />
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No recent distributions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 📌 Reusable Table Header Component
const TableHeader = ({ title }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {title}
  </th>
);

// 📌 Reusable Table Cell Component
const TableCell = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
);

// 📌 Reusable Stat Card Component
const StatCard = ({ icon, title, value, unit = "" }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5 flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-lg font-medium text-gray-900">
            {value} {unit}
          </dd>
        </dl>
      </div>
    </div>
  </div>
);
