/**
 * Hash Functions Utility
 * Wrapper functions for various hashing algorithms using CryptoJS
 */

import CryptoJS from 'crypto-js';

/**
 * Hash a password using specified algorithm
 * @param {string} password - Password to hash
 * @param {string} algorithm - Hash algorithm (md5, sha1, sha256, sha512)
 * @returns {Promise<string>} - Hashed password in hexadecimal
 */
export const hashPassword = async (password, algorithm = 'md5') => {
  return new Promise((resolve, reject) => {
    try {
      if (!password) {
        reject(new Error('Password is required'));
        return;
      }

      let hash;

      switch (algorithm.toLowerCase()) {
        case 'md5':
          hash = CryptoJS.MD5(password);
          break;

        case 'sha1':
          hash = CryptoJS.SHA1(password);
          break;

        case 'sha256':
          hash = CryptoJS.SHA256(password);
          break;

        case 'sha512':
          hash = CryptoJS.SHA512(password);
          break;

        case 'sha3':
          hash = CryptoJS.SHA3(password);
          break;

        default:
          reject(new Error(`Unsupported algorithm: ${algorithm}`));
          return;
      }

      resolve(hash.toString(CryptoJS.enc.Hex));
    } catch (error) {
      reject(new Error(`Hashing error: ${error.message}`));
    }
  });
};

/**
 * Hash multiple passwords in batch
 * @param {Array<string>} passwords - Array of passwords to hash
 * @param {string} algorithm - Hash algorithm
 * @returns {Promise<Array<string>>} - Array of hashed passwords
 */
export const hashBatch = async (passwords, algorithm = 'md5') => {
  try {
    const hashes = await Promise.all(
      passwords.map(password => hashPassword(password, algorithm))
    );
    return hashes;
  } catch (error) {
    throw new Error(`Batch hashing error: ${error.message}`);
  }
};

/**
 * Verify password against hash
 * @param {string} password - Password to verify
 * @param {string} targetHash - Hash to compare against
 * @param {string} algorithm - Hash algorithm
 * @returns {Promise<boolean>} - True if match
 */
export const verifyPassword = async (password, targetHash, algorithm = 'md5') => {
  try {
    const hash = await hashPassword(password, algorithm);
    return hash.toLowerCase() === targetHash.toLowerCase();
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
};

/**
 * Get hash algorithm information
 * @param {string} algorithm - Algorithm name
 * @returns {Object} - Algorithm details
 */
export const getAlgorithmInfo = (algorithm) => {
  const algorithms = {
    md5: {
      name: 'MD5',
      outputSize: 128,
      length: 32,
      blockSize: 512,
      status: 'deprecated',
      speed: 'very fast',
      secure: false
    },
    sha1: {
      name: 'SHA-1',
      outputSize: 160,
      length: 40,
      blockSize: 512,
      status: 'vulnerable',
      speed: 'fast',
      secure: false
    },
    sha256: {
      name: 'SHA-256',
      outputSize: 256,
      length: 64,
      blockSize: 512,
      status: 'secure',
      speed: 'fast',
      secure: true
    },
    sha512: {
      name: 'SHA-512',
      outputSize: 512,
      length: 128,
      blockSize: 1024,
      status: 'secure',
      speed: 'fast',
      secure: true
    },
    sha3: {
      name: 'SHA-3',
      outputSize: 256,
      length: 64,
      blockSize: 1088,
      status: 'secure',
      speed: 'medium',
      secure: true
    }
  };

  return algorithms[algorithm.toLowerCase()] || null;
};

/**
 * Validate hash format
 * @param {string} hash - Hash string to validate
 * @param {string} algorithm - Expected algorithm
 * @returns {boolean} - True if valid format
 */
export const isValidHash = (hash, algorithm) => {
  if (!hash || typeof hash !== 'string') return false;

  const info = getAlgorithmInfo(algorithm);
  if (!info) return false;

  const hexPattern = /^[a-fA-F0-9]+$/;
  return hash.length === info.length && hexPattern.test(hash);
};

/**
 * Generate salted hash (educational demonstration)
 * @param {string} password - Password to hash
 * @param {string} salt - Salt to append
 * @param {string} algorithm - Hash algorithm
 * @returns {Promise<Object>} - Object with hash and salt
 */
export const hashWithSalt = async (password, salt = null, algorithm = 'sha256') => {
  try {
    // Generate random salt if not provided
    const finalSalt = salt || CryptoJS.lib.WordArray.random(128/8).toString();
    
    // Concatenate password and salt
    const saltedPassword = password + finalSalt;
    
    // Hash the salted password
    const hash = await hashPassword(saltedPassword, algorithm);
    
    return {
      hash,
      salt: finalSalt,
      algorithm
    };
  } catch (error) {
    throw new Error(`Salted hashing error: ${error.message}`);
  }
};

/**
 * Calculate hashing speed (hashes per second)
 * @param {string} algorithm - Hash algorithm
 * @param {number} iterations - Number of iterations to test
 * @returns {Promise<Object>} - Speed metrics
 */
export const measureHashSpeed = async (algorithm = 'md5', iterations = 1000) => {
  const testPassword = 'testpassword123';
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    await hashPassword(testPassword, algorithm);
  }
  
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // Convert to seconds
  const hashesPerSecond = Math.round(iterations / totalTime);
  
  return {
    algorithm,
    iterations,
    totalTime: totalTime.toFixed(3),
    hashesPerSecond,
    timePerHash: (totalTime / iterations * 1000).toFixed(3) // milliseconds
  };
};

/**
 * Compare hash algorithm speeds
 * @param {Array<string>} algorithms - Array of algorithm names
 * @param {number} iterations - Number of iterations per algorithm
 * @returns {Promise<Array<Object>>} - Comparison results
 */
export const compareAlgorithmSpeeds = async (
  algorithms = ['md5', 'sha1', 'sha256'],
  iterations = 1000
) => {
  const results = [];
  
  for (const algorithm of algorithms) {
    const speed = await measureHashSpeed(algorithm, iterations);
    results.push(speed);
  }
  
  return results.sort((a, b) => b.hashesPerSecond - a.hashesPerSecond);
};

/**
 * Generate rainbow table entry
 * @param {string} password - Password to hash
 * @param {Array<string>} algorithms - Algorithms to use
 * @returns {Promise<Object>} - Rainbow table entry
 */
export const generateRainbowEntry = async (password, algorithms = ['md5', 'sha1', 'sha256']) => {
  const entry = { password };
  
  for (const algorithm of algorithms) {
    const hash = await hashPassword(password, algorithm);
    entry[algorithm] = hash;
  }
  
  return entry;
};

export default {
  hashPassword,
  hashBatch,
  verifyPassword,
  getAlgorithmInfo,
  isValidHash,
  hashWithSalt,
  measureHashSpeed,
  compareAlgorithmSpeeds,
  generateRainbowEntry
};
