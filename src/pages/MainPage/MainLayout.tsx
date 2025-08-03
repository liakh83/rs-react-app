import { Outlet } from 'react-router-dom';

import { ThemeToggle } from '@components/context';

const MainLayout = () => {
  return (
    <div className="min-h-screen max-w-[1280px] mx-auto p-8 text-center ">
      <ThemeToggle />
      <Outlet />
    </div>
  );
};

export default MainLayout;
