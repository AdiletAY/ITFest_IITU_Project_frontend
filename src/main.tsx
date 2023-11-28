import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';
import AuthStore from '@/store/AuthStore.tsx';
import LoadingIndicator from '@/components/ui/loading-indicator.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<LoadingIndicator fullScreen={true} />}>
    <AuthStore>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthStore>
  </Suspense>
);
