import React from 'react';
import styles from './AttackProgress.module.css';

const AttackProgress = ({ 
  progress, 
  currentPassword, 
  totalPasswords,
  passwordsTested,
  isAttacking 
}) => {
  const progressPercentage = Math.min(
    (passwordsTested / totalPasswords) * 100, 
    100
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Attack Progress</h3>
        <span className={styles.percentage}>
          {progressPercentage.toFixed(2)}%
        </span>
      </div>

      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        >
          <div className={styles.progressGlow}></div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Current Password:</span>
          <span className={styles.statValue}>
            {isAttacking ? (
              <code className={styles.password}>{currentPassword || 'Starting...'}</code>
            ) : (
              <span className={styles.idle}>Idle</span>
            )}
          </span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Passwords Tested:</span>
          <span className={styles.statValue}>
            {passwordsTested.toLocaleString()} / {totalPasswords.toLocaleString()}
          </span>
        </div>
      </div>

      {isAttacking && (
        <div className={styles.statusIndicator}>
          <div className={styles.spinner}></div>
          <span className={styles.statusText}>Attack in progress...</span>
        </div>
      )}
    </div>
  );
};

export default AttackProgress;
