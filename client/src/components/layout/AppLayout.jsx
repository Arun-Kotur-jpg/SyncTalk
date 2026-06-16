import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
