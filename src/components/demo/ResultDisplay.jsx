import React from 'react';
import styles from './ResultDisplay.module.css';

const ResultDisplay = ({ 
  success, 
  crackedPassword, 
  timeTaken, 
  passwordsTested,
  hashValue 
}) => {
  const formatTime = (seconds) => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    if (seconds < 60) return `${seconds.toFixed(2)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(0);
    return `${minutes}m ${secs}s`;
  };

  if (!success && !crackedPassword) {
    return null;
  }

  return (
    <div className={`${styles.container} ${success ? styles.success : styles.failure}`}>
      {success ? (
        <>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>✅</span>
          </div>
          <h2 className={styles.title}>Password Cracked Successfully!</h2>
          
          <div className={styles.resultBox}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Original Hash:</span>
              <code className={styles.hash}>{hashValue}</code>
            </div>
            
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Cracked Password:</span>
              <code className={styles.crackedPassword}>{crackedPassword}</code>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{formatTime(timeTaken)}</span>
              <span className={styles.statLabel}>Time Taken</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{passwordsTested.toLocaleString()}</span>
              <span className={styles.statLabel}>Attempts</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statNumber}>
                {Math.round(passwordsTested / timeTaken).toLocaleString()}
              </span>
              <span className={styles.statLabel}>Hashes/second</span>
            </div>
          </div>

          <div className={styles.warning}>
            <span className={styles.warningIcon}>⚠️</span>
            <p className={styles.warningText}>
              This demonstrates why weak hashing algorithms are vulnerable. 
              Always use strong, modern hashing algorithms like bcrypt or Argon2.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>❌</span>
          </div>
          <h2 className={styles.title}>Password Not Found</h2>
          
          <div className={styles.resultBox}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Hash:</span>
              <code className={styles.hash}>{hashValue}</code>
            </div>
          </div>

          <p className={styles.failureMessage}>
            The password was not found in the dictionary. This could mean:
          </p>
          <ul className={styles.failureList}>
            <li>The password is not in our common password list</li>
            <li>The password might be strong and unique</li>
            <li>Try using a sample hash or different dictionary</li>
          </ul>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{formatTime(timeTaken)}</span>
              <span className={styles.statLabel}>Time Taken</span>
            </div>
            
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{passwordsTested.toLocaleString()}</span>
              <span className={styles.statLabel}>Attempts</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
