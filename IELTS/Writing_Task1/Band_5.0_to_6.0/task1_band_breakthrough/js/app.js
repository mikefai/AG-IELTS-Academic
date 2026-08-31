/**
 * Main Application Orchestrator
 * Coordinates UI tabs, accordions, vocab filtering, theme management, and tool initialization.
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  activeVocabCategory: "all",
  vocabSearchQuery: "",

  init: function() {
    this.initTheme();
    this.renderBattlefieldCriteria();
    this.renderQuestionTypes();
    this.renderVocabBank();
    this.renderDeadlySins();
    this.renderSampleComparison();
    this.bindGlobalEvents();

    // Initialize all interactive sub-modules with safe null checks
    if (typeof WritingArena !== "undefined") WritingArena.init();
    if (typeof RubricAssessment !== "undefined") RubricAssessment.init();
    if (typeof OverviewTrainer !== "undefined") OverviewTrainer.init();
    if (typeof ParaphraseLab !== "undefined") ParaphraseLab.init();
    if (typeof VocabQuiz !== "undefined") VocabQuiz.init();
    if (typeof TeacherMode !== "undefined") TeacherMode.init();
  },

  // 1. Theme Management
  initTheme: function() {
    const savedTheme = StorageManager.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeButtonText(savedTheme);
  },

  toggleTheme: function() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    StorageManager.setTheme(next);
    this.updateThemeButtonText(next);
  },

  updateThemeButtonText: function(theme) {
    const btn = document.getElementById("btnThemeToggle");
    if (btn) {
      btn.innerHTML = theme === "dark" ? "☀️ Light" : "🌓 Dark";
    }
  },

  // 2. Section 1: Battlefield Criteria Cards
  renderBattlefieldCriteria: function() {
    const container = document.getElementById("criteriaCardsContainer");
    if (!container || !IELTS_DATA.criteria) return;

    container.innerHTML = IELTS_DATA.criteria.map(c => `
      <div class="criterion-card">
        <div class="criterion-header">
          <span class="criterion-icon">${c.icon}</span>
          <div>
            <h3>${c.name}</h3>
            <span class="badge badge-primary">${c.weight} of Score</span>
          </div>
        </div>
        <p class="criterion-summary">${c.summary}</p>
        <div class="band-comparison-grid">
          <div class="band-col band-6-col">
            <span class="band-col-tag tag-band6">Band 6 Requirement</span>
            <p>${c.band6}</p>
          </div>
          <div class="band-col band-7-col">
            <span class="band-col-tag tag-band7">Band 7 Requirement</span>
            <p>${c.band7}</p>
          </div>
        </div>
        <div class="killer-tip-box">
          ⚠️ <strong>Critical Rule:</strong> ${c.killerTip}
        </div>
      </div>
    `).join("");
  },

  // 3. Section 2: The 6 Question Types (Tabbed Interface)
  renderQuestionTypes: function() {
    const navContainer = document.getElementById("qTypesNav");
    const contentContainer = document.getElementById("qTypesContent");
    if (!navContainer || !contentContainer || !IELTS_DATA.questionTypes) return;

    // Render Tab Buttons
    navContainer.innerHTML = IELTS_DATA.questionTypes.map((qt, idx) => `
      <button class="tab-btn ${idx === 0 ? 'active' : ''}" onclick="App.switchQTypeTab('${qt.id}')" id="tabBtn_${qt.id}">
        <span>${qt.icon}</span>
        <span>${qt.title}</span>
      </button>
    `).join("");

    // Render Tab Panels
    contentContainer.innerHTML = IELTS_DATA.questionTypes.map((qt, idx) => `
      <div class="tab-panel ${idx === 0 ? 'active' : ''}" id="tabPanel_${qt.id}">
        <div class="qtype-header">
          <span class="qtype-icon-lg">${qt.icon}</span>
          <div>
            <h3>${qt.title} Mastery Blueprint</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem;">${qt.whatItShows}</p>
          </div>
        </div>

        <div class="qtype-grid">
          <div class="qtype-box look-box">
            <h4>🔍 What to Look for First</h4>
            <p>${qt.firstLook}</p>
          </div>
          <div class="qtype-box trap-box">
            <h4>⚠️ The 2–3 Biggest Traps</h4>
            <ul>
              ${qt.traps.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="qtype-vocab-box">
          <h4>📚 Dedicated Vocabulary & High-Score Structures</h4>
          <div class="vocab-chips-list">
            ${qt.vocab.map(v => `
              <div class="vocab-chip" onclick="App.copyToClipboard('${v.term}', this)" title="Click to copy">
                <strong>${v.term}</strong>
                <span class="chip-type">${v.type}</span>
                <span class="chip-def">${v.def}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");
  },

  switchQTypeTab: function(id) {
    document.querySelectorAll("#qTypesNav .tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll("#qTypesContent .tab-panel").forEach(panel => panel.classList.remove("active"));

    const targetBtn = document.getElementById(`tabBtn_${id}`);
    const targetPanel = document.getElementById(`tabPanel_${id}`);
    if (targetBtn) targetBtn.classList.add("active");
    if (targetPanel) targetPanel.classList.add("active");
  },

  // 4. Section 4: Filterable & Copy-on-Click Vocabulary Bank
  renderVocabBank: function() {
    const container = document.getElementById("vocabBankContainer");
    if (!container || !IELTS_DATA.vocabBank) return;

    const query = this.vocabSearchQuery.toLowerCase();
    const activeCat = this.activeVocabCategory;

    const filteredSections = IELTS_DATA.vocabBank.filter(sec => {
      if (activeCat !== "all" && sec.category !== activeCat) return false;
      return true;
    });

    if (filteredSections.length === 0) {
      container.innerHTML = "<p style='color:var(--text-muted); text-align:center; padding:2rem;'>No vocabulary matches your search criteria.</p>";
      return;
    }

    container.innerHTML = filteredSections.map(sec => {
      const items = sec.items.filter(it => {
        if (!query) return true;
        return it.phrase.toLowerCase().includes(query) || (it.example && it.example.toLowerCase().includes(query)) || (it.note && it.note.toLowerCase().includes(query));
      });

      if (items.length === 0) return "";

      return `
        <div class="vocab-section-card">
          <div class="vocab-sec-header">
            <h4>${sec.title}</h4>
            <span class="badge">${items.length} Phrases</span>
          </div>
          <table class="vocab-table">
            <thead>
              <tr>
                <th style="width: 30%;">Phrase (Click to copy)</th>
                <th style="width: 20%;">Type</th>
                <th style="width: 50%;">Authentic Example & Examiner Note</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(it => `
                <tr class="clickable-row" onclick="App.copyToClipboard('${it.phrase}', this)">
                  <td>
                    <span class="vocab-phrase-text">📋 ${it.phrase}</span>
                  </td>
                  <td><span class="badge badge-secondary">${it.type}</span></td>
                  <td>
                    <div>${it.example || ''}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;"><em>${it.note || ''}</em></div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }).join("");
  },

  filterVocabCategory: function(cat) {
    this.activeVocabCategory = cat;
    document.querySelectorAll("#vocabFilterBar .filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-cat") === cat);
    });
    this.renderVocabBank();
  },

  handleVocabSearch: function(val) {
    this.vocabSearchQuery = val.trim();
    this.renderVocabBank();
  },

  copyToClipboard: function(text, element) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyFeedback(element);
      }).catch(() => {
        this.fallbackCopy(text, element);
      });
    } else {
      this.fallbackCopy(text, element);
    }
  },

  fallbackCopy: function(text, element) {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    this.showCopyFeedback(element);
  },

  showCopyFeedback: function(element) {
    const toast = document.getElementById("copyToast");
    if (toast) {
      toast.style.display = "block";
      setTimeout(() => { toast.style.display = "none"; }, 2000);
    }
  },

  // 5. Section 5: The 7 Deadly Sins (Accordion)
  renderDeadlySins: function() {
    const container = document.getElementById("deadlySinsAccordion");
    if (!container || !IELTS_DATA.deadlySins) return;

    container.innerHTML = IELTS_DATA.deadlySins.map((sin, idx) => `
      <div class="accordion-item ${idx === 0 ? 'open' : ''}" id="sinItem_${sin.number}">
        <button class="accordion-header" onclick="App.toggleAccordion(${sin.number})">
          <span class="sin-number">#${sin.number}</span>
          <span class="sin-title">${sin.sin}</span>
          <span class="accordion-arrow">▼</span>
        </button>
        <div class="accordion-body">
          <div class="sin-mistake">
            <strong>❌ The Fatal Habit:</strong>
            <p>${sin.explanation}</p>
          </div>
          <div class="sin-fix">
            <strong>✅ The Band 6+ Correction:</strong>
            <p>${sin.fix}</p>
          </div>
        </div>
      </div>
    `).join("");
  },

  toggleAccordion: function(number) {
    const target = document.getElementById(`sinItem_${number}`);
    if (target) {
      target.classList.toggle("open");
    }
  },

  // 6. Section 6: Band 6 vs Band 8 Comparison
  renderSampleComparison: function() {
    const promptEl = document.getElementById("samplePromptText");
    const container = document.getElementById("sampleComparisonContainer");
    if (!container || !IELTS_DATA.sampleComparison) return;

    const data = IELTS_DATA.sampleComparison;
    if (promptEl) promptEl.innerText = data.prompt;

    container.innerHTML = `
      <div class="sample-essay-card essay-band6">
        <div class="sample-card-header">
          <span class="band-tag tag-band6">Band 6.0 Essay</span>
          <p>${data.band6.overview}</p>
        </div>
        <div class="essay-paragraphs">
          ${data.band6.text.map((p, idx) => `
            <div class="para-box">
              <span class="para-label">Paragraph ${idx + 1}</span>
              <p>${p.text}</p>
              <div class="examiner-note-tag note-band6">⚠️ Examiner note: ${p.note}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="sample-essay-card essay-band8">
        <div class="sample-card-header">
          <span class="band-tag tag-band8">Band 8.0 Essay</span>
          <p>${data.band8.overview}</p>
        </div>
        <div class="essay-paragraphs">
          ${data.band8.text.map((p, idx) => `
            <div class="para-box">
              <span class="para-label">Paragraph ${idx + 1}</span>
              <p>${p.text}</p>
              <div class="examiner-note-tag note-band8">🌟 Examiner note: ${p.note}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  bindGlobalEvents: function() {
    const themeBtn = document.getElementById("btnThemeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    const vocabSearchInput = document.getElementById("vocabSearchInput");
    if (vocabSearchInput) {
      vocabSearchInput.addEventListener("input", (e) => this.handleVocabSearch(e.target.value));
    }
  }
};

if (typeof window !== "undefined") {
  window.App = App;
}
