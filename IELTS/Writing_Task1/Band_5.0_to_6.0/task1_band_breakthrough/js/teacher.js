/**
 * Tool F: Teacher Mode Module
 * Collapsible sidebar with classroom pacing, discussion prompts, and pedagogical notes.
 */

const TeacherMode = {
  isOpen: false,

  init: function() {
    this.bindEvents();
    this.renderNotes();
  },

  bindEvents: function() {
    const toggleBtn = document.getElementById("btnTeacherModeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggle());
    }

    const closeBtn = document.getElementById("btnCloseTeacherSidebar");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.toggle(false));
    }
  },

  toggle: function(forceState) {
    this.isOpen = typeof forceState === "boolean" ? forceState : !this.isOpen;
    const sidebar = document.getElementById("teacherSidebar");
    const toggleBtn = document.getElementById("btnTeacherModeToggle");

    if (sidebar) {
      if (this.isOpen) {
        sidebar.classList.add("open");
        if (toggleBtn) toggleBtn.classList.add("active");
      } else {
        sidebar.classList.remove("open");
        if (toggleBtn) toggleBtn.classList.remove("active");
      }
    }
  },

  renderNotes: function() {
    const container = document.getElementById("teacherSidebarContent");
    if (!container || !IELTS_DATA.teacherNotes) return;

    const notes = IELTS_DATA.teacherNotes;
    container.innerHTML = `
      <div class="teacher-section">
        <h4>⏱️ ${notes.duration}</h4>
        <div class="teacher-timeline">
          ${notes.pacing.map(p => `
            <div class="timeline-step">
              <span class="step-time">${p.time}</span>
              <strong>${p.stage}</strong>
              <p>${p.action}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="teacher-section">
        <h4>💬 Guided Discussion Starters</h4>
        <ul class="teacher-questions-list">
          ${notes.discussionQuestions.map(q => `<li>${q}</li>`).join("")}
        </ul>
      </div>

      <div class="teacher-section">
        <h4>📽️ Projector Recommendations</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          1. Project <strong>Overview Trainer</strong> for group cold-calling.<br>
          2. Use <strong>Band 6 vs Band 8 Comparison</strong> to highlight why mechanical writing caps Lexical Resource.<br>
          3. Run <strong>Vocabulary Quiz</strong> at the end as an exit ticket.
        </p>
      </div>
    `;
  }
};

if (typeof window !== "undefined") {
  window.TeacherMode = TeacherMode;
}
