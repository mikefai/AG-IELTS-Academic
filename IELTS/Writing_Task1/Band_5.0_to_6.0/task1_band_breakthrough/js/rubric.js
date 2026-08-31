/**
 * Tool B: Self-Assessment Rubric Module
 * 4 criteria sliders (4.0–9.0), official IELTS rounding, lowest criterion action tip, and SVG progress chart.
 */

const RubricAssessment = {
  init: function() {
    this.bindEvents();
    this.recalculate();
    this.renderHistoryChart();
  },

  bindEvents: function() {
    ["sliderTA", "sliderCC", "sliderLR", "sliderGRA"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.recalculate());
      }
    });

    const saveBtn = document.getElementById("btnSaveRubricScore");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => this.saveScore());
    }
  },

  roundIeltsBand: function(avg) {
    // Official IELTS rounding:
    // .25 -> .50 (e.g. 6.25 -> 6.5)
    // .75 -> .00 next band (e.g. 6.75 -> 7.0)
    // .125 -> .00 (e.g. 6.125 -> 6.0)
    // .375 -> .50 (e.g. 6.375 -> 6.5)
    // .625 -> .50 (e.g. 6.625 -> 6.5)
    // .875 -> .00 next band (e.g. 6.875 -> 7.0)
    const decimal = avg - Math.floor(avg);
    if (decimal < 0.25) {
      return Math.floor(avg);
    } else if (decimal < 0.75) {
      return Math.floor(avg) + 0.5;
    } else {
      return Math.floor(avg) + 1.0;
    }
  },

  recalculate: function() {
    const ta = parseFloat(document.getElementById("sliderTA")?.value || 6.0);
    const cc = parseFloat(document.getElementById("sliderCC")?.value || 6.0);
    const lr = parseFloat(document.getElementById("sliderLR")?.value || 6.0);
    const gra = parseFloat(document.getElementById("sliderGRA")?.value || 6.0);

    // Update label displays
    if (document.getElementById("valTA")) document.getElementById("valTA").innerText = ta.toFixed(1);
    if (document.getElementById("valCC")) document.getElementById("valCC").innerText = cc.toFixed(1);
    if (document.getElementById("valLR")) document.getElementById("valLR").innerText = lr.toFixed(1);
    if (document.getElementById("valGRA")) document.getElementById("valGRA").innerText = gra.toFixed(1);

    const rawAverage = (ta + cc + lr + gra) / 4.0;
    const officialBand = this.roundIeltsBand(rawAverage);

    const overallEl = document.getElementById("rubricOverallScore");
    if (overallEl) {
      overallEl.innerText = officialBand.toFixed(1);
    }

    const rawAvgEl = document.getElementById("rubricRawAverage");
    if (rawAvgEl) {
      rawAvgEl.innerText = `(Raw Average: ${rawAverage.toFixed(2)})`;
    }

    this.generateActionPlan(ta, cc, lr, gra);
  },

  generateActionPlan: function(ta, cc, lr, gra) {
    const container = document.getElementById("rubricActionPlan");
    if (!container) return;

    const scores = [
      { name: "Task Achievement", score: ta, code: "TA", tip: "Focus on your Overview: make sure it is in Paragraph 2, starts with 'Overall,' contains at least 2 striking macro-features, and has ZERO numbers." },
      { name: "Coherence & Cohesion", score: cc, code: "CC", tip: "Enforce strict 4-paragraph separation. Stop using basic 'and then' connectors; replace them with 'in stark contrast', 'subsequently', and 'whereas'." },
      { name: "Lexical Resource", score: lr, code: "LR", tip: "Stop repeating 'shows' and 'went up'. Paraphrase prompt nouns into noun phrases ('a sharp increase') and use approximation terms ('nearly half')." },
      { name: "Grammatical Range & Accuracy", score: gra, code: "GRA", tip: "Incorporate more Passive voice forms for process diagrams and relative clauses ('which accounted for 40%') for line/bar charts." }
    ];

    scores.sort((a, b) => a.score - b.score);
    const lowest = scores[0];

    container.innerHTML = `
      <div class="action-plan-card">
        <div class="action-plan-header">
          <span class="badge badge-warning">Priority Focus: ${lowest.name} (${lowest.score.toFixed(1)})</span>
        </div>
        <p class="action-plan-tip"><strong>🎯 Examiner's Prescription:</strong> ${lowest.tip}</p>
      </div>
    `;
  },

  saveScore: function() {
    const ta = parseFloat(document.getElementById("sliderTA")?.value || 6.0);
    const cc = parseFloat(document.getElementById("sliderCC")?.value || 6.0);
    const lr = parseFloat(document.getElementById("sliderLR")?.value || 6.0);
    const gra = parseFloat(document.getElementById("sliderGRA")?.value || 6.0);
    const overall = this.roundIeltsBand((ta + cc + lr + gra) / 4.0);

    StorageManager.saveRubricScore({
      ta: ta,
      cc: cc,
      lr: lr,
      gra: gra,
      overall: overall
    });

    this.renderHistoryChart();
    alert("Self-assessment score saved to history!");
  },

  renderHistoryChart: function() {
    const chartContainer = document.getElementById("rubricProgressChart");
    if (!chartContainer) return;

    const history = StorageManager.getRubricHistory();
    if (history.length === 0) {
      chartContainer.innerHTML = "<p style='color: var(--text-muted); font-size: 0.85rem;'>No score history yet. Rate your current writing and click 'Save Assessment Score'.</p>";
      return;
    }

    const points = history.map((item, idx) => {
      const x = 40 + idx * 45;
      // Scale Band 4 (y=160) to Band 9 (y=20)
      const y = 160 - ((item.overall - 4.0) / 5.0) * 140;
      return { x, y, score: item.overall, date: item.timestamp };
    });

    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(" ");

    chartContainer.innerHTML = `
      <svg viewBox="0 0 500 200" class="progress-svg" role="img" aria-label="Band Score Progress Chart">
        <!-- Axes -->
        <line x1="30" y1="20" x2="30" y2="170" stroke="var(--border)" stroke-width="2"/>
        <line x1="30" y1="170" x2="480" y2="170" stroke="var(--border)" stroke-width="2"/>
        <!-- Guidelines -->
        <line x1="30" y1="160" x2="480" y2="160" stroke="var(--border)" stroke-dasharray="2,2"/>
        <text x="5" y="164" fill="var(--text-muted)" font-size="10">Band 4</text>
        <line x1="30" y1="104" x2="480" y2="104" stroke="var(--border)" stroke-dasharray="2,2"/>
        <text x="5" y="108" fill="var(--text-muted)" font-size="10">Band 6</text>
        <line x1="30" y1="48" x2="480" y2="48" stroke="var(--border)" stroke-dasharray="2,2"/>
        <text x="5" y="52" fill="var(--text-muted)" font-size="10">Band 8</text>
        <!-- Line Chart -->
        <polyline fill="none" stroke="var(--primary)" stroke-width="3" points="${polylinePoints}"/>
        ${points.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--primary)"/>
          <text x="${p.x - 8}" y="${p.y - 10}" fill="var(--text)" font-weight="bold" font-size="11">${p.score.toFixed(1)}</text>
        `).join("")}
      </svg>
    `;
  }
};

if (typeof window !== "undefined") {
  window.RubricAssessment = RubricAssessment;
}
