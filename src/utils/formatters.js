/**
 * Formatters Utility
 * Common formatting functions for display
 */

/**
 * Format time duration
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  if (seconds < 0.001) return '< 1ms';
  if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
  if (seconds < 60) return `${seconds.toFixed(2)}s`;
  
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  
  if (minutes < 60) return `${minutes}m ${secs}s`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours}h ${mins}m`;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  return num.toLocaleString();
};

/**
 * Format large numbers (K, M, B)
 * @param {number} num - Number to format
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted number
 */
export const formatLargeNumber = (num, decimals = 1) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toString();
};

/**
 * Format bytes to human readable
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted string
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} total - Total value
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted percentage
 */
export const formatPercentage = (value, total, decimals = 2) => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format hash string (truncate middle)
 * @param {string} hash - Hash to format
 * @param {number} startChars - Characters to show at start
 * @param {number} endChars - Characters to show at end
 * @returns {string} - Formatted hash
 */
export const formatHash = (hash, startChars = 8, endChars = 8) => {
  if (!hash || hash.length <= startChars + endChars) return hash;
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
};

/**
 * Format date
 * @param {Date|string|number} date - Date to format
 * @param {string} format - Format type (short, long, relative)
 * @returns {string} - Formatted date
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);

  switch (format) {
    case 'short':
      return d.toLocaleDateString();
    
    case 'long':
      return d.toLocaleString();
    
    case 'relative':
      return getRelativeTime(d);
    
    case 'iso':
      return d.toISOString();
    
    default:
      return d.toLocaleDateString();
  }
};

/**
 * Get relative time (e.g., "2 minutes ago")
 * @param {Date} date - Date to compare
 * @returns {string} - Relative time string
 */
const getRelativeTime = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

/**
 * Truncate string
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} - Truncated string
 */
export const truncate = (str, maxLength = 50, suffix = '...') => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to title case
 * @param {string} str - String to convert
 * @returns {string} - Title case string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Pluralize word
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional)
 * @returns {string} - Pluralized string
 */
export const pluralize = (count, singular, plural = null) => {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
};

/**
 * Format speed (hashes per second)
 * @param {number} hashesPerSecond - Hashes per second
 * @returns {string} - Formatted speed
 */
export const formatSpeed = (hashesPerSecond) => {
  return `${formatLargeNumber(hashesPerSecond)} hashes/sec`;
};

/**
 * Format algorithm name
 * @param {string} algorithm - Algorithm name
 * @returns {string} - Formatted name
 */
export const formatAlgorithmName = (algorithm) => {
  const names = {
    md5: 'MD5',
    sha1: 'SHA-1',
    sha256: 'SHA-256',
    sha512: 'SHA-512',
    sha3: 'SHA-3',
    bcrypt: 'bcrypt',
    argon2: 'Argon2'
  };

  return names[algorithm.toLowerCase()] || algorithm.toUpperCase();
};

export default {
  formatTime,
  formatNumber,
  formatLargeNumber,
  formatBytes,
  formatPercentage,
  formatHash,
  formatDate,
  truncate,
  capitalize,
  toTitleCase,
  pluralize,
  formatSpeed,
  formatAlgorithmName
};
