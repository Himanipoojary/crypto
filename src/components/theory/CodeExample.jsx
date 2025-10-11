import React, { useState } from 'react';
import styles from './CodeExample.module.css';

const CodeExample = ({ title, code, language = 'javascript', description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      
      <div className={styles.codeContainer}>
        <div className={styles.codeHeader}>
          <div className={styles.languageBadge}>{language}</div>
          <button 
            className={styles.copyButton}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <span className={styles.checkIcon}>✓</span>
                Copied!
              </>
            ) : (
              <>
                <span className={styles.copyIcon}>📋</span>
                Copy Code
              </>
            )}
          </button>
        </div>
        
        <pre className={styles.codeBlock}>
          <code className={styles.code}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExample;
