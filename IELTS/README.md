# 🎯 IELTS (International English Language Testing System) Workspace

Welcome to the **IELTS Academic** dedicated workspace and standalone web platform.

- 🌐 **Independent Web Portal**: [`index.html`](index.html) *(Open locally or publish via GitHub Pages)*
- 🔗 **GitHub Repository**: [`https://github.com/mikefai/AG-IELTS-Academic`](https://github.com/mikefai/AG-IELTS-Academic)
- 🏠 **Master Workspace Hub**: [`../index.html`](../index.html)

---

## 📁 Directory Structure

```
IELTS/
├── index.html                 # Standalone IELTS Academic web portal connecting all creations
├── Reading/                   # Academic texts (3 passages, 40 Qs, T/F/NG, Headings, MCQ Masterclass)
│   ├── Band_5.0_to_6.0/
│   ├── Band_6.0_to_7.0/
│   ├── Band_7.0_to_8.0/       # academic_reading_mcq_masterclass.md, ielts_reading_mcq_app.html
│   └── Band_8.0_to_9.0/
├── Writing_Task1/             # Charts, graphs, tables, maps, process diagrams (Band 7-9 model answers)
│   ├── Band_5.0_to_6.0/
│   ├── Band_6.0_to_7.0/
│   ├── Band_7.0_to_8.0/
│   ├── Band_8.0_to_9.0/
│   └── ielts_academic_task1_line_graph_training_pack.html
├── Writing_Task2/             # Opinion, Discussion, Problem-Solution, Direct Question essays
│   ├── Band_5.0_to_6.0/
│   ├── Band_6.0_to_7.0/
│   ├── Band_7.0_to_8.0/
│   └── Band_8.0_to_9.0/
├── Speaking/                  # Speaking mock exams, cue cards, and audio/transcript drills
│   ├── Band_5.0_to_6.0/       # ielts_academic_speaking_band_5_5_to_6_5_mock.md
│   ├── Band_6.0_to_7.0/
│   ├── Band_7.0_to_8.0/
│   └── Band_8.0_to_9.0/
├── Listening/                 # Section 1-4 scripts, question sheets, distraction analysis
├── Vocabulary_Collocations/   # High-scoring lexical resource lists (Band 7+ collocations, topic-specific)
├── Mock_Tests/                # Full practice test sets and scoring calculators
└── README.md                  # This document
```

---

## 📊 IELTS Scoring & Band Descriptors Reference

### Writing Assessment Criteria (25% each)
1. **Task Achievement / Response (TR/TA)**: Addressing all parts, clear position, fully developed ideas.
2. **Coherence and Cohesion (CC)**: Logical organization, paragraphing, cohesive devices without over-use.
3. **Lexical Resource (LR)**: Wide range, precise word choice, collocations, rare errors.
4. **Grammatical Range and Accuracy (GRA)**: Variety of complex structures, error-free sentences.

### Speaking Assessment Criteria (25% each)
1. **Fluency and Coherence (FC)**
2. **Lexical Resource (LR)**
3. **Grammatical Range and Accuracy (GRA)**
4. **Pronunciation (PR)**

---

## 📋 Content Creation Standard

When generating IELTS content:
1. **Declare Target Band**: Always specify target band (e.g., Band 7.0, Band 8.0, Band 9.0) in the header.
2. **Annotated Sample Answers**: Include structural breakdowns, vocabulary highlights, and examiner commentary.
3. **Realistic Timing & Constraints**: Maintain exact word count limits (Task 1: min 150 words, Task 2: min 250 words) and test conditions.
4. **Synchronization**: After creating new items, execute `python scripts/build_workspace_index.py` to update the connected portal.
