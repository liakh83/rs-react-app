import { Outlet } from 'react-router-dom';

import { ThemeToggle } from '@components/context';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <div className=" max-w-[1280px] mx-auto p-8 text-center ">
        <ThemeToggle />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
