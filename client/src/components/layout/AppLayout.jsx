// src/components/layout/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // or wherever your navigation elements live

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-dark-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {/* CRITICAL: This is where child route elements inject dynamically */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AppLayout;
