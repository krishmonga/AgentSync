const API_URL = "http://localhost:5000/api/data";

export const distributeData = async (data) => {
  const response = await fetch(`${API_URL}/distribute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Data distribution failed");
  }

  return response.json();
};
