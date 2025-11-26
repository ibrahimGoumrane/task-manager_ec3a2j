import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import TasksPage from '@/pages/TasksPage';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

import { AuthProvider } from '@/hooks/useAuth.tsx';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import AuthLayout from '@/components/AuthLayout';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <AuthProvider>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/tasks' element={
              <AuthLayout>
                <TasksPage />
              </AuthLayout>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;