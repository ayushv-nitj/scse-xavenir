/**
 * Performance monitoring utilities for tracking Core Web Vitals
 * and other performance metrics
 */

export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // You can send to Google Analytics, Vercel Analytics, or your own endpoint
    const body = JSON.stringify(metric);
    const url = "/api/analytics";

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: "POST", keepalive: true }).catch(console.error);
    }
  }
}

/**
 * Track custom performance metrics
 */
export function trackPerformance(metricName: string, value: number) {
  if (typeof window !== "undefined" && window.performance) {
    performance.mark(metricName);
    
    if (process.env.NODE_ENV === "development") {
      console.log(`Performance: ${metricName} = ${value}ms`);
    }
  }
}

/**
 * Measure time between two marks
 */
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== "undefined" && window.performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      
      if (process.env.NODE_ENV === "development") {
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
      }
      
      return measure.duration;
    } catch (error) {
      console.error("Performance measurement error:", error);
      return 0;
    }
  }
  return 0;
}

/**
 * Get Core Web Vitals thresholds
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
};

/**
 * Check if a metric is good, needs improvement, or poor
 */
export function getMetricRating(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.needsImprovement) return "needs-improvement";
  return "poor";
}
