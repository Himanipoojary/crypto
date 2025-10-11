import React from 'react';
import HashAlgorithmCard from '../components/theory/HashAlgorithmCard';
import ComparisonTable from '../components/theory/ComparisonTable';
import TimelineChart from '../components/theory/TimelineChart';
import CodeExample from '../components/theory/CodeExample';
import algorithmData from '../data/algorithmData';
import { educationalContent } from '../data/educationalContent';
import styles from './Theory.module.css';

const Theory = () => {
  const weakAlgorithms = algorithmData.filter(algo => 
    algo.status === 'deprecated' || algo.status === 'vulnerable'
  );

  const secureAlgorithms = algorithmData.filter(algo => 
    algo.status === 'secure' || algo.status === 'recommended'
  );

  const md5Example = `// Example: MD5 Hash Generation (Weak - DO NOT USE for security)
import CryptoJS from 'crypto-js';

const password = "password123";
const hash = CryptoJS.MD5(password).toString();
console.log(hash); // 482c811da5d5b4bc6d497ffa98491e38

// Problem: Same password always produces same hash
// No salt, fast computation = vulnerable to dictionary attacks`;

  const bcryptExample = `// Example: Secure Password Hashing with bcrypt
import bcrypt from 'bcrypt';

const password = "password123";
const saltRounds = 12; // Cost factor

// Hash password
const hash = await bcrypt.hash(password, saltRounds);
console.log(hash); 
// $2b$12$KIxkLNZlvz.9XqF8vQGHLOxJ...

// Verify password
const isMatch = await bcrypt.compare(password, hash);
console.log(isMatch); // true

// Benefits: Unique salt, slow computation, adaptive`;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Understanding Hash Functions</h1>
        <p className={styles.subtitle}>
          Deep dive into cryptographic hash algorithms, their vulnerabilities, and modern security practices
        </p>
      </div>

      {/* Introduction Section */}
      <section className={styles.section}>
        <div className={styles.introCard}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleIcon}>📖</span>
            {educationalContent.introduction.title}
          </h2>
          <p className={styles.introText}>{educationalContent.introduction.content}</p>
          
          <div className={styles.keyPoints}>
            <h3 className={styles.subTitle}>Key Points:</h3>
            <ul className={styles.pointsList}>
              {educationalContent.introduction.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>⚙️</span>
          {educationalContent.howItWorks.title}
        </h2>
        <div className={styles.stepsGrid}>
          {educationalContent.howItWorks.steps.map((step) => (
            <div key={step.step} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.step}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.section}>
        <TimelineChart />
      </section>

      {/* Weak Hash Algorithms */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>⚠️</span>
          Vulnerable Hash Algorithms
        </h2>
        <p className={styles.sectionDescription}>
          These algorithms should NOT be used for password hashing or cryptographic security
        </p>
        <div className={styles.algorithmsGrid}>
          {weakAlgorithms.map((algo) => (
            <HashAlgorithmCard
              key={algo.id}
              name={algo.name}
              year={algo.year}
              outputSize={algo.outputSize}
              status={algo.status}
              description={algo.description}
              vulnerabilities={algo.vulnerabilities}
              useCases={algo.useCases}
              icon={algo.icon}
            />
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>💻</span>
          Code Examples
        </h2>
        
        <CodeExample
          title="Weak Hashing (MD5) - Educational Purpose Only"
          description="This example shows how MD5 hashing works. Never use MD5 for password storage in production."
          code={md5Example}
          language="javascript"
        />

        <CodeExample
          title="Secure Password Hashing (bcrypt) - Recommended"
          description="This is the correct way to hash passwords. bcrypt includes salt and adaptive cost factor."
          code={bcryptExample}
          language="javascript"
        />
      </section>

      {/* Comparison Table */}
      <section className={styles.section}>
        <ComparisonTable />
      </section>

      {/* Secure Algorithms */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>✓</span>
          Secure Hash Algorithms
        </h2>
        <p className={styles.sectionDescription}>
          Modern algorithms designed specifically for password security
        </p>
        <div className={styles.algorithmsGrid}>
          {secureAlgorithms.map((algo) => (
            <HashAlgorithmCard
              key={algo.id}
              name={algo.name}
              year={algo.year}
              outputSize={algo.outputSize}
              status={algo.status}
              description={algo.description}
              vulnerabilities={algo.vulnerabilities}
              useCases={algo.useCases}
              icon={algo.icon}
            />
          ))}
        </div>
      </section>

      {/* Real World Examples */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleIcon}>🌍</span>
          {educationalContent.realWorldExamples.title}
        </h2>
        <div className={styles.casesGrid}>
          {educationalContent.realWorldExamples.cases.map((breach, index) => (
            <div key={index} className={styles.caseCard}>
              <div className={styles.caseYear}>{breach.year}</div>
              <h3 className={styles.caseTitle}>{breach.incident}</h3>
              <p className={styles.caseDescription}>{breach.description}</p>
              <div className={styles.caseImpact}>
                <strong>Impact:</strong> {breach.impact}
              </div>
              <div className={styles.caseLesson}>
                <span className={styles.lessonIcon}>💡</span>
                <strong>Lesson:</strong> {breach.lesson}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className={styles.section}>
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>Key Takeaways</h2>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>🚫</span>
              <div>
                <h4>Never Use Weak Hashes</h4>
                <p>MD5 and SHA-1 are broken and should never be used for password storage</p>
              </div>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>🧂</span>
              <div>
                <h4>Always Use Salt</h4>
                <p>Unique salts prevent rainbow table attacks and make each hash unique</p>
              </div>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>🐌</span>
              <div>
                <h4>Slow is Good</h4>
                <p>Adaptive algorithms like bcrypt and Argon2 are intentionally slow to resist attacks</p>
              </div>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>🔐</span>
              <div>
                <h4>Use Modern Algorithms</h4>
                <p>bcrypt, Argon2, and scrypt are designed specifically for password security</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Theory;
