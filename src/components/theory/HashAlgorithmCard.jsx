import React from 'react';
import styles from './HashAlgorithmCard.module.css';

const HashAlgorithmCard = ({ 
  name, 
  year, 
  outputSize, 
  status, 
  description,
  vulnerabilities,
  useCases,
  icon 
}) => {
  const statusColors = {
    deprecated: '#f56565',
    vulnerable: '#f6ad55',
    secure: '#48bb78',
    recommended: '#38a169'
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon || '🔐'}</span>
        </div>
        <div className={styles.headerContent}>
          <h3 className={styles.algorithmName}>{name}</h3>
          <span 
            className={styles.statusBadge}
            style={{ backgroundColor: statusColors[status] }}
          >
            {status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>Year Introduced:</span>
          <span className={styles.specValue}>{year}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>Output Size:</span>
          <span className={styles.specValue}>{outputSize} bits</span>
        </div>
      </div>

      <div className={styles.description}>
        <p>{description}</p>
      </div>

      {vulnerabilities && vulnerabilities.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            <span className={styles.warningIcon}>⚠️</span>
            Known Vulnerabilities
          </h4>
          <ul className={styles.list}>
            {vulnerabilities.map((vuln, index) => (
              <li key={index} className={styles.listItemDanger}>
                {vuln}
              </li>
            ))}
          </ul>
        </div>
      )}

      {useCases && useCases.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            <span className={styles.infoIcon}>ℹ️</span>
            Current Use Cases
          </h4>
          <ul className={styles.list}>
            {useCases.map((useCase, index) => (
              <li key={index} className={styles.listItem}>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HashAlgorithmCard;
