/**
 * Tool A: Writing Arena Module
 * Textarea with live word count, 20-minute countdown timer, structure checklist, and draft storage.
 */

const WritingArena = {
  timerSeconds: 1200, // 20 minutes
  timerInterval: null,
  timerRunning: false,
  fiveMinWarningTriggered: false,

  init: function() {
    this.bindEvents();
    this.updateWordCount();
    this.renderDraftsList();
  },

  bindEvents: function() {
    const textarea = document.getElementById("arenaTextarea");
    if (textarea) {
      textarea.addEventListener("input", () => this.updateWordCount());
    }

    const timerBtn = document.getElementById("btnTimerToggle");
    if (timerBtn) {
      timerBtn.addEventListener("click", () => this.toggleTimer());
    }

    const timerResetBtn = document.getElementById("btnTimerReset");
    if (timerResetBtn) {
      timerResetBtn.addEventListener("click", () => this.resetTimer());
    }

    const saveDraftBtn = document.getElementById("btnSaveDraft");
    if (saveDraftBtn) {
      saveDraftBtn.addEventListener("click", () => this.saveCurrentDraft());
    }

    const clearArenaBtn = document.getElementById("btnClearArena");
    if (clearArenaBtn) {
      clearArenaBtn.addEventListener("click", () => this.clearArena());
    }
  },

  updateWordCount: function() {
    const textarea = document.getElementById("arenaTextarea");
    const countBadge = document.getElementById("arenaWordCount");
    const statusMsg = document.getElementById("arenaWordStatus");
    if (!textarea || !countBadge) return;

    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    countBadge.innerText = words;

    if (words >= 150) {
      countBadge.className = "word-count-badge count-pass";
      if (statusMsg) {
        statusMsg.innerHTML = "✅ <span style='color: var(--correct); font-weight:700;'>Target met (150+ words).</span> Task Achievement penalty removed!";
      }
    } else {
      countBadge.className = "word-count-badge count-fail";
      const remaining = 150 - words;
      if (statusMsg) {
        statusMsg.innerHTML = `⚠️ <span style='color: var(--wrong); font-weight:700;'>Under length limit!</span> Write <strong>${remaining}</strong> more words to avoid the Band 5 cap.`;
      }
    }
  },

  toggleTimer: function() {
    const btn = document.getElementById("btnTimerToggle");
    if (this.timerRunning) {
      clearInterval(this.timerInterval);
      this.timerRunning = false;
      if (btn) btn.innerText = "▶ Resume Timer";
    } else {
      this.timerRunning = true;
      if (btn) btn.innerText = "⏸ Pause Timer";
      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
          this.renderTimerDisplay();

          // 5-Minute Warning (300 seconds)
          if (this.timerSeconds === 300 && !this.fiveMinWarningTriggered) {
            this.fiveMinWarningTriggered = true;
            this.showTimerWarning("⏰ 5 Minutes Remaining! Ensure you have written your Overview and grouped your details.");
          }
        } else {
          clearInterval(this.timerInterval);
          this.timerRunning = false;
          if (btn) btn.innerText = "Time Expired";
          this.showTimerWarning("🚨 20 Minutes Expired! Pencils down. Review your essay against the checklist.");
        }
      }, 1000);
    }
  },

  resetTimer: function() {
    clearInterval(this.timerInterval);
    this.timerRunning = false;
    this.timerSeconds = 1200;
    this.fiveMinWarningTriggered = false;
    const btn = document.getElementById("btnTimerToggle");
    if (btn) btn.innerText = "▶ Start 20-Min Timer";
    this.renderTimerDisplay();
  },

  renderTimerDisplay: function() {
    const disp = document.getElementById("arenaTimerDisplay");
    if (!disp) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    disp.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (this.timerSeconds <= 300) {
      disp.style.color = "var(--wrong)";
    } else {
      disp.style.color = "inherit";
    }
  },

  showTimerWarning: function(msg) {
    const banner = document.getElementById("arenaTimerBanner");
    if (banner) {
      banner.innerText = msg;
      banner.style.display = "block";
      setTimeout(() => {
        banner.style.display = "none";
      }, 8000);
    } else {
      alert(msg);
    }
  },

  saveCurrentDraft: function() {
    const textarea = document.getElementById("arenaTextarea");
    if (!textarea || !textarea.value.trim()) {
      alert("Cannot save an empty draft. Write some text first!");
      return;
    }

    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const promptSelect = document.getElementById("arenaPromptSelect");
    const promptName = promptSelect ? promptSelect.options[promptSelect.selectedIndex].text : "Custom Practice Prompt";

    const checklist = {
      p1: document.getElementById("chkP1")?.checked || false,
      p2: document.getElementById("chkP2")?.checked || false,
      p3: document.getElementById("chkP3")?.checked || false,
      p4: document.getElementById("chkP4")?.checked || false
    };

    StorageManager.saveDraft({
      text: text,
      wordCount: words,
      prompt: promptName,
      checklist: checklist
    });

    this.renderDraftsList();
    alert("Draft saved to browser storage successfully!");
  },

  renderDraftsList: function() {
    const container = document.getElementById("arenaDraftsContainer");
    if (!container) return;

    const drafts = StorageManager.getDrafts();
    if (drafts.length === 0) {
      container.innerHTML = "<p style='color: var(--text-muted); font-size: 0.85rem;'>No saved drafts yet. Write your response and click 'Save Draft'.</p>";
      return;
    }

    container.innerHTML = drafts.map(d => `
      <div class="draft-item">
        <div>
          <strong>${d.prompt}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${d.timestamp} • ${d.wordCount} words</div>
        </div>
        <div class="draft-actions">
          <button class="btn-sm btn-outline" onclick="WritingArena.loadDraft('${d.id}')">Load</button>
          <button class="btn-sm btn-danger" onclick="WritingArena.deleteDraft('${d.id}')">Delete</button>
        </div>
      </div>
    `).join("");
  },

  loadDraft: function(id) {
    const drafts = StorageManager.getDrafts();
    const found = drafts.find(d => d.id === id);
    if (!found) return;

    const textarea = document.getElementById("arenaTextarea");
    if (textarea) {
      textarea.value = found.text;
      this.updateWordCount();
    }

    if (found.checklist) {
      if (document.getElementById("chkP1")) document.getElementById("chkP1").checked = found.checklist.p1;
      if (document.getElementById("chkP2")) document.getElementById("chkP2").checked = found.checklist.p2;
      if (document.getElementById("chkP3")) document.getElementById("chkP3").checked = found.checklist.p3;
      if (document.getElementById("chkP4")) document.getElementById("chkP4").checked = found.checklist.p4;
    }
  },

  deleteDraft: function(id) {
    if (confirm("Are you sure you want to delete this saved draft?")) {
      StorageManager.deleteDraft(id);
      this.renderDraftsList();
    }
  },

  clearArena: function() {
    if (confirm("Clear current draft text?")) {
      const textarea = document.getElementById("arenaTextarea");
      if (textarea) textarea.value = "";
      this.updateWordCount();
    }
  }
};

if (typeof window !== "undefined") {
  window.WritingArena = WritingArena;
}
