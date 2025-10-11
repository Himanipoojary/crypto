import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoIcon}>🔐</span>
            <span className={styles.logoText}>Dictionary Attack Demo</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/demo" className={styles.navLink}>
            Live Demo
          </Link>
          <Link to="/theory" className={styles.navLink}>
            Theory
          </Link>
          <Link to="/prevention" className={styles.navLink}>
            Prevention
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
