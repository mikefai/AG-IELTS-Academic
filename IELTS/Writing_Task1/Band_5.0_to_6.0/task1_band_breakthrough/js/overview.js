/**
 * Tool C: Overview Trainer Module
 * Interactive mini-charts with live automated rule verification and model comparisons.
 */

const OverviewTrainer = {
  currentChartIndex: 0,

  init: function() {
    this.renderChartSelector();
    this.loadChart(0);
    this.bindEvents();
  },

  bindEvents: function() {
    const input = document.getElementById("overviewInput");
    if (input) {
      input.addEventListener("input", () => this.evaluateOverview());
    }

    const btnReveal = document.getElementById("btnRevealModelOverview");
    if (btnReveal) {
      btnReveal.addEventListener("click", () => this.toggleModelOverview());
    }
  },

  renderChartSelector: function() {
    const selector = document.getElementById("overviewChartNav");
    if (!selector || !IELTS_DATA.overviewTrainer) return;

    selector.innerHTML = IELTS_DATA.overviewTrainer.map((chart, idx) => `
      <button class="filter-btn ${idx === this.currentChartIndex ? 'active' : ''}" onclick="OverviewTrainer.loadChart(${idx})">
        ${chart.type}: Chart ${idx + 1}
      </button>
    `).join("");
  },

  loadChart: function(index) {
    this.currentChartIndex = index;
    const chart = IELTS_DATA.overviewTrainer[index];
    if (!chart) return;

    this.renderChartSelector();

    const titleEl = document.getElementById("overviewChartTitle");
    if (titleEl) titleEl.innerText = chart.title;

    const svgContainer = document.getElementById("overviewChartSvg");
    if (svgContainer) svgContainer.innerHTML = chart.svg;

    const promptEl = document.getElementById("overviewPrompt");
    if (promptEl) promptEl.innerText = chart.prompt;

    const input = document.getElementById("overviewInput");
    if (input) {
      input.value = "";
    }

    const modelCard = document.getElementById("overviewModelCard");
    if (modelCard) {
      modelCard.style.display = "none";
      document.getElementById("overviewModelText").innerText = chart.modelOverview;
      document.getElementById("overviewKeyFeatures").innerHTML = chart.keyFeatures.map(f => `<li>${f}</li>`).join("");
    }

    this.evaluateOverview();
  },

  evaluateOverview: function() {
    const input = document.getElementById("overviewInput");
    const text = input ? input.value.trim() : "";
    const feedbackList = document.getElementById("overviewChecklist");
    if (!feedbackList) return;

    // Rule 1: Starts with Overall / In general / Overall, it is clear that
    const startsWithOverall = /^(Overall|In general|To summarize)/i.test(text);

    // Rule 2: Contains NO numerical digits or percentages (Crucial Task 1 rule)
    const containsNumbers = /\b\d+(\.\d+)?%?\b/.test(text);

    // Rule 3: Word length between 20 and 65 words
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const properLength = words >= 20 && words <= 65;

    // Rule 4: Contains comparison or contrast marker (whereas, while, however, in contrast, highest, lowest, primary)
    const hasComparison = /\b(whereas|while|in contrast|however|highest|lowest|exceeded|outpaced|majority|smallest|dominant|collapsed|surged)\b/i.test(text);

    feedbackList.innerHTML = `
      <div class="check-item ${startsWithOverall ? 'check-pass' : 'check-fail'}">
        <span class="check-icon">${startsWithOverall ? '✅' : '❌'}</span>
        <span>Starts with standard signal (e.g. <em>"Overall, ..."</em>)</span>
      </div>
      <div class="check-item ${!containsNumbers ? 'check-pass' : 'check-fail'}">
        <span class="check-icon">${!containsNumbers ? '✅' : '❌'}</span>
        <span><strong>Zero specific numbers:</strong> ${containsNumbers ? '<span style="color:var(--wrong);">You included numbers! Save all numbers for detail paragraphs.</span>' : 'Great! Numbers avoided.'}</span>
      </div>
      <div class="check-item ${properLength ? 'check-pass' : 'check-fail'}">
        <span class="check-icon">${properLength ? '✅' : '❌'}</span>
        <span>Word length: <strong>${words} words</strong> (Ideal target: 25–45 words)</span>
      </div>
      <div class="check-item ${hasComparison ? 'check-pass' : 'check-fail'}">
        <span class="check-icon">${hasComparison ? '✅' : '❌'}</span>
        <span>Includes comparative/macro trend language</span>
      </div>
    `;
  },

  toggleModelOverview: function() {
    const modelCard = document.getElementById("overviewModelCard");
    const btn = document.getElementById("btnRevealModelOverview");
    if (!modelCard) return;

    if (modelCard.style.display === "none" || !modelCard.style.display) {
      modelCard.style.display = "block";
      if (btn) btn.innerText = "Hide Model Overview";
    } else {
      modelCard.style.display = "none";
      if (btn) btn.innerText = "Reveal Model Overview";
    }
  }
};

if (typeof window !== "undefined") {
  window.OverviewTrainer = OverviewTrainer;
}
