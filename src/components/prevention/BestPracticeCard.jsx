import React from 'react';
import styles from './BestPracticeCard.module.css';

const BestPracticeCard = ({ 
  icon, 
  title, 
  description, 
  practices,
  codeExample,
  severity = 'medium',
  category 
}) => {
  const severityColors = {
    low: '#48bb78',
    medium: '#f6ad55',
    high: '#fc8181',
    critical: '#e53e3e'
  };

  return (
    <div className={`${styles.card} ${styles[severity]}`}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
        </div>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <span 
            className={styles.severityBadge}
            style={{ backgroundColor: severityColors[severity] }}
          >
            {severity.toUpperCase()}
          </span>
        </div>
      </div>

      {category && (
        <div className={styles.category}>
          <span className={styles.categoryLabel}>Category:</span>
          <span className={styles.categoryValue}>{category}</span>
        </div>
      )}

      <p className={styles.description}>{description}</p>

      {practices && practices.length > 0 && (
        <div className={styles.practicesSection}>
          <h4 className={styles.sectionTitle}>Best Practices:</h4>
          <ul className={styles.practicesList}>
            {practices.map((practice, index) => (
              <li key={index} className={styles.practiceItem}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.practiceText}>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {codeExample && (
        <div className={styles.codeSection}>
          <h4 className={styles.sectionTitle}>Example:</h4>
          <pre className={styles.codeBlock}>
            <code>{codeExample}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default BestPracticeCard;
