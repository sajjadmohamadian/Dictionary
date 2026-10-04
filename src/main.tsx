import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto-register service worker for PWA installation & offline functionality in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  const updateSW = registerSW({
    onNeedRefresh() {
      updateSW(true);
    },
    onOfflineReady() {
      console.log('Sözlük PWA is ready for offline use.');
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />);
