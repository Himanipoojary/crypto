/**
 * Attack Engine Utility
 * Core logic for dictionary attack simulation
 */

import { hashPassword } from './hashFunctions';

/**
 * Perform dictionary attack
 * @param {string} targetHash - Hash to crack
 * @param {string} algorithm - Hash algorithm
 * @param {Array<string>} dictionary - Password dictionary
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object>} - Attack result
 */
export const performDictionaryAttack = async (
  targetHash,
  algorithm,
  dictionary,
  onProgress = null
) => {
  const startTime = performance.now();
  let passwordsTested = 0;
  let found = false;
  let crackedPassword = null;

  try {
    // Validate inputs
    if (!targetHash || !algorithm || !dictionary || dictionary.length === 0) {
      throw new Error('Invalid attack parameters');
    }

    // Normalize target hash
    const normalizedTarget = targetHash.toLowerCase().trim();

    // Process dictionary in batches for better performance
    const batchSize = 100;
    
    for (let i = 0; i < dictionary.length; i += batchSize) {
      const batch = dictionary.slice(i, Math.min(i + batchSize, dictionary.length));
      
      for (const password of batch) {
        passwordsTested++;
        
        // Hash the password
        const hash = await hashPassword(password, algorithm);
        
        // Compare hashes
        if (hash.toLowerCase() === normalizedTarget) {
          found = true;
          crackedPassword = password;
          break;
        }
        
        // Call progress callback
        if (onProgress && passwordsTested % 10 === 0) {
          onProgress({
            passwordsTested,
            currentPassword: password,
            progress: (passwordsTested / dictionary.length) * 100
          });
        }
      }
      
      if (found) break;
      
      // Small delay to allow UI updates
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    const endTime = performance.now();
    const timeTaken = (endTime - startTime) / 1000; // seconds

    return {
      success: found,
      crackedPassword,
      passwordsTested,
      timeTaken,
      hashesPerSecond: Math.round(passwordsTested / timeTaken),
      algorithm,
      targetHash
    };

  } catch (error) {
    throw new Error(`Attack error: ${error.message}`);
  }
};

/**
 * Estimate attack time
 * @param {number} dictionarySize - Size of dictionary
 * @param {string} algorithm - Hash algorithm
 * @returns {Object} - Time estimates
 */
export const estimateAttackTime = (dictionarySize, algorithm = 'md5') => {
  // Estimated hashes per second for different algorithms
  const speeds = {
    md5: 50000,      // ~50k hashes/sec in browser
    sha1: 40000,
    sha256: 30000,
    sha512: 20000
  };

  const hashesPerSecond = speeds[algorithm.toLowerCase()] || 30000;
  const estimatedSeconds = dictionarySize / hashesPerSecond;

  return {
    seconds: estimatedSeconds,
    minutes: estimatedSeconds / 60,
    hours: estimatedSeconds / 3600,
    formatted: formatTime(estimatedSeconds)
  };
};

/**
 * Calculate attack success probability
 * @param {number} dictionarySize - Size of dictionary
 * @param {number} keyspace - Total password keyspace
 * @returns {number} - Probability as percentage
 */
export const calculateSuccessProbability = (dictionarySize, keyspace) => {
  if (keyspace === 0) return 0;
  const probability = (dictionarySize / keyspace) * 100;
  return Math.min(probability, 100);
};

/**
 * Optimize dictionary order
 * @param {Array<string>} dictionary - Password dictionary
 * @param {string} strategy - Optimization strategy
 * @returns {Array<string>} - Optimized dictionary
 */
export const optimizeDictionary = (dictionary, strategy = 'frequency') => {
  const optimized = [...dictionary];

  switch (strategy) {
    case 'frequency':
      // Most common passwords first (would need frequency data)
      return optimized;

    case 'length':
      // Shorter passwords first (faster to type/remember)
      return optimized.sort((a, b) => a.length - b.length);

    case 'complexity':
      // Simpler passwords first (lowercase only, then with numbers, etc.)
      return optimized.sort((a, b) => {
        const scoreA = calculateComplexity(a);
        const scoreB = calculateComplexity(b);
        return scoreA - scoreB;
      });

    case 'random':
      // Randomize order
      return shuffleArray(optimized);

    default:
      return optimized;
  }
};

/**
 * Calculate password complexity score
 * @param {string} password - Password to analyze
 * @returns {number} - Complexity score
 */
const calculateComplexity = (password) => {
  let score = 0;
  
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 2;
  if (/\d/.test(password)) score += 2;
  if (/[^a-zA-Z0-9]/.test(password)) score += 3;
  score += password.length;
  
  return score;
};

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Format time duration
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
const formatTime = (seconds) => {
  if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

/**
 * Analyze attack efficiency
 * @param {Object} attackResult - Result from performDictionaryAttack
 * @returns {Object} - Efficiency analysis
 */
export const analyzeAttackEfficiency = (attackResult) => {
  const {
    success,
    passwordsTested,
    timeTaken,
    hashesPerSecond
  } = attackResult;

  return {
    efficiency: success ? (passwordsTested / timeTaken).toFixed(2) : 0,
    speed: hashesPerSecond,
    timePerPassword: (timeTaken / passwordsTested * 1000).toFixed(3), // ms
    successRate: success ? 100 : 0,
    rating: getRating(hashesPerSecond)
  };
};

/**
 * Get performance rating
 * @param {number} hashesPerSecond - Hashes per second
 * @returns {string} - Performance rating
 */
const getRating = (hashesPerSecond) => {
  if (hashesPerSecond > 100000) return 'Excellent';
  if (hashesPerSecond > 50000) return 'Good';
  if (hashesPerSecond > 20000) return 'Average';
  return 'Below Average';
};

export default {
  performDictionaryAttack,
  estimateAttackTime,
  calculateSuccessProbability,
  optimizeDictionary,
  analyzeAttackEfficiency
};
