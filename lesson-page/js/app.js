/**
 * B1 Teen ESL Lesson Platform - Main Application Controller
 * Handles rendering, tabs, CEFR filters, interactive quiz engines, timers, and progress.
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  activeTab: "tab-warmup",
  activeFilter: "all",
  currentRandomTimer: null,
  timerSecondsRemaining: 60,
  isTimerRunning: false,

  init() {
    this.initTheme();
    this.initFilter();
    this.initTabs();
    this.renderAll();
    this.initModals();
    this.updateStatsDisplay();
  },

  // --- THEME HANDLING ---
  initTheme() {
    const savedTheme = StorageManager.getTheme();
    this.applyTheme(savedTheme);

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = current === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
        StorageManager.setTheme(newTheme);
      });
    }
  },

  applyTheme(theme) {
    if (theme === "system") {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    const icon = document.getElementById("themeIcon");
    if (icon) {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      icon.textContent = isDark ? "☀️" : "🌙";
    }
  },

  // --- CEFR FILTERING ---
  initFilter() {
    this.activeFilter = StorageManager.getCefrFilter() || "all";
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      const filter = btn.getAttribute("data-filter");
      if (filter === this.activeFilter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }

      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilter = filter;
        StorageManager.setCefrFilter(filter);
        this.applyFilter();
      });
    });
  },

  applyFilter() {
    const filter = this.activeFilter;
    const filterableCards = document.querySelectorAll("[data-cefr]");
    
    filterableCards.forEach(card => {
      const cardCefr = card.getAttribute("data-cefr");
      if (filter === "all" || cardCefr === filter || (filter === "A2" && cardCefr.includes("A2")) || (filter === "B1" && cardCefr.includes("B1")) || (filter === "B2" && cardCefr.includes("B2"))) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });

    // Update section counts
    this.updateVisibleCounts();
  },

  updateVisibleCounts() {
    const sections = ["warmup", "speaking", "vocabulary", "grammar", "reading"];
    sections.forEach(sec => {
      const container = document.getElementById(`${sec}-container`);
      if (container) {
        const visible = Array.from(container.children).filter(c => c.style.display !== "none" && !c.classList.contains("empty-filter-state"));
        let emptyNotice = container.querySelector(".empty-filter-state");
        if (visible.length === 0) {
          if (!emptyNotice) {
            emptyNotice = document.createElement("div");
            emptyNotice.className = "empty-filter-state";
            emptyNotice.innerHTML = `<p>No activities match the <strong>${this.activeFilter}</strong> filter in this section. Switch filter to <strong>All</strong> to see more.</p>`;
            container.appendChild(emptyNotice);
          }
          emptyNotice.style.display = "block";
        } else if (emptyNotice) {
          emptyNotice.style.display = "none";
        }
      }
    });
  },

  // --- NAVIGATION & TABS ---
  initTabs() {
    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const activePane = document.getElementById(targetTab);
        if (activePane) {
          activePane.classList.add("active");
          this.activeTab = targetTab;
        }

        if (targetTab === "tab-progress") {
          this.renderProgress();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  },

  // --- RENDER ALL SECTIONS ---
  renderAll() {
    this.renderWarmupQuestions();
    this.renderSpeakingLab();
    this.renderVocabularyGym();
    this.renderGrammarNotes();
    this.renderReadingZone();
    this.renderProgress();
    this.applyFilter();
  },

  // ==========================================
  // SECTION 1: WARM-UP QUESTIONS
  // ==========================================
  renderWarmupQuestions() {
    const container = document.getElementById("warmup-container");
    if (!container) return;

    const completedList = StorageManager.getCompletedWarmups();
    container.innerHTML = "";

    LESSON_DATA.discussionQuestions.forEach(q => {
      const isDone = completedList.includes(q.id);
      const card = document.createElement("div");
      card.className = `question-card ${isDone ? "card-completed" : ""}`;
      card.setAttribute("data-cefr", q.level);
      card.id = `qcard-${q.id}`;

      const topicClass = q.topic === "jobs" ? "badge-jobs" : "badge-school";
      const topicLabel = q.topic === "jobs" ? "💼 Jobs & Career" : "📚 School & Pressure";

      card.innerHTML = `
        <div class="card-header">
          <div class="badges-row">
            <span class="badge badge-level ${q.level.toLowerCase()}">[${q.level}]</span>
            <span class="badge ${topicClass}">${topicLabel}</span>
            <span class="badge badge-type">${q.type.toUpperCase()}</span>
          </div>
          <button class="btn-check-done ${isDone ? "active" : ""}" title="Mark as discussed" onclick="App.toggleWarmupDone('${q.id}')">
            ${isDone ? "✅ Discussed" : "⭕ Mark Done"}
          </button>
        </div>
        <div class="question-body">
          <p class="question-text">${this.formatQuestionText(q.question)}</p>
        </div>
        <div class="question-footer">
          <button class="btn-scaffold-toggle" onclick="App.toggleScaffold('${q.id}')">
            💡 Show Follow-Up & Scaffold
          </button>
          <div class="scaffold-box hidden" id="scaffold-${q.id}">
            <strong>Helper Prompt:</strong>
            <p>${q.scaffold}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  },

  formatQuestionText(text) {
    // Gloss words if bracketed
    return text.replace(/\[([^\]]+)\]/g, '<span class="gloss-inline">($1)</span>');
  },

  toggleScaffold(id) {
    const box = document.getElementById(`scaffold-${id}`);
    if (box) {
      box.classList.toggle("hidden");
    }
  },

  toggleWarmupDone(id) {
    const list = StorageManager.toggleWarmupCompleted(id);
    const card = document.getElementById(`qcard-${id}`);
    const isDone = list.includes(id);

    if (card) {
      if (isDone) {
        card.classList.add("card-completed");
      } else {
        card.classList.remove("card-completed");
      }
      const btn = card.querySelector(".btn-check-done");
      if (btn) {
        btn.classList.toggle("active", isDone);
        btn.innerHTML = isDone ? "✅ Discussed" : "⭕ Mark Done";
      }
    }
    this.updateStatsDisplay();
  },

  // --- RANDOM QUESTION SPINNER ---
  spinRandomQuestion() {
    const visibleCards = LESSON_DATA.discussionQuestions.filter(q => {
      if (this.activeFilter === "all") return true;
      return q.level === this.activeFilter;
    });

    if (visibleCards.length === 0) {
      alert("No questions found for the current filter. Switch filter to 'All'.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * visibleCards.length);
    const selected = visibleCards[randomIndex];

    const modal = document.getElementById("randomQuestionModal");
    const content = document.getElementById("randomQuestionContent");

    if (content && modal) {
      content.innerHTML = `
        <div class="random-question-badge">
          <span class="badge ${selected.level.toLowerCase()}">[${selected.level}]</span>
          <span class="badge ${selected.topic === "jobs" ? "badge-jobs" : "badge-school"}">
            ${selected.topic === "jobs" ? "💼 Jobs & Career" : "📚 School & Pressure"}
          </span>
          <span class="badge badge-type">${selected.type.toUpperCase()}</span>
        </div>
        <h3 class="random-question-title">${selected.question}</h3>
        <div class="random-question-hint">
          <strong>💡 Scaffold Hint:</strong> ${selected.scaffold}
        </div>
      `;

      this.resetTimer(60);
      modal.classList.add("active");
    }
  },

  // --- TIMER ENGINE ---
  startTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    const display = document.getElementById("timerDisplay");
    const startBtn = document.getElementById("timerStartBtn");
    if (startBtn) startBtn.textContent = "⏸️ Pause";

    this.currentRandomTimer = setInterval(() => {
      this.timerSecondsRemaining--;
      if (display) {
        const mins = Math.floor(this.timerSecondsRemaining / 60);
        const secs = this.timerSecondsRemaining % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }

      if (this.timerSecondsRemaining <= 0) {
        clearInterval(this.currentRandomTimer);
        this.isTimerRunning = false;
        if (startBtn) startBtn.textContent = "▶️ Start";
        if (display) display.textContent = "⏰ TIME'S UP! Great job!";
      }
    }, 1000);
  },

  pauseTimer() {
    if (this.isTimerRunning) {
      clearInterval(this.currentRandomTimer);
      this.isTimerRunning = false;
      const startBtn = document.getElementById("timerStartBtn");
      if (startBtn) startBtn.textContent = "▶️ Resume";
    } else {
      this.startTimer();
    }
  },

  resetTimer(seconds = 60) {
    clearInterval(this.currentRandomTimer);
    this.isTimerRunning = false;
    this.timerSecondsRemaining = seconds;
    const display = document.getElementById("timerDisplay");
    const startBtn = document.getElementById("timerStartBtn");
    if (display) display.textContent = `00:${seconds.toString().padStart(2, '0')}`;
    if (startBtn) startBtn.textContent = "▶️ Start";
  },

  // ==========================================
  // SECTION 2: SPEAKING LAB
  // ==========================================
  renderSpeakingLab() {
    const container = document.getElementById("speaking-container");
    if (!container) return;

    const speakingExercises = LESSON_DATA.exercises.filter(ex => ex.category === "Speaking Lab");
    container.innerHTML = "";

    speakingExercises.forEach(ex => {
      const card = document.createElement("div");
      card.className = "exercise-card speaking-lab-card";
      card.setAttribute("data-cefr", ex.level);
      card.id = `excard-${ex.id}`;

      let bodyHTML = "";

      if (ex.type === "speaking_grid") {
        bodyHTML = `
          <div class="speaking-grid-box">
            ${ex.items.map((item, idx) => `
              <div class="grid-item-row">
                <div class="grid-prompt"><strong>${idx + 1}. ${item.q}</strong><br><span class="grid-sub">${item.prompt}</span></div>
                <input type="text" class="grid-input" placeholder="Classmate name..." id="grid-in-${ex.id}-${idx}">
              </div>
            `).join("")}
          </div>
        `;
      } else if (ex.type === "role_play_card") {
        bodyHTML = `
          <div class="role-play-arena">
            <div class="role-column role-a">
              <h4>🎭 ${ex.roleA.title}</h4>
              <p class="role-desc">${ex.roleA.prompt}</p>
              <ul class="goals-list">
                ${ex.roleA.goals.map(g => `<li>🎯 ${g}</li>`).join("")}
              </ul>
              <div class="phrase-bank">
                <strong>💬 Useful Phrases:</strong>
                ${ex.roleA.phraseBank.map(p => `<span class="phrase-pill">${p}</span>`).join(" ")}
              </div>
            </div>
            <div class="role-column role-b">
              <h4>🎭 ${ex.roleB.title}</h4>
              <p class="role-desc">${ex.roleB.prompt}</p>
              <ul class="goals-list">
                ${ex.roleB.goals.map(g => `<li>🎯 ${g}</li>`).join("")}
              </ul>
              <div class="phrase-bank">
                <strong>💬 Useful Phrases:</strong>
                ${ex.roleB.phraseBank.map(p => `<span class="phrase-pill">${p}</span>`).join(" ")}
              </div>
            </div>
          </div>
        `;
      } else if (ex.type === "would_you_rather") {
        bodyHTML = `
          <div class="wyr-deck">
            ${ex.items.map((item, idx) => `
              <div class="wyr-card">
                <div class="wyr-options">
                  <div class="wyr-opt opt-a">
                    <span class="wyr-label">Option A</span>
                    <p>${item.optionA}</p>
                  </div>
                  <div class="wyr-vs">VS</div>
                  <div class="wyr-opt opt-b">
                    <span class="wyr-label">Option B</span>
                    <p>${item.optionB}</p>
                  </div>
                </div>
                <div class="wyr-frame">
                  <strong>🗣️ Justification Frame:</strong>
                  <p>${item.promptFrame}</p>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else if (ex.type === "debate_motion") {
        bodyHTML = `
          <div class="debate-card-box">
            <div class="debate-motion-banner">${ex.motion}</div>
            <div class="debate-sides">
              <div class="side-box side-prop">
                <h5>✅ ${ex.sideA.team}</h5>
                <ul>${ex.sideA.points.map(pt => `<li>${pt}</li>`).join("")}</ul>
              </div>
              <div class="side-box side-opp">
                <h5>❌ ${ex.sideB.team}</h5>
                <ul>${ex.sideB.points.map(pt => `<li>${pt}</li>`).join("")}</ul>
              </div>
            </div>
            <div class="debate-starter">
              <strong>🗣️ Opening Frame:</strong> <em>"${ex.speakingFrame}"</em>
            </div>
          </div>
        `;
      } else if (ex.type === "taboo_cards") {
        bodyHTML = `
          <div class="taboo-deck-grid">
            ${ex.cards.map(c => `
              <div class="taboo-card">
                <div class="taboo-header">SECRET WORD: <br><strong>${c.secretWord}</strong></div>
                <div class="taboo-forbidden">
                  <span class="taboo-label">🚫 FORBIDDEN WORDS:</span>
                  <ul>${c.tabooWords.map(tw => `<li>${tw}</li>`).join("")}</ul>
                </div>
                <div class="taboo-hint">💡 Clue: ${c.hint}</div>
              </div>
            `).join("")}
          </div>
        `;
      } else if (ex.type === "gap_fill_select") {
        bodyHTML = this.generateGapFillSelectHTML(ex);
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="badges-row">
            <span class="badge ${ex.level.toLowerCase()}">[${ex.level}]</span>
            <span class="badge badge-sec">Speaking Lab</span>
          </div>
          <h3 class="exercise-title">${ex.title}</h3>
        </div>
        <p class="exercise-instruction">📋 <strong>Instruction:</strong> ${ex.instruction}</p>
        <div class="exercise-content-body">${bodyHTML}</div>
        <div class="spoken-output-box">
          <span class="spoken-icon">🗣️</span>
          <div class="spoken-text">
            <strong>Spoken Output Challenge:</strong>
            <p>${ex.spokenOutput}</p>
          </div>
          <button class="btn-voice-practice" onclick="App.triggerVoiceCheck('${ex.id}')">🎤 I Practiced Aloud</button>
        </div>
      `;

      container.appendChild(card);
    });
  },

  triggerVoiceCheck(id) {
    StorageManager.saveExerciseResult(id, 1, 1);
    this.updateStatsDisplay();
    alert("🎉 Fantastic speaking practice! Your progress has been saved.");
  },

  // ==========================================
  // SECTION 3: VOCABULARY GYM
  // ==========================================
  renderVocabularyGym() {
    const container = document.getElementById("vocabulary-container");
    if (!container) return;

    const vocabExercises = LESSON_DATA.exercises.filter(ex => ex.category === "Vocabulary Gym");
    container.innerHTML = "";

    vocabExercises.forEach(ex => {
      const card = document.createElement("div");
      card.className = "exercise-card vocab-gym-card";
      card.setAttribute("data-cefr", ex.level);
      card.id = `excard-${ex.id}`;

      let bodyHTML = "";

      if (ex.type === "matching") {
        bodyHTML = this.generateMatchingHTML(ex);
      } else if (ex.type === "multiple_choice" || ex.type === "odd_one_out") {
        bodyHTML = this.generateMultipleChoiceHTML(ex);
      } else if (ex.type === "category_sort") {
        bodyHTML = this.generateCategorySortHTML(ex);
      } else if (ex.type === "gap_fill_select") {
        bodyHTML = this.generateGapFillSelectHTML(ex);
      } else if (ex.type === "true_false") {
        bodyHTML = this.generateTrueFalseHTML(ex);
      } else if (ex.type === "unscramble") {
        bodyHTML = this.generateUnscrambleHTML(ex);
      }

      card.innerHTML = `
        <div class="card-header">
          <div class="badges-row">
            <span class="badge ${ex.level.toLowerCase()}">[${ex.level}]</span>
            <span class="badge badge-sec">Vocabulary Gym</span>
          </div>
          <h3 class="exercise-title">${ex.title}</h3>
        </div>
        <p class="exercise-instruction">📋 <strong>Instruction:</strong> ${ex.instruction}</p>
        <div class="exercise-content-body">${bodyHTML}</div>
        <div class="exercise-actions">
          <button class="btn-check-quiz" onclick="App.checkExercise('${ex.id}')">✔️ Check Answers</button>
          <button class="btn-toggle-key" onclick="App.toggleAnswerKey('${ex.id}')">🔑 Show / Hide Key</button>
          <span class="quiz-feedback-badge" id="fb-${ex.id}"></span>
        </div>
        <div class="answer-key-box hidden" id="key-${ex.id}">
          ${this.generateAnswerKeyHTML(ex)}
        </div>
        <div class="spoken-output-box">
          <span class="spoken-icon">🗣️</span>
          <div class="spoken-text">
            <strong>Spoken Output Challenge:</strong>
            <p>${ex.spokenOutput}</p>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  // --- HTML GENERATORS FOR EXERCISES ---
  generateMatchingHTML(ex) {
    const shuffledMatches = [...ex.items].map(i => i.match).sort(() => 0.5 - Math.random());
    return `
      <div class="matching-grid" id="match-grid-${ex.id}">
        ${ex.items.map((item, idx) => `
          <div class="matching-row" data-match-id="${item.id}" data-correct-term="${item.term}" data-correct-match="${item.match}">
            <div class="match-term"><strong>${item.term}</strong></div>
            <div class="match-select-col">
              <select class="match-select" id="msel-${ex.id}-${idx}">
                <option value="">-- Choose definition --</option>
                ${shuffledMatches.map(m => `<option value="${m}">${m}</option>`).join("")}
              </select>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  generateMultipleChoiceHTML(ex) {
    return `
      <div class="mcq-list" id="mcq-list-${ex.id}">
        ${ex.items.map((item, idx) => `
          <div class="mcq-item-box" data-item-id="${item.id}" data-correct="${item.correct}">
            <p class="mcq-prompt"><strong>${idx + 1}.</strong> ${item.prompt || "Choose the odd one out:"}</p>
            <div class="mcq-options-grid">
              ${item.options.map(opt => `
                <label class="mcq-opt-label">
                  <input type="radio" name="opt-${ex.id}-${idx}" value="${opt}">
                  <span>${opt}</span>
                </label>
              `).join("")}
            </div>
            <div class="mcq-rationale-box hidden" id="mcq-rat-${ex.id}-${idx}">
              <strong>💡 Explanation:</strong> ${item.rationale || ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  generateCategorySortHTML(ex) {
    return `
      <div class="category-sort-container" id="catsort-${ex.id}">
        <div class="sort-categories-grid">
          ${ex.categories.map(cat => `
            <div class="sort-target-col">
              <h4>${cat}</h4>
              <div class="sort-target-box" data-cat-name="${cat}">
                <!-- Drop/Assign zone -->
              </div>
            </div>
          `).join("")}
        </div>
        <div class="sort-items-pool">
          <p class="pool-title">Click an item, then click a category column to assign it:</p>
          <div class="pool-pills-row">
            ${ex.items.map((item, idx) => `
              <button type="button" class="sort-pill" id="pill-${ex.id}-${idx}" data-word="${item.word}" data-correct-cat="${item.category}" onclick="App.handleSortPillClick('${ex.id}', '${ex.id}-${idx}')">
                ${item.word}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  },

  handleSortPillClick(exId, pillId) {
    const pill = document.getElementById(`pill-${pillId}`);
    if (!pill) return;

    // Toggle active selection
    const allPills = document.querySelectorAll(`#catsort-${exId} .sort-pill`);
    allPills.forEach(p => {
      if (p !== pill) p.classList.remove("selected-pill");
    });
    pill.classList.toggle("selected-pill");

    // Enable click on categories
    const catBoxes = document.querySelectorAll(`#catsort-${exId} .sort-target-box`);
    catBoxes.forEach(box => {
      box.onclick = () => {
        const selected = document.querySelector(`#catsort-${exId} .selected-pill`);
        if (selected) {
          box.appendChild(selected);
          selected.classList.remove("selected-pill");
        }
      };
    });
  },

  generateGapFillSelectHTML(ex) {
    return `
      <div class="gapfill-list" id="gapfill-${ex.id}">
        ${ex.items.map((item, idx) => {
          const parts = item.sentence.split("___");
          const options = item.options || ex.wordBank || [];
          return `
            <div class="gapfill-row" data-item-id="${item.id}" data-correct="${item.correct}">
              <span class="num-badge">${idx + 1}.</span>
              <span>${parts[0]}</span>
              <select class="gapfill-select" id="gfsel-${ex.id}-${idx}">
                <option value="">[...]</option>
                ${options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
              </select>
              <span>${parts[1] || ""}</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  generateTrueFalseHTML(ex) {
    return `
      <div class="tf-list" id="tflist-${ex.id}">
        ${ex.items.map((item, idx) => `
          <div class="tf-row" data-item-id="${item.id}" data-correct="${item.correct}">
            <p class="tf-statement"><strong>${idx + 1}.</strong> ${item.statement}</p>
            <div class="tf-buttons">
              <label class="tf-opt"><input type="radio" name="tf-${ex.id}-${idx}" value="true"> True</label>
              <label class="tf-opt"><input type="radio" name="tf-${ex.id}-${idx}" value="false"> False</label>
            </div>
            <div class="tf-rationale hidden" id="tfrat-${ex.id}-${idx}">${item.rationale}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  generateUnscrambleHTML(ex) {
    return `
      <div class="unscramble-container" id="unscramble-${ex.id}">
        ${ex.items.map((item, idx) => `
          <div class="unscramble-card" data-item-id="${item.id}" data-correct="${item.correct}">
            <p class="unscramble-instruction">Sentence ${idx + 1}: Click words in order:</p>
            <div class="unscramble-result-box" id="result-${ex.id}-${idx}"></div>
            <div class="unscramble-tiles-pool" id="pool-${ex.id}-${idx}">
              ${item.scrambled.map((w, wIdx) => `
                <button type="button" class="word-tile" onclick="App.handleTileClick('${ex.id}', ${idx}, '${w}', this)">
                  ${w}
                </button>
              `).join("")}
            </div>
            <div class="unscramble-actions">
              <button type="button" class="btn-tile-reset" onclick="App.resetUnscrambleTiles('${ex.id}', ${idx})">↺ Clear</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  handleTileClick(exId, itemIdx, word, btn) {
    const resultBox = document.getElementById(`result-${exId}-${itemIdx}`);
    if (!resultBox || btn.disabled) return;

    btn.disabled = true;
    btn.classList.add("tile-used");

    const placedTile = document.createElement("span");
    placedTile.className = "placed-word-tile";
    placedTile.textContent = word;
    placedTile.setAttribute("data-origin-text", word);
    resultBox.appendChild(placedTile);
  },

  resetUnscrambleTiles(exId, itemIdx) {
    const resultBox = document.getElementById(`result-${exId}-${itemIdx}`);
    const poolBox = document.getElementById(`pool-${exId}-${itemIdx}`);
    if (resultBox) resultBox.innerHTML = "";
    if (poolBox) {
      poolBox.querySelectorAll(".word-tile").forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("tile-used");
      });
    }
  },

  generateAnswerKeyHTML(ex) {
    if (ex.type === "matching") {
      return `
        <h4>🔑 Answer Key & Explanations:</h4>
        <ul>
          ${ex.items.map(i => `<li><strong>${i.term}</strong> ➔ ${i.match}</li>`).join("")}
        </ul>
      `;
    }
    if (ex.type === "multiple_choice" || ex.type === "odd_one_out") {
      return `
        <h4>🔑 Answer Key & Explanations:</h4>
        <ul>
          ${ex.items.map(i => `<li><strong>${i.correct}</strong>: ${i.rationale}</li>`).join("")}
        </ul>
      `;
    }
    if (ex.type === "category_sort") {
      return `
        <h4>🔑 Answer Key:</h4>
        <ul>
          ${ex.items.map(i => `<li><strong>${i.word}</strong> ➔ ${i.category}</li>`).join("")}
        </ul>
      `;
    }
    if (ex.type === "gap_fill_select") {
      return `
        <h4>🔑 Answer Key:</h4>
        <ul>
          ${ex.items.map(i => `<li><strong>${i.correct}</strong> ${i.rationale ? `- ${i.rationale}` : ''}</li>`).join("")}
        </ul>
      `;
    }
    if (ex.type === "true_false") {
      return `
        <h4>🔑 Answer Key:</h4>
        <ul>
          ${ex.items.map(i => `<li><strong>${i.statement}</strong>: <em>${i.correct ? "TRUE" : "FALSE"}</em> (${i.rationale})</li>`).join("")}
        </ul>
      `;
    }
    if (ex.type === "unscramble") {
      return `
        <h4>🔑 Answer Key:</h4>
        <ul>
          ${ex.items.map(i => `<li>"${i.correct}"</li>`).join("")}
        </ul>
      `;
    }
    return `<p>Practice this exercise aloud with your partner!</p>`;
  },

  // --- CHECK EXERCISE ANSWERS ---
  checkExercise(exId) {
    const ex = LESSON_DATA.exercises.find(e => e.id === exId);
    if (!ex) return;

    let score = 0;
    let total = 0;

    if (ex.type === "matching") {
      const rows = document.querySelectorAll(`#match-grid-${exId} .matching-row`);
      total = rows.length;
      rows.forEach(row => {
        const sel = row.querySelector("select");
        const correctMatch = row.getAttribute("data-correct-match");
        if (sel && sel.value === correctMatch) {
          score++;
          row.classList.add("row-correct");
          row.classList.remove("row-wrong");
        } else {
          row.classList.add("row-wrong");
          row.classList.remove("row-correct");
        }
      });
    } else if (ex.type === "multiple_choice" || ex.type === "odd_one_out") {
      const items = document.querySelectorAll(`#mcq-list-${exId} .mcq-item-box`);
      total = items.length;
      items.forEach((item, idx) => {
        const correct = item.getAttribute("data-correct");
        const checked = item.querySelector(`input[name="opt-${exId}-${idx}"]:checked`);
        const ratBox = document.getElementById(`mcq-rat-${exId}-${idx}`);
        if (ratBox) ratBox.classList.remove("hidden");

        if (checked && checked.value === correct) {
          score++;
          item.classList.add("item-correct");
          item.classList.remove("item-wrong");
        } else {
          item.classList.add("item-wrong");
          item.classList.remove("item-correct");
        }
      });
    } else if (ex.type === "category_sort") {
      const pills = document.querySelectorAll(`#catsort-${exId} .sort-pill`);
      total = pills.length;
      pills.forEach(pill => {
        const parentBox = pill.closest(".sort-target-box");
        const correctCat = pill.getAttribute("data-correct-cat");
        if (parentBox && parentBox.getAttribute("data-cat-name") === correctCat) {
          score++;
          pill.classList.add("pill-correct");
          pill.classList.remove("pill-wrong");
        } else {
          pill.classList.add("pill-wrong");
          pill.classList.remove("pill-correct");
        }
      });
    } else if (ex.type === "gap_fill_select") {
      const rows = document.querySelectorAll(`#gapfill-${exId} .gapfill-row`);
      total = rows.length;
      rows.forEach(row => {
        const sel = row.querySelector("select");
        const correct = row.getAttribute("data-correct");
        if (sel && sel.value.toLowerCase() === correct.toLowerCase()) {
          score++;
          row.classList.add("row-correct");
          row.classList.remove("row-wrong");
        } else {
          row.classList.add("row-wrong");
          row.classList.remove("row-correct");
        }
      });
    } else if (ex.type === "true_false") {
      const rows = document.querySelectorAll(`#tflist-${exId} .tf-row`);
      total = rows.length;
      rows.forEach((row, idx) => {
        const correct = row.getAttribute("data-correct") === "true";
        const checked = row.querySelector(`input[name="tf-${exId}-${idx}"]:checked`);
        const ratBox = document.getElementById(`tfrat-${exId}-${idx}`);
        if (ratBox) ratBox.classList.remove("hidden");

        if (checked && (checked.value === "true") === correct) {
          score++;
          row.classList.add("row-correct");
          row.classList.remove("row-wrong");
        } else {
          row.classList.add("row-wrong");
          row.classList.remove("row-correct");
        }
      });
    } else if (ex.type === "unscramble") {
      const cards = document.querySelectorAll(`#unscramble-${exId} .unscramble-card`);
      total = cards.length;
      cards.forEach((card, idx) => {
        const correct = card.getAttribute("data-correct").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();
        const resultBox = document.getElementById(`result-${exId}-${idx}`);
        const userWords = Array.from(resultBox.querySelectorAll(".placed-word-tile")).map(t => t.textContent.trim()).join(" ");
        const cleanUser = userWords.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim().toLowerCase();

        if (cleanUser === correct) {
          score++;
          card.classList.add("card-correct");
          card.classList.remove("card-wrong");
        } else {
          card.classList.add("card-wrong");
          card.classList.remove("card-correct");
        }
      });
    }

    const fbBadge = document.getElementById(`fb-${exId}`);
    if (fbBadge) {
      fbBadge.textContent = `Score: ${score} / ${total} (${Math.round((score / total) * 100)}%)`;
      fbBadge.className = `quiz-feedback-badge ${score === total ? "badge-pass" : "badge-try"}`;
    }

    StorageManager.saveExerciseResult(exId, score, total);
    this.updateStatsDisplay();
  },

  toggleAnswerKey(exId) {
    const keyBox = document.getElementById(`key-${exId}`);
    if (keyBox) keyBox.classList.toggle("hidden");
  },

  // ==========================================
  // SECTION 4: GRAMMAR NOTES (EXACTLY 5)
  // ==========================================
  renderGrammarNotes() {
    const container = document.getElementById("grammar-container");
    if (!container) return;

    container.innerHTML = "";

    LESSON_DATA.grammarNotes.forEach((gram, gIdx) => {
      const card = document.createElement("div");
      card.className = "grammar-card";
      card.id = `gram-card-${gram.id}`;

      card.innerHTML = `
        <div class="grammar-header">
          <span class="grammar-num">Rule #${gIdx + 1}</span>
          <h3>${gram.title}</h3>
          <span class="badge badge-sec">${gram.topic}</span>
        </div>
        <div class="grammar-form-box">
          <strong>📐 Form & Rule:</strong>
          <pre>${gram.form}</pre>
          <p class="grammar-notes-text">${gram.notes}</p>
        </div>
        <div class="grammar-examples-box">
          <strong>💡 Lesson Examples:</strong>
          <ul>
            ${gram.examples.map(ex => `<li>"${ex}"</li>`).join("")}
          </ul>
        </div>
        <div class="grammar-mistake-box">
          <div class="mistake-header">⚠️ Common Teen Mistake:</div>
          <div class="mistake-diff">
            <span class="mistake-wrong">❌ ${gram.teenMistake.wrong}</span>
            <span class="mistake-right">✅ ${gram.teenMistake.right}</span>
          </div>
          <p class="mistake-why">${gram.teenMistake.why}</p>
        </div>
        <div class="grammar-practice-box">
          <h4>✏️ Quick Practice Check (3 Items):</h4>
          ${gram.practice.map((item, pIdx) => `
            <div class="gram-practice-row" data-correct="${item.correct}">
              <p class="gram-q"><strong>${pIdx + 1}.</strong> ${item.q}</p>
              <div class="gram-opts">
                ${item.options.map(opt => `
                  <label class="gram-opt-label">
                    <input type="radio" name="gopt-${gram.id}-${pIdx}" value="${opt}">
                    <span>${opt}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          `).join("")}
          <div class="gram-actions">
            <button class="btn-check-quiz" onclick="App.checkGrammar('${gram.id}')">Check Grammar Quiz</button>
            <span class="quiz-feedback-badge" id="gfb-${gram.id}"></span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  },

  checkGrammar(gramId) {
    const gram = LESSON_DATA.grammarNotes.find(g => g.id === gramId);
    if (!gram) return;

    let score = 0;
    const total = gram.practice.length;

    gram.practice.forEach((item, idx) => {
      const checked = document.querySelector(`input[name="gopt-${gramId}-${idx}"]:checked`);
      const row = checked ? checked.closest(".gram-practice-row") : null;
      if (checked && checked.value === item.correct) {
        score++;
        if (row) {
          row.classList.add("row-correct");
          row.classList.remove("row-wrong");
        }
      } else if (row) {
        row.classList.add("row-wrong");
        row.classList.remove("row-correct");
      }
    });

    const badge = document.getElementById(`gfb-${gramId}`);
    if (badge) {
      badge.textContent = `Score: ${score} / ${total}`;
      badge.className = `quiz-feedback-badge ${score === total ? "badge-pass" : "badge-try"}`;
    }

    StorageManager.saveGrammarResult(gramId, score, total);
    this.updateStatsDisplay();
  },

  // ==========================================
  // SECTION 5: READING ZONE (EXACTLY 3 TEXTS)
  // ==========================================
  renderReadingZone() {
    const container = document.getElementById("reading-container");
    if (!container) return;

    container.innerHTML = "";

    LESSON_DATA.readingZone.forEach(text => {
      const card = document.createElement("div");
      card.className = "reading-card";
      card.setAttribute("data-cefr", text.level);
      card.id = `read-card-${text.id}`;

      card.innerHTML = `
        <div class="reading-header">
          <div class="badges-row">
            <span class="badge ${text.level.toLowerCase()}">[${text.level}]</span>
            <span class="badge badge-sec">${text.topic}</span>
            <span class="badge badge-words">📖 ~${text.wordCount} words</span>
          </div>
          <h3 class="reading-title">${text.title}</h3>
        </div>
        <div class="reading-passage-box">
          ${this.formatPassage(text.passage)}
        </div>
        <div class="glossary-bar">
          <strong>📚 Vocabulary Glossary:</strong>
          <div class="glossary-pills">
            ${text.glossary.map(g => `<span class="gloss-tag" title="${g.meaning}"><strong>${g.word}:</strong> ${g.meaning}</span>`).join(" ")}
          </div>
        </div>
        <div class="reading-tasks-wrapper">
          ${this.renderReadingTasks(text)}
        </div>
      `;

      container.appendChild(card);
    });
  },

  formatPassage(passage) {
    const paragraphs = passage.split("\n\n");
    return paragraphs.map(p => {
      const formatted = p.replace(/\[([^\]]+)\]/g, '<span class="gloss-inline">($1)</span>');
      return `<p class="passage-para">${formatted}</p>`;
    }).join("");
  },

  renderReadingTasks(text) {
    let tasksHTML = "";

    // Task 1
    if (text.task1) {
      tasksHTML += `
        <div class="reading-task-section" id="rtask-${text.id}-t1">
          <h4>${text.task1.title}</h4>
          ${text.task1.type === "true_false" ? this.generateReadingTF(text.id, text.task1) : this.generateReadingMCQ(text.id, "t1", text.task1)}
          <div class="task-actions">
            <button class="btn-check-quiz" onclick="App.checkReadingTask('${text.id}', 't1')">Check Task 1</button>
            <span class="quiz-feedback-badge" id="rfb-${text.id}-t1"></span>
          </div>
        </div>
      `;
    }

    // Task 2
    if (text.task2) {
      tasksHTML += `
        <div class="reading-task-section" id="rtask-${text.id}-t2">
          <h4>${text.task2.title}</h4>
          ${text.task2.type === "matching" ? this.generateReadingMatching(text.id, text.task2) : this.generateReadingMCQ(text.id, "t2", text.task2)}
          <div class="task-actions">
            <button class="btn-check-quiz" onclick="App.checkReadingTask('${text.id}', 't2')">Check Task 2</button>
            <span class="quiz-feedback-badge" id="rfb-${text.id}-t2"></span>
          </div>
        </div>
      `;
    }

    // Task 3 (For Text C)
    if (text.task3) {
      tasksHTML += `
        <div class="reading-task-section" id="rtask-${text.id}-t3">
          <h4>${text.task3.title}</h4>
          ${this.generateReadingMCQ(text.id, "t3", text.task3)}
          <div class="task-actions">
            <button class="btn-check-quiz" onclick="App.checkReadingTask('${text.id}', 't3')">Check Task 3</button>
            <span class="quiz-feedback-badge" id="rfb-${text.id}-t3"></span>
          </div>
        </div>
      `;
    }

    return tasksHTML;
  },

  generateReadingTF(textId, task) {
    return `
      <div class="reading-tf-grid">
        ${task.items.map((item, idx) => `
          <div class="rtf-row" data-correct="${item.correct}">
            <p class="rtf-q"><strong>${idx + 1}.</strong> ${item.q}</p>
            <div class="rtf-opts">
              <label><input type="radio" name="rtf-${textId}-${idx}" value="true"> True</label>
              <label><input type="radio" name="rtf-${textId}-${idx}" value="false"> False</label>
            </div>
            <div class="rtf-rat hidden" id="rtfrat-${textId}-${idx}">${item.rationale}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  generateReadingMCQ(textId, taskKey, task) {
    return `
      <div class="reading-mcq-grid">
        ${task.items.map((item, idx) => `
          <div class="rmcq-row" data-correct="${item.correct}">
            <p class="rmcq-prompt"><strong>${idx + 1}.</strong> ${item.prompt}</p>
            <div class="rmcq-options">
              ${item.options.map(opt => `
                <label class="rmcq-opt-label">
                  <input type="radio" name="rmcq-${textId}-${taskKey}-${idx}" value="${opt}">
                  <span>${opt}</span>
                </label>
              `).join("")}
            </div>
            <div class="rmcq-rat hidden" id="rmcqrat-${textId}-${taskKey}-${idx}">💡 ${item.rationale}</div>
          </div>
        `).join("")}
      </div>
    `;
  },

  generateReadingMatching(textId, task) {
    const shuffled = [...task.items].map(i => i.match).sort(() => 0.5 - Math.random());
    return `
      <div class="rmatch-grid">
        ${task.items.map((item, idx) => `
          <div class="rmatch-row" data-correct-match="${item.match}">
            <span class="rmatch-term"><strong>${item.term}</strong></span>
            <select class="rmatch-sel" id="rmsel-${textId}-${idx}">
              <option value="">-- Match meaning --</option>
              ${shuffled.map(m => `<option value="${m}">${m}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
    `;
  },

  checkReadingTask(textId, taskKey) {
    const text = LESSON_DATA.readingZone.find(t => t.id === textId);
    if (!text) return;

    const task = taskKey === "t1" ? text.task1 : (taskKey === "t2" ? text.task2 : text.task3);
    if (!task) return;

    let score = 0;
    const total = task.items.length;

    if (task.type === "true_false") {
      task.items.forEach((item, idx) => {
        const checked = document.querySelector(`input[name="rtf-${textId}-${idx}"]:checked`);
        const row = checked ? checked.closest(".rtf-row") : null;
        const rat = document.getElementById(`rtfrat-${textId}-${idx}`);
        if (rat) rat.classList.remove("hidden");

        if (checked && (checked.value === "true") === item.correct) {
          score++;
          if (row) { row.classList.add("row-correct"); row.classList.remove("row-wrong"); }
        } else if (row) {
          row.classList.add("row-wrong"); row.classList.remove("row-correct");
        }
      });
    } else if (task.type === "multiple_choice") {
      task.items.forEach((item, idx) => {
        const checked = document.querySelector(`input[name="rmcq-${textId}-${taskKey}-${idx}"]:checked`);
        const row = checked ? checked.closest(".rmcq-row") : null;
        const rat = document.getElementById(`rmcqrat-${textId}-${taskKey}-${idx}`);
        if (rat) rat.classList.remove("hidden");

        if (checked && checked.value === item.correct) {
          score++;
          if (row) { row.classList.add("row-correct"); row.classList.remove("row-wrong"); }
        } else if (row) {
          row.classList.add("row-wrong"); row.classList.remove("row-correct");
        }
      });
    } else if (task.type === "matching") {
      task.items.forEach((item, idx) => {
        const sel = document.getElementById(`rmsel-${textId}-${idx}`);
        const row = sel ? sel.closest(".rmatch-row") : null;
        if (sel && sel.value === item.match) {
          score++;
          if (row) { row.classList.add("row-correct"); row.classList.remove("row-wrong"); }
        } else if (row) {
          row.classList.add("row-wrong"); row.classList.remove("row-correct");
        }
      });
    }

    const badge = document.getElementById(`rfb-${textId}-${taskKey}`);
    if (badge) {
      badge.textContent = `Score: ${score} / ${total} (${Math.round((score / total) * 100)}%)`;
      badge.className = `quiz-feedback-badge ${score === total ? "badge-pass" : "badge-try"}`;
    }

    StorageManager.saveReadingResult(`${textId}_${taskKey}`, score, total);
    this.updateStatsDisplay();
  },

  // ==========================================
  // SECTION 6: MY PROGRESS & CAN-DO SLIDERS
  // ==========================================
  renderProgress() {
    const stats = StorageManager.getOverallStats();

    // Summary Cards
    const totalActsEl = document.getElementById("prog-total-activities");
    const accuracyEl = document.getElementById("prog-accuracy");
    const warmupsEl = document.getElementById("prog-warmups");
    const quizzesEl = document.getElementById("prog-quizzes");

    if (totalActsEl) totalActsEl.textContent = stats.totalCompletedActivities;
    if (accuracyEl) accuracyEl.textContent = `${stats.accuracy}%`;
    if (warmupsEl) warmupsEl.textContent = `${stats.completedWarmupsCount} / ${LESSON_DATA.discussionQuestions.length}`;
    if (quizzesEl) quizzesEl.textContent = `${stats.completedExercisesCount + stats.completedReadingTasksCount + stats.completedGrammarCount}`;

    // Can-Do Sliders
    const canDoContainer = document.getElementById("can-do-list");
    if (canDoContainer) {
      canDoContainer.innerHTML = "";
      LESSON_DATA.canDoStatements.forEach(stmt => {
        const rating = stats.canDoRatings[stmt.id] || stmt.default;
        const row = document.createElement("div");
        row.className = "can-do-row";

        row.innerHTML = `
          <div class="can-do-info">
            <p class="can-do-text">🌟 <strong>${stmt.text}</strong></p>
            <span class="can-do-score-label" id="cd-label-${stmt.id}">Level: ${rating} / 5 (${this.getRatingLabel(rating)})</span>
          </div>
          <div class="can-do-slider-wrapper">
            <input type="range" min="1" max="5" value="${rating}" class="can-do-slider" id="slider-${stmt.id}" oninput="App.handleCanDoChange('${stmt.id}', this.value)">
          </div>
        `;
        canDoContainer.appendChild(row);
      });
    }
  },

  getRatingLabel(val) {
    const n = Number(val);
    if (n === 1) return "Need more practice";
    if (n === 2) return "Getting started";
    if (n === 3) return "Comfortable";
    if (n === 4) return "Very confident";
    return "Mastered!";
  },

  handleCanDoChange(id, val) {
    StorageManager.saveCanDoRating(id, val);
    const label = document.getElementById(`cd-label-${id}`);
    if (label) {
      label.textContent = `Level: ${val} / 5 (${this.getRatingLabel(val)})`;
    }
  },

  resetProgressConfirm() {
    if (confirm("Are you sure you want to reset all your lesson scores and self-assessments?")) {
      StorageManager.resetAllProgress();
      this.renderAll();
      this.updateStatsDisplay();
      alert("✨ Progress has been reset successfully.");
    }
  },

  updateStatsDisplay() {
    const stats = StorageManager.getOverallStats();
    const topBadge = document.getElementById("quickStatsBadge");
    if (topBadge) {
      topBadge.textContent = `⭐ ${stats.totalCompletedActivities} completed | ${stats.accuracy}% accuracy`;
    }
  },

  // --- MODAL CONTROLLERS ---
  initModals() {
    const randomModal = document.getElementById("randomQuestionModal");
    const closeBtn = document.getElementById("closeRandomModalBtn");
    if (closeBtn && randomModal) {
      closeBtn.addEventListener("click", () => {
        randomModal.classList.remove("active");
        this.resetTimer(60);
      });
    }

    // Print Handler
    const printBtn = document.getElementById("printLessonBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
};
