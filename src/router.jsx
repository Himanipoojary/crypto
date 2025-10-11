/**
 * Router Configuration with Lazy Loading
 * Improves initial load time by splitting routes into chunks
 */

import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Demo = lazy(() => import('./pages/Demo'));
const Theory = lazy(() => import('./pages/Theory'));
const Prevention = lazy(() => import('./pages/Prevention'));

// Loading component
const PageLoader = () => (
  <div style={{
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '5px solid #e2e8f0',
      borderTopColor: '#667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

// Wrapper for lazy loaded components
const LazyPage = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
);

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LazyPage><Home /></LazyPage>,
      },
      {
        path: 'demo',
        element: <LazyPage><Demo /></LazyPage>,
      },
      {
        path: 'theory',
        element: <LazyPage><Theory /></LazyPage>,
      },
      {
        path: 'prevention',
        element: <LazyPage><Prevention /></LazyPage>,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

// Error Page Component
function ErrorPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: '#2d3748' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: '#4a5568' }}>
          Page Not Found
        </h2>
        <p style={{ 
          fontSize: '1rem', 
          color: '#718096', 
          marginBottom: '2rem',
          lineHeight: '1.6' 
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)'
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default router;
