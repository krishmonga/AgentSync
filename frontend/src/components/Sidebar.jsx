import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileSpreadsheet, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'Data Distribution', href: '/data-distribution', icon: FileSpreadsheet },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 min-h-screen p-4">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center px-4 py-3 text-sm rounded-lg',
                location.pathname === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut()}
        className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  );
}