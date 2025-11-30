import { useEffect, useState, type ReactNode } from 'react';
import { clearAccessToken, getAccessToken } from '../../utils/store';
import AuthContext, { type AuthJWT } from '../../context/auth';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthJWT | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const auth = decodeJWT(accessToken);
      if (new Date().getTime() > auth.exp * 1000) {
        clearAccessToken();
        return;
      }

      setAuth(auth);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const email = auth?.email ?? null;
  const isSignedIn = auth !== null;

  return (
    <AuthContext.Provider value={{ email, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

const decodeJWT = (token: string): AuthJWT => {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};
