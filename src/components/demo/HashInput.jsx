import React, { useState } from 'react';
import styles from './HashInput.module.css';

const HashInput = ({ onAttackStart, isAttacking }) => {
  const [inputType, setInputType] = useState('hash'); // 'hash' or 'password'
  const [hashValue, setHashValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [algorithm, setAlgorithm] = useState('md5');
  const [error, setError] = useState('');

  // Multiple sample hashes for variety
  const sampleHashes = {
    md5: [
      { hash: '5f4dcc3b5aa765d61d8327deb882cf99', password: 'password' },
      { hash: '098f6bcd4621d373cade4e832627b4f6', password: 'test' },
      { hash: 'e10adc3949ba59abbe56e057f20f883e', password: '123456' },
      { hash: '25d55ad283aa400af464c76d713c07ad', password: '12345678' },
      { hash: 'd8578edf8458ce06fbc5bb76a58c5ca4', password: 'qwerty' },
    ],
    sha1: [
      { hash: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', password: 'password' },
      { hash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', password: 'test' },
      { hash: '7c4a8d09ca3762af61e59520943dc26494f8941b', password: '123456' },
      { hash: '7c222fb2927d828af22f592134e8932480637c0d', password: '12345678' },
      { hash: 'b1b3773a05c0ed0176787a4f1574ff0075f7521e', password: 'qwerty' },
    ],
    sha256: [
      { hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', password: 'password' },
      { hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', password: 'test' },
      { hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', password: '123456' },
      { hash: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', password: '12345678' },
      { hash: '65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5', password: 'qwerty' },
    ]
  };

  const validateHash = (hash, algo) => {
    const lengths = {
      md5: 32,
      sha1: 40,
      sha256: 64
    };

    const hexPattern = /^[a-fA-F0-9]+$/;
    
    if (!hash) {
      return 'Hash value is required';
    }
    
    if (!hexPattern.test(hash)) {
      return 'Hash must contain only hexadecimal characters (0-9, a-f)';
    }
    
    if (hash.length !== lengths[algo]) {
      return `${algo.toUpperCase()} hash must be ${lengths[algo]} characters long`;
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalHash = '';
    
    if (inputType === 'password') {
      if (!passwordValue.trim()) {
        setError('Password is required');
        return;
      }
      
      // Import hash function
      const CryptoJS = (await import('crypto-js')).default;
      
      // Hash the password
      switch (algorithm) {
        case 'md5':
          finalHash = CryptoJS.MD5(passwordValue).toString();
          break;
        case 'sha1':
          finalHash = CryptoJS.SHA1(passwordValue).toString();
          break;
        case 'sha256':
          finalHash = CryptoJS.SHA256(passwordValue).toString();
          break;
        default:
          finalHash = CryptoJS.MD5(passwordValue).toString();
      }
    } else {
      finalHash = hashValue.trim();
      const validationError = validateHash(finalHash, algorithm);
      
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    
    setError('');
    onAttackStart({
      hash: finalHash.toLowerCase(),
      algorithm: algorithm
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (inputType === 'hash') {
      setHashValue(value);
    } else {
      setPasswordValue(value);
    }
    if (error) {
      setError('');
    }
  };

  const useSampleHash = () => {
    const samples = sampleHashes[algorithm];
    // Get random sample instead of always first one
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    
    if (inputType === 'hash') {
      setHashValue(randomSample.hash);
    } else {
      setPasswordValue(randomSample.password);
    }
    setError('');
  };

  const toggleInputType = () => {
    setInputType(inputType === 'hash' ? 'password' : 'hash');
    setHashValue('');
    setPasswordValue('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Enter {inputType === 'hash' ? 'Hash' : 'Password'} to Crack</h2>
        <button
          type="button"
          onClick={toggleInputType}
          className={styles.toggleButton}
          disabled={isAttacking}
        >
          <span className={styles.toggleIcon}>🔄</span>
          Switch to {inputType === 'hash' ? 'Password' : 'Hash'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="algorithm" className={styles.label}>
            Algorithm
          </label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className={styles.select}
            disabled={isAttacking}
          >
            <option value="md5">MD5 (32 characters)</option>
            <option value="sha1">SHA-1 (40 characters)</option>
            <option value="sha256">SHA-256 (64 characters)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="input" className={styles.label}>
            {inputType === 'hash' ? 'Hash Value' : 'Password'}
          </label>
          <input
            id="input"
            type={inputType === 'hash' ? 'text' : 'text'}
            value={inputType === 'hash' ? hashValue : passwordValue}
            onChange={handleInputChange}
            placeholder={
              inputType === 'hash' 
                ? 'Enter hash value in hexadecimal format' 
                : 'Enter password to hash and crack'
            }
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            disabled={isAttacking}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isAttacking}
          >
            {isAttacking ? 'Attacking...' : 'Start Attack'}
          </button>
          
          <button
            type="button"
            onClick={useSampleHash}
            className={styles.sampleButton}
            disabled={isAttacking}
          >
            Use Random Sample
          </button>
        </div>

        <div className={styles.info}>
          <span className={styles.infoIcon}>ℹ️</span>
          <p className={styles.infoText}>
            {inputType === 'hash' 
              ? 'Enter a hash or click "Use Random Sample" to load a random weak password hash for testing.'
              : 'Enter a password and it will be hashed with the selected algorithm before the attack starts.'
            }
          </p>
        </div>
      </form>
    </div>
  );
};

export default HashInput;
