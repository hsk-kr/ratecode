import Header from '../components/Header';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
