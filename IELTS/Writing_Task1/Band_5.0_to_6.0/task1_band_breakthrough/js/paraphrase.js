/**
 * Tool D: Paraphrase Lab Module
 * 5 authentic Task 1 prompts with interactive rewriting and side-by-side synonym chunk highlighting.
 */

const ParaphraseLab = {
  currentPromptIndex: 0,

  init: function() {
    this.renderPromptSelector();
    this.loadPrompt(0);
    this.bindEvents();
  },

  bindEvents: function() {
    const checkBtn = document.getElementById("btnCheckParaphrase");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.revealModel());
    }
  },

  renderPromptSelector: function() {
    const container = document.getElementById("paraphrasePromptNav");
    if (!container || !IELTS_DATA.paraphrasePrompts) return;

    container.innerHTML = IELTS_DATA.paraphrasePrompts.map((p, idx) => `
      <button class="filter-btn ${idx === this.currentPromptIndex ? 'active' : ''}" onclick="ParaphraseLab.loadPrompt(${idx})">
        Prompt ${p.id}
      </button>
    `).join("");
  },

  loadPrompt: function(index) {
    this.currentPromptIndex = index;
    const promptData = IELTS_DATA.paraphrasePrompts[index];
    if (!promptData) return;

    this.renderPromptSelector();

    const origEl = document.getElementById("paraphraseOriginalPrompt");
    if (origEl) origEl.innerText = promptData.original;

    const input = document.getElementById("paraphraseUserInput");
    if (input) input.value = "";

    const modelContainer = document.getElementById("paraphraseModelContainer");
    if (modelContainer) modelContainer.style.display = "none";
  },

  revealModel: function() {
    const promptData = IELTS_DATA.paraphrasePrompts[this.currentPromptIndex];
    const modelContainer = document.getElementById("paraphraseModelContainer");
    const modelTextEl = document.getElementById("paraphraseModelText");
    const breakdownEl = document.getElementById("paraphraseBreakdownList");
    if (!promptData || !modelContainer) return;

    modelContainer.style.display = "block";
    if (modelTextEl) modelTextEl.innerText = promptData.model;

    if (breakdownEl && promptData.breakdown) {
      breakdownEl.innerHTML = promptData.breakdown.map(b => `
        <div class="chunk-upgrade-card">
          <div class="chunk-original">❌ <strong>Original:</strong> "${b.original}"</div>
          <div class="chunk-upgraded">✅ <strong>Band 7+ Paraphrase:</strong> "${b.upgraded}"</div>
        </div>
      `).join("");
    }
  }
};

if (typeof window !== "undefined") {
  window.ParaphraseLab = ParaphraseLab;
}
