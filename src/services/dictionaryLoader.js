/**
 * Dictionary Loader Service
 * Handles loading password dictionaries from various sources
 * Follows service layer pattern for React applications
 */

/**
 * Load dictionary from a remote URL
 * @param {string} url - URL to fetch dictionary from
 * @returns {Promise<Array<string>>} - Array of passwords
 */
export const loadDictionaryFromURL = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
      cache: 'default',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const passwords = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#'));

    return passwords;
  } catch (error) {
    console.error('Error loading dictionary from URL:', error);
    throw new Error(`Failed to load dictionary: ${error.message}`);
  }
};

/**
 * Load dictionary from local file
 * @param {File} file - File object from file input
 * @returns {Promise<Array<string>>} - Array of passwords
 */
export const loadDictionaryFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Check file type
    const validTypes = ['text/plain', 'text/csv', 'application/octet-stream'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.txt')) {
      reject(new Error('Invalid file type. Please upload a .txt file'));
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      reject(new Error('File too large. Maximum size is 10MB'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const passwords = text
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('#'));

        if (passwords.length === 0) {
          reject(new Error('Dictionary file is empty'));
          return;
        }

        resolve(passwords);
      } catch (error) {
        reject(new Error(`Failed to parse dictionary: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

/**
 * Load dictionary from public folder
 * @param {string} filename - Name of the dictionary file in public folder
 * @returns {Promise<Array<string>>} - Array of passwords
 */
export const loadDictionaryFromPublic = async (filename = 'common-passwords.txt') => {
  try {
    const url = `/dictionary/${filename}`;
    return await loadDictionaryFromURL(url);
  } catch (error) {
    console.error('Error loading dictionary from public folder:', error);
    throw error;
  }
};

/**
 * Load dictionary from inline array
 * @param {Array<string>} passwords - Array of passwords
 * @returns {Promise<Array<string>>} - Validated array of passwords
 */
export const loadDictionaryFromArray = async (passwords) => {
  try {
    if (!Array.isArray(passwords)) {
      throw new Error('Input must be an array');
    }

    const cleanedPasswords = passwords
      .map(pwd => String(pwd).trim())
      .filter(pwd => pwd.length > 0);

    if (cleanedPasswords.length === 0) {
      throw new Error('Dictionary array is empty');
    }

    return cleanedPasswords;
  } catch (error) {
    console.error('Error loading dictionary from array:', error);
    throw error;
  }
};

/**
 * Validate dictionary content
 * @param {Array<string>} passwords - Array of passwords to validate
 * @returns {Object} - Validation result with stats
 */
export const validateDictionary = (passwords) => {
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalPasswords: passwords.length,
      uniquePasswords: 0,
      avgLength: 0,
      minLength: 0,
      maxLength: 0,
      containsEmptyLines: false,
      containsSpecialChars: 0,
      containsNumbers: 0,
    },
  };

  try {
    // Check if empty
    if (passwords.length === 0) {
      validation.isValid = false;
      validation.errors.push('Dictionary is empty');
      return validation;
    }

    // Calculate unique passwords
    const uniqueSet = new Set(passwords);
    validation.stats.uniquePasswords = uniqueSet.size;

    if (uniqueSet.size < passwords.length) {
      validation.warnings.push(
        `Dictionary contains ${passwords.length - uniqueSet.size} duplicate entries`
      );
    }

    // Calculate lengths
    const lengths = passwords.map(pwd => pwd.length).filter(len => len > 0);
    
    if (lengths.length > 0) {
      validation.stats.avgLength = 
        Math.round((lengths.reduce((a, b) => a + b, 0) / lengths.length) * 10) / 10;
      validation.stats.minLength = Math.min(...lengths);
      validation.stats.maxLength = Math.max(...lengths);
    }

    // Check for empty lines
    const emptyCount = passwords.filter(pwd => pwd.length === 0).length;
    if (emptyCount > 0) {
      validation.stats.containsEmptyLines = true;
      validation.warnings.push(`Dictionary contains ${emptyCount} empty lines`);
    }

    // Count special characters and numbers
    passwords.forEach(pwd => {
      if (/[^a-zA-Z0-9]/.test(pwd)) validation.stats.containsSpecialChars++;
      if (/\d/.test(pwd)) validation.stats.containsNumbers++;
    });

    // Size warnings
    if (passwords.length < 100) {
      validation.warnings.push('Dictionary is very small (< 100 passwords)');
    } else if (passwords.length > 1000000) {
      validation.warnings.push('Dictionary is very large (> 1M passwords), may impact performance');
    }

  } catch (error) {
    validation.isValid = false;
    validation.errors.push(`Validation error: ${error.message}`);
  }

  return validation;
};

/**
 * Filter dictionary by criteria
 * @param {Array<string>} passwords - Array of passwords
 * @param {Object} criteria - Filter criteria
 * @returns {Array<string>} - Filtered passwords
 */
export const filterDictionary = (passwords, criteria = {}) => {
  let filtered = [...passwords];

  const {
    minLength,
    maxLength,
    includeNumbers,
    includeSpecialChars,
    excludeNumbers,
    excludeSpecialChars,
    pattern,
    caseSensitive = false,
  } = criteria;

  // Length filters
  if (minLength !== undefined) {
    filtered = filtered.filter(pwd => pwd.length >= minLength);
  }

  if (maxLength !== undefined) {
    filtered = filtered.filter(pwd => pwd.length <= maxLength);
  }

  // Number filters
  const hasNumber = /\d/;
  if (includeNumbers === true) {
    filtered = filtered.filter(pwd => hasNumber.test(pwd));
  }
  if (excludeNumbers === true) {
    filtered = filtered.filter(pwd => !hasNumber.test(pwd));
  }

  // Special character filters
  const hasSpecial = /[^a-zA-Z0-9]/;
  if (includeSpecialChars === true) {
    filtered = filtered.filter(pwd => hasSpecial.test(pwd));
  }
  if (excludeSpecialChars === true) {
    filtered = filtered.filter(pwd => !hasSpecial.test(pwd));
  }

  // Pattern matching
  if (pattern) {
    try {
      const flags = caseSensitive ? '' : 'i';
      const regex = new RegExp(pattern, flags);
      filtered = filtered.filter(pwd => regex.test(pwd));
    } catch (error) {
      console.error('Invalid regex pattern:', error);
    }
  }

  return filtered;
};

/**
 * Merge multiple dictionaries
 * @param {...Array<string>} dictionaries - Multiple dictionary arrays
 * @returns {Array<string>} - Merged and deduplicated dictionary
 */
export const mergeDictionaries = (...dictionaries) => {
  const merged = dictionaries.flat();
  const unique = [...new Set(merged)];
  return unique.sort();
};

/**
 * Save dictionary to file (download)
 * @param {Array<string>} passwords - Array of passwords to save
 * @param {string} filename - Name for the downloaded file
 */
export const saveDictionaryToFile = (passwords, filename = 'dictionary.txt') => {
  try {
    const content = passwords.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error saving dictionary:', error);
    throw new Error(`Failed to save dictionary: ${error.message}`);
  }
};

/**
 * Get dictionary statistics
 * @param {Array<string>} passwords - Array of passwords
 * @returns {Object} - Detailed statistics
 */
export const getDictionaryStats = (passwords) => {
  const stats = {
    total: passwords.length,
    unique: new Set(passwords).size,
    lengths: {},
    complexity: {
      onlyLowercase: 0,
      onlyUppercase: 0,
      mixed: 0,
      withNumbers: 0,
      withSpecialChars: 0,
    },
    distribution: {
      short: 0,      // < 6 chars
      medium: 0,     // 6-10 chars
      long: 0,       // 11-15 chars
      veryLong: 0,   // > 15 chars
    },
  };

  passwords.forEach(pwd => {
    // Length stats
    const len = pwd.length;
    stats.lengths[len] = (stats.lengths[len] || 0) + 1;

    // Distribution
    if (len < 6) stats.distribution.short++;
    else if (len <= 10) stats.distribution.medium++;
    else if (len <= 15) stats.distribution.long++;
    else stats.distribution.veryLong++;

    // Complexity
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

    if (hasLower && !hasUpper && !hasNumber && !hasSpecial) {
      stats.complexity.onlyLowercase++;
    } else if (hasUpper && !hasLower && !hasNumber && !hasSpecial) {
      stats.complexity.onlyUppercase++;
    } else if ((hasLower || hasUpper) && !hasNumber && !hasSpecial) {
      stats.complexity.mixed++;
    }

    if (hasNumber) stats.complexity.withNumbers++;
    if (hasSpecial) stats.complexity.withSpecialChars++;
  });

  return stats;
};

/**
 * Cache dictionary in localStorage
 * @param {string} key - Cache key
 * @param {Array<string>} passwords - Array of passwords
 * @param {number} ttl - Time to live in milliseconds (default: 1 hour)
 */
export const cacheDictionary = (key, passwords, ttl = 3600000) => {
  try {
    const data = {
      passwords,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(`dict_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching dictionary:', error);
  }
};

/**
 * Get cached dictionary from localStorage
 * @param {string} key - Cache key
 * @returns {Array<string>|null} - Cached passwords or null if expired/not found
 */
export const getCachedDictionary = (key) => {
  try {
    const cached = localStorage.getItem(`dict_${key}`);
    if (!cached) return null;

    const data = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > data.ttl;

    if (isExpired) {
      localStorage.removeItem(`dict_${key}`);
      return null;
    }

    return data.passwords;
  } catch (error) {
    console.error('Error retrieving cached dictionary:', error);
    return null;
  }
};

/**
 * Clear dictionary cache
 * @param {string} key - Cache key (optional, clears all if not provided)
 */
export const clearDictionaryCache = (key = null) => {
  try {
    if (key) {
      localStorage.removeItem(`dict_${key}`);
    } else {
      // Clear all dictionary caches
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (k.startsWith('dict_')) {
          localStorage.removeItem(k);
        }
      });
    }
  } catch (error) {
    console.error('Error clearing dictionary cache:', error);
  }
};

// Export default object with all functions
export default {
  loadDictionaryFromURL,
  loadDictionaryFromFile,
  loadDictionaryFromPublic,
  loadDictionaryFromArray,
  validateDictionary,
  filterDictionary,
  mergeDictionaries,
  saveDictionaryToFile,
  getDictionaryStats,
  cacheDictionary,
  getCachedDictionary,
  clearDictionaryCache,
};
