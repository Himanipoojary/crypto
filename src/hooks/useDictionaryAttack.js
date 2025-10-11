import { useState, useCallback, useRef, useEffect } from 'react';
import { hashPassword } from '../utils/hashFunctions';

/**
 * Custom hook for managing dictionary attack state and execution
 * @param {string} targetHash - The hash to crack
 * @param {string} algorithm - Hash algorithm (md5, sha1, sha256)
 * @param {Array} dictionary - Array of passwords to test
 */
const useDictionaryAttack = () => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordsTested, setPasswordsTested] = useState(0);
  const [totalPasswords, setTotalPasswords] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const attackWorkerRef = useRef(null);
  const timerRef = useRef(null);

  // Update timer while attacking
  useEffect(() => {
    if (isAttacking && startTime) {
      timerRef.current = setInterval(() => {
        setTimeTaken((Date.now() - startTime) / 1000);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAttacking, startTime]);

  /**
   * Start dictionary attack
   */
  const startAttack = useCallback(async (targetHash, algorithm, dictionary) => {
    setIsAttacking(true);
    setProgress(0);
    setPasswordsTested(0);
    setCurrentPassword('');
    setResult(null);
    setTotalPasswords(dictionary.length);
    
    const attackStartTime = Date.now();
    setStartTime(attackStartTime);

    let found = false;
    let crackedPassword = null;

    try {
      // Simulate batch processing for better UI responsiveness
      const batchSize = 100;
      
      for (let i = 0; i < dictionary.length; i += batchSize) {
        // Check if attack was stopped
        if (!attackWorkerRef.current) break;

        const batch = dictionary.slice(i, i + batchSize);
        
        // Process batch
        for (const password of batch) {
          setCurrentPassword(password);
          setPasswordsTested(i + batch.indexOf(password) + 1);
          
          const hashedPassword = await hashPassword(password, algorithm);
          
          if (hashedPassword.toLowerCase() === targetHash.toLowerCase()) {
            found = true;
            crackedPassword = password;
            break;
          }
        }

        if (found) break;

        // Update progress
        const currentProgress = ((i + batchSize) / dictionary.length) * 100;
        setProgress(Math.min(currentProgress, 100));

        // Add small delay for UI to update
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      const attackEndTime = Date.now();
      const totalTime = (attackEndTime - attackStartTime) / 1000;

      setTimeTaken(totalTime);
      setIsAttacking(false);
      setProgress(100);

      setResult({
        success: found,
        crackedPassword: crackedPassword,
        timeTaken: totalTime,
        passwordsTested: found ? passwordsTested : dictionary.length,
        hashValue: targetHash,
        algorithm: algorithm
      });

    } catch (error) {
      console.error('Attack error:', error);
      setIsAttacking(false);
      setResult({
        success: false,
        error: error.message
      });
    }
  }, [passwordsTested]);

  /**
   * Stop ongoing attack
   */
  const stopAttack = useCallback(() => {
    attackWorkerRef.current = null;
    setIsAttacking(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  /**
   * Reset attack state
   */
  const resetAttack = useCallback(() => {
    setIsAttacking(false);
    setProgress(0);
    setCurrentPassword('');
    setPasswordsTested(0);
    setTotalPasswords(0);
    setTimeTaken(0);
    setResult(null);
    setStartTime(null);
    attackWorkerRef.current = null;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  // Initialize worker ref
  useEffect(() => {
    attackWorkerRef.current = true;
    return () => {
      attackWorkerRef.current = null;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    // State
    isAttacking,
    progress,
    currentPassword,
    passwordsTested,
    totalPasswords,
    timeTaken,
    result,
    
    // Actions
    startAttack,
    stopAttack,
    resetAttack
  };
};

export default useDictionaryAttack;
