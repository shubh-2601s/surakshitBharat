/**
 * Suraksha Bharat - Client & User Rate Limiter Service
 * Enforces per-user API limits for Gemini AI:
 * 1. Max 2 requests per sliding 60-second window (2 requests / minute max)
 * 2. Max 30 requests per calendar day (resetting at midnight local time)
 */

export interface RateLimitStatus {
  allowed: boolean;
  reason?: 'minute_limit' | 'daily_limit';
  waitSeconds: number;
  usedToday: number;
  remainingToday: number;
  maxPerDay: number;
  maxPerMinute: number;
  resetsAt: string;
}

export interface StoredRateLimitData {
  date: string; // YYYY-MM-DD
  dayCount: number;
  minuteTimestamps: number[]; // Epoch ms timestamps
}

export const MAX_REQUESTS_PER_MINUTE = 2;
export const MINUTE_WINDOW_MS = 60 * 1000; // 60 seconds
export const MAX_REQUESTS_PER_DAY = 30;

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getStorageKey(userId?: string): string {
  const cleanId = (userId || 'guest').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `sb_gemini_ratelimit_${cleanId}`;
}

export function getStoredData(userId?: string): StoredRateLimitData {
  const key = getStorageKey(userId);
  const today = getTodayString();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return { date: today, dayCount: 0, minuteTimestamps: [] };
    }
    const parsed: StoredRateLimitData = JSON.parse(raw);
    if (parsed.date !== today) {
      // New calendar day: reset daily count and timestamps
      return { date: today, dayCount: 0, minuteTimestamps: [] };
    }
    // Filter timestamps to only keep those within the sliding 60-second window
    const now = Date.now();
    const activeTimestamps = (parsed.minuteTimestamps || []).filter(
      (ts) => now - ts < MINUTE_WINDOW_MS
    );
    return {
      date: today,
      dayCount: parsed.dayCount || 0,
      minuteTimestamps: activeTimestamps
    };
  } catch (e) {
    console.warn('Failed to parse rate limit data, resetting:', e);
    return { date: today, dayCount: 0, minuteTimestamps: [] };
  }
}

function saveStoredData(userId: string | undefined, data: StoredRateLimitData): void {
  const key = getStorageKey(userId);
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save rate limit data to localStorage:', e);
  }
}

/**
 * Checks current rate limit status without incrementing counts.
 */
export function checkRateLimit(userId?: string): RateLimitStatus {
  const data = getStoredData(userId);
  const now = Date.now();
  const activeTimestamps = data.minuteTimestamps.filter((ts) => now - ts < MINUTE_WINDOW_MS);

  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  // Check 1: Daily limit (30 requests/day)
  if (data.dayCount >= MAX_REQUESTS_PER_DAY) {
    return {
      allowed: false,
      reason: 'daily_limit',
      waitSeconds: Math.ceil((midnight.getTime() - now) / 1000),
      usedToday: data.dayCount,
      remainingToday: 0,
      maxPerDay: MAX_REQUESTS_PER_DAY,
      maxPerMinute: MAX_REQUESTS_PER_MINUTE,
      resetsAt: 'midnight (00:00)'
    };
  }

  // Check 2: Minute sliding window limit (2 requests/min)
  if (activeTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    // Oldest timestamp in current active window determines cooldown
    const oldestTimestamp = Math.min(...activeTimestamps);
    const elapsed = now - oldestTimestamp;
    const remainingCooldownMs = Math.max(0, MINUTE_WINDOW_MS - elapsed);
    const waitSeconds = Math.max(1, Math.ceil(remainingCooldownMs / 1000));

    return {
      allowed: false,
      reason: 'minute_limit',
      waitSeconds,
      usedToday: data.dayCount,
      remainingToday: Math.max(0, MAX_REQUESTS_PER_DAY - data.dayCount),
      maxPerDay: MAX_REQUESTS_PER_DAY,
      maxPerMinute: MAX_REQUESTS_PER_MINUTE,
      resetsAt: `${waitSeconds}s`
    };
  }

  // Within limits
  return {
    allowed: true,
    waitSeconds: 0,
    usedToday: data.dayCount,
    remainingToday: Math.max(0, MAX_REQUESTS_PER_DAY - data.dayCount),
    maxPerDay: MAX_REQUESTS_PER_DAY,
    maxPerMinute: MAX_REQUESTS_PER_MINUTE,
    resetsAt: 'instant'
  };
}

/**
 * Records a new request. Call this right as the user sends a message.
 * Throws an Error if limits are exceeded.
 */
export function recordRateLimitRequest(userId?: string): RateLimitStatus {
  const status = checkRateLimit(userId);
  if (!status.allowed) {
    return status;
  }

  const data = getStoredData(userId);
  const now = Date.now();
  const activeTimestamps = data.minuteTimestamps.filter((ts) => now - ts < MINUTE_WINDOW_MS);

  activeTimestamps.push(now);
  const updatedData: StoredRateLimitData = {
    date: getTodayString(),
    dayCount: data.dayCount + 1,
    minuteTimestamps: activeTimestamps
  };

  saveStoredData(userId, updatedData);
  return checkRateLimit(userId);
}

/**
 * Helper to reset rate limits for testing or demo purposes
 */
export function resetRateLimit(userId?: string): void {
  const key = getStorageKey(userId);
  localStorage.removeItem(key);
}
