import { useEffect } from 'react';
import { clearAccessToken } from '../../utils/store';

const Logout = () => {
  useEffect(() => {
    clearAccessToken();
  }, []);

  return null;
};

export default Logout;
