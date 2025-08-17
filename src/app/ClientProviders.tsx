'use client';
import { Provider } from 'react-redux';

import { ThemeProvider, ThemeToggle } from '@components/Theme';
import { store } from '@redux/store';

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-8 text-center">
          <ThemeProvider>
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </div>
      </div>
    </Provider>
  );
};

export default ClientProviders;
