import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.heading}>About This Project</h3>
          <p className={styles.text}>
            An educational demonstration of dictionary attacks against weak hash functions. 
            Built to help developers understand cybersecurity concepts.
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.heading}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><a href="/">Home</a></li>
            <li><a href="/demo">Live Demo</a></li>
            <li><a href="/theory">Theory</a></li>
            <li><a href="/prevention">Prevention</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {currentYear} Dictionary Attack Demo. All rights reserved.</p>
        <p className={styles.ethics}>Built with ethical hacking principles in mind.</p>
      </div>
    </footer>
  );
};

export default Footer;
