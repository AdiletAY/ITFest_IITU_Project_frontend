import { useContext, useEffect } from 'react';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/Header/Header.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';
import { AuthContext } from '@/store/AuthStore.tsx';

function App() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.user) {
      auth?.checkMe();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container min-h-screen px-8 max-[426px]:px-2">
        <AppRouter />
        <Toaster />
      </div>
    </>
  );
}

export default App;
