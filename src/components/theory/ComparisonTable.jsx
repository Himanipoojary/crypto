import React from 'react';
import styles from './ComparisonTable.module.css';

const ComparisonTable = () => {
  const algorithms = [
    {
      name: 'MD5',
      outputSize: '128 bits',
      speed: 'Very Fast',
      security: 'Broken',
      collisionResistance: 'No',
      preimageResistance: 'Weak',
      recommendedUse: 'None (Checksums only)',
      icon: '❌'
    },
    {
      name: 'SHA-1',
      outputSize: '160 bits',
      speed: 'Fast',
      security: 'Deprecated',
      collisionResistance: 'Broken',
      preimageResistance: 'Weak',
      recommendedUse: 'Legacy systems only',
      icon: '⚠️'
    },
    {
      name: 'SHA-256',
      outputSize: '256 bits',
      speed: 'Fast',
      security: 'Secure',
      collisionResistance: 'Yes',
      preimageResistance: 'Strong',
      recommendedUse: 'Data integrity',
      icon: '✓'
    },
    {
      name: 'bcrypt',
      outputSize: '184 bits',
      speed: 'Slow (Adaptive)',
      security: 'Very Secure',
      collisionResistance: 'Yes',
      preimageResistance: 'Very Strong',
      recommendedUse: 'Password hashing',
      icon: '✓✓'
    },
    {
      name: 'Argon2',
      outputSize: 'Variable',
      speed: 'Slow (Adaptive)',
      security: 'Strongest',
      collisionResistance: 'Yes',
      preimageResistance: 'Very Strong',
      recommendedUse: 'Password hashing',
      icon: '✓✓✓'
    }
  ];

  const getSecurityColor = (security) => {
    const colors = {
      'Broken': '#f56565',
      'Deprecated': '#f6ad55',
      'Secure': '#48bb78',
      'Very Secure': '#38a169',
      'Strongest': '#2f855a'
    };
    return colors[security] || '#cbd5e0';
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hash Algorithm Comparison</h2>
      <p className={styles.subtitle}>
        Compare different hashing algorithms based on security, performance, and use cases
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Output Size</th>
              <th>Speed</th>
              <th>Security Status</th>
              <th>Collision Resistance</th>
              <th>Preimage Resistance</th>
              <th>Recommended Use</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algo, index) => (
              <tr key={index}>
                <td className={styles.algorithmCell}>
                  <span className={styles.algorithmIcon}>{algo.icon}</span>
                  <span className={styles.algorithmName}>{algo.name}</span>
                </td>
                <td>{algo.outputSize}</td>
                <td>{algo.speed}</td>
                <td>
                  <span 
                    className={styles.securityBadge}
                    style={{ backgroundColor: getSecurityColor(algo.security) }}
                  >
                    {algo.security}
                  </span>
                </td>
                <td>
                  <span className={algo.collisionResistance === 'Yes' || algo.collisionResistance === 'Strong' ? styles.checkIcon : styles.crossIcon}>
                    {algo.collisionResistance === 'Yes' ? '✓' : algo.collisionResistance === 'No' ? '✗' : algo.collisionResistance}
                  </span>
                </td>
                <td>
                  <span className={styles.resistanceValue}>
                    {algo.preimageResistance}
                  </span>
                </td>
                <td className={styles.useCell}>{algo.recommendedUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <h3 className={styles.legendTitle}>Legend:</h3>
        <ul className={styles.legendList}>
          <li><strong>Collision Resistance:</strong> Difficulty of finding two different inputs with same hash</li>
          <li><strong>Preimage Resistance:</strong> Difficulty of finding input from a given hash output</li>
          <li><strong>Adaptive:</strong> Computation time can be adjusted to resist future hardware improvements</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonTable;
