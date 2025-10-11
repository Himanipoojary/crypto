import { useState, useEffect, useCallback } from 'react';
import { commonPasswords } from '../data/sampleHashes';

/**
 * Custom hook for loading and managing password dictionaries
 * Supports both inline arrays and external file loading
 */
const useDictionary = (source = 'inline') => {
  const [dictionary, setDictionary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalWords: 0,
    uniqueWords: 0,
    avgLength: 0,
    minLength: 0,
    maxLength: 0
  });

  /**
   * Calculate dictionary statistics
   */
  const calculateStats = useCallback((words) => {
    if (!words || words.length === 0) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        avgLength: 0,
        minLength: 0,
        maxLength: 0
      };
    }

    const uniqueWords = [...new Set(words)].length;
    const lengths = words.map(w => w.length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const minLength = Math.min(...lengths);
    const maxLength = Math.max(...lengths);

    return {
      totalWords: words.length,
      uniqueWords,
      avgLength: Math.round(avgLength * 10) / 10,
      minLength,
      maxLength
    };
  }, []);

  /**
   * Load dictionary from inline source
   */
  const loadInlineDictionary = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Use common passwords from data
      setDictionary(commonPasswords);
      setStats(calculateStats(commonPasswords));
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [calculateStats]);

  /**
   * Load dictionary from external file
   */
  const loadFileDictionary = useCallback(async (filePath) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.statusText}`);
      }

      const text = await response.text();
      const words = text
        .split('\n')
        .map(word => word.trim())
        .filter(word => word.length > 0);

      setDictionary(words);
      setStats(calculateStats(words));
      setIsLoading(false);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      // Fallback to inline dictionary
      loadInlineDictionary();
    }
  }, [calculateStats, loadInlineDictionary]);

  /**
   * Load dictionary from custom array
   */
  const loadCustomDictionary = useCallback((words) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!Array.isArray(words)) {
        throw new Error('Dictionary must be an array');
      }

      const cleanWords = words
        .map(word => String(word).trim())
        .filter(word => word.length > 0);

      setDictionary(cleanWords);
      setStats(calculateStats(cleanWords));
      setIsLoading(false);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [calculateStats]);

  /**
   * Filter dictionary by criteria
   */
  const filterDictionary = useCallback((criteria) => {
    const {
      minLength,
      maxLength,
      includeNumbers,
      includeSpecialChars,
      pattern
    } = criteria;

    let filtered = [...dictionary];

    if (minLength) {
      filtered = filtered.filter(word => word.length >= minLength);
    }

    if (maxLength) {
      filtered = filtered.filter(word => word.length <= maxLength);
    }

    if (includeNumbers !== undefined) {
      const hasNumber = /\d/;
      filtered = filtered.filter(word => 
        includeNumbers ? hasNumber.test(word) : !hasNumber.test(word)
      );
    }

    if (includeSpecialChars !== undefined) {
      const hasSpecial = /[^a-zA-Z0-9]/;
      filtered = filtered.filter(word => 
        includeSpecialChars ? hasSpecial.test(word) : !hasSpecial.test(word)
      );
    }

    if (pattern) {
      const regex = new RegExp(pattern, 'i');
      filtered = filtered.filter(word => regex.test(word));
    }

    return filtered;
  }, [dictionary]);

  /**
   * Get dictionary subset
   */
  const getSubset = useCallback((start, count) => {
    return dictionary.slice(start, start + count);
  }, [dictionary]);

  /**
   * Search dictionary for specific word
   */
  const searchWord = useCallback((word) => {
    return dictionary.includes(word);
  }, [dictionary]);

  /**
   * Get random words from dictionary
   */
  const getRandomWords = useCallback((count = 10) => {
    const shuffled = [...dictionary].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }, [dictionary]);

  // Load dictionary on mount or source change
  useEffect(() => {
    if (source === 'inline') {
      loadInlineDictionary();
    } else if (source.startsWith('http') || source.startsWith('/')) {
      loadFileDictionary(source);
    }
  }, [source, loadInlineDictionary, loadFileDictionary]);

  return {
    // State
    dictionary,
    isLoading,
    error,
    stats,
    
    // Methods
    loadInlineDictionary,
    loadFileDictionary,
    loadCustomDictionary,
    filterDictionary,
    getSubset,
    searchWord,
    getRandomWords
  };
};

export default useDictionary;
