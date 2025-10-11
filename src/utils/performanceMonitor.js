/**
 * Performance Monitor Utility
 * Track and measure application performance metrics
 */

/**
 * Performance tracker class
 */
class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.marks = new Map();
  }

  /**
   * Start tracking a metric
   * @param {string} name - Metric name
   */
  start(name) {
    this.marks.set(name, performance.now());
  }

  /**
   * End tracking and calculate duration
   * @param {string} name - Metric name
   * @returns {number} - Duration in milliseconds
   */
  end(name) {
    const startTime = this.marks.get(name);
    if (!startTime) {
      console.warn(`No start mark found for: ${name}`);
      return 0;
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Store metric
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name).push(duration);

    // Clean up mark
    this.marks.delete(name);

    return duration;
  }

  /**
   * Get statistics for a metric
   * @param {string} name - Metric name
   * @returns {Object} - Statistics
   */
  getStats(name) {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);

    return {
      count: sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      average: sum / sorted.length,
      median: sorted[Math.floor(sorted.length / 2)],
      total: sum
    };
  }

  /**
   * Get all metrics
   * @returns {Object} - All tracked metrics
   */
  getAllMetrics() {
    const result = {};
    for (const [name, values] of this.metrics.entries()) {
      result[name] = this.getStats(name);
    }
    return result;
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics.clear();
    this.marks.clear();
  }

  /**
   * Clear specific metric
   * @param {string} name - Metric name
   */
  clearMetric(name) {
    this.metrics.delete(name);
    this.marks.delete(name);
  }
}

// Create singleton instance
const tracker = new PerformanceTracker();

/**
 * Monitor function execution time
 * @param {Function} fn - Function to monitor
 * @param {string} name - Metric name
 * @returns {Function} - Wrapped function
 */
export const monitorFunction = (fn, name) => {
  return async (...args) => {
    tracker.start(name);
    try {
      const result = await fn(...args);
      tracker.end(name);
      return result;
    } catch (error) {
      tracker.end(name);
      throw error;
    }
  };
};

/**
 * Get memory usage (if available)
 * @returns {Object|null} - Memory usage info
 */
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      usedPercent: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 100).toFixed(2)
    };
  }
  return null;
};

/**
 * Get FPS (frames per second)
 * @param {number} duration - Duration to measure in milliseconds
 * @returns {Promise<number>} - Average FPS
 */
export const measureFPS = (duration = 1000) => {
  return new Promise((resolve) => {
    let frames = 0;
    const startTime = performance.now();

    const countFrame = () => {
      frames++;
      const elapsed = performance.now() - startTime;

      if (elapsed < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = Math.round((frames / elapsed) * 1000);
        resolve(fps);
      }
    };

    requestAnimationFrame(countFrame);
  });
};

/**
 * Calculate hashes per second
 * @param {number} hashCount - Number of hashes
 * @param {number} timeInSeconds - Time taken in seconds
 * @returns {number} - Hashes per second
 */
export const calculateHashRate = (hashCount, timeInSeconds) => {
  if (timeInSeconds === 0) return 0;
  return Math.round(hashCount / timeInSeconds);
};

/**
 * Export metrics to JSON
 * @returns {string} - JSON string of all metrics
 */
export const exportMetrics = () => {
  return JSON.stringify(tracker.getAllMetrics(), null, 2);
};

/**
 * Log performance summary
 */
export const logPerformanceSummary = () => {
  const metrics = tracker.getAllMetrics();
  console.group('Performance Summary');
  
  for (const [name, stats] of Object.entries(metrics)) {
    console.log(`\n${name}:`);
    console.log(`  Count: ${stats.count}`);
    console.log(`  Average: ${stats.average.toFixed(2)}ms`);
    console.log(`  Min: ${stats.min.toFixed(2)}ms`);
    console.log(`  Max: ${stats.max.toFixed(2)}ms`);
    console.log(`  Total: ${stats.total.toFixed(2)}ms`);
  }
  
  console.groupEnd();
};

// Export tracker instance and methods
export const startTracking = (name) => tracker.start(name);
export const endTracking = (name) => tracker.end(name);
export const getTrackingStats = (name) => tracker.getStats(name);
export const getAllTrackingMetrics = () => tracker.getAllMetrics();
export const clearTracking = () => tracker.clear();
export const clearMetric = (name) => tracker.clearMetric(name);

export default {
  startTracking,
  endTracking,
  getTrackingStats,
  getAllTrackingMetrics,
  clearTracking,
  clearMetric,
  monitorFunction,
  getMemoryUsage,
  measureFPS,
  calculateHashRate,
  exportMetrics,
  logPerformanceSummary
};
