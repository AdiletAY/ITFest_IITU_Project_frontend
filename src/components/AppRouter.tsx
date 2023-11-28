import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Routing } from '@/services/routing/Routes';
import LoadingIndicator from '@/components/ui/loading-indicator.tsx';

const AppRouter = () => {
  return (
    <Routes>
      {Routing().map((route) => (
        <Route
          key={route.path}
          element={
            <Suspense
              fallback={<LoadingIndicator fullScreen={true} size={100} />}
            >
              {route.element}
            </Suspense>
          }
          path={route.path}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
