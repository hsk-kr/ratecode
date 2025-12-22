import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import DefaultLayout from './layouts/DefaultLayout';
import SignIn from './pages/SignIn';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Code from './pages/Code';
import Profile from './pages/Profile';
import AuthCallback from './components/AuthCallback';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './components/AuthProvider';
import Logout from './components/Logout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="auth/callback" element={<AuthCallback />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="policy" element={<PrivacyPolicy />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="logout" element={<Logout />} />
              <Route path="code/:uuid" element={<Code />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
