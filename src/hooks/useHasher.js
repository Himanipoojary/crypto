import { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

/**
 * Custom hook for hashing operations
 * Provides methods to hash strings using various algorithms
 */
const useHasher = () => {
  const [isHashing, setIsHashing] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Hash a string using specified algorithm
   * @param {string} input - String to hash
   * @param {string} algorithm - Hash algorithm (md5, sha1, sha256, sha512)
   * @returns {Promise<string>} - Hashed string
   */
  const hash = useCallback(async (input, algorithm = 'md5') => {
    setIsHashing(true);
    setError(null);

    try {
      let hashed;

      switch (algorithm.toLowerCase()) {
        case 'md5':
          hashed = CryptoJS.MD5(input).toString();
          break;
        
        case 'sha1':
          hashed = CryptoJS.SHA1(input).toString();
          break;
        
        case 'sha256':
          hashed = CryptoJS.SHA256(input).toString();
          break;
        
        case 'sha512':
          hashed = CryptoJS.SHA512(input).toString();
          break;
        
        case 'sha3':
          hashed = CryptoJS.SHA3(input).toString();
          break;
        
        default:
          throw new Error(`Unsupported algorithm: ${algorithm}`);
      }

      setIsHashing(false);
      return hashed;
      
    } catch (err) {
      setError(err.message);
      setIsHashing(false);
      throw err;
    }
  }, []);

  /**
   * Hash multiple strings in batch
   * @param {Array<string>} inputs - Array of strings to hash
   * @param {string} algorithm - Hash algorithm
   * @returns {Promise<Array<string>>} - Array of hashed strings
   */
  const hashBatch = useCallback(async (inputs, algorithm = 'md5') => {
    setIsHashing(true);
    setError(null);

    try {
      const hashes = await Promise.all(
        inputs.map(input => hash(input, algorithm))
      );
      
      setIsHashing(false);
      return hashes;
      
    } catch (err) {
      setError(err.message);
      setIsHashing(false);
      throw err;
    }
  }, [hash]);

  /**
   * Verify if a password matches a hash
   * @param {string} password - Password to verify
   * @param {string} targetHash - Hash to compare against
   * @param {string} algorithm - Hash algorithm
   * @returns {Promise<boolean>} - True if match
   */
  const verify = useCallback(async (password, targetHash, algorithm = 'md5') => {
    try {
      const hashedPassword = await hash(password, algorithm);
      return hashedPassword.toLowerCase() === targetHash.toLowerCase();
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [hash]);

  /**
   * Get hash length for algorithm
   * @param {string} algorithm - Hash algorithm
   * @returns {number} - Expected hash length in characters
   */
  const getHashLength = useCallback((algorithm) => {
    const lengths = {
      md5: 32,
      sha1: 40,
      sha256: 64,
      sha512: 128,
      sha3: 64
    };
    return lengths[algorithm.toLowerCase()] || 0;
  }, []);

  /**
   * Validate hash format
   * @param {string} hash - Hash string to validate
   * @param {string} algorithm - Expected algorithm
   * @returns {boolean} - True if valid
   */
  const validateHash = useCallback((hashString, algorithm) => {
    const expectedLength = getHashLength(algorithm);
    const hexPattern = /^[a-fA-F0-9]+$/;
    
    return (
      hashString.length === expectedLength &&
      hexPattern.test(hashString)
    );
  }, [getHashLength]);

  /**
   * Get algorithm information
   * @param {string} algorithm - Algorithm name
   * @returns {Object} - Algorithm details
   */
  const getAlgorithmInfo = useCallback((algorithm) => {
    const info = {
      md5: {
        name: 'MD5',
        outputSize: 128,
        length: 32,
        status: 'deprecated',
        speed: 'very fast'
      },
      sha1: {
        name: 'SHA-1',
        outputSize: 160,
        length: 40,
        status: 'vulnerable',
        speed: 'fast'
      },
      sha256: {
        name: 'SHA-256',
        outputSize: 256,
        length: 64,
        status: 'secure',
        speed: 'fast'
      },
      sha512: {
        name: 'SHA-512',
        outputSize: 512,
        length: 128,
        status: 'secure',
        speed: 'fast'
      },
      sha3: {
        name: 'SHA-3',
        outputSize: 256,
        length: 64,
        status: 'secure',
        speed: 'medium'
      }
    };

    return info[algorithm.toLowerCase()] || null;
  }, []);

  return {
    // State
    isHashing,
    error,
    
    // Methods
    hash,
    hashBatch,
    verify,
    getHashLength,
    validateHash,
    getAlgorithmInfo
  };
};

export default useHasher;
