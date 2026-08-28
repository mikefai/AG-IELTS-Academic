/**
 * YDT Reading Master - Interactive Application Logic
 * Built for high-speed learning, interactive question testing, speech synthesis, and analytics.
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currentPassageIndex: 0,
    userAnswers: {}, // { q1: 'B', q2: 'C', ... }
    openSolutions: new Set(),
    fontSize: 17, // px
    theme: localStorage.getItem('ydt_theme') || 'light',
    timerSeconds: 240, // 4 mins
    timerRunning: false,
    timerInterval: null,
    flashcards: [],
    currentCardIndex: 0,
    isCardFlipped: false
  };

  // Compile flat flashcard list from all passages
  function initFlashcards() {
    state.flashcards = [];
    YDT_DATA.passages.forEach((p) => {
      p.vocabulary.forEach((v) => {
        state.flashcards.push({
          ...v,
          passageNum: p.number,
          passageTitle: p.title
        });
      });
    });
    const vocabCountBadge = document.getElementById('vocab-count-badge');
    if (vocabCountBadge) {
      vocabCountBadge.textContent = `${state.flashcards.length} Kelime`;
    }
  }
  initFlashcards();

  // DOM Elements
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const printBtn = document.getElementById('btn-print');
  const resetBtn = document.getElementById('btn-reset-all');
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // Reading Elements
  const passagePillsContainer = document.getElementById('passage-pills-container');
  const timerDisplay = document.getElementById('timer-display');
  const toggleTimerBtn = document.getElementById('btn-toggle-timer');
  const passageBadge = document.getElementById('passage-badge');
  const passageTitle = document.getElementById('passage-title');
  const passageBody = document.getElementById('passage-body-text');
  const toggleTranslationBtn = document.getElementById('btn-toggle-translation');
  const translationDrawer = document.getElementById('translation-drawer');
  const questionsContainer = document.getElementById('questions-list-container');
  const fontDecBtn = document.getElementById('btn-font-dec');
  const fontIncBtn = document.getElementById('btn-font-inc');
  const audioReadBtn = document.getElementById('btn-audio-read');

  // Flashcards Elements
  const flashcardFilter = document.getElementById('flashcard-filter-select');
  const flashcardCard = document.getElementById('flashcard-card');
  const cardType = document.getElementById('card-type');
  const cardWord = document.getElementById('card-word');
  const cardMeaning = document.getElementById('card-meaning');
  const cardSynonyms = document.getElementById('card-synonyms');
  const cardExample = document.getElementById('card-example');
  const cardCounter = document.getElementById('card-counter');
  const btnCardPrev = document.getElementById('btn-card-prev');
  const btnCardNext = document.getElementById('btn-card-next');
  const btnCardSpeak = document.getElementById('btn-card-speak');

  // Tactics & Dashboard
  const tacticsContainer = document.getElementById('tactics-container');
  const statCorrect = document.getElementById('stat-correct');
  const statWrong = document.getElementById('stat-wrong');
  const statEmpty = document.getElementById('stat-empty');
  const statNet = document.getElementById('stat-net');
  const dashboardTableBody = document.getElementById('dashboard-table-body');

  // Modal Elements
  const vocabModal = document.getElementById('vocab-modal');
  const btnCloseVocabModal = document.getElementById('btn-close-vocab-modal');
  const modalWordType = document.getElementById('modal-word-type');
  const modalWordText = document.getElementById('modal-word-text');
  const modalWordMeaning = document.getElementById('modal-word-meaning');
  const modalWordSynonyms = document.getElementById('modal-word-synonyms');
  const modalWordCollocations = document.getElementById('modal-word-collocations');
  const modalWordExample = document.getElementById('modal-word-example');
  const btnModalSpeak = document.getElementById('btn-modal-speak');

  // Load saved answers from localStorage if present
  const savedAnswers = localStorage.getItem('ydt_user_answers');
  if (savedAnswers) {
    try {
      state.userAnswers = JSON.parse(savedAnswers);
    } catch (e) {
      console.error(e);
    }
  }

  // --- THEME MANAGEMENT ---
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('ydt_theme', theme);
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  applyTheme(state.theme);

  themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // --- NAVIGATION TABS ---
  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      navTabs.forEach((t) => t.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (tab.dataset.tab === 'dashboard') {
        updateDashboard();
      }
    });
  });

  // --- PASSAGE SELECTION PILLS ---
  function renderPassagePills() {
    passagePillsContainer.innerHTML = '';
    YDT_DATA.passages.forEach((p, idx) => {
      const pill = document.createElement('button');
      pill.className = `passage-pill ${idx === state.currentPassageIndex ? 'active' : ''}`;
      pill.innerHTML = `<span>Metin ${p.number}:</span> ${p.badge}`;
      pill.addEventListener('click', () => {
        state.currentPassageIndex = idx;
        renderPassagePills();
        renderActivePassage();
        resetTimer();
      });
      passagePillsContainer.appendChild(pill);
    });
  }

  // --- RENDER PASSAGE CONTENT ---
  function renderActivePassage() {
    const passage = YDT_DATA.passages[state.currentPassageIndex];
    passageBadge.textContent = `${passage.category} • Metin ${passage.number}`;
    passageTitle.textContent = passage.title;

    // Build vocabulary map for fast keyword matching
    const vocabMap = new Map();
    passage.vocabulary.forEach((v) => {
      vocabMap.set(v.word.toLowerCase(), v);
    });

    // Render sentences with sentence numbers and interactive keywords
    let bodyHtml = '';
    passage.text.forEach((s) => {
      let sentenceText = s.en;

      // Wrap known vocabulary words in interactive span
      passage.vocabulary.forEach((v) => {
        const regex = new RegExp(`\\b(${v.word})\\b`, 'gi');
        sentenceText = sentenceText.replace(regex, (matched) => {
          return `<span class="vocab-term" data-word="${v.word.toLowerCase()}">${matched}</span>`;
        });
      });

      bodyHtml += `
        <span class="passage-sentence" id="sentence-${s.num}" data-sentence-num="${s.num}">
          <span class="sentence-num">(${s.num})</span>${sentenceText}
        </span> `;
    });

    passageBody.innerHTML = bodyHtml;

    // Attach click event for interactive words
    passageBody.querySelectorAll('.vocab-term').forEach((span) => {
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        const wordKey = span.dataset.word;
        const vocabItem = vocabMap.get(wordKey);
        if (vocabItem) {
          openVocabModal(vocabItem);
        }
      });
    });

    // Render Translation Drawer
    let transHtml = '';
    passage.text.forEach((s) => {
      transHtml += `
        <div class="trans-item">
          <span class="trans-num">(${s.num})</span>
          <span>${s.tr}</span>
        </div>
      `;
    });
    translationDrawer.innerHTML = transHtml;

    // Render Questions for this passage
    renderQuestions(passage);
  }

  // --- TRANSLATION DRAWER TOGGLE ---
  toggleTranslationBtn.addEventListener('click', () => {
    const isOpen = translationDrawer.classList.toggle('open');
    toggleTranslationBtn.textContent = isOpen ? 'Çeviriyi Gizle' : 'Çeviriyi Göster';
  });

  // --- FONT SIZE CONTROLS ---
  fontIncBtn.addEventListener('click', () => {
    if (state.fontSize < 24) {
      state.fontSize += 1.5;
      passageBody.style.fontSize = `${state.fontSize}px`;
    }
  });

  fontDecBtn.addEventListener('click', () => {
    if (state.fontSize > 13) {
      state.fontSize -= 1.5;
      passageBody.style.fontSize = `${state.fontSize}px`;
    }
  });

  // --- TEXT TO SPEECH (PASSAGE AUDIO) ---
  audioReadBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        audioReadBtn.textContent = '🔊';
        return;
      }
      const passage = YDT_DATA.passages[state.currentPassageIndex];
      const fullText = passage.text.map((t) => t.en).join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        audioReadBtn.textContent = '🔊';
      };
      utterance.onerror = () => {
        audioReadBtn.textContent = '🔊';
      };

      audioReadBtn.textContent = '⏹️';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tarayıcınız sesli okuma özelliğini desteklemiyor.');
    }
  });

  // --- RENDER QUESTIONS ---
  function renderQuestions(passage) {
    questionsContainer.innerHTML = '';

    passage.questions.forEach((q) => {
      const qBox = document.createElement('div');
      qBox.className = 'question-box';
      qBox.id = `qbox-${q.id}`;

      const selectedKey = state.userAnswers[q.id];
      const isSolutionOpen = state.openSolutions.has(q.id);

      let optionsHtml = '';
      q.options.forEach((opt) => {
        let optClass = 'option-item';
        if (selectedKey === opt.key) {
          optClass += ' selected';
          if (isSolutionOpen) {
            optClass += opt.key === q.correctKey ? ' is-correct' : ' is-wrong';
          }
        } else if (isSolutionOpen && opt.key === q.correctKey) {
          optClass += ' is-correct';
        }

        optionsHtml += `
          <div class="${optClass}" data-qid="${q.id}" data-key="${opt.key}">
            <div class="option-key">${opt.key}</div>
            <div class="option-text">${opt.text}</div>
          </div>
        `;
      });

      // Trap items breakdown
      let trapsHtml = '';
      Object.keys(q.explanation.traps).forEach((trapKey) => {
        trapsHtml += `
          <div class="trap-item">
            <span class="trap-key">[${trapKey}]</span> ${q.explanation.traps[trapKey]}
          </div>
        `;
      });

      qBox.innerHTML = `
        <div class="question-header">
          <span class="q-badge">Soru ${q.number}</span>
          <span class="q-type-badge">${q.questionType}</span>
        </div>
        <div class="q-stem">${q.stem}</div>
        <div class="q-stem-tr">${q.stemTr}</div>
        <div class="options-list">
          ${optionsHtml}
        </div>
        <div class="question-footer">
          <button class="btn-show-solution" data-qid="${q.id}">
            💡 ${isSolutionOpen ? 'Çözüm Analizini Gizle' : 'Çözümü & Çeldiricileri Gör'}
          </button>
          <span style="font-size:0.75rem; color:var(--text-muted);">
            İlgili Cümle: (${q.targetLines.join(', ')})
          </span>
        </div>
        <div class="solution-box ${isSolutionOpen ? 'open' : ''}" id="solution-${q.id}">
          <div class="solution-title">✅ Doğru Cevap: [${q.correctKey}]</div>
          <div style="color:var(--text-primary); margin-bottom:0.5rem;">${q.explanation.correct}</div>
          <div class="solution-traps">
            <div style="font-weight:700; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; margin-bottom:0.35rem;">
              ⚠️ Çeldirici Analizleri (Neden Yanlış?):
            </div>
            ${trapsHtml}
          </div>
        </div>
      `;

      // Option selection event
      qBox.querySelectorAll('.option-item').forEach((item) => {
        item.addEventListener('click', () => {
          const qid = item.dataset.qid;
          const key = item.dataset.key;
          state.userAnswers[qid] = key;
          localStorage.setItem('ydt_user_answers', JSON.stringify(state.userAnswers));
          highlightQuestionLines(q.targetLines);
          renderQuestions(passage);
        });
      });

      // Show Solution Toggle
      const solutionBtn = qBox.querySelector('.btn-show-solution');
      solutionBtn.addEventListener('click', () => {
        if (state.openSolutions.has(q.id)) {
          state.openSolutions.delete(q.id);
        } else {
          state.openSolutions.add(q.id);
          highlightQuestionLines(q.targetLines);
        }
        renderQuestions(passage);
      });

      // Question focus highlight
      qBox.addEventListener('mouseenter', () => {
        highlightQuestionLines(q.targetLines);
      });

      questionsContainer.appendChild(qBox);
    });
  }

  // --- HIGHLIGHT SENTENCES IN PASSAGE ---
  function highlightQuestionLines(lineNums) {
    document.querySelectorAll('.passage-sentence').forEach((el) => {
      el.classList.remove('highlighted');
    });

    lineNums.forEach((num) => {
      const sentenceEl = document.getElementById(`sentence-${num}`);
      if (sentenceEl) {
        sentenceEl.classList.add('highlighted');
      }
    });
  }

  // --- EXAM TIMER LOGIC ---
  function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function startTimer() {
    state.timerRunning = true;
    toggleTimerBtn.textContent = '⏸️';
    state.timerInterval = setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        timerDisplay.textContent = formatTimer(state.timerSeconds);
        if (state.timerSeconds <= 60) {
          timerDisplay.classList.add('warning');
        }
      } else {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        toggleTimerBtn.textContent = '▶️';
        alert('⏰ Bu paragraf için önerilen 4 dakikalık süre doldu!');
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    toggleTimerBtn.textContent = '▶️';
    clearInterval(state.timerInterval);
  }

  function resetTimer() {
    pauseTimer();
    state.timerSeconds = YDT_DATA.metadata.recommendedTimePerPassage;
    timerDisplay.textContent = formatTimer(state.timerSeconds);
    timerDisplay.classList.remove('warning');
  }

  toggleTimerBtn.addEventListener('click', () => {
    if (state.timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  // --- FLASHCARDS LOGIC ---
  let activeFlashcards = [...state.flashcards];

  function renderFlashcard() {
    if (activeFlashcards.length === 0) return;
    const card = activeFlashcards[state.currentCardIndex];

    state.isCardFlipped = false;
    flashcardCard.classList.remove('flipped');

    cardType.textContent = `${card.type} • ${card.level || 'B2'}`;
    cardWord.textContent = card.word;
    cardMeaning.textContent = card.meaningTr;
    cardSynonyms.innerHTML = `<strong>Eş Anlamlılar:</strong> ${card.synonyms ? card.synonyms.join(', ') : '-'}`;
    cardExample.textContent = card.example ? `"${card.example}"` : '';
    cardCounter.textContent = `${state.currentCardIndex + 1} / ${activeFlashcards.length}`;
  }

  flashcardCard.addEventListener('click', () => {
    state.isCardFlipped = !state.isCardFlipped;
    flashcardCard.classList.toggle('flipped', state.isCardFlipped);
  });

  btnCardNext.addEventListener('click', () => {
    if (state.currentCardIndex < activeFlashcards.length - 1) {
      state.currentCardIndex++;
    } else {
      state.currentCardIndex = 0;
    }
    renderFlashcard();
  });

  btnCardPrev.addEventListener('click', () => {
    if (state.currentCardIndex > 0) {
      state.currentCardIndex--;
    } else {
      state.currentCardIndex = activeFlashcards.length - 1;
    }
    renderFlashcard();
  });

  btnCardSpeak.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = activeFlashcards[state.currentCardIndex];
    if (card && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  });

  flashcardFilter.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'all') {
      activeFlashcards = [...state.flashcards];
    } else {
      const pNum = parseInt(val, 10);
      activeFlashcards = state.flashcards.filter((f) => f.passageNum === pNum);
    }
    state.currentCardIndex = 0;
    renderFlashcard();
  });

  // --- VOCABULARY MODAL LOGIC ---
  function openVocabModal(item) {
    modalWordType.textContent = `${item.type} • ${item.level || 'B2'}`;
    modalWordText.textContent = item.word;
    modalWordMeaning.textContent = item.meaningTr;
    modalWordSynonyms.textContent = item.synonyms ? item.synonyms.join(', ') : '-';
    modalWordCollocations.textContent = item.collocations ? item.collocations.join(', ') : '-';
    modalWordExample.textContent = item.example ? `"${item.example}"` : '-';

    btnModalSpeak.onclick = () => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(item.word);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    };

    vocabModal.classList.add('open');
  }

  btnCloseVocabModal.addEventListener('click', () => {
    vocabModal.classList.remove('open');
  });

  vocabModal.addEventListener('click', (e) => {
    if (e.target === vocabModal) {
      vocabModal.classList.remove('open');
    }
  });

  // --- TACTICS RENDERING ---
  function renderTactics() {
    tacticsContainer.innerHTML = '';
    YDT_DATA.tactics.forEach((t) => {
      const card = document.createElement('div');
      card.className = 'tactic-card';
      card.innerHTML = `
        <div class="tactic-icon">💡</div>
        <h3 class="tactic-title">${t.title}</h3>
        <p class="tactic-text">${t.content}</p>
      `;
      tacticsContainer.appendChild(card);
    });
  }

  // --- SCORE DASHBOARD CALCULATION ---
  function updateDashboard() {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    let tableRows = '';

    YDT_DATA.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const userAns = state.userAnswers[q.id];
        let statusBadge = '';

        if (!userAns) {
          empty++;
          statusBadge = '<span style="color:var(--warning); font-weight:700;">⚪ Boş</span>';
        } else if (userAns === q.correctKey) {
          correct++;
          statusBadge = '<span style="color:var(--success); font-weight:700;">🟢 Doğru</span>';
        } else {
          wrong++;
          statusBadge = '<span style="color:var(--danger); font-weight:700;">🔴 Yanlış</span>';
        }

        tableRows += `
          <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:0.75rem; font-weight:700;">Soru ${q.number}</td>
            <td style="padding:0.75rem;">Metin ${p.number}: ${p.badge}</td>
            <td style="padding:0.75rem; color:var(--text-muted);">${q.questionType}</td>
            <td style="padding:0.75rem; font-weight:700;">${userAns ? `[${userAns}]` : '-'}</td>
            <td style="padding:0.75rem; font-weight:700; color:var(--primary);">[${q.correctKey}]</td>
            <td style="padding:0.75rem;">${statusBadge}</td>
          </tr>
        `;
      });
    });

    const netScore = Math.max(0, correct - wrong / 4).toFixed(2);

    statCorrect.textContent = correct;
    statWrong.textContent = wrong;
    statEmpty.textContent = empty;
    statNet.textContent = netScore;

    dashboardTableBody.innerHTML = tableRows;
  }

  // --- PRINT / RESET HANDLERS ---
  printBtn.addEventListener('click', () => {
    window.print();
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Tüm işaretlediğiniz cevapları ve çözümleri sıfırlamak istediğinize emin misiniz?')) {
      state.userAnswers = {};
      state.openSolutions.clear();
      localStorage.removeItem('ydt_user_answers');
      renderQuestions(YDT_DATA.passages[state.currentPassageIndex]);
      updateDashboard();
      alert('Tüm cevaplar sıfırlandı.');
    }
  });

  // --- KEYBOARD SHORTCUTS ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vocabModal.classList.contains('open')) {
      vocabModal.classList.remove('open');
    }
  });

  // --- INITIAL RENDERS ---
  renderPassagePills();
  renderActivePassage();
  renderFlashcard();
  renderTactics();
  updateDashboard();
});
