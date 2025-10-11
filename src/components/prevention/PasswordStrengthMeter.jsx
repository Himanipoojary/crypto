import React, { useState, useEffect } from 'react';
import styles from './PasswordStrengthMeter.module.css';

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);

  const checkPasswordStrength = (pwd) => {
    let score = 0;
    const suggestions = [];

    // Length check
    if (pwd.length >= 8) {
      score += 1;
    } else if (pwd.length > 0) {
      suggestions.push('Password should be at least 8 characters long');
    }

    if (pwd.length >= 12) {
      score += 1;
    }

    // Lowercase letters
    if (/[a-z]/.test(pwd)) {
      score += 1;
    } else if (pwd.length > 0) {
      suggestions.push('Add lowercase letters (a-z)');
    }

    // Uppercase letters
    if (/[A-Z]/.test(pwd)) {
      score += 1;
    } else if (pwd.length > 0) {
      suggestions.push('Add uppercase letters (A-Z)');
    }

    // Numbers
    if (/\d/.test(pwd)) {
      score += 1;
    } else if (pwd.length > 0) {
      suggestions.push('Include at least one number (0-9)');
    }

    // Special characters
    if (/[^a-zA-Z0-9]/.test(pwd)) {
      score += 1;
    } else if (pwd.length > 0) {
      suggestions.push('Add special characters (!@#$%^&*)');
    }

    // Common password check
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
    if (commonPasswords.some(common => pwd.toLowerCase().includes(common))) {
      score = Math.max(0, score - 2);
      suggestions.push('Avoid common passwords');
    }

    return { score, suggestions };
  };

  useEffect(() => {
    if (password) {
      const result = checkPasswordStrength(password);
      setStrength(result.score);
      setFeedback(result.suggestions);
    } else {
      setStrength(0);
      setFeedback([]);
    }
  }, [password]);

  const getStrengthLabel = () => {
    if (strength === 0) return { text: 'No Password', color: '#cbd5e0' };
    if (strength <= 2) return { text: 'Weak', color: '#f56565' };
    if (strength <= 4) return { text: 'Fair', color: '#f6ad55' };
    if (strength <= 5) return { text: 'Good', color: '#48bb78' };
    return { text: 'Strong', color: '#38a169' };
  };

  const strengthInfo = getStrengthLabel();
  const strengthPercentage = Math.min((strength / 6) * 100, 100);

  const requirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Contains special character', met: /[^a-zA-Z0-9]/.test(password) },
    { text: '12+ characters (recommended)', met: password.length >= 12 }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Password Strength Checker</h2>
      <p className={styles.subtitle}>
        Test your password strength and learn what makes a secure password
      </p>

      <div className={styles.inputSection}>
        <label htmlFor="password" className={styles.label}>
          Enter Password
        </label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to test..."
          className={styles.input}
        />
      </div>

      {password && (
        <>
          <div className={styles.strengthMeter}>
            <div className={styles.strengthHeader}>
              <span className={styles.strengthLabel}>Password Strength:</span>
              <span 
                className={styles.strengthValue}
                style={{ color: strengthInfo.color }}
              >
                {strengthInfo.text}
              </span>
            </div>
            
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar}
                style={{ 
                  width: `${strengthPercentage}%`,
                  backgroundColor: strengthInfo.color
                }}
              >
                <div className={styles.progressGlow}></div>
              </div>
            </div>

            <div className={styles.strengthScore}>
              Score: {strength} / 6
            </div>
          </div>

          <div className={styles.requirementsSection}>
            <h3 className={styles.requirementsTitle}>Requirements:</h3>
            <ul className={styles.requirementsList}>
              {requirements.map((req, index) => (
                <li 
                  key={index}
                  className={`${styles.requirement} ${req.met ? styles.met : ''}`}
                >
                  <span className={styles.requirementIcon}>
                    {req.met ? '✓' : '○'}
                  </span>
                  <span className={styles.requirementText}>{req.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {feedback.length > 0 && (
            <div className={styles.feedbackSection}>
              <h3 className={styles.feedbackTitle}>
                <span className={styles.feedbackIcon}>💡</span>
                Suggestions to Improve:
              </h3>
              <ul className={styles.feedbackList}>
                {feedback.map((suggestion, index) => (
                  <li key={index} className={styles.feedbackItem}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className={styles.tipsSection}>
        <h3 className={styles.tipsTitle}>Password Security Tips</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🔒</span>
            <p className={styles.tipText}>
              Use a unique password for each account
            </p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>📝</span>
            <p className={styles.tipText}>
              Use a password manager to store passwords securely
            </p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🔑</span>
            <p className={styles.tipText}>
              Enable two-factor authentication when possible
            </p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🚫</span>
            <p className={styles.tipText}>
              Avoid personal information like birthdays or names
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
