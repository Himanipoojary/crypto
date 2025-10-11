/**
 * App Component
 * Root component that wraps the application with layout
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css';

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
