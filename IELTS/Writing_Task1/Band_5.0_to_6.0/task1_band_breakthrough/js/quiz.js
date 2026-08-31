/**
 * Tool E: Vocabulary & Strategy Quiz Module
 * 15 randomized questions with instant scoring, feedback rationales, and best score tracking.
 */

const VocabQuiz = {
  activeQuestions: [],
  userAnswers: {},
  quizSubmitted: false,

  init: function() {
    this.startQuiz();
    this.bindEvents();
    this.renderBestScore();
  },

  bindEvents: function() {
    const submitBtn = document.getElementById("btnSubmitQuiz");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => this.submitQuiz());
    }

    const retakeBtn = document.getElementById("btnRetakeQuiz");
    if (retakeBtn) {
      retakeBtn.addEventListener("click", () => this.startQuiz());
    }
  },

  shuffleArray: function(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  startQuiz: function() {
    this.userAnswers = {};
    this.quizSubmitted = false;

    // Pick 15 questions from the data bank
    const pool = IELTS_DATA.quizQuestions || [];
    this.activeQuestions = this.shuffleArray(pool).slice(0, 15);

    const submitBtn = document.getElementById("btnSubmitQuiz");
    if (submitBtn) submitBtn.style.display = "inline-block";

    const retakeBtn = document.getElementById("btnRetakeQuiz");
    if (retakeBtn) retakeBtn.style.display = "none";

    const resultsCard = document.getElementById("quizResultsSummary");
    if (resultsCard) resultsCard.style.display = "none";

    this.renderQuestions();
    this.renderBestScore();
  },

  renderQuestions: function() {
    const container = document.getElementById("quizQuestionsContainer");
    if (!container) return;

    container.innerHTML = this.activeQuestions.map((q, qIdx) => `
      <div class="quiz-card" id="quizCard_${qIdx}">
        <div class="quiz-q-num">Question ${qIdx + 1} of ${this.activeQuestions.length}</div>
        <div class="quiz-q-text">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, optIdx) => `
            <label class="quiz-option-label" id="label_${qIdx}_${optIdx}">
              <input type="radio" name="q_${qIdx}" value="${optIdx}" onchange="VocabQuiz.selectAnswer(${qIdx}, ${optIdx})" ${this.userAnswers[qIdx] === optIdx ? 'checked' : ''} ${this.quizSubmitted ? 'disabled' : ''}>
              <span>${opt}</span>
            </label>
          `).join("")}
        </div>
        <div class="quiz-rationale" id="rationale_${qIdx}" style="display: none;">
          <strong>💡 Examiner's Rationale:</strong> ${q.rationale}
        </div>
      </div>
    `).join("");
  },

  selectAnswer: function(qIdx, optIdx) {
    if (this.quizSubmitted) return;
    this.userAnswers[qIdx] = optIdx;
  },

  submitQuiz: function() {
    if (Object.keys(this.userAnswers).length < this.activeQuestions.length) {
      if (!confirm("You have unanswered questions. Are you sure you want to submit?")) {
        return;
      }
    }

    this.quizSubmitted = true;
    let score = 0;

    this.activeQuestions.forEach((q, qIdx) => {
      const selected = this.userAnswers[qIdx];
      const rationaleEl = document.getElementById(`rationale_${qIdx}`);
      if (rationaleEl) rationaleEl.style.display = "block";

      q.options.forEach((_, optIdx) => {
        const labelEl = document.getElementById(`label_${qIdx}_${optIdx}`);
        if (!labelEl) return;

        if (optIdx === q.correctIndex) {
          labelEl.classList.add("option-correct");
        } else if (selected === optIdx) {
          labelEl.classList.add("option-wrong");
        }
      });

      if (selected === q.correctIndex) {
        score++;
      }
    });

    const submitBtn = document.getElementById("btnSubmitQuiz");
    if (submitBtn) submitBtn.style.display = "none";

    const retakeBtn = document.getElementById("btnRetakeQuiz");
    if (retakeBtn) retakeBtn.style.display = "inline-block";

    const resultsCard = document.getElementById("quizResultsSummary");
    if (resultsCard) {
      resultsCard.style.display = "block";
      const percentage = Math.round((score / this.activeQuestions.length) * 100);
      const bandEstimate = score >= 14 ? "Band 8.0+" : score >= 12 ? "Band 7.0 - 7.5" : score >= 9 ? "Band 6.0 - 6.5" : "Below Band 6.0";
      
      resultsCard.innerHTML = `
        <div class="results-header">
          <h3>Quiz Completed!</h3>
          <div class="score-badge">${score} / ${this.activeQuestions.length} (${percentage}%)</div>
        </div>
        <p><strong>Estimated Vocabulary & Strategy Level:</strong> <span style="color: var(--primary); font-weight: 700;">${bandEstimate}</span></p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Review the green correct answers and detailed examiner rationales highlighted below.</p>
      `;
    }

    StorageManager.saveQuizScore(score, this.activeQuestions.length);
    this.renderBestScore();
  },

  renderBestScore: function() {
    const bestEl = document.getElementById("quizBestScoreDisplay");
    if (!bestEl) return;
    const best = StorageManager.getQuizBestScore();
    if (best && best.date) {
      bestEl.innerText = `🏆 Best Score: ${best.score}/${best.total} (${best.date})`;
    } else {
      bestEl.innerText = "🏆 Best Score: None yet";
    }
  }
};

if (typeof window !== "undefined") {
  window.VocabQuiz = VocabQuiz;
}
