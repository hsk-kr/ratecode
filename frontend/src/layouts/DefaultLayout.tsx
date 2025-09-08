import Header from '../components/Header';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <div className="w-full max-w-5xl py-8 px-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
