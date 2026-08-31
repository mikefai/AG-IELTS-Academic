/**
 * Storage Helper Module
 * Defensive localStorage wrappers with error handling for offline persistence.
 */

const StorageManager = {
  // Safe generic getItem
  get: function(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`[Storage] Failed to read '${key}':`, e);
      return defaultValue;
    }
  },

  // Safe generic setItem
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[Storage] Failed to save '${key}':`, e);
      return false;
    }
  },

  // Arena Drafts
  getDrafts: function() {
    return this.get("ielts_task1_drafts", []);
  },

  saveDraft: function(draft) {
    const drafts = this.getDrafts();
    const newEntry = {
      id: "draft_" + Date.now(),
      timestamp: new Date().toLocaleString(),
      wordCount: draft.wordCount || 0,
      text: draft.text || "",
      prompt: draft.prompt || "Default Prompt",
      checklist: draft.checklist || {}
    };
    drafts.unshift(newEntry);
    // Keep max 10 drafts
    const trimmed = drafts.slice(0, 10);
    this.set("ielts_task1_drafts", trimmed);
    return newEntry;
  },

  deleteDraft: function(id) {
    const drafts = this.getDrafts().filter(d => d.id !== id);
    this.set("ielts_task1_drafts", drafts);
    return drafts;
  },

  // Rubric Scores History
  getRubricHistory: function() {
    return this.get("ielts_task1_rubric_history", []);
  },

  saveRubricScore: function(scores) {
    const history = this.getRubricHistory();
    const entry = {
      id: "rubric_" + Date.now(),
      timestamp: new Date().toLocaleDateString(),
      scores: scores, // { ta: 6.0, cc: 6.0, lr: 5.5, gra: 6.0 }
      overall: scores.overall || 6.0
    };
    history.push(entry);
    // Keep max 10 records
    const trimmed = history.slice(-10);
    this.set("ielts_task1_rubric_history", trimmed);
    return trimmed;
  },

  // Quiz High Score
  getQuizBestScore: function() {
    return this.get("ielts_task1_quiz_best", { score: 0, total: 15, date: null });
  },

  saveQuizScore: function(score, total) {
    const current = this.getQuizBestScore();
    if (score >= current.score) {
      const best = { score: score, total: total, date: new Date().toLocaleDateString() };
      this.set("ielts_task1_quiz_best", best);
      return best;
    }
    return current;
  },

  // Theme
  getTheme: function() {
    try {
      return localStorage.getItem("ielts_task1_theme") || "light";
    } catch (e) {
      return "light";
    }
  },

  setTheme: function(theme) {
    try {
      localStorage.setItem("ielts_task1_theme", theme);
    } catch (e) {}
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = StorageManager;
} else if (typeof window !== "undefined") {
  window.StorageManager = StorageManager;
}
