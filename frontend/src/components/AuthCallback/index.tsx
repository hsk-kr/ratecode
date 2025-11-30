import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useQuery from '../../hooks/useQuery';
import { setAccessToken } from '../../utils/store';

const AuthCallback = () => {
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    try {
      const accessToken = query.get('accessToken');
      if (accessToken === null) {
        throw new Error('access token is null');
      }

      setAccessToken(accessToken);
    } finally {
      navigate('/');
    }
  }, []);

  return <>test</>;
};

export default AuthCallback;
