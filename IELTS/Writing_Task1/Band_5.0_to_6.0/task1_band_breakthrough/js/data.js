/**
 * IELTS Academic Writing Task 1 - Master Data Module
 * Pure standalone data objects for vocabulary, questions, quiz items, samples, and examiner rubrics.
 */

const IELTS_DATA = {
  // 1. Battlefield Criteria Definitions & Band Comparisons
  criteria: [
    {
      id: "ta",
      name: "Task Achievement",
      weight: "25%",
      icon: "🎯",
      summary: "Did you answer all parts of the question, include a clear overview, and highlight key features?",
      band6: "Presents an overview with some information. Highlights main trends, but some data may be mechanical, inaccurate, or missing key details.",
      band7: "Provides a clear, well-developed overview. Key features are clearly identified, highlighted, and logically illustrated with accurate data.",
      killerTip: "No overview = Hard limit of Band 5 in this criterion."
    },
    {
      id: "cc",
      name: "Coherence & Cohesion",
      weight: "25%",
      icon: "🔗",
      summary: "Is your essay organized into 4 clear paragraphs with smooth, logical transitions?",
      band6: "Organizes information coherently with clear overall progression. Uses cohesive devices, but some may be repetitive, faulty, or mechanical.",
      band7: "Information and ideas are logically sequenced with clear progression throughout. Uses a varied range of cohesive devices seamlessly.",
      killerTip: "Writing one giant paragraph caps Coherence & Cohesion at Band 5."
    },
    {
      id: "lr",
      name: "Lexical Resource",
      weight: "25%",
      icon: "📖",
      summary: "Do you use varied academic vocabulary, precise collocations, and avoid copying the prompt?",
      band6: "Adequate range of vocabulary. Attempts less common vocabulary with some errors in word choice, spelling, or collocation.",
      band7: "Uses a sufficient range of vocabulary with flexibility and precision. Accurately uses less common collocations with rare minor slips.",
      killerTip: "Copying 4+ words from the prompt is ignored by examiners and does not count toward your word count."
    },
    {
      id: "gra",
      name: "Grammatical Range & Accuracy",
      weight: "25%",
      icon: "📐",
      summary: "Do you use a mix of complex sentence structures and produce frequent error-free sentences?",
      band6: "Uses a mix of simple and complex sentence forms. Makes some grammatical and punctuation errors, though meaning remains clear.",
      band7: "Uses a variety of complex structures (passives, relative clauses, adverbials). Produces frequent error-free sentences with strong punctuation control.",
      killerTip: "Using only 'Subject + Verb + Object' sentences will never score above Band 6."
    }
  ],

  // 2. The 6 Question Types
  questionTypes: [
    {
      id: "line",
      title: "Line Graph",
      icon: "📈",
      whatItShows: "Tracks changes, trends, and fluctuations over continuous time intervals (months, years, decades).",
      firstLook: "Look at the starting and ending points of every line, the overall trajectory (up, down, stable), and the highest peak or intersection points.",
      traps: [
        "Describing every single point and year individually (creates an Excel spreadsheet in words).",
        "Using the wrong tense (e.g. using Present tense for past years like 1995–2010).",
        "Confusing 'fluctuated' (repeated ups and downs) with a simple one-time rise or drop."
      ],
      vocab: [
        { term: "experienced an upward trajectory", type: "Collocation", def: "Gradually rose over the duration" },
        { term: "peaked at / reached a zenith of", type: "Verb phrase", def: "Attained the highest recorded value" },
        { term: "plummeted / slumped", type: "Verb", def: "Fell sharply and abruptly" },
        { term: "plateaued / leveled off", type: "Verb", def: "Flattened out after a period of change" },
        { term: "fluctuated between X and Y", type: "Verb", def: "Oscillated repeatedly within a bracket" }
      ]
    },
    {
      id: "bar",
      title: "Bar Chart",
      icon: "📊",
      whatItShows: "Compares quantities, percentages, or frequencies across discrete categories and/or across time periods.",
      firstLook: "Identify the tallest and shortest bars in each category, the overall rank order, and any dramatic contrast between categories.",
      traps: [
        "Describing bar-by-bar without making comparative links between categories.",
        "Confusing absolute numbers with percentages (e.g. 50 people vs 50%).",
        "Failing to group similar categories into cohesive paragraphs."
      ],
      vocab: [
        { term: "outnumbered by a factor of...", type: "Comparison", def: "Was X times greater than" },
        { term: "in stark contrast to", type: "Connector", def: "Showing extreme difference" },
        { term: "accounted for the lion's share", type: "Collocation", def: "Represented the largest portion" },
        { term: "stood at approximately...", type: "Phrase", def: "Recorded a value of around" },
        { term: "ranked as the second highest", type: "Ordering", def: "Followed the leading category" }
      ]
    },
    {
      id: "pie",
      title: "Pie Chart",
      icon: "🥧",
      whatItShows: "Depicts proportions, distributions, and percentages of a single whole (totaling 100%).",
      firstLook: "Spot the largest slice (dominant sector), smallest slice, and any dramatic expansion/contraction between two time periods.",
      traps: [
        "Using trend verbs improperly (e.g. 'the pie chart increased' ❌ -> 'the proportion increased' ✅).",
        "Confusing 'percent' (e.g. 20 percent) with 'percentage' (e.g. the percentage of students).",
        "Forgetting to account for all categories in the data breakdown."
      ],
      vocab: [
        { term: "constituted / comprised", type: "Verb", def: "Formed or made up" },
        { term: "the vast majority of", type: "Quantifier", def: "Over 75-80% of the total" },
        { term: "a negligible fraction", type: "Collocation", def: "A very small percentage (under 5%)" },
        { term: "nearly three-quarters", type: "Fraction", def: "Approx. 73-75%" },
        { term: "made up precisely a fifth", type: "Fraction", def: "Exactly 20%" }
      ]
    },
    {
      id: "table",
      title: "Table",
      icon: "📋",
      whatItShows: "Presents dense numerical facts, figures, and multiple variables categorized into rows and columns.",
      firstLook: "Scan column totals, row averages, the highest number, lowest number, and noticeable anomalies.",
      traps: [
        "Data overwhelm: trying to mention every single figure in the table.",
        "Failing to identify the overarching pattern across rows/columns.",
        "Copying table headers verbatim into the body paragraphs."
      ],
      vocab: [
        { term: "recorded the highest figure for...", type: "Phrase", def: "Achieved the top recorded value" },
        { term: "followed closely by...", type: "Connector", def: "Next in ranking order" },
        { term: "a disparity of [X units]", type: "Noun phrase", def: "A measurable difference between two items" },
        { term: "remained consistently low", type: "Collocation", def: "Showed almost no change at bottom level" }
      ]
    },
    {
      id: "process",
      title: "Process Diagram",
      icon: "🔄",
      whatItShows: "Illustrates the chronological stages of a manufacturing process or natural life cycle.",
      firstLook: "Count the total number of steps, identify the raw input/origin, intermediate transformation stages, and final output.",
      traps: [
        "Using Active Voice (e.g., 'The workers collect the clay' ❌) instead of Passive Voice ('The clay is collected' ✅).",
        "Skipping intermediate steps or losing chronological order.",
        "Adding personal knowledge or explaining *why* a step happens."
      ],
      vocab: [
        { term: "is harvested / is extracted", type: "Passive verb", def: "Raw material gathering" },
        { term: "subsequently undergoes [process]", type: "Sequence", def: "Next operational phase" },
        { term: "is transferred to a facility", type: "Passive verb", def: "Movement between steps" },
        { term: "culminating in the packaging of...", type: "Phrase", def: "Finishing the final product" },
        { term: "prior to being distributed", type: "Preposition", def: "Before the next event" }
      ]
    },
    {
      id: "map",
      title: "Map / Plan",
      icon: "🗺️",
      whatItShows: "Shows geographical, architectural, or urban developments in a location over time (past vs present/future).",
      firstLook: "Spot major additions (new buildings/roads), demolitions (removals), expansions, and changes in land use.",
      traps: [
        "Confusing compass directions (e.g. saying 'in the north' instead of 'to the north of the town').",
        "Using incorrect tenses (e.g. past simple for proposed future plans).",
        "Omitting spatial prepositions (adjacent to, opposite, nestled between)."
      ],
      vocab: [
        { term: "was demolished to make way for...", type: "Passive verb", def: "Torn down to build new structure" },
        { term: "was converted into / repurposed", type: "Passive verb", def: "Function of building changed" },
        { term: "situated directly adjacent to", type: "Preposition", def: "Right next to" },
        { term: "expanded northward", type: "Direction", def: "Grew toward the top of the map" },
        { term: "remained virtually unchanged", type: "Collocation", def: "Preserved without modification" }
      ]
    }
  ],

  // 3. Vocabulary Bank Items
  vocabBank: [
    {
      category: "trend-verbs",
      title: "Trend Verbs & Adverbs",
      items: [
        { phrase: "surge dramatically", type: "Verb + Adv", example: "Internet usage surged dramatically after 2010.", note: "Use for rapid, steep upward movement." },
        { phrase: "climb steadily", type: "Verb + Adv", example: "Car sales climbed steadily throughout the decade.", note: "Use for continuous, smooth growth." },
        { phrase: "plummet abruptly", type: "Verb + Adv", example: "Coal consumption plummeted abruptly in 2020.", note: "Use for sudden, severe collapse." },
        { phrase: "dip marginally", type: "Verb + Adv", example: "Profits dipped marginally by 2% before rebounding.", note: "Use for minor, temporary drop." },
        { phrase: "plateau after an initial rise", type: "Verb phrase", def: "Stayed flat following early increase.", note: "Highlights stabilization." },
        { phrase: "fluctuate wildly", type: "Verb + Adv", example: "Oil prices fluctuated wildly between $40 and $110.", note: "Use when line moves up and down constantly." }
      ]
    },
    {
      category: "noun-forms",
      title: "Grammatical Flexibility: Noun Forms",
      items: [
        { phrase: "experienced a sharp increase", type: "Noun Phrase", example: "The city experienced a sharp increase in visitors.", note: "Better than repeating 'increased sharply'." },
        { phrase: "witnessed a gradual downward trend", type: "Noun Phrase", example: "Manufacturing witnessed a gradual downward trend.", note: "Shows strong Lexical Resource." },
        { phrase: "a substantial drop of 40%", type: "Noun Phrase", example: "There was a substantial drop of 40% in emissions.", note: "Use with 'There was a...' structure." },
        { phrase: "a period of volatility", type: "Noun Phrase", example: "Following a period of volatility, rates stabilized.", note: "Accurate description of uneven graphs." }
      ]
    },
    {
      category: "comparison",
      title: "Comparison & Contrast Language",
      items: [
        { phrase: "whereas / while", type: "Conjunction", example: "Gold production rose in Canada, whereas it fell in Australia.", note: "Creates high-scoring complex sentences." },
        { phrase: "in stark contrast to", type: "Transition", example: "In stark contrast to Country A, Country B saw minimal growth.", note: "Emphasizes opposing data sets." },
        { phrase: "outstripped by a significant margin", type: "Verb phrase", example: "Solar energy outstripped wind by a significant margin.", note: "Much stronger than 'was higher than'." },
        { phrase: "almost three times as high as", type: "Comparison", example: "Spending on housing was almost three times as high as food.", note: "Multiplicative comparison." }
      ]
    },
    {
      category: "approximation",
      title: "Approximation & Estimation",
      items: [
        { phrase: "roughly / approximately", type: "Adverb", example: "Roughly 45% of respondents agreed.", note: "Prevents mechanical copying of raw numbers." },
        { phrase: "just under / just shy of", type: "Phrase", example: "The figure stood at just under 50,000 units.", note: "Use when close to a benchmark line (e.g. 48,900)." },
        { phrase: "slightly in excess of", type: "Phrase", example: "Output was slightly in excess of 100 tonnes.", note: "Use for values slightly above a line (e.g. 103)." },
        { phrase: "in the vicinity of", type: "Phrase", example: "Temperatures hovered in the vicinity of 25°C.", note: "Great for general approximations." }
      ]
    },
    {
      category: "process",
      title: "Process & Passive Voice",
      items: [
        { phrase: "is extracted and transported", type: "Passive", example: "The raw ore is extracted and transported to the refinery.", note: "Grammatical accuracy for manufacturing." },
        { phrase: "subsequently undergoes filtration", type: "Sequence", example: "The liquid subsequently undergoes filtration.", note: "Replaces basic 'Then it is filtered'." },
        { phrase: "culminating in the distribution of", type: "Phase", example: "Culminating in the distribution of finished goods.", note: "Excellent for the final step." }
      ]
    },
    {
      category: "upgrades",
      title: "Band 5 ➔ Band 7 Upgrade Pairs",
      items: [
        { phrase: "shows ➔ illustrates / delineates", type: "Synonym", example: "The chart illustrates data regarding...", note: "Instantly elevates your introduction." },
        { phrase: "went up a lot ➔ surged substantially", type: "Upgrade", example: "Sales surged substantially over the 5-year span.", note: "Removes informal phrasing." },
        { phrase: "big difference ➔ marked disparity", type: "Upgrade", example: "There was a marked disparity between the two age brackets.", note: "Academic register upgrade." },
        { phrase: "and then ➔ following this stage", type: "Upgrade", example: "Following this stage, the bottles are sealed.", note: "Smooth cohesive sequencing." }
      ]
    }
  ],

  // 4. The 7 Deadly Sins
  deadlySins: [
    {
      number: 1,
      sin: "Listing Every Single Number (The Spreadsheet Trap)",
      explanation: "Writing a chronological list of every data point across every year without grouping or summarizing.",
      fix: "Select only the starting points, endpoints, peaks, troughs, and major transitions. Aim for 6–9 meaningful data citations in total."
    },
    {
      number: 2,
      sin: "Missing or Number-Heavy Overview",
      explanation: "Omitting the overview paragraph entirely, or filling it with specific percentages and dates.",
      fix: "Write Paragraph 2 immediately after the introduction. Start with 'Overall, ...', identify 2 macro-trends, and include ZERO numbers."
    },
    {
      number: 3,
      sin: "Inserting Personal Opinions & Speculation",
      explanation: "Writing 'Sales dropped in 2020 because of the pandemic and bad economic management.'",
      fix: "You are an objective reporter. Only state what is visibly displayed in the graph. Never explain the external reasons unless given."
    },
    {
      number: 4,
      sin: "Copying the Prompt Word-for-Word",
      explanation: "Writing 'The line graph below shows the amount of electricity produced in three countries...' verbatim.",
      fix: "Paraphrase using synonyms: 'The line graph illustrates power generation across three nations from 2000 to 2020.'"
    },
    {
      number: 5,
      sin: "Wrong Tenses for Time Periods",
      explanation: "Using Present Simple for data from 1990–2010, or using Past Simple for future 2035 projections.",
      fix: "Past years = Past Simple (rose, dropped). Future dates = 'is projected/expected to reach'. Timeless processes = Present Passive (is washed)."
    },
    {
      number: 6,
      sin: "Repeating 'Shows' and 'Increased' Every Sentence",
      explanation: "Monotonous lexical repetition that caps Lexical Resource at Band 5.",
      fix: "Alternate between Verb + Adverb ('rose sharply') and Adjective + Noun ('experienced a sharp rise'). Use 'illustrates', 'depicts', 'compares'."
    },
    {
      number: 7,
      sin: "Wall of Text (No Paragraphing)",
      explanation: "Writing the entire 150+ words as one single continuous block of text.",
      fix: "Always use the 4-paragraph skeleton with a clear blank line between paragraphs: P1 Intro, P2 Overview, P3 Details 1, P4 Details 2."
    }
  ],

  // 5. Band 6 vs Band 8 Comparison Sample
  sampleComparison: {
    prompt: "The line graph shows the percentage of households with internet access in three European countries (UK, Germany, Spain) between 2000 and 2020.",
    band6: {
      band: "Band 6.0",
      overview: "Competent communication, but contains repetitive vocabulary, mechanical listing in detail sections, and an overview with premature numbers.",
      text: [
        { text: "The line graph below shows the percentage of households that have internet access in UK, Germany and Spain from 2000 to 2020.", tag: "p1", note: "Intro copied too many words from the prompt." },
        { text: "Overall, internet access increased in all three countries. The UK had the highest number of 90% in 2020, while Spain had the lowest.", tag: "p2", note: "Overview includes specific numbers (90%), violating overview best practices." },
        { text: "In 2000, internet access in the UK was 30%. Then it increased to 55% in 2010 and then it reached 90% in 2020. In Germany, it was 20% in 2000 and it went up to 50% in 2010, and it increased to 80% in 2020.", tag: "p3", note: "Mechanical year-by-year listing; repeats 'it increased' and 'then'." },
        { text: "For Spain, the percentage was only 10% in 2000. It increased slowly to 35% in 2010. After that, it went up to 70% in 2020, which was the lowest.", tag: "p4", note: "Simple sentence structures; lacks sophisticated comparative transitions." }
      ]
    },
    band8: {
      band: "Band 8.0",
      overview: "Flawless structure, clear macro-overview with zero figures, elegant grouping of trends, varied academic lexicon, and error-free complex grammar.",
      text: [
        { text: "The line graph illustrates the proportion of households with access to the internet across three European nations—the UK, Germany, and Spain—over a 20-year period from 2000 to 2020.", tag: "p1", note: "Excellent paraphrase with precise synonyms (proportion, across three European nations, over a 20-year period)." },
        { text: "Overall, all three countries experienced significant upward trajectories in home internet connectivity over the two decades. Notably, while the UK consistently maintained the highest penetration rates throughout, Spain recorded the most rapid acceleration despite starting from the lowest base.", tag: "p2", note: "Masterful overview: identifies overall upward trend + comparative leader/growth without mentioning any numbers." },
        { text: "Looking first at the leading nations, the UK began the period with roughly 30% of households connected in 2000. This figure climbed steadily to surpass the 50% mark by 2010, before culminating at a peak of precisely 90% by 2020. Similarly, Germany followed a parallel trajectory, rising from 20% in 2000 to approximately 80% at the end of the period, trailing the UK by roughly 10 percentage points throughout.", tag: "p3", note: "Smooth grouping of parallel trends; sophisticated approximation and collocations (culminating at a peak, parallel trajectory)." },
        { text: "In stark contrast, Spain initially registered a modest adoption rate of merely 10% in 2000. However, after moderate growth to 35% in 2010, Spanish internet connectivity surged dramatically over the final decade, reaching 70% in 2020 and substantially narrowing the gap with its northern counterparts.", tag: "p4", note: "Strong contrast transition ('In stark contrast'); dynamic verb choices ('surged dramatically', 'narrowing the gap')." }
      ]
    }
  },

  // 6. Overview Trainer Mini-Charts Data
  overviewTrainer: [
    {
      id: "chart-energy",
      title: "Mini-Chart 1: Energy Generation (Solar vs Coal, 2010–2025)",
      type: "Line Graph",
      svg: `
        <svg viewBox="0 0 400 200" class="mini-chart-svg" role="img" aria-label="Energy Generation Chart">
          <line x1="40" y1="20" x2="40" y2="170" stroke="var(--border)" stroke-width="2"/>
          <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border)" stroke-width="2"/>
          <!-- Grid lines -->
          <line x1="40" y1="120" x2="380" y2="120" stroke="var(--border)" stroke-dasharray="3,3"/>
          <line x1="40" y1="70" x2="380" y2="70" stroke="var(--border)" stroke-dasharray="3,3"/>
          <!-- Coal line (Declining) -->
          <polyline fill="none" stroke="#ef4444" stroke-width="3" points="50,40 130,55 210,80 290,125 370,160"/>
          <!-- Solar line (Rising) -->
          <polyline fill="none" stroke="#10b981" stroke-width="3" points="50,160 130,150 210,120 290,65 370,30"/>
          <!-- Labels -->
          <text x="380" y="35" fill="#10b981" font-size="12" font-weight="bold">Solar</text>
          <text x="380" y="165" fill="#ef4444" font-size="12" font-weight="bold">Coal</text>
          <text x="50" y="188" fill="var(--text-muted)" font-size="11">2010</text>
          <text x="210" y="188" fill="var(--text-muted)" font-size="11">2017</text>
          <text x="360" y="188" fill="var(--text-muted)" font-size="11">2025</text>
        </svg>
      `,
      prompt: "Write a 2-sentence overview for this energy chart. (Remember: Start with 'Overall, ...' and include NO numbers!).",
      modelOverview: "Overall, solar power generation experienced a dramatic upward surge over the 15-year period, whereas coal energy witnessed a steep decline. By the end of the timeline, solar had overtaken coal to become the primary energy source.",
      keyFeatures: ["Solar rose steeply while coal collapsed.", "An intersection occurred around 2017 where solar surpassed coal."]
    },
    {
      id: "chart-hours",
      title: "Mini-Chart 2: Average Weekly Working Hours (4 Countries)",
      type: "Bar Chart",
      svg: `
        <svg viewBox="0 0 400 200" class="mini-chart-svg" role="img" aria-label="Working Hours Bar Chart">
          <line x1="40" y1="20" x2="40" y2="170" stroke="var(--border)" stroke-width="2"/>
          <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border)" stroke-width="2"/>
          <!-- Bars -->
          <rect x="60" y="40" width="45" height="130" fill="#3b82f6" rx="4"/>
          <rect x="140" y="65" width="45" height="105" fill="#3b82f6" rx="4"/>
          <rect x="220" y="90" width="45" height="80" fill="#3b82f6" rx="4"/>
          <rect x="300" y="125" width="45" height="45" fill="#3b82f6" rx="4"/>
          <!-- Labels -->
          <text x="65" y="188" fill="var(--text-muted)" font-size="11">Greece</text>
          <text x="145" y="188" fill="var(--text-muted)" font-size="11">Poland</text>
          <text x="225" y="188" fill="var(--text-muted)" font-size="11">UK</text>
          <text x="298" y="188" fill="var(--text-muted)" font-size="11">Denmark</text>
        </svg>
      `,
      prompt: "Write a 2-sentence overview comparing the weekly working hours across these nations.",
      modelOverview: "Overall, workers in Greece recorded the longest average working hours among the four nations surveyed, whereas Danish employees worked the fewest hours by a significant margin.",
      keyFeatures: ["Greece had the highest working hours.", "Denmark had the lowest working hours.", "Clear downward ranking from Greece down to Denmark."]
    },
    {
      id: "chart-spending",
      title: "Mini-Chart 3: Household Budget Shares (Food, Rent, Leisure, Other)",
      type: "Pie Chart",
      svg: `
        <svg viewBox="0 0 400 200" class="mini-chart-svg" role="img" aria-label="Household Budget Pie Chart">
          <circle cx="150" cy="100" r="70" fill="#e2e8f0"/>
          <!-- 45% Rent (Green) -->
          <path d="M 150 100 L 150 30 A 70 70 0 0 1 216 124 Z" fill="#10b981"/>
          <!-- 30% Food (Blue) -->
          <path d="M 150 100 L 216 124 A 70 70 0 0 1 100 150 Z" fill="#3b82f6"/>
          <!-- 15% Leisure (Purple) -->
          <path d="M 150 100 L 100 150 A 70 70 0 0 1 90 75 Z" fill="#8b5cf6"/>
          <!-- 10% Other (Yellow) -->
          <path d="M 150 100 L 90 75 A 70 70 0 0 1 150 30 Z" fill="#f59e0b"/>
          <!-- Legend -->
          <rect x="250" y="45" width="12" height="12" fill="#10b981"/>
          <text x="270" y="56" font-size="12" fill="var(--text)">Rent (45%)</text>
          <rect x="250" y="75" width="12" height="12" fill="#3b82f6"/>
          <text x="270" y="86" font-size="12" fill="var(--text)">Food (30%)</text>
          <rect x="250" y="105" width="12" height="12" fill="#8b5cf6"/>
          <text x="270" y="116" font-size="12" fill="var(--text)">Leisure (15%)</text>
          <rect x="250" y="135" width="12" height="12" fill="#f59e0b"/>
          <text x="270" y="146" font-size="12" fill="var(--text)">Other (10%)</text>
        </svg>
      `,
      prompt: "Write a 2-sentence overview for this expenditure chart.",
      modelOverview: "Overall, accommodation constituted the single largest expenditure category for typical households, followed by food expenses. In contrast, leisure activities and miscellaneous costs accounted for the smallest shares of total spending.",
      keyFeatures: ["Rent and food made up the vast majority (three-quarters) of spending.", "Other and leisure formed minor fractions."]
    }
  ],

  // 7. Paraphrase Lab Prompts
  paraphrasePrompts: [
    {
      id: 1,
      original: "The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.",
      model: "The bar chart compares the quantity of male and female students enrolled in British higher education across three distinct time periods, categorized by full-time and part-time study modes.",
      breakdown: [
        { original: "The chart below shows", upgraded: "The bar chart compares / illustrates" },
        { original: "the number of men and women", upgraded: "the quantity of male and female students" },
        { original: "in further education in Britain", upgraded: "enrolled in British higher education" },
        { original: "in three periods", upgraded: "across three distinct time periods" },
        { original: "studying full-time or part-time", upgraded: "categorized by full-time and part-time study modes" }
      ]
    },
    {
      id: 2,
      original: "The table below gives information on consumer spending on different items in five different countries in 2002.",
      model: "The table provides a comparative breakdown of household expenditure across various commodity categories in five nations during the year 2002.",
      breakdown: [
        { original: "gives information on", upgraded: "provides a comparative breakdown of" },
        { original: "consumer spending", upgraded: "household expenditure" },
        { original: "on different items", upgraded: "across various commodity categories" },
        { original: "in five different countries", upgraded: "in five nations" }
      ]
    },
    {
      id: 3,
      original: "The diagrams below show the stages and equipment used in the cement-making process, and how cement is used to produce concrete for building purposes.",
      model: "The provided diagrams delineate the sequential phases and apparatus involved in cement manufacturing, alongside the subsequent procedure for utilizing cement to create construction-grade concrete.",
      breakdown: [
        { original: "The diagrams below show", upgraded: "The provided diagrams delineate" },
        { original: "the stages and equipment used", upgraded: "the sequential phases and apparatus involved" },
        { original: "cement-making process", upgraded: "cement manufacturing" },
        { original: "produce concrete for building purposes", upgraded: "create construction-grade concrete" }
      ]
    },
    {
      id: 4,
      original: "The maps below show the changes that have taken place in the seaside village of Templeton between 1990 and 2010.",
      model: "The two maps depict the urban and infrastructural transformations experienced by the coastal village of Templeton over a twenty-year timeframe from 1990 to 2010.",
      breakdown: [
        { original: "show the changes that have taken place", upgraded: "depict the urban and infrastructural transformations experienced" },
        { original: "seaside village", upgraded: "coastal village" },
        { original: "between 1990 and 2010", upgraded: "over a twenty-year timeframe from 1990 to 2010" }
      ]
    },
    {
      id: 5,
      original: "The graph below gives information about the percentage of the population in four Asian countries living in cities between 1970 and 2020, with forecasts for 2030 and 2040.",
      model: "The line graph illustrates urbanization rates across four Asian nations from 1970 to 2020, accompanied by projected figures up to 2040.",
      breakdown: [
        { original: "gives information about the percentage of the population... living in cities", upgraded: "illustrates urbanization rates" },
        { original: "in four Asian countries", upgraded: "across four Asian nations" },
        { original: "with forecasts for 2030 and 2040", upgraded: "accompanied by projected figures up to 2040" }
      ]
    }
  ],

  // 8. 15-Question Vocabulary & Strategy Quiz Bank
  quizQuestions: [
    {
      id: 1,
      question: "Which of the following is the BEST Band 7+ replacement for the sentence: 'Sales went up a lot in 2015.'?",
      options: [
        "Sales surged dramatically in 2015.",
        "Sales were really big in 2015.",
        "Sales had an up trend in 2015.",
        "Sales became much higher in 2015."
      ],
      correctIndex: 0,
      rationale: "'Surged dramatically' provides an authentic, high-precision academic collocation pairing a dynamic verb with an adverb of degree."
    },
    {
      id: 2,
      question: "If a line graph shows steady ups and downs between 40% and 55% over 10 years, which phrase describes this accurately?",
      options: [
        "The figure plummeted consistently.",
        "The percentage fluctuated moderately within a 15-point band.",
        "The figure leveled off completely.",
        "The percentage plateaued between 40% and 55%."
      ],
      correctIndex: 1,
      rationale: "'Fluctuated' is the designated term for repeated upward and downward oscillations. 'Plateau' means staying completely flat."
    },
    {
      id: 3,
      question: "What is the consequence of omitting an overview in IELTS Writing Task 1?",
      options: [
        "You lose 1 band in Lexical Resource.",
        "Task Achievement is capped at Band 5.",
        "Coherence & Cohesion is deducted 0.5 bands.",
        "Examiners will grade it as Task 2."
      ],
      correctIndex: 1,
      rationale: "According to the official IELTS public band descriptors, a response with no overview cannot score above Band 5 for Task Achievement."
    },
    {
      id: 4,
      question: "Which sentence is grammatically appropriate for describing a Process Diagram?",
      options: [
        "The worker picks the tea leaves and dries them in the oven.",
        "The tea leaves are harvested and subsequently dried in an oven.",
        "They are picking the tea leaves then dry them.",
        "Someone collects the tea leaves to make them dry."
      ],
      correctIndex: 1,
      rationale: "Processes require the Present Simple Passive voice ('are harvested', 'is dried') to maintain formal, objective academic style."
    },
    {
      id: 5,
      question: "Which phrase is best suited for introducing a contrasting trend between two countries?",
      options: [
        "On the other hand side...",
        "In stark contrast to Country A, Country B saw a sharp decline.",
        "Country B was different because it went down.",
        "Contrasting with this, Country B was down."
      ],
      correctIndex: 1,
      rationale: "'In stark contrast to [X], [Y]...' is a Band 8+ cohesive transition that clearly establishes severe divergence."
    },
    {
      id: 6,
      question: "Why should you avoid stating exact decimals like '48.87%' for estimated visual bar charts?",
      options: [
        "Examiners do not like mathematics.",
        "Using natural approximations (e.g. 'just under half' or 'nearly 50%') shows superior Lexical Resource.",
        "You will run out of time.",
        "Decimals are forbidden on IELTS."
      ],
      correctIndex: 1,
      rationale: "Task 1 evaluates your ability to summarize and approximate data naturally using academic language, not mechanically copy raw numbers."
    },
    {
      id: 7,
      question: "Which is the correct preposition in map descriptions?",
      options: [
        "The factory was built in the north from the river.",
        "The factory was erected to the north of the river.",
        "The factory was placed at the north on the river.",
        "The factory was made northward of the river."
      ],
      correctIndex: 1,
      rationale: "'To the north of [landmark]' is the standard, accurate spatial prepositional phrase in English."
    },
    {
      id: 8,
      question: "Which of the following belongs in the Overview (Paragraph 2)?",
      options: [
        "In 2005, car production reached exactly 420,000 units.",
        "Overall, car manufacturing expanded dramatically over the period, led predominantly by Japan.",
        "I think car production increased because of global demand.",
        "The graph gives info on how many cars were made."
      ],
      correctIndex: 1,
      rationale: "The overview must state the most prominent macro-trends without specific figures or personal opinions."
    },
    {
      id: 9,
      question: "Complete the noun-phrase upgrade: 'The price dropped sharply' ➔ 'There was a _______ in prices.'",
      options: [
        "sharp drop",
        "drop sharply",
        "dropping sharp",
        "sharply dropped"
      ],
      correctIndex: 0,
      rationale: "Converting verb+adverb ('dropped sharply') into adjective+noun ('a sharp drop') displays grammatical range and flexibility."
    },
    {
      id: 10,
      question: "What is the recommended word budget for IELTS Writing Task 1?",
      options: [
        "Under 100 words in 10 minutes.",
        "150 to 190 words in 20 minutes.",
        "Over 300 words in 35 minutes.",
        "Exactly 150 words in 40 minutes."
      ],
      correctIndex: 1,
      rationale: "150 to 190 words in ~20 minutes is the ideal target to cover all key features without eating into Task 2 time."
    },
    {
      id: 11,
      question: "Which word is a Band 7+ synonym for 'comprised' or 'made up' when describing pie charts?",
      options: [
        "constituted",
        "stayed",
        "included to",
        "amounted into"
      ],
      correctIndex: 0,
      rationale: "'Constituted' (e.g. 'Rent constituted 40% of expenditure') is a formal, high-utility academic verb for proportions."
    },
    {
      id: 12,
      question: "When describing projected data for the year 2040, which verb structure is correct?",
      options: [
        "Solar power will to rise.",
        "Solar power is projected to experience substantial growth.",
        "Solar power rose until 2040.",
        "Solar power is growing in 2040."
      ],
      correctIndex: 1,
      rationale: "Future projections must use cautious predictive markers: 'is projected to', 'is forecasted to', or 'is expected to'."
    },
    {
      id: 13,
      question: "Which linking expression should you AVOID overusing in Task 1?",
      options: [
        "Subsequently",
        "And then... and then...",
        "In stark contrast",
        "Following this"
      ],
      correctIndex: 1,
      rationale: "Repetitive use of 'and then' is a hallmark of Band 5 writing and shows a lack of cohesive range."
    },
    {
      id: 14,
      question: "Which of the following is true regarding the conclusion in Task 1?",
      options: [
        "You must write a personal conclusion summarizing your opinion.",
        "No separate conclusion paragraph is required if a clear overview is provided in Paragraph 2.",
        "Conclusions must be at least 50 words.",
        "Task 1 requires two separate conclusions."
      ],
      correctIndex: 1,
      rationale: "Task 1 requires an Overview, NOT a conclusion. Placing your overview as Paragraph 2 fulfills this completely."
    },
    {
      id: 15,
      question: "Identify the error in this sentence: 'The sales reached at a peak of 80% in 2018.'",
      options: [
        "The word 'reached' does not take the preposition 'at' (should be 'reached a peak of').",
        "'Sales' should be singular.",
        "'In 2018' should be 'at 2018'.",
        "You cannot use percentages with peak."
      ],
      correctIndex: 0,
      rationale: "The verb 'reach' is transitive and does not take 'at'. Say 'reached a peak of' or 'peaked at'."
    }
  ],

  // 9. Teacher Mode Lesson Plan & Facilitation Guide
  teacherNotes: {
    duration: "60–90 Minute Workshop Plan",
    pacing: [
      { time: "00–15m", stage: "Diagnostic & Sins Review", action: "Walk through 'Know the Battlefield' & the 7 Sins. Have students identify which sin they commit most frequently." },
      { time: "15–35m", stage: "The Overview Drill", action: "Project the 'Overview Trainer' mini-charts. Give students 3 minutes per chart. Check against the 0-numbers rule." },
      { time: "35–55m", stage: "Paraphrase Lab & Vocab Upgrades", action: "Live-paraphrase 2 prompts on the board using the filterable Vocab Bank upgrade pairs." },
      { time: "55–75m", stage: "Writing Arena Live Timed Mock", action: "Students write a complete 150-word report in the Arena with the 20-minute countdown active." },
      { time: "75–90m", stage: "Self-Assessment Rubric & Feedback", action: "Students rate their draft with the interactive sliders and note their personalized action plan." }
    ],
    discussionQuestions: [
      "Why is writing 145 words more dangerous than writing 180 words?",
      "Why does listing every number actually lower your score instead of raising it?",
      "How does starting Paragraph 2 with 'Overall,' protect your Task Achievement score?"
    ]
  }
};

// Export for module systems or attach to window for offline script execution
if (typeof module !== "undefined" && module.exports) {
  module.exports = IELTS_DATA;
} else if (typeof window !== "undefined") {
  window.IELTS_DATA = IELTS_DATA;
}
