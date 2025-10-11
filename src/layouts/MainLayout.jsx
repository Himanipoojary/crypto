import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './MainLayout.module.css';

/**
 * MainLayout component - Provides consistent layout structure across all pages
 * Uses React Router's Outlet to render child routes
 */
const MainLayout = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Outlet renders the matched child route component */}
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
