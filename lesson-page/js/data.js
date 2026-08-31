/**
 * B1 Teen ESL Lesson Platform - Data Bank
 * Topics: Dream Jobs & Careers + School & Academic Pressures
 * Zero external dependencies. All data is structured for offline execution.
 */

const LESSON_DATA = {
  metadata: {
    title: "Dream Big, Stress Less: Careers & School Life",
    level: "A2+ / B1 (CEFR)",
    targetAudience: "Teen ESL Learners (ages 13–17)",
    topics: ["Dream Jobs & Careers", "School & Academic Pressures"],
    lastUpdated: "2026-08-31"
  },

  // Core Seed Vocabulary Bank
  vocabularyBank: [
    // Jobs & Careers
    { term: "career", partOfSpeech: "noun", cefr: "B1", definition: "A job or profession that you do for a long period of your life.", topic: "jobs", example: "She wants a creative career in game design." },
    { term: "salary", partOfSpeech: "noun", cefr: "B1", definition: "The regular money you get each month for working.", topic: "jobs", example: "Does an entrepreneur always earn a high salary?" },
    { term: "apply for", partOfSpeech: "phrasal verb", cefr: "B1", definition: "To ask officially for a job by sending a letter or CV.", topic: "jobs", example: "I want to apply for a summer camp job." },
    { term: "skills", partOfSpeech: "noun", cefr: "A2", definition: "Things you can do well because you learned and practiced them.", topic: "jobs", example: "Coding and drawing are useful creative skills." },
    { term: "experience", partOfSpeech: "noun", cefr: "B1", definition: "Knowledge and practice you get from doing a job over time.", topic: "jobs", example: "He has two years of experience in video editing." },
    { term: "boss", partOfSpeech: "noun", cefr: "A2", definition: "The person in charge of you at work.", topic: "jobs", example: "A good boss listens to new ideas." },
    { term: "colleague", partOfSpeech: "noun", cefr: "B1", definition: "A person you work with in the same company.", topic: "jobs", example: "My colleagues are friendly and helpful." },
    { term: "interview", partOfSpeech: "noun", cefr: "B1", definition: "A meeting where someone asks you questions to see if you are good for a job.", topic: "jobs", example: "I was nervous before my job interview." },
    { term: "qualifications", partOfSpeech: "noun", cefr: "B1", definition: "Official certificates or exam passes showing you can do a job.", topic: "jobs", example: "What qualifications do you need to become a pilot?" },
    { term: "dream job", partOfSpeech: "noun", cefr: "A2", definition: "The perfect job that you want to do more than any other.", topic: "jobs", example: "Being a travel vlogger is her dream job." },
    { term: "earn", partOfSpeech: "verb", cefr: "A2", definition: "To receive money in return for work that you do.", topic: "jobs", example: "Teenagers can earn pocket money by walking dogs." },
    { term: "hire", partOfSpeech: "verb", cefr: "B1", definition: "To give someone a job and pay them for it.", topic: "jobs", example: "The game studio plans to hire ten new programmers." },
    { term: "resign", partOfSpeech: "verb", cefr: "B2", definition: "To officially tell your boss that you are leaving your job.", topic: "jobs", example: "He decided to resign and start his own business." },
    { term: "promote", partOfSpeech: "verb", cefr: "B1", definition: "To move someone to a higher and better position at work.", topic: "jobs", example: "If you work hard, they might promote you to team leader." },
    { term: "freelance", partOfSpeech: "adjective", cefr: "B1", definition: "Working independently for different clients rather than one company.", topic: "jobs", example: "Freelance illustrators can work from anywhere." },
    { term: "entrepreneur", partOfSpeech: "noun", cefr: "B2", definition: "A person who starts their own business to make money.", topic: "jobs", example: "The young entrepreneur invented an eco-friendly water bottle." },
    { term: "remote working", partOfSpeech: "noun", cefr: "B1", definition: "Working from home or anywhere using a computer instead of an office.", topic: "jobs", example: "Remote working gives people more free time." },

    // School & Pressure
    { term: "grades", partOfSpeech: "noun", cefr: "A2", definition: "Letters or numbers (like A, B, 90%) showing how good your school work is.", topic: "school", example: "She studied hard to get top grades." },
    { term: "exam", partOfSpeech: "noun", cefr: "A2", definition: "An important test of your knowledge in a school subject.", topic: "school", example: "We have an English exam on Friday." },
    { term: "deadline", partOfSpeech: "noun", cefr: "B1", definition: "The exact date or time when work must be finished.", topic: "school", example: "The deadline for our science project is tomorrow at 5 PM." },
    { term: "stressed", partOfSpeech: "adjective", cefr: "A2", definition: "Feeling worried and unable to relax because of difficult problems.", topic: "school", example: "I feel stressed when I have three tests in one day." },
    { term: "pressure", partOfSpeech: "noun", cefr: "B1", definition: "Strong demands or expectations from parents, teachers, or yourself.", topic: "school", example: "Many students feel pressure to be the best." },
    { term: "revise", partOfSpeech: "verb", cefr: "B1", definition: "To study your notes and books again before an exam.", topic: "school", example: "I usually revise for two hours every evening." },
    { term: "homework", partOfSpeech: "noun", cefr: "A2", definition: "School work that teachers give students to do at home.", topic: "school", example: "Too much homework leaves no time for sports." },
    { term: "expectations", partOfSpeech: "noun", cefr: "B1", definition: "Things that people hope or believe you will achieve.", topic: "school", example: "Family expectations can sometimes feel heavy." },
    { term: "compare", partOfSpeech: "verb", cefr: "A2", definition: "To look at two things or people to see how they are different or similar.", topic: "school", example: "Never compare your grades with other classmates." },
    { term: "compete", partOfSpeech: "verb", cefr: "B1", definition: "To try to be more successful than others.", topic: "school", example: "Students should collaborate instead of compete." },
    { term: "fail", partOfSpeech: "verb", cefr: "A2", definition: "To not pass an exam or achieve a goal.", topic: "school", example: "If you fail a test, you can learn from your mistakes." },
    { term: "pass", partOfSpeech: "verb", cefr: "A2", definition: "To succeed in an exam by getting enough points.", topic: "school", example: "Everyone was happy to pass the driving test." },
    { term: "scholarship", partOfSpeech: "noun", cefr: "B1", definition: "Free money given by a school or university to pay for education.", topic: "school", example: "She won a sports scholarship to a great college." },
    { term: "workload", partOfSpeech: "noun", cefr: "B1", definition: "The amount of work or study you have to do in a certain time.", topic: "school", example: "My homework workload is very heavy this week." },
    { term: "burnout", partOfSpeech: "noun", cefr: "B2", definition: "Complete physical and mental exhaustion caused by working too hard.", topic: "school", example: "Sleeping well prevents student burnout." },
    { term: "balance", partOfSpeech: "noun", cefr: "B1", definition: "Giving equal attention to school, hobbies, and relaxation.", topic: "school", example: "It is important to keep a balance between study and fun." },
    { term: "mental health", partOfSpeech: "noun", cefr: "B1", definition: "The condition of a person's mind and feelings.", topic: "school", example: "Exercise and good sleep protect your mental health." },

    // Feelings & Opinion Adjectives
    { term: "ambitious", partOfSpeech: "adjective", cefr: "B1", definition: "Having a strong desire to be successful or powerful.", topic: "feelings", example: "She is an ambitious student who wants to be a surgeon." },
    { term: "creative", partOfSpeech: "adjective", cefr: "A2", definition: "Good at thinking of new ideas and making original things.", topic: "feelings", example: "He has creative skills in drawing and animation." },
    { term: "challenging", partOfSpeech: "adjective", cefr: "B1", definition: "Difficult in an interesting way that tests your ability.", topic: "feelings", example: "Math is challenging, but I enjoy solving puzzles." },
    { term: "rewarding", partOfSpeech: "adjective", cefr: "B1", definition: "Giving you satisfaction or positive feelings because it is useful.", topic: "feelings", example: "Teaching English to kids is a rewarding job." },
    { term: "exhausted", partOfSpeech: "adjective", cefr: "B1", definition: "Extremely tired with zero energy left.", topic: "feelings", example: "After four exams in a row, I was completely exhausted." },
    { term: "motivated", partOfSpeech: "adjective", cefr: "B1", definition: "Feeling enthusiastic and eager to work or study hard.", topic: "feelings", example: "A fun teacher makes students feel motivated." },
    { term: "overwhelmed", partOfSpeech: "adjective", cefr: "B2", definition: "Feeling unable to cope because you have too many things to do.", topic: "feelings", example: "She felt overwhelmed by all the homework deadlines." },
    { term: "proud", partOfSpeech: "adjective", cefr: "A2", definition: "Feeling pleased and satisfied about something good you did.", topic: "feelings", example: "His parents were proud when he passed the exam." },
    { term: "confident", partOfSpeech: "adjective", cefr: "B1", definition: "Sure about your ability to do things well and succeed.", topic: "feelings", example: "Speak with a confident voice during the interview." },
    { term: "disappointed", partOfSpeech: "adjective", cefr: "B1", definition: "Unhappy because someone or something was not as good as you expected.", topic: "feelings", example: "He was disappointed with his low history grade." }
  ],

  // 30 Leveled Discussion Questions (15 Jobs, 15 School)
  discussionQuestions: [
    // Jobs & Careers (15)
    {
      id: "q_job_01",
      topic: "jobs",
      level: "A2",
      type: "personal",
      question: "What did you want to be when you were 7 years old? Has your dream job changed?",
      scaffold: "Start with: 'When I was 7, I wanted to be a... because... Now, my dream job is...'"
    },
    {
      id: "q_job_02",
      topic: "jobs",
      level: "A2",
      type: "opinion",
      question: "Which is more important in a career: earning a very high salary or doing work you love?",
      scaffold: "Think about: money for buying things vs. being happy every Monday morning."
    },
    {
      id: "q_job_03",
      topic: "jobs",
      level: "A2",
      type: "creative",
      question: "You must do one job for the rest of your life: chef, game designer, or vet. Choose and defend it.",
      scaffold: "Give 2 reasons: 'I would choose... because I love... and I am good at...'"
    },
    {
      id: "q_job_04",
      topic: "jobs",
      level: "B1",
      type: "hypothetical",
      question: "If your phone could choose your future career using your screen time data, would you let it?",
      scaffold: "What does your phone know about your interests? Would it pick TikTok creator or gamer?"
    },
    {
      id: "q_job_05",
      topic: "jobs",
      level: "B1",
      type: "ranking",
      question: "Put these 5 jobs in order of stress (1 = most stressful, 5 = least): surgeon, pilot, influencer, teacher, programmer. Why?",
      scaffold: "Compare two of them: 'I think a surgeon is more stressful than an influencer because...'"
    },
    {
      id: "q_job_06",
      topic: "jobs",
      level: "B1",
      type: "creative",
      question: "Invent a new job that does not exist today, but will exist in the year 2050. What skills do you need?",
      scaffold: "Ideas: Robot psychologist, space tour guide, underwater drone pilot."
    },
    {
      id: "q_job_07",
      topic: "jobs",
      level: "B1",
      type: "opinion",
      question: "Would you prefer remote working from home or going to an office with colleagues? Why?",
      scaffold: "Pros: no travel, comfy clothes. Cons: feeling lonely, hard to stop working."
    },
    {
      id: "q_job_08",
      topic: "jobs",
      level: "B1",
      type: "debate",
      question: "Is being a freelance entrepreneur better than having a steady boss in a big company?",
      scaffold: "Think about freedom vs. security. What happens if you don't earn money this month?"
    },
    {
      id: "q_job_09",
      topic: "jobs",
      level: "B1",
      type: "hypothetical",
      question: "If you had a job interview tomorrow, what are two great skills and one weakness you would describe?",
      scaffold: "Example: 'My strongest skill is creativity, but sometimes I need to manage my time better.'"
    },
    {
      id: "q_job_10",
      topic: "jobs",
      level: "B2",
      type: "debate",
      question: "Will artificial intelligence (AI) eliminate creative jobs like musicians and writers, or help them?",
      scaffold: "Use phrases: 'On the one hand... On the other hand... In the long run...'"
    },
    {
      id: "q_job_11",
      topic: "jobs",
      level: "B2",
      type: "hypothetical",
      question: "A zombie apocalypse starts tomorrow. What skills make you the most valuable team member?",
      scaffold: "Can you cook, fix cars, speak multiple languages, or keep people calm under pressure?"
    },
    {
      id: "q_job_12",
      topic: "jobs",
      level: "A2",
      type: "personal",
      question: "What is one part-time job you would like to try during school holidays?",
      scaffold: "Examples: working in a bookstore, dog walking, barista, summer camp helper."
    },
    {
      id: "q_job_13",
      topic: "jobs",
      level: "B1",
      type: "opinion",
      question: "What qualities make a terrible boss, and what qualities make an inspiring leader?",
      scaffold: "Adjectives to use: demanding, supportive, fair, strict, motivating, impatient."
    },
    {
      id: "q_job_14",
      topic: "jobs",
      level: "B2",
      type: "ranking",
      question: "Rank these career rewards from 1 to 4: high salary, lots of holidays, fame/respect, helping society.",
      scaffold: "Justify: 'For me, helping society is top because... whereas fame is least important.'"
    },
    {
      id: "q_job_15",
      topic: "jobs",
      level: "B1",
      type: "creative",
      question: "If you could switch lives with any famous person for one work day, who would it be?",
      scaffold: "Describe their daily routine: 'First, they would... Then, they have to...'"
    },

    // School & Academic Pressures (15)
    {
      id: "q_sch_16",
      topic: "school",
      level: "A2",
      type: "opinion",
      question: "Is it better to be the best student with top grades or the happiest student with good balance?",
      scaffold: "Sentence starter: 'I think it is better to be... because good mental health is...'"
    },
    {
      id: "q_sch_17",
      topic: "school",
      level: "A2",
      type: "personal",
      question: "What school subject makes you feel proud, and which subject makes you feel stressed?",
      scaffold: "Use: 'I feel proud when I do... because... but I get stressed during...'"
    },
    {
      id: "q_sch_18",
      topic: "school",
      level: "A2",
      type: "creative",
      question: "If animals went to high school, which animal would get the best grades and which would fail?",
      scaffold: "Think: owls (wise/serious), monkeys (curious/noisy), sloths (sleeping in class!)."
    },
    {
      id: "q_sch_19",
      topic: "school",
      level: "B1",
      type: "debate",
      question: "Schools should completely ban homework so students can rest after class. Agree or disagree?",
      scaffold: "Starter: 'I strongly agree/disagree because students need time to... / practice at home.'"
    },
    {
      id: "q_sch_20",
      topic: "school",
      level: "B1",
      type: "opinion",
      question: "Where does most academic pressure come from: parents, teachers, classmates, or yourself?",
      scaffold: "Rank them and explain: 'Personally, the biggest pressure comes from... because...'"
    },
    {
      id: "q_sch_21",
      topic: "school",
      level: "B1",
      type: "hypothetical",
      question: "If schools gave students a salary (real money) for getting high exam scores, what would happen?",
      scaffold: "Would students study harder, or would they compete too aggressively and get burnt out?"
    },
    {
      id: "q_sch_22",
      topic: "school",
      level: "B1",
      type: "ranking",
      question: "Rank the top 4 causes of teen exhaustion: heavy homework, early school starts, exams, phone screen time.",
      scaffold: "Use comparatives: 'Early school mornings are harder than homework because...'"
    },
    {
      id: "q_sch_23",
      topic: "school",
      level: "A2",
      type: "creative",
      question: "If you could delete one school subject forever and add one new subject (like 'Life Skills'), what would you choose?",
      scaffold: "New ideas: Cooking & budgeting, game strategy, mental health & yoga."
    },
    {
      id: "q_sch_24",
      topic: "school",
      level: "B1",
      type: "personal",
      question: "How do you usually revise before an important exam? Do you listen to music or study in total silence?",
      scaffold: "Share tips: flashcards, pomodoro timer, studying with a friend, making summaries."
    },
    {
      id: "q_sch_25",
      topic: "school",
      level: "B2",
      type: "debate",
      question: "Should universities cancel big final exams and only look at projects and creative portfolios?",
      scaffold: "Compare: 'Single exams test memory under stress, while projects show real skills.'"
    },
    {
      id: "q_sch_26",
      topic: "school",
      level: "B1",
      type: "opinion",
      question: "Why do many teenagers compare their grades with their friends? Does it motivate or hurt friendships?",
      scaffold: "Discuss: friendly competition vs feeling jealous or disappointed."
    },
    {
      id: "q_sch_27",
      topic: "school",
      level: "B2",
      type: "hypothetical",
      question: "Your best friend has a strict deadline tomorrow and feels completely overwhelmed. How do you help them?",
      scaffold: "Give concrete advice: break tasks into small steps, take a 10-minute walk, drink water."
    },
    {
      id: "q_sch_28",
      topic: "school",
      level: "A2",
      type: "personal",
      question: "What is your favourite way to relax and protect your mental health after a busy school week?",
      scaffold: "Examples: playing video games, skateboarding, drawing, sleeping, listening to music."
    },
    {
      id: "q_sch_29",
      topic: "school",
      level: "B1",
      type: "debate",
      question: "Should school start at 10:00 AM instead of 8:00 AM so teenagers can get more sleep?",
      scaffold: "Consider: teen sleep biology vs parents' work schedules and after-school clubs."
    },
    {
      id: "q_sch_30",
      topic: "school",
      level: "B2",
      type: "ranking",
      question: "Rank what matters most for winning a university scholarship: exam scores, creative talents, volunteer work, sports skills.",
      scaffold: "Defend your top choice with examples of why universities value it."
    }
  ],

  // 28 Tiered Exercises (10 A2, 10 B1, 8 B2)
  exercises: [
    // --- A2 EXERCISES (1-10) ---
    {
      id: "ex_a2_01",
      title: "Job Vocabulary Match",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Match each job word to its correct meaning.",
      type: "matching",
      items: [
        { id: "m1", term: "boss", match: "The person in charge of you at work." },
        { id: "m2", term: "salary", match: "The money you earn every month for working." },
        { id: "m3", term: "colleague", match: "A person you work with in a team." },
        { id: "m4", term: "interview", match: "A meeting with questions to get a job." },
        { id: "m5", term: "skills", match: "Things you can do well from practice." },
        { id: "m6", term: "dream job", match: "The perfect career you really want." }
      ],
      spokenOutput: "Say all 6 words and definitions out loud to your partner."
    },
    {
      id: "ex_a2_02",
      title: "Odd One Out",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Choose the word that does not belong in each group.",
      type: "odd_one_out",
      items: [
        {
          id: "ooo1",
          options: ["salary", "interview", "grades", "boss"],
          correct: "grades",
          rationale: "'Grades' is a school word; the others are all workplace/job words."
        },
        {
          id: "ooo2",
          options: ["exhausted", "stressed", "overwhelmed", "creative"],
          correct: "creative",
          rationale: "'Creative' is a positive ability; the others are feelings of tiredness and pressure."
        },
        {
          id: "ooo3",
          options: ["exam", "deadline", "homework", "entrepreneur"],
          correct: "entrepreneur",
          rationale: "'Entrepreneur' is a job title; the others are school tasks and time limits."
        },
        {
          id: "ooo4",
          options: ["earn", "hire", "revise", "promote"],
          correct: "revise",
          rationale: "'Revise' means studying for a test; the others are actions done in a company."
        }
      ],
      spokenOutput: "Explain your reasons aloud: '[Word] is the odd one out because...'"
    },
    {
      id: "ex_a2_03",
      title: "Category Word Sort",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Sort these 9 words into the three correct boxes.",
      type: "category_sort",
      categories: ["Jobs & Careers", "Feelings & Moods", "School Life"],
      items: [
        { word: "colleague", category: "Jobs & Careers" },
        { word: "apply for", category: "Jobs & Careers" },
        { word: "salary", category: "Jobs & Careers" },
        { word: "exhausted", category: "Feelings & Moods" },
        { word: "motivated", category: "Feelings & Moods" },
        { word: "proud", category: "Feelings & Moods" },
        { word: "deadline", category: "School Life" },
        { word: "revise", category: "School Life" },
        { word: "grades", category: "School Life" }
      ],
      spokenOutput: "Read the sorted words in complete sentences: 'A colleague belongs to jobs because...'"
    },
    {
      id: "ex_a2_04",
      title: "School Words Gap-Fill",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Choose the correct school word to complete each sentence.",
      type: "gap_fill_select",
      wordBank: ["grades", "deadline", "revise", "fail", "pass", "homework"],
      items: [
        {
          id: "gf1",
          sentence: "I need to ___ for two hours tonight before the big English test.",
          correct: "revise",
          options: ["revise", "fail", "grades"]
        },
        {
          id: "gf2",
          sentence: "Don't forget that the project ___ is Friday at 4:00 PM.",
          correct: "deadline",
          options: ["homework", "deadline", "pass"]
        },
        {
          id: "gf3",
          sentence: "If you study consistently, you will easily ___ the exam.",
          correct: "pass",
          options: ["pass", "fail", "revise"]
        },
        {
          id: "gf4",
          sentence: "She was proud because she received excellent ___ on her report card.",
          correct: "grades",
          options: ["grades", "deadline", "homework"]
        },
        {
          id: "gf5",
          sentence: "I have too much ___ tonight and no time to play games.",
          correct: "homework",
          options: ["homework", "pass", "grades"]
        },
        {
          id: "gf6",
          sentence: "Don't be scared to ___; making mistakes helps you learn.",
          correct: "fail",
          options: ["fail", "revise", "deadline"]
        }
      ],
      spokenOutput: "Read all six completed sentences clearly to your partner."
    },
    {
      id: "ex_a2_05",
      title: "Emoji to Vocabulary Quiz",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Choose the vocabulary word that matches the emoji feeling or action.",
      type: "multiple_choice",
      items: [
        {
          id: "em1",
          prompt: "Emoji: 😴 💤 (Zero energy left after studying all night)",
          options: ["exhausted", "confident", "creative", "ambitious"],
          correct: "exhausted",
          rationale: "😴 represents being extremely tired, which means 'exhausted'."
        },
        {
          id: "em2",
          prompt: "Emoji: 🎨 💡 (Thinking of brand new ideas and designs)",
          options: ["creative", "stressed", "disappointed", "boss"],
          correct: "creative",
          rationale: "🎨 and 💡 represent making original art and ideas, meaning 'creative'."
        },
        {
          id: "em3",
          prompt: "Emoji: 🏆 ⭐ (Feeling happy about your big achievement)",
          options: ["proud", "overwhelmed", "freelance", "salary"],
          correct: "proud",
          rationale: "🏆 shows winning or succeeding, which makes you feel 'proud'."
        },
        {
          id: "em4",
          prompt: "Emoji: 💼 🤝 (Formal meeting where they ask you questions for a job)",
          options: ["interview", "homework", "scholarship", "burnout"],
          correct: "interview",
          rationale: "💼 and 🤝 represent a professional meeting to hire someone: an 'interview'."
        },
        {
          id: "em5",
          prompt: "Emoji: 🏠 💻 (Doing your job from your bedroom on a laptop)",
          options: ["remote working", "revise", "compete", "resign"],
          correct: "remote working",
          rationale: "Working from home on a computer is 'remote working'."
        }
      ],
      spokenOutput: "Make a sentence using 2 of the words and say it aloud."
    },
    {
      id: "ex_a2_06",
      title: "Find Someone Who... Speaking Grid",
      level: "A2",
      category: "Speaking Lab",
      instruction: "Ask your classmates these questions and write their names.",
      type: "speaking_grid",
      items: [
        { q: "Find someone who wants a creative dream job.", prompt: "Ask: 'Do you want a creative dream job?'" },
        { q: "Find someone who feels stressed before math exams.", prompt: "Ask: 'Do you feel stressed before math exams?'" },
        { q: "Find someone who wants to try remote working in the future.", prompt: "Ask: 'Would you like to do remote working?'" },
        { q: "Find someone who has a good balance between study and hobbies.", prompt: "Ask: 'Do you have a good study-life balance?'" },
        { q: "Find someone who prefers studying in total silence.", prompt: "Ask: 'Do you revise in silence or with music?'" },
        { q: "Find someone who wants to be an entrepreneur.", prompt: "Ask: 'Do you want to start your own business?'" }
      ],
      spokenOutput: "Stand up or talk to 3 classmates. Report one interesting answer to the class: 'Maria wants to be an entrepreneur because...'"
    },
    {
      id: "ex_a2_07",
      title: "Job Skills Match",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Match each job title to the most important skill needed.",
      type: "matching",
      items: [
        { id: "js1", term: "Game Developer", match: "Strong coding skills and creative imagination." },
        { id: "js2", term: "Doctor / Surgeon", match: "Staying calm under pressure and scientific knowledge." },
        { id: "js3", term: "Chef", match: "Cooking delicious food quickly in a hot kitchen." },
        { id: "js4", term: "Journalist", match: "Asking great interview questions and writing clearly." },
        { id: "js5", term: "Tour Guide", match: "Friendly speaking skills and knowing city history." }
      ],
      spokenOutput: "Tell your partner: 'To be a game developer, you have to have...'"
    },
    {
      id: "ex_a2_08",
      title: "School Situations & Feelings",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Choose the best adjective for each student situation.",
      type: "multiple_choice",
      items: [
        {
          id: "sf1",
          prompt: "Sara studied for three weeks and got an A+ on her history exam.",
          options: ["proud", "disappointed", "exhausted", "boss"],
          correct: "proud",
          rationale: "Getting top marks after hard work makes you feel proud."
        },
        {
          id: "sf2",
          prompt: "Tom has two tests tomorrow and has not started revising yet.",
          options: ["stressed", "creative", "confident", "rewarding"],
          correct: "stressed",
          rationale: "Having tests with no preparation makes a student feel stressed."
        },
        {
          id: "sf3",
          prompt: "Elena loves her science teacher because lessons are fun and exciting.",
          options: ["motivated", "overwhelmed", "exhausted", "burnout"],
          correct: "motivated",
          rationale: "An exciting teacher makes students feel motivated to learn."
        },
        {
          id: "sf4",
          prompt: "Alex practiced his presentation ten times and knows every word.",
          options: ["confident", "disappointed", "stressed", "workload"],
          correct: "confident",
          rationale: "Practicing thoroughly makes you feel confident."
        }
      ],
      spokenOutput: "Say: 'When I get a good mark, I feel proud because...'"
    },
    {
      id: "ex_a2_09",
      title: "True or False Vocabulary Check",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Read each sentence. Decide if the statement is True or False.",
      type: "true_false",
      items: [
        {
          id: "tf1",
          statement: "A 'colleague' is the person who gives you homework at school.",
          correct: false,
          rationale: "False. A colleague is a person you work with at a job; a teacher gives homework."
        },
        {
          id: "tf2",
          statement: "A 'deadline' is the exact time when your project must be finished.",
          correct: true,
          rationale: "True. A deadline is the final due date or time."
        },
        {
          id: "tf3",
          statement: "To 'earn' a salary means you give money to your boss.",
          correct: false,
          rationale: "False. To earn means to receive money in return for your work."
        },
        {
          id: "tf4",
          statement: "When you 'revise', you study your notes before an exam.",
          correct: true,
          rationale: "True. Revising means reviewing school material."
        },
        {
          id: "tf5",
          statement: "An 'entrepreneur' is a person who starts their own business.",
          correct: true,
          rationale: "True. An entrepreneur creates a business or company."
        }
      ],
      spokenOutput: "Correct the false sentences out loud with your partner."
    },
    {
      id: "ex_a2_10",
      title: "Sentence Builder Tiles",
      level: "A2",
      category: "Vocabulary Gym",
      instruction: "Put the words in order to make a correct English sentence.",
      type: "unscramble",
      items: [
        {
          id: "sb1",
          scrambled: ["wants", "She", "to", "apply", "for", "a", "job", "summer"],
          correct: "She wants to apply for a summer job",
          spoken: "She wants to apply for a summer job."
        },
        {
          id: "sb2",
          scrambled: ["must", "Students", "meet", "project", "the", "deadline"],
          correct: "Students must meet the project deadline",
          spoken: "Students must meet the project deadline."
        },
        {
          id: "sb3",
          scrambled: ["makes", "me", "Creative", "work", "motivated", "feel"],
          correct: "Creative work makes me feel motivated",
          spoken: "Creative work makes me feel motivated."
        }
      ],
      spokenOutput: "Say the completed sentences aloud with natural rhythm."
    },

    // --- B1 EXERCISES (11-20) ---
    {
      id: "ex_b1_01",
      title: "Strong Collocations Match",
      level: "B1",
      category: "Vocabulary Gym",
      instruction: "Match each verb on the left to its natural partner noun.",
      type: "matching",
      items: [
        { id: "col1", term: "meet", match: "a tight deadline" },
        { id: "col2", term: "apply for", match: "a dream job" },
        { id: "col3", term: "earn", match: "a decent salary" },
        { id: "col4", term: "take / sit", match: "an important exam" },
        { id: "col5", term: "win", match: "a university scholarship" },
        { id: "col6", term: "balance", match: "workload and free time" },
        { id: "col7", term: "suffer from", match: "academic burnout" }
      ],
      spokenOutput: "Create two original sentences using two collocations and share with your partner."
    },
    {
      id: "ex_b1_02",
      title: "Word Formation Challenge",
      level: "B1",
      category: "Vocabulary Gym",
      instruction: "Complete each sentence with the correct form of the root word.",
      type: "gap_fill_select",
      items: [
        {
          id: "wf1",
          sentence: "The company plans to ___ (EMPLOY) fifty new programmers.",
          options: ["employ", "employer", "employee", "employment"],
          correct: "employ",
          rationale: "We need the base verb after 'plans to': 'employ'."
        },
        {
          id: "wf2",
          sentence: "A good ___ (EMPLOY) treats their staff with respect.",
          options: ["employer", "employee", "employ", "employment"],
          correct: "employer",
          rationale: "'Employer' means the boss or company owner."
        },
        {
          id: "wf3",
          sentence: "You need official ___ (QUALIFY) to work as an airline pilot.",
          options: ["qualifications", "qualify", "qualified", "qualifying"],
          correct: "qualifications",
          rationale: "'Qualifications' is the plural noun for diplomas and certificates."
        },
        {
          id: "wf4",
          sentence: "There is intense ___ (COMPETE) for top university spots.",
          options: ["competition", "compete", "competitor", "competitive"],
          correct: "competition",
          rationale: "'Competition' is the noun describing the contest between people."
        },
        {
          id: "wf5",
          sentence: "High family ___ (EXPECT) can make students feel anxious.",
          options: ["expectations", "expect", "expected", "expecting"],
          correct: "expectations",
          rationale: "'Expectations' is the noun for hopes and beliefs about success."
        }
      ],
      spokenOutput: "Say all sentences with correct stress: em-PLOY-er, com-pe-TI-tion, ex-pec-TA-tions."
    },
    {
      id: "ex_b1_03",
      title: "Second Conditional Unscramble",
      level: "B1",
      category: "Vocabulary Gym",
      instruction: "Unscramble these hypothetical sentences.",
      type: "unscramble",
      items: [
        {
          id: "sc1",
          scrambled: ["If", "could", "be", "anyone,", "I", "I'd", "be", "a", "game", "designer"],
          correct: "If I could be anyone, I'd be a game designer",
          spoken: "If I could be anyone, I'd be a game designer."
        },
        {
          id: "sc2",
          scrambled: ["If", "I", "had", "more", "time,", "I", "would", "not", "feel", "stressed"],
          correct: "If I had more time, I would not feel stressed",
          spoken: "If I had more time, I would not feel stressed."
        },
        {
          id: "sc3",
          scrambled: ["What", "would", "you", "do", "if", "you", "won", "a", "scholarship?"],
          correct: "What would you do if you won a scholarship?",
          spoken: "What would you do if you won a scholarship?"
        }
      ],
      spokenOutput: "Answer question 3 out loud: 'If I won a scholarship, I would...'"
    },
    {
      id: "ex_b1_04",
      title: "Mini-Dialogue: Job Interview Prep",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Fill in the blanks to complete this summer job interview dialogue.",
      type: "gap_fill_select",
      items: [
        {
          id: "md1_1",
          sentence: "Interviewer: Welcome! Why did you ___ for this camp leader role?",
          options: ["apply", "resign", "promote", "fail"],
          correct: "apply",
          rationale: "You 'apply for' a job position."
        },
        {
          id: "md1_2",
          sentence: "Candidate: Because I have strong communication ___ and I love working with kids.",
          options: ["skills", "salary", "deadline", "burnout"],
          correct: "skills",
          rationale: "'Skills' are personal abilities you use at work."
        },
        {
          id: "md1_3",
          sentence: "Interviewer: Great. Do you have any previous ___ leading sports activities?",
          options: ["experience", "grades", "homework", "scholarship"],
          correct: "experience",
          rationale: "'Experience' refers to past practice in the field."
        },
        {
          id: "md1_4",
          sentence: "Candidate: Yes, I am very ___ and I organized our school soccer club.",
          options: ["motivated", "exhausted", "disappointed", "overwhelmed"],
          correct: "motivated",
          rationale: "'Motivated' describes an enthusiastic, hard-working attitude."
        }
      ],
      spokenOutput: "Act out this interview with a partner. Switch roles and practice again!"
    },
    {
      id: "ex_b1_05",
      title: "Mini-Dialogue: Helping a Stressed Friend",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Choose the best advice phrases to comfort an overwhelmed classmate.",
      type: "gap_fill_select",
      items: [
        {
          id: "md2_1",
          sentence: "Sam: I feel totally ___ by four homework deadlines this week!",
          options: ["overwhelmed", "ambitious", "freelance", "promoted"],
          correct: "overwhelmed",
          rationale: "'Overwhelmed' means having too much pressure to cope with."
        },
        {
          id: "md2_2",
          sentence: "Emma: Don't panic. You ___ make a list and do one small task at a time.",
          options: ["should", "must to", "would like", "enough"],
          correct: "should",
          rationale: "'Should' is used to give friendly advice."
        },
        {
          id: "md2_3",
          sentence: "Sam: My parents have such high ___ for my grades.",
          options: ["expectations", "interview", "salary", "colleague"],
          correct: "expectations",
          rationale: "'Expectations' are hopes and standards set by others."
        },
        {
          id: "md2_4",
          sentence: "Emma: Remember that your ___ health is more important than a single test.",
          options: ["mental", "remote", "boss", "creative"],
          correct: "mental",
          rationale: "'Mental health' is your psychological and emotional well-being."
        }
      ],
      spokenOutput: "Read the dialogue with emotion. Show empathy in your voice!"
    },
    {
      id: "ex_b1_06",
      title: "Role-Play Card: The Teen App Tester",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Work in pairs. Role-play this interview using the goal cards.",
      type: "role_play_card",
      roleA: {
        title: "Role A: Teen Applicant",
        prompt: "You are applying to be a beta tester for a new mobile game studio.",
        goals: ["Explain your gaming experience.", "Mention 2 creative skills (attention to detail, English).", "Ask about working hours and remote working."],
        phraseBank: ["I'd like to apply because...", "I have experience with...", "Could I ask about...?"]
      },
      roleB: {
        title: "Role B: Studio Manager",
        prompt: "You are hiring a reliable teenager to test game levels for bugs.",
        goals: ["Ask why they want this dream job.", "Check how they handle deadlines.", "Offer a 10-hour/week freelance contract."],
        phraseBank: ["What makes you suitable for...?", "How do you manage deadlines?", "We are looking for someone who..."]
      },
      spokenOutput: "Perform a 2-minute interview. Record your score for confidence!"
    },
    {
      id: "ex_b1_07",
      title: "Role-Play Card: Academic Pressure Check",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Role-play a conversation during lunch break between two friends.",
      type: "role_play_card",
      roleA: {
        title: "Role A: Stressed Student",
        prompt: "You slept 4 hours last night revising for Chemistry and feel exhausted.",
        goals: ["Explain your heavy workload.", "Express fear of disappointing your parents.", "Ask your friend for advice."],
        phraseBank: ["I'm completely exhausted because...", "My parents expect me to...", "What should I do?"]
      },
      roleB: {
        title: "Role B: Supportive Friend",
        prompt: "You notice your friend is stressed and want to help them find balance.",
        goals: ["Listen actively.", "Give 2 pieces of practical advice (sleep, Pomodoro).", "Remind them that one bad grade is not the end of the world."],
        phraseBank: ["You shouldn't push yourself so hard.", "Why don't you try...?", "Your mental health comes first."]
      },
      spokenOutput: "Perform the role-play. Use supportive tone and warm body language."
    },
    {
      id: "ex_b1_08",
      title: "Role-Play Card: The Deadline Negotiation",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Role-play a polite negotiation between a freelance designer and client.",
      type: "role_play_card",
      roleA: {
        title: "Role A: Freelance Graphic Designer",
        prompt: "You have school exams and need 3 extra days to finish the client's logo.",
        goals: ["Apologize politely.", "Explain your exam pressure.", "Offer a revised deadline with high quality."],
        phraseBank: ["I am contacting you regarding the deadline...", "Due to unexpected exam commitments...", "I can deliver the final design by..."]
      },
      roleB: {
        title: "Role B: Client / Small Business Owner",
        prompt: "You need the logo for your website launch next Monday.",
        goals: ["Explain why the deadline is important.", "Ask to see the draft design now.", "Agree on a fair compromise."],
        phraseBank: ["We were expecting it on Friday...", "Can you send a draft first?", "If you guarantee top quality by Monday, we can accept."]
      },
      spokenOutput: "Speak politely using formal modal verbs: 'Could we possibly...?'"
    },
    {
      id: "ex_b1_09",
      title: "Would You Rather...? Career Edition",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Pick your choice for each card and give a 30-second justification.",
      type: "would_you_rather",
      items: [
        {
          id: "wyr_c1",
          optionA: "Earn $100,000/year at a boring desk job with a strict boss",
          optionB: "Earn $40,000/year doing your creative dream job with remote working",
          promptFrame: "I would definitely choose [A/B] because doing what I love is... / having financial security allows me to..."
        },
        {
          id: "wyr_c2",
          optionA: "Be a famous entrepreneur with zero free time and high pressure",
          optionB: "Be an average employee with 35-hour work weeks and total balance",
          promptFrame: "I'd prefer to be [A/B] because burnout is... / ambition drives me to..."
        }
      ],
      spokenOutput: "Stand in pairs. Partner A defends Option A; Partner B defends Option B for 1 minute."
    },
    {
      id: "ex_b1_10",
      title: "Would You Rather...? School Edition",
      level: "B1",
      category: "Speaking Lab",
      instruction: "Pick your choice for each school dilemma and justify your choice.",
      type: "would_you_rather",
      items: [
        {
          id: "wyr_s1",
          optionA: "Have zero homework forever, but school lasts until 5:00 PM every day",
          optionB: "Finish school at 1:30 PM, but have 2 hours of homework every night",
          promptFrame: "I would choose [A/B] because I like having free evenings... / I prefer finishing everything at school..."
        },
        {
          id: "wyr_s2",
          optionA: "Get straight A+ grades with 4 hours of sleep and high stress",
          optionB: "Get B grades with 8 hours of sleep and great mental health",
          promptFrame: "I would rather get [A/B] because grades don't define... / passing with top marks is essential for..."
        }
      ],
      spokenOutput: "Vote as a class and debate the winning choices!"
    },

    // --- B2 EXERCISES (21-28) ---
    {
      id: "ex_b2_01",
      title: "Work & Study Idioms Match",
      level: "B2",
      category: "Vocabulary Gym",
      instruction: "Match each English idiom to its true meaning.",
      type: "matching",
      items: [
        { id: "id1", term: "burn the midnight oil", match: "Study or work late into the night." },
        { id: "id2", term: "learn the ropes", match: "Learn how to do a new job or task." },
        { id: "id3", term: "get the hang of it", match: "Begin to understand how to do something well." },
        { id: "id4", term: "hit the books", match: "Start studying hard with your textbooks." },
        { id: "id5", term: "bite off more than you can chew", match: "Take on a task that is too big or difficult for you." }
      ],
      spokenOutput: "Use one idiom in a sentence about your own school life: 'Last week, I had to burn the midnight oil because...'"
    },
    {
      id: "ex_b2_02",
      title: "Phrasal Verbs in Context",
      level: "B2",
      category: "Vocabulary Gym",
      instruction: "Choose the correct phrasal verb to complete each sentence.",
      type: "multiple_choice",
      items: [
        {
          id: "pv1",
          prompt: "Don't ___ on your dream job just because the interview was difficult.",
          options: ["give up", "take on", "figure out", "burn out"],
          correct: "give up",
          rationale: "'Give up' means to stop trying or quit."
        },
        {
          id: "pv2",
          prompt: "If you ___ too many projects at once, you will suffer from exhaustion.",
          options: ["take on", "give up", "get ahead", "figure out"],
          correct: "take on",
          rationale: "'Take on' means to accept new responsibilities or work."
        },
        {
          id: "pv3",
          prompt: "It took me two hours to ___ how to solve that complex math problem.",
          options: ["figure out", "burn out", "give up", "take on"],
          correct: "figure out",
          rationale: "'Figure out' means to understand or find the solution to a problem."
        },
        {
          id: "pv4",
          prompt: "Students who work 14 hours every day often ___ before final exams.",
          options: ["burn out", "get ahead", "take on", "give up"],
          correct: "burn out",
          rationale: "'Burn out' means to become completely exhausted from overwork."
        },
        {
          id: "pv5",
          prompt: "Learning digital skills is the best way to ___ in the modern job market.",
          options: ["get ahead", "burn out", "give up", "figure out"],
          correct: "get ahead",
          rationale: "'Get ahead' means to become more successful in your career."
        }
      ],
      spokenOutput: "Say all five phrasal verbs in your own examples to your partner."
    },
    {
      id: "ex_b2_03",
      title: "Nuance Sort: Positive vs Negative Traits",
      level: "B2",
      category: "Vocabulary Gym",
      instruction: "Classify these personality words into Positive / Healthy or Negative / Toxic.",
      type: "category_sort",
      categories: ["Positive / Healthy", "Negative / Toxic"],
      items: [
        { word: "ambitious (wants success fairly)", category: "Positive / Healthy" },
        { word: "pushy (forces others aggressively)", category: "Negative / Toxic" },
        { word: "confident (believes in self politely)", category: "Positive / Healthy" },
        { word: "arrogant (thinks they are better than all)", category: "Negative / Toxic" },
        { word: "motivated (eager to learn)", category: "Positive / Healthy" },
        { word: "perfectionist (anxious over tiny errors)", category: "Negative / Toxic" }
      ],
      spokenOutput: "Compare: 'Being ambitious is healthy, but being pushy hurts your colleagues.'"
    },
    {
      id: "ex_b2_04",
      title: "Debate Duel: AI & Creative Careers",
      level: "B2",
      category: "Speaking Lab",
      instruction: "Prepare 2 arguments for your assigned side of the motion.",
      type: "debate_motion",
      motion: "Motion: Artificial Intelligence will replace 50% of creative dream jobs before 2035.",
      sideA: {
        team: "Proposition (Agree)",
        points: ["AI generates images, songs, and code in 5 seconds for free.", "Companies want to cut salary costs and hire fewer humans."]
      },
      sideB: {
        team: "Opposition (Disagree)",
        points: ["AI lacks genuine human emotion, lived experience, and originality.", "People value art made by real humans with a personal story."]
      },
      speakingFrame: "While AI is becoming more powerful, I argue that... because...",
      spokenOutput: "Hold a 3-minute debate duel in pairs with 1-minute speaking turns!"
    },
    {
      id: "ex_b2_05",
      title: "Debate Duel: Banning Standardized Exams",
      level: "B2",
      category: "Speaking Lab",
      instruction: "Read the debate points and present your team's opening statement.",
      type: "debate_motion",
      motion: "Motion: Standardized exams harm student mental health and should be replaced with project portfolios.",
      sideA: {
        team: "Proposition (Ban Exams)",
        points: ["Exams measure memorization under panic, not real-world intelligence.", "High stakes cause teen burnout, sleep loss, and panic attacks."]
      },
      sideB: {
        team: "Opposition (Keep Exams)",
        points: ["Exams provide an equal, objective standard for every student.", "Portfolio grading can be subjective and easily done by AI or private tutors."]
      },
      speakingFrame: "The primary purpose of education is... Therefore, exams should/should not...",
      spokenOutput: "Deliver your 60-second speech to the class with confident eye contact."
    },
    {
      id: "ex_b2_06",
      title: "Debate Duel: Mandatory Teen Part-Time Jobs",
      level: "B2",
      category: "Speaking Lab",
      instruction: "Formulate your position and defend it with concrete examples.",
      type: "debate_motion",
      motion: "Motion: Every teenager should be required to work a part-time job before finishing high school.",
      sideA: {
        team: "Proposition (Support)",
        points: ["Teaches money management, punctuality, and real workplace skills.", "Builds empathy for workers in service industries."]
      },
      sideB: {
        team: "Opposition (Reject)",
        points: ["Adds extra workload on top of school pressure and homework.", "Not all teens have access to safe or flexible employment."]
      },
      speakingFrame: "In my view, experiencing the workplace as a teenager is... however...",
      spokenOutput: "Pair up and challenge your partner's strongest point."
    },
    {
      id: "ex_b2_07",
      title: "Taboo Speaking Cards: Deck A",
      level: "B2",
      category: "Speaking Lab",
      instruction: "Describe the secret word to your partner WITHOUT saying the 3 taboo words!",
      type: "taboo_cards",
      cards: [
        {
          secretWord: "BOSS",
          tabooWords: ["Manager", "Company", "Leader"],
          hint: "The person in charge of you at work."
        },
        {
          secretWord: "DEADLINE",
          tabooWords: ["Time", "Finish", "Late"],
          hint: "The exact date when work must be submitted."
        },
        {
          secretWord: "SALARY",
          tabooWords: ["Money", "Month", "Paid"],
          hint: "The earnings you receive for your job."
        },
        {
          secretWord: "HOMEWORK",
          tabooWords: ["School", "Teacher", "House"],
          hint: "Assignments you complete after classes."
        }
      ],
      spokenOutput: "Set a 60-second timer. How many cards can your partner guess?"
    },
    {
      id: "ex_b2_08",
      title: "Taboo Speaking Cards: Deck B",
      level: "B2",
      category: "Speaking Lab",
      instruction: "Describe the advanced word WITHOUT using any of the 3 forbidden words.",
      type: "taboo_cards",
      cards: [
        {
          secretWord: "ENTREPRENEUR",
          tabooWords: ["Business", "Start", "Money"],
          hint: "Someone who launches their own commercial venture."
        },
        {
          secretWord: "BURNOUT",
          tabooWords: ["Tired", "Work", "Exhausted"],
          hint: "Severe physical and emotional collapse from constant strain."
        },
        {
          secretWord: "SCHOLARSHIP",
          tabooWords: ["University", "Free", "Win"],
          hint: "Financial award for high academic or sporting merit."
        },
        {
          secretWord: "FREELANCE",
          tabooWords: ["Home", "Boss", "Contract"],
          hint: "Working for multiple clients on your own terms."
        }
      ],
      spokenOutput: "Try describing Deck B in under 2 minutes with zero taboo slips!"
    }
  ],

  // Exactly 5 Compact Grammar Notes
  grammarNotes: [
    {
      id: "gram_01",
      title: "want to / would like to + Verb",
      topic: "Dream Jobs & Ambitions",
      form: "Subject + want(s) to + base verb\nSubject + would ('d) like to + base verb",
      notes: "'Want to' is direct and common. 'Would like to' is more polite and hypothetical. Always use the infinitive with 'to'.",
      examples: [
        "I want to apply for a creative summer internship.",
        "She would like to work remotely as a freelance graphic designer.",
        "We'd love to start our own tech company one day."
      ],
      teenMistake: {
        wrong: "I would like to working in a game studio.",
        right: "I would like to work in a game studio.",
        why: "Do NOT use -ing after 'would like to'. Use the base verb."
      },
      practice: [
        {
          q: "My brother ___ (want / be) an architect.",
          options: ["wants to be", "wants being", "would like be"],
          correct: "wants to be"
        },
        {
          q: "I ___ (would like / apply) for that scholarship.",
          options: ["would like to apply", "would like applying", "want apply"],
          correct: "would like to apply"
        },
        {
          q: "Do you ___ (want / work) for a big company?",
          options: ["want to work", "want working", "would like work"],
          correct: "want to work"
        }
      ]
    },
    {
      id: "gram_02",
      title: "Second Conditional for Imagined Situations",
      topic: "Hypothetical Scenarios & Dreams",
      form: "If + past simple, ... would / could + base verb\n(If I were/had..., I would do...)",
      notes: "Use the Second Conditional for unreal or imaginary situations in the present or future.",
      examples: [
        "If I could choose any career, I would be a marine biologist.",
        "If we had less homework, we would get more sleep.",
        "What would you do if your phone picked your career?"
      ],
      teenMistake: {
        wrong: "If I will have more time, I would revise properly.",
        right: "If I had more time, I would revise properly.",
        why: "Do NOT use 'will' or 'would' in the 'If' clause. Use the past simple."
      },
      practice: [
        {
          q: "If I ___ (have) zero exams, I would feel much happier.",
          options: ["had", "have", "would have"],
          correct: "had"
        },
        {
          q: "If you won a scholarship, where ___ you ___ (study)?",
          options: ["would / study", "will / study", "did / study"],
          correct: "would / study"
        },
        {
          q: "She ___ (resign) if her boss was unfair.",
          options: ["would resign", "will resign", "resigned"],
          correct: "would resign"
        }
      ]
    },
    {
      id: "gram_03",
      title: "Modals of Obligation & Advice (have to, must, should)",
      topic: "School Rules & Managing Pressure",
      form: "Obligation: have to / must + base verb\nAdvice: should / shouldn't + base verb\nNo obligation: don't have to + base verb",
      notes: "'Must' and 'have to' express necessary rules. 'Should' gives friendly recommendations. 'Don't have to' means it is optional.",
      examples: [
        "Students must submit the project before the 5 PM deadline.",
        "You don't have to get 100% on every test to have a successful life.",
        "You should take a 10-minute break when you feel overwhelmed."
      ],
      teenMistake: {
        wrong: "You must to revise your notes tonight.",
        right: "You must revise your notes tonight.",
        why: "'Must' and 'should' are modal verbs: follow them directly with the base verb (NO 'to')."
      },
      practice: [
        {
          q: "You ___ (not have to / panic); there is still time to prepare.",
          options: ["don't have to panic", "mustn't to panic", "shouldn't to panic"],
          correct: "don't have to panic"
        },
        {
          q: "Teenagers ___ (should / get) at least 8 hours of sleep.",
          options: ["should get", "should to get", "must to get"],
          correct: "should get"
        },
        {
          q: "We ___ (have to / wear) our school uniform during exams.",
          options: ["have to wear", "must to wear", "should wearing"],
          correct: "have to wear"
        }
      ]
    },
    {
      id: "gram_04",
      title: "Quantifiers: too + noun vs (not) enough",
      topic: "Workload & Life Balance",
      form: "too much + uncountable noun (too much homework / stress)\ntoo many + plural countable noun (too many exams)\n(not) enough + noun / adjective + enough",
      notes: "'Too' means more than is good or safe. 'Enough' means the correct or necessary amount.",
      examples: [
        "I have too much homework and too many deadlines this week.",
        "There is not enough time to revise everything in one evening.",
        "Make sure you are confident enough before entering the interview."
      ],
      teenMistake: {
        wrong: "Our teacher gave us too many homework yesterday.",
        right: "Our teacher gave us too much homework yesterday.",
        why: "'Homework' is an uncountable noun in English. Use 'too much', not 'too many'."
      },
      practice: [
        {
          q: "I feel exhausted because I didn't get ___ sleep.",
          options: ["enough", "too much", "too many"],
          correct: "enough"
        },
        {
          q: "There are ___ tests scheduled in one single week.",
          options: ["too many", "too much", "enough not"],
          correct: "too many"
        },
        {
          q: "He didn't have ___ experience to get the senior job.",
          options: ["enough", "too much", "too many"],
          correct: "enough"
        }
      ]
    },
    {
      id: "gram_05",
      title: "Comparatives & Superlatives",
      topic: "Comparing Careers & Subjects",
      form: "Short adj: adj + -er than | the + adj + -est\nLong adj: more + adj + than | the most + adj\nIrregular: good -> better -> the best | bad -> worse -> the worst",
      notes: "Use comparatives to compare 2 things. Use superlatives to compare 1 thing against the whole group.",
      examples: [
        "Physics is more challenging than history for me.",
        "Surgeon is one of the most stressful careers in the world.",
        "Remote working offers better balance than working in an office."
      ],
      teenMistake: {
        wrong: "Being a boss is more better than being an employee.",
        right: "Being a boss is much better than being an employee.",
        why: "'Better' is already comparative. Never say 'more better' or 'more easier'."
      },
      practice: [
        {
          q: "Is being an entrepreneur ___ (stressful) than having a normal job?",
          options: ["more stressful", "most stressful", "stressfuller"],
          correct: "more stressful"
        },
        {
          q: "What is the ___ (rewarding) experience you have ever had?",
          options: ["most rewarding", "more rewarding", "rewardingest"],
          correct: "most rewarding"
        },
        {
          q: "My exam results were ___ (good) than I expected.",
          options: ["better", "more good", "best"],
          correct: "better"
        }
      ]
    }
  ],

  // Exactly 3 Leveled Reading Texts + Tasks
  readingZone: [
    // Text A (A2+)
    {
      id: "text_a",
      title: "My Weird Dream Job: Virtual World Builder",
      level: "A2+",
      wordCount: 182,
      topic: "Dream Jobs & Careers",
      passage: `Hi everyone! I am Leo, a 16-year-old student from Manchester. When people ask about my dream job, they expect me to say doctor, pilot, or lawyer. But I want to become a full-time virtual [existing inside a computer] world builder.

For the past two years, I have worked as a freelance [working independently for different clients] creator in my bedroom. I design 3D islands, houses, and obstacle courses for online games. Last month, a gaming studio hired me to build a fantasy castle for their new adventure game. I earned a great salary [money you get for working] for two weeks of work!

To do this career, you need creative skills and strong imagination. You also must meet strict deadlines [the final date to finish work]. Sometimes I feel exhausted after coding for five hours, but seeing thousands of players explore my digital world is extremely rewarding. My parents were worried about my screen time at first, but now they are proud of my ambitions. I hope to launch my own game studio by 2030!`,
      glossary: [
        { word: "virtual", meaning: "existing inside a computer or online, not in the physical world" },
        { word: "freelance", meaning: "working independently for different clients rather than for one company" },
        { word: "salary", meaning: "money you earn for doing work" },
        { word: "deadlines", meaning: "the final date or time when work must be finished" }
      ],
      task1: {
        title: "Task 1: True or False",
        type: "true_false",
        items: [
          { id: "ta_tf1", q: "Leo wants to become a medical doctor in the future.", correct: false, rationale: "False. Leo wants to become a full-time virtual world builder." },
          { id: "ta_tf2", q: "Leo works as a freelance creator from his bedroom.", correct: true, rationale: "True. The text states he has worked as a freelance creator in his bedroom." },
          { id: "ta_tf3", q: "A game studio hired Leo to design a fantasy castle.", correct: true, rationale: "True. A gaming studio hired him last month to build a fantasy castle." },
          { id: "ta_tf4", q: "Leo thinks building virtual worlds is boring and unrewarding.", correct: false, rationale: "False. He says seeing players explore his world is 'extremely rewarding'." },
          { id: "ta_tf5", q: "Leo's parents were completely happy with his screen time from the start.", correct: false, rationale: "False. His parents were worried about his screen time at first." },
          { id: "ta_tf6", q: "Leo plans to launch his own game studio in the future.", correct: true, rationale: "True. He hopes to launch his own studio by 2030." }
        ]
      },
      task2: {
        title: "Task 2: Match Words to Definitions",
        type: "matching",
        items: [
          { id: "ta_m1", term: "freelance", match: "Working for different clients on your own schedule." },
          { id: "ta_m2", term: "salary", match: "Payment received for completing work." },
          { id: "ta_m3", term: "deadline", match: "The required time to submit finished work." },
          { id: "ta_m4", term: "rewarding", match: "Giving positive feelings of satisfaction." },
          { id: "ta_m5", term: "ambitions", match: "Strong hopes and dreams to achieve success." },
          { id: "ta_m6", term: "skills", match: "Abilities you learn through practice." }
        ]
      }
    },

    // Text B (B1)
    {
      id: "text_b",
      title: "The Great Homework Debate: Leo vs Maya",
      level: "B1",
      wordCount: 228,
      topic: "School & Academic Pressures",
      passage: `Is homework essential for success, or is it ruining teenage mental health? Two high school students share their opposing views.

**Maya (15, Toronto):**
"I believe moderate homework is vital. When we revise [study notes again] class topics at home, we remember the facts better for our exams. Homework also teaches us time management and how to meet deadlines without a teacher standing over us. Of course, when teachers give too much homework on the same night, students feel overwhelmed [unable to cope with pressure]. But the solution is not to ban homework completely; teachers should simply coordinate their workload [amount of work assigned] better so students can keep a healthy balance."

**Leo (16, London):**
"I strongly disagree. High school students spend seven hours sitting at desks, only to come home to three more hours of assignments. This heavy workload leads directly to teen burnout [complete physical and mental exhaustion] and sleep deprivation. Many classmates compete aggressively for top grades and compare their scores every morning, which destroys friendships. We need free evenings for sports, creative hobbies, and spending time with family. Homework should be optional practice, not a compulsory burden that harms our mental health."`,
      glossary: [
        { word: "revise", meaning: "to study your notes and books again before an exam" },
        { word: "overwhelmed", meaning: "feeling unable to cope because you have too many things to do" },
        { word: "workload", meaning: "the amount of work a person has to complete" },
        { word: "burnout", meaning: "complete mental and physical exhaustion caused by constant stress" }
      ],
      task1: {
        title: "Task 1: Multiple Choice Comprehension",
        type: "multiple_choice",
        items: [
          {
            id: "tb_mc1",
            prompt: "What is Maya's main argument in favour of homework?",
            options: [
              "It helps students remember material and practice time management.",
              "It allows students to compete for university scholarships.",
              "It completely eliminates all exam stress.",
              "It gives parents more control over teenage lives."
            ],
            correct: "It helps students remember material and practice time management.",
            rationale: "Maya says homework helps students remember facts better and learn to meet deadlines."
          },
          {
            id: "tb_mc2",
            prompt: "According to Maya, what should teachers do to improve homework?",
            options: [
              "Coordinate workload so students are not given too much on the same day.",
              "Ban all homework during weekends only.",
              "Pay students a salary for finishing assignments.",
              "Replace all tests with video games."
            ],
            correct: "Coordinate workload so students are not given too much on the same day.",
            rationale: "Maya suggests teachers should coordinate workload better to maintain balance."
          },
          {
            id: "tb_mc3",
            prompt: "Why does Leo believe homework harms teenagers?",
            options: [
              "It causes burnout, lack of sleep, and reduces family and hobby time.",
              "It costs too much money for school materials.",
              "It prevents students from choosing a dream job.",
              "It makes teachers too exhausted to teach."
            ],
            correct: "It causes burnout, lack of sleep, and reduces family and hobby time.",
            rationale: "Leo points out that 3 hours of homework after 7 hours of school causes burnout and sleep deprivation."
          },
          {
            id: "tb_mc4",
            prompt: "What does Leo suggest doing with homework?",
            options: [
              "Make it optional practice rather than compulsory work.",
              "Double the amount of math homework.",
              "Replace homework with longer school days.",
              "Give grades only based on homework."
            ],
            correct: "Make it optional practice rather than compulsory work.",
            rationale: "Leo concludes: 'Homework should be optional practice, not a compulsory burden'."
          }
        ]
      },
      task2: {
        title: "Task 2: Which Student Says It?",
        type: "multiple_choice",
        instruction: "Decide whether each statement represents Maya, Leo, or Both.",
        items: [
          { id: "tb_ws1", prompt: "'Doing schoolwork at home teaches students how to meet deadlines independently.'", options: ["Maya", "Leo", "Both"], correct: "Maya", rationale: "Maya mentions homework teaches time management and meeting deadlines." },
          { id: "tb_ws2", prompt: "'Excessive studying after school leads directly to sleep loss and burnout.'", options: ["Maya", "Leo", "Both"], correct: "Leo", rationale: "Leo highlights burnout and sleep deprivation." },
          { id: "tb_ws3", prompt: "'Teen mental health and life balance are important issues for students.'", options: ["Maya", "Leo", "Both"], correct: "Both", rationale: "Both students agree that balance and mental health must be protected." },
          { id: "tb_ws4", prompt: "'Comparing grades every day creates toxic competition between friends.'", options: ["Maya", "Leo", "Both"], correct: "Leo", rationale: "Leo criticizes students who compete and compare scores every morning." },
          { id: "tb_ws5", prompt: "'Teachers should communicate with each other before setting homework.'", options: ["Maya", "Leo", "Both"], correct: "Maya", rationale: "Maya proposes that teachers coordinate workload together." }
        ]
      }
    },

    // Text C (B1+)
    {
      id: "text_c",
      title: "Dear Teen Guide: Overwhelmed by Expectations",
      level: "B1+",
      wordCount: 254,
      topic: "Academic Pressure & Life Balance",
      passage: `**Letter to the Advice Column:**
Dear Dr. Sam,
I am a 17-year-old student preparing for my final school exams. My parents are ambitious [having strong desires for success] and expect me to win a competitive scholarship [free university education grant] for medical school. I study six hours every night after school, but my workload [amount of study] feels impossible. Whenever I get a grade below 90%, I feel like a complete failure. My colleagues [classmates/peers] are competing aggressively for the same university places. Lately, I have felt exhausted, anxious, and overwhelmed [unable to cope]. How can I survive this pressure without burning out?
— *Overwhelmed Olivia*

**Dr. Sam's Reply:**
Dear Olivia,
First, take a deep breath. What you are experiencing is acute academic burnout [severe mental exhaustion], and your feelings are completely valid. High parental expectations [hopes that parents have for your success] often come from love, but they can place an unbearable burden on your shoulders.

Here is my prescription for restoring your balance:
1. **Set Hard Boundaries:** Stop studying at 9:30 PM every night. Your brain needs at least 8 hours of sleep to process information effectively.
2. **Communicate Honestly:** Have a calm conversation with your parents. Explain that constant pressure increases your stress and actually reduces your exam performance.
3. **Redefine Success:** A single exam score does not define your future career or your value as a human being. There are many alternative paths to a rewarding life.

Protect your mental health first; qualifications will naturally follow when your mind is rested.`,
      glossary: [
        { word: "ambitious", meaning: "having a strong desire to achieve power, wealth, or high success" },
        { word: "scholarship", meaning: "financial grant awarded to a student to pay for education" },
        { word: "workload", meaning: "the total amount of work or study assigned" },
        { word: "overwhelmed", meaning: "feeling completely unable to manage excessive demands" },
        { word: "burnout", meaning: "a state of physical and emotional exhaustion caused by chronic stress" },
        { word: "expectations", meaning: "beliefs or hopes that someone will achieve something" }
      ],
      task1: {
        title: "Task 1: Comprehension Check",
        type: "multiple_choice",
        items: [
          {
            id: "tc_c1",
            prompt: "Why is Olivia experiencing severe stress?",
            options: [
              "Her heavy study workload and parents' high expectations for a medical scholarship.",
              "She failed all of her school exams last semester.",
              "Her teachers refused to give her any feedback.",
              "She wants to quit school and become a full-time gamer."
            ],
            correct: "Her heavy study workload and parents' high expectations for a medical scholarship.",
            rationale: "Olivia mentions studying six hours a night to win a scholarship due to high parental expectations."
          },
          {
            id: "tc_c2",
            prompt: "What happens when Olivia scores below 90% on a test?",
            options: [
              "She feels like a complete failure.",
              "Her parents make her change schools.",
              "She immediately takes a holiday.",
              "She asks her friends for help."
            ],
            correct: "She feels like a complete failure.",
            rationale: "Olivia writes: 'Whenever I get a grade below 90%, I feel like a complete failure.'"
          },
          {
            id: "tc_c3",
            prompt: "What is Dr. Sam's first piece of practical advice for Olivia?",
            options: [
              "Stop studying at 9:30 PM and get at least 8 hours of sleep.",
              "Study through the night until 4:00 AM.",
              "Give up on going to university entirely.",
              "Refuse to speak to her parents."
            ],
            correct: "Stop studying at 9:30 PM and get at least 8 hours of sleep.",
            rationale: "Dr. Sam advises setting a boundary to stop studying at 9:30 PM and get 8 hours of sleep."
          },
          {
            id: "tc_c4",
            prompt: "What does Dr. Sam advise Olivia to tell her parents?",
            options: [
              "That high pressure increases stress and lowers actual exam performance.",
              "That she wants them to do her homework for her.",
              "That medical school is too easy for her.",
              "That grades are completely useless in life."
            ],
            correct: "That high pressure increases stress and lowers actual exam performance.",
            rationale: "Dr. Sam suggests explaining that constant pressure actually harms exam performance."
          }
        ]
      },
      task2: {
        title: "Task 2: Vocabulary in Context",
        type: "multiple_choice",
        items: [
          {
            id: "tc_vc1",
            prompt: "In the passage, 'scholarship' most nearly means:",
            options: [
              "free financial money given for university study based on merit",
              "a special classroom inside a medical school",
              "a difficult exam that everyone fails",
              "a book containing medical vocabulary"
            ],
            correct: "free financial money given for university study based on merit",
            rationale: "A scholarship is a grant or fund that pays for a student's education."
          },
          {
            id: "tc_vc2",
            prompt: "The word 'overwhelmed' in paragraph 1 describes someone who:",
            options: [
              "feels unable to cope because demands are too great",
              "feels excited about starting a new project",
              "is proud of getting the highest score in class",
              "wants to travel around the world alone"
            ],
            correct: "feels unable to cope because demands are too great",
            rationale: "'Overwhelmed' means overpowered or burdened by excessive tasks."
          },
          {
            id: "tc_vc3",
            prompt: "What does 'academic burnout' mean in Dr. Sam's reply?",
            options: [
              "severe mental and physical exhaustion caused by constant study stress",
              "fire damage in a school building",
              "forgetting to bring your homework to class",
              "winning an award for science experiments"
            ],
            correct: "severe mental and physical exhaustion caused by constant study stress",
            rationale: "'Burnout' is chronic exhaustion and collapse from overworking."
          },
          {
            id: "tc_vc4",
            prompt: "The phrase 'set hard boundaries' means to:",
            options: [
              "establish clear, strict limits on study time to protect health",
              "build a wall around your school",
              "refuse to take any school exams",
              "study only in the school library"
            ],
            correct: "establish clear, strict limits on study time to protect health",
            rationale: "Setting boundaries means deciding when to stop work to maintain health."
          }
        ]
      },
      task3: {
        title: "Task 3: Inference Question",
        type: "multiple_choice",
        items: [
          {
            id: "tc_inf1",
            prompt: "What can be inferred from Dr. Sam's concluding sentence: 'qualifications will naturally follow when your mind is rested'?",
            options: [
              "Good mental health and rest lead to better academic success than exhausting study habits.",
              "Qualifications do not matter at all for a medical career.",
              "Students should sleep all day and not revise for exams.",
              "Parents are always wrong about career choices."
            ],
            correct: "Good mental health and rest lead to better academic success than exhausting study habits.",
            rationale: "Dr. Sam argues that when a student is mentally healthy and rested, they perform much better and achieve qualifications naturally."
          }
        ]
      }
    }
  ],

  // Can-Do Statements for Self Assessment
  canDoStatements: [
    { id: "can_do_1", text: "I can talk about my dream job and explain why I like it.", topic: "jobs", default: 3 },
    { id: "can_do_2", text: "I can describe job skills and interview qualities in English.", topic: "jobs", default: 3 },
    { id: "can_do_3", text: "I can discuss school pressure, deadlines, and exam stress.", topic: "school", default: 3 },
    { id: "can_do_4", text: "I can use 'would like to' and second conditionals for hypothetical dreams.", topic: "grammar", default: 3 },
    { id: "can_do_5", text: "I can give practical advice to a stressed friend using 'should' and 'have to'.", topic: "speaking", default: 3 }
  ]
};
