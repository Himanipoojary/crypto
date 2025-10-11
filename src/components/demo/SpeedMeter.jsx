import React, { useEffect, useState } from 'react';
import styles from './SpeedMeter.module.css';

const SpeedMeter = ({ passwordsTested, timeTaken, isAttacking }) => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [peakSpeed, setPeakSpeed] = useState(0);

  useEffect(() => {
    if (timeTaken > 0) {
      const speed = Math.round(passwordsTested / timeTaken);
      setCurrentSpeed(speed);
      
      if (speed > peakSpeed) {
        setPeakSpeed(speed);
      }
    }
  }, [passwordsTested, timeTaken, peakSpeed]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toString();
  };

  const getSpeedLevel = (speed) => {
    if (speed < 1000) return { level: 'low', color: '#48bb78' };
    if (speed < 10000) return { level: 'medium', color: '#f6ad55' };
    if (speed < 100000) return { level: 'high', color: '#fc8181' };
    return { level: 'extreme', color: '#e53e3e' };
  };

  const speedInfo = getSpeedLevel(currentSpeed);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Performance Monitor</h3>
      
      <div className={styles.speedDisplay}>
        <div 
          className={styles.speedCircle}
          style={{ 
            borderColor: isAttacking ? speedInfo.color : '#e2e8f0',
            boxShadow: isAttacking ? `0 0 20px ${speedInfo.color}40` : 'none'
          }}
        >
          <div className={styles.speedValue}>
            <span className={styles.speedNumber}>
              {formatNumber(currentSpeed)}
            </span>
            <span className={styles.speedUnit}>hashes/sec</span>
          </div>
        </div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Current Speed</span>
          <span className={styles.metricValue}>
            {currentSpeed.toLocaleString()} h/s
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Peak Speed</span>
          <span className={styles.metricValue}>
            {peakSpeed.toLocaleString()} h/s
          </span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Total Time</span>
          <span className={styles.metricValue}>
            {timeTaken.toFixed(2)}s
          </span>
        </div>
      </div>

      {isAttacking && (
        <div className={styles.statusBar}>
          <div className={styles.pulse}></div>
          <span className={styles.statusText}>
            Attack Performance: {speedInfo.level.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default SpeedMeter;
