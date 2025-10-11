/**
 * Main Entry Point
 * Initializes React application and router
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

// Import global styles
import './styles/globals.css';
import './styles/variables.css';
import './styles/themes/light.css';
import './styles/themes/dark.css';

// Render React application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
