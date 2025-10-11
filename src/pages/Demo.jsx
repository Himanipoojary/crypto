import React, { useState } from 'react';
import HashInput from '../components/demo/HashInput';
import AttackProgress from '../components/demo/AttackProgress';
import ResultDisplay from '../components/demo/ResultDisplay';
import SpeedMeter from '../components/demo/SpeedMeter';
import useDictionaryAttack from '../hooks/useDictionaryAttack';
import useDictionary from '../hooks/useDictionary';
import styles from './Demo.module.css';

const Demo = () => {
  const [attackConfig, setAttackConfig] = useState(null);
  const { dictionary, isLoading: isDictionaryLoading } = useDictionary('inline');
  
  const {
    isAttacking,
    progress,
    currentPassword,
    passwordsTested,
    totalPasswords,
    timeTaken,
    result,
    startAttack,
    stopAttack,
    resetAttack
  } = useDictionaryAttack();

  const handleAttackStart = (config) => {
    setAttackConfig(config);
    startAttack(config.hash, config.algorithm, dictionary);
  };

  const handleStopAttack = () => {
    stopAttack();
  };

  const handleResetAttack = () => {
    resetAttack();
    setAttackConfig(null);
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Dictionary Attack Demo</h1>
        <p className={styles.subtitle}>
          Experience how dictionary attacks work in real-time against weak hash functions
        </p>
      </div>

      {/* Main Demo Area */}
      <div className={styles.demoGrid}>
        {/* Left Column - Input and Progress */}
        <div className={styles.leftColumn}>
          <HashInput 
            onAttackStart={handleAttackStart}
            isAttacking={isAttacking}
          />

          {(isAttacking || result) && (
            <AttackProgress
              progress={progress}
              currentPassword={currentPassword}
              totalPasswords={totalPasswords}
              passwordsTested={passwordsTested}
              isAttacking={isAttacking}
            />
          )}

          {result && (
            <ResultDisplay
              success={result.success}
              crackedPassword={result.crackedPassword}
              timeTaken={result.timeTaken}
              passwordsTested={result.passwordsTested}
              hashValue={result.hashValue}
            />
          )}

          {result && (
            <div className={styles.actionButtons}>
              <button 
                onClick={handleResetAttack}
                className={styles.resetButton}
              >
                <span className={styles.buttonIcon}>🔄</span>
                Try Another Hash
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Speed Meter */}
        <div className={styles.rightColumn}>
          <SpeedMeter
            passwordsTested={passwordsTested}
            timeTaken={timeTaken}
            isAttacking={isAttacking}
          />

          {/* Info Card */}
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>
              <span className={styles.infoIcon}>ℹ️</span>
              How It Works
            </h3>
            <ul className={styles.infoList}>
              <li>Dictionary contains {dictionary.length.toLocaleString()} common passwords</li>
              <li>Each password is hashed using the selected algorithm</li>
              <li>Generated hash is compared with target hash</li>
              <li>Attack stops when match is found</li>
              <li>Demonstrates vulnerability of weak passwords</li>
            </ul>
          </div>

          {/* Security Tips */}
          <div className={styles.tipsCard}>
            <h3 className={styles.tipsTitle}>
              <span className={styles.tipsIcon}>💡</span>
              Security Tips
            </h3>
            <ul className={styles.tipsList}>
              <li>Never use common dictionary words</li>
              <li>Use 15+ character passwords</li>
              <li>Mix uppercase, lowercase, numbers, symbols</li>
              <li>Use password managers</li>
              <li>Enable two-factor authentication</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dictionary Loading State */}
      {isDictionaryLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading dictionary...</p>
        </div>
      )}
    </div>
  );
};

export default Demo;
