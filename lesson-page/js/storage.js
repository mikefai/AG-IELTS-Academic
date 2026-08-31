/**
 * B1 Teen ESL Lesson Platform - Storage Manager
 * Handles offline persistence via LocalStorage with safe in-memory fallback.
 */

const STORAGE_KEYS = {
  EXERCISE_PROGRESS: "esl_teen_b1_exercise_progress",
  CAN_DO_RATINGS: "esl_teen_b1_can_do_ratings",
  WARMUP_COMPLETED: "esl_teen_b1_warmup_completed",
  THEME: "esl_teen_b1_theme",
  CEFR_FILTER: "esl_teen_b1_cefr_filter"
};

const StorageManager = {
  // In-memory fallback in case localStorage is disabled
  _memoryFallback: {},

  isAvailable() {
    try {
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem(key, defaultValue = null) {
    if (this.isAvailable()) {
      try {
        const val = window.localStorage.getItem(key);
        return val !== null ? JSON.parse(val) : defaultValue;
      } catch (e) {
        console.warn("Storage read error:", e);
        return defaultValue;
      }
    }
    return this._memoryFallback[key] !== undefined ? this._memoryFallback[key] : defaultValue;
  },

  setItem(key, value) {
    if (this.isAvailable()) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn("Storage write error:", e);
      }
    }
    this._memoryFallback[key] = value;
    return true;
  },

  removeItem(key) {
    if (this.isAvailable()) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        console.warn("Storage remove error:", e);
      }
    }
    delete this._memoryFallback[key];
  },

  // Exercise Progress Management
  getProgress() {
    return this.getItem(STORAGE_KEYS.EXERCISE_PROGRESS, {
      completedExercises: {}, // ex_id: { score: number, total: number, date: string, passed: boolean }
      readingScores: {},      // text_id_task_id: { score: number, total: number, passed: boolean }
      grammarScores: {}       // gram_id: { score: number, total: number, passed: boolean }
    });
  },

  saveExerciseResult(exerciseId, score, total) {
    const progress = this.getProgress();
    progress.completedExercises[exerciseId] = {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      passed: score === total,
      timestamp: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.EXERCISE_PROGRESS, progress);
    return progress;
  },

  saveReadingResult(taskId, score, total) {
    const progress = this.getProgress();
    progress.readingScores[taskId] = {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      passed: score === total,
      timestamp: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.EXERCISE_PROGRESS, progress);
    return progress;
  },

  saveGrammarResult(grammarId, score, total) {
    const progress = this.getProgress();
    progress.grammarScores[grammarId] = {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      passed: score === total,
      timestamp: new Date().toISOString()
    };
    this.setItem(STORAGE_KEYS.EXERCISE_PROGRESS, progress);
    return progress;
  },

  // Warmup Discussion Tracking
  getCompletedWarmups() {
    return this.getItem(STORAGE_KEYS.WARMUP_COMPLETED, []);
  },

  toggleWarmupCompleted(questionId) {
    const list = this.getCompletedWarmups();
    const idx = list.indexOf(questionId);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(questionId);
    }
    this.setItem(STORAGE_KEYS.WARMUP_COMPLETED, list);
    return list;
  },

  // Can-Do Ratings
  getCanDoRatings() {
    return this.getItem(STORAGE_KEYS.CAN_DO_RATINGS, {
      can_do_1: 3,
      can_do_2: 3,
      can_do_3: 3,
      can_do_4: 3,
      can_do_5: 3
    });
  },

  saveCanDoRating(canDoId, rating) {
    const ratings = this.getCanDoRatings();
    ratings[canDoId] = Number(rating);
    this.setItem(STORAGE_KEYS.CAN_DO_RATINGS, ratings);
    return ratings;
  },

  // Theme
  getTheme() {
    return this.getItem(STORAGE_KEYS.THEME, "system");
  },

  setTheme(theme) {
    this.setItem(STORAGE_KEYS.THEME, theme);
  },

  // CEFR Filter
  getCefrFilter() {
    return this.getItem(STORAGE_KEYS.CEFR_FILTER, "all");
  },

  setCefrFilter(filter) {
    this.setItem(STORAGE_KEYS.CEFR_FILTER, filter);
  },

  // Stats calculation
  getOverallStats() {
    const progress = this.getProgress();
    const warmups = this.getCompletedWarmups();
    const canDo = this.getCanDoRatings();

    const exKeys = Object.keys(progress.completedExercises);
    const readKeys = Object.keys(progress.readingScores);
    const gramKeys = Object.keys(progress.grammarScores);

    let totalScore = 0;
    let maxScore = 0;

    exKeys.forEach(k => {
      totalScore += progress.completedExercises[k].score;
      maxScore += progress.completedExercises[k].total;
    });
    readKeys.forEach(k => {
      totalScore += progress.readingScores[k].score;
      maxScore += progress.readingScores[k].total;
    });
    gramKeys.forEach(k => {
      totalScore += progress.grammarScores[k].score;
      maxScore += progress.grammarScores[k].total;
    });

    const completedTotal = exKeys.length + readKeys.length + gramKeys.length;
    const accuracy = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return {
      completedExercisesCount: exKeys.length,
      completedReadingTasksCount: readKeys.length,
      completedGrammarCount: gramKeys.length,
      completedWarmupsCount: warmups.length,
      totalCompletedActivities: completedTotal + warmups.length,
      totalScore,
      maxScore,
      accuracy,
      canDoRatings: canDo
    };
  },

  // Complete Reset
  resetAllProgress() {
    this.removeItem(STORAGE_KEYS.EXERCISE_PROGRESS);
    this.removeItem(STORAGE_KEYS.CAN_DO_RATINGS);
    this.removeItem(STORAGE_KEYS.WARMUP_COMPLETED);
    // Theme and filter are kept for convenience
    return true;
  }
};
