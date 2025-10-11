import React from 'react';
import BestPracticeCard from '../components/prevention/BestPracticeCard';
import PasswordStrengthMeter from '../components/prevention/PasswordStrengthMeter';
import { educationalContent } from '../data/educationalContent';
import styles from './Prevention.module.css';

const Prevention = () => {
  const defenseStrategies = educationalContent.defenseStrategies.strategies;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Prevention & Best Practices</h1>
        <p className={styles.subtitle}>
          Learn how to protect your applications and users from dictionary attacks and weak password vulnerabilities
        </p>
      </div>

      {/* Password Strength Meter */}
      <section className={styles.section}>
        <PasswordStrengthMeter />
      </section>

      {/* Defense Strategies */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>🛡️</span>
          Defense Strategies
        </h2>
        <div className={styles.strategiesGrid}>
          {defenseStrategies.map((strategy, index) => (
            <BestPracticeCard
              key={index}
              icon={strategy.icon}
              title={strategy.name}
              description={strategy.description}
              practices={[
                `Effectiveness: ${strategy.effectiveness}`,
                `Implementation: ${strategy.implementation}`
              ]}
              severity={strategy.effectiveness === 'Very High' ? 'critical' : 
                        strategy.effectiveness === 'High' ? 'high' : 'medium'}
              category="Security Measure"
            />
          ))}
        </div>
      </section>

      {/* Developer Best Practices */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>👨‍💻</span>
          For Developers
        </h2>
        <BestPracticeCard
          icon="💻"
          title="Development Best Practices"
          description="Essential security practices every developer should follow when handling user authentication and password storage."
          practices={educationalContent.bestPractices.forDevelopers}
          severity="critical"
          category="Development"
          codeExample={`// Secure password hashing example
import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}`}
        />
      </section>

      {/* User Best Practices */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>👤</span>
          For Users
        </h2>
        <BestPracticeCard
          icon="🔐"
          title="User Security Guidelines"
          description="Practical tips for creating and managing secure passwords to protect your personal accounts."
          practices={educationalContent.bestPractices.forUsers}
          severity="high"
          category="Personal Security"
        />
      </section>

      {/* Multi-Factor Authentication */}
      <section className={styles.section}>
        <div className={styles.mfaCard}>
          <div className={styles.mfaHeader}>
            <h2 className={styles.mfaTitle}>
              <span className={styles.mfaIcon}>🔒</span>
              Multi-Factor Authentication (MFA)
            </h2>
          </div>
          <p className={styles.mfaDescription}>
            MFA adds an extra layer of security beyond passwords. Even if a password is compromised, 
            attackers cannot access the account without the second factor.
          </p>
          <div className={styles.mfaTypes}>
            <div className={styles.mfaType}>
              <span className={styles.mfaTypeIcon}>📱</span>
              <h3>SMS/Authenticator App</h3>
              <p>Time-based one-time passwords (TOTP)</p>
            </div>
            <div className={styles.mfaType}>
              <span className={styles.mfaTypeIcon}>🔑</span>
              <h3>Hardware Tokens</h3>
              <p>Physical security keys like YubiKey</p>
            </div>
            <div className={styles.mfaType}>
              <span className={styles.mfaTypeIcon}>👆</span>
              <h3>Biometric</h3>
              <p>Fingerprint or facial recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Checklist */}
      <section className={styles.section}>
        <div className={styles.checklistCard}>
          <h2 className={styles.checklistTitle}>
            Security Implementation Checklist
          </h2>
          <div className={styles.checklistGrid}>
            <div className={styles.checklistColumn}>
              <h3 className={styles.checklistColumnTitle}>Authentication</h3>
              <ul className={styles.checklistList}>
                <li>✓ Use bcrypt/Argon2 for password hashing</li>
                <li>✓ Implement unique salt for each password</li>
                <li>✓ Set appropriate cost factor (12-14 for bcrypt)</li>
                <li>✓ Enforce minimum password requirements</li>
                <li>✓ Implement rate limiting on login attempts</li>
              </ul>
            </div>
            <div className={styles.checklistColumn}>
              <h3 className={styles.checklistColumnTitle}>Application Security</h3>
              <ul className={styles.checklistList}>
                <li>✓ Use HTTPS for all authentication endpoints</li>
                <li>✓ Implement secure session management</li>
                <li>✓ Add CAPTCHA to prevent automated attacks</li>
                <li>✓ Log and monitor failed login attempts</li>
                <li>✓ Implement account lockout mechanisms</li>
              </ul>
            </div>
            <div className={styles.checklistColumn}>
              <h3 className={styles.checklistColumnTitle}>User Education</h3>
              <ul className={styles.checklistList}>
                <li>✓ Provide password strength indicators</li>
                <li>✓ Educate users about MFA benefits</li>
                <li>✓ Send breach notifications promptly</li>
                <li>✓ Encourage password manager usage</li>
                <li>✓ Regular security awareness training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.section}>
        <div className={styles.resourcesCard}>
          <h2 className={styles.resourcesTitle}>
            <span className={styles.resourcesIcon}>📚</span>
            Additional Resources
          </h2>
          <div className={styles.resourcesGrid}>
            <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
              <span className={styles.resourceIcon}>🔗</span>
              <div>
                <h4>OWASP Top 10</h4>
                <p>Web application security risks</p>
              </div>
            </a>
            <a href="https://pages.nist.gov/800-63-3/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
              <span className={styles.resourceIcon}>🔗</span>
              <div>
                <h4>NIST Guidelines</h4>
                <p>Digital identity guidelines</p>
              </div>
            </a>
            <a href="https://www.npmjs.com/package/bcrypt" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
              <span className={styles.resourceIcon}>🔗</span>
              <div>
                <h4>bcrypt.js</h4>
                <p>Password hashing library</p>
              </div>
            </a>
            <a href="https://www.npmjs.com/package/argon2" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
              <span className={styles.resourceIcon}>🔗</span>
              <div>
                <h4>Argon2</h4>
                <p>Modern password hashing</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prevention;
