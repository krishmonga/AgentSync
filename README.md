🚀 AgentSync - Agent Data Distribution System

AgentSync is a MERN stack web application that allows an admin to manage agents, upload data files, and distribute records efficiently among agents. The system ensures equal data distribution and provides real-time analytics.

✨ Features
✅ Admin Authentication – Secure login with JWT authentication.
✅ Agent Management – Create, update, and manage agent accounts.
✅ Data Upload & Distribution – Upload CSV/XLSX files & distribute records.
✅ Dashboard Analytics – View statistics on agents, data distribution, and recent uploads.
✅ Role-Based Access – Admins can manage users with different permissions.

🏗️ Tech Stack
Technology	Description
Frontend	React.js (Next.js)
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	JWT (JSON Web Token)
UI Framework	Tailwind CSS
📂 Folder Structure
bash
Copy
Edit
AgentSync/
│── backend/          # Express.js backend
│   ├── controllers/  # API controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── config/       # Environment configurations
│   ├── middleware/   # Authentication & validation middleware
│   ├── index.js      # Entry point
│
│── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # React pages
│   │   ├── hooks/       # Custom hooks
│   │   ├── context/     # Global state management
│   │   ├── App.js       # Main application file
│
│── .gitignore        # Ignored files (node_modules, .env, etc.)
│── README.md         # Project documentation
🛠️ Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/krishmonga/AgentSync.git
cd AgentSync
2️⃣ Backend Setup
sh
Copy
Edit
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start             # Run the backend server
3️⃣ Frontend Setup
sh
Copy
Edit
cd frontend
npm install
npm run dev           # Start the frontend development server
🌐 API Endpoints
Method	Endpoint	Description
POST	/api/auth/login	Admin login
POST	/api/agents	Create a new agent
GET	/api/agents	Get all agents
POST	/api/distribute	Upload and distribute data
GET	/api/distributed-data	Get distributed data
 

🛠️ Contributing
Contributions are welcome! 🎉
If you'd like to contribute, follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature-branch).
Commit your changes (git commit -m "Added new feature").
Push to the branch (git push origin feature-branch).
Open a Pull Request.
🔗 Useful Links
GitHub Repo: AgentSync : https://github.com/krishmonga/AgentSync
📌 Author
👨‍💻 Krish Monga

🌐 GitHub
📧 Email : krishmonga21667@gmail.com
📜 License
This project is licensed under the MIT License. See LICENSE for details.

🔥 Built with ❤️ using the MERN stack! 🚀

