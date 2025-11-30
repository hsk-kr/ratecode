import { createContext } from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  email: string | null;
};

export type AuthJWT = {
  sub: string;
  email: string;
  exp: number;
  iat: number;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
