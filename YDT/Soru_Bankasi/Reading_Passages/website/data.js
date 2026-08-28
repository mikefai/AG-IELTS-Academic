/**
 * YDT Reading Passages Dataset
 * Authentic ÖSYM Standard - 5 Passages x 3 Questions = 15 Questions
 * Includes sentence-by-sentence translations, target vocabulary, question stems, and detailed Turkish rationales.
 */

const YDT_DATA = {
  metadata: {
    title: "YDT İngilizce Okuma & Paragraf Çalışma Platformu",
    target: "YKS - YDT İngilizce (70+ Net)",
    description: "ÖSYM standartlarında 5 akademik okuma parçası, interaktif kelime rehberi, cümle cümle çeviri ve ayrıntılı çeldirici analizleri.",
    totalPassages: 5,
    totalQuestions: 15,
    recommendedTimePerPassage: 240 // 4 minutes in seconds
  },
  passages: [
    {
      id: "passage_1",
      number: 1,
      title: "The James Webb Space Telescope and the Early Universe",
      category: "Uzay Bilimi & Astronomi",
      badge: "Science & Tech",
      icon: "telescope",
      summary: "JWST'nin kızılötesi teknolojisi sayesinde erken evrenin ilk yıldızlarını ve ötegezegen atmosferlerini nasıl keşfettiği anlatılmaktadır.",
      text: [
        {
          num: 1,
          en: "Since its historic launch in late 2021, the James Webb Space Telescope (JWST) has fundamentally transformed our understanding of the cosmos.",
          tr: "2021'in sonlarındaki tarihi fırlatılışından bu yana, James Webb Uzay Teleskobu (JWST) evren anlayışımızı kökten değiştirmiştir.",
          keywords: ["fundamentally", "cosmos"]
        },
        {
          num: 2,
          en: "Unlike its predecessor, the Hubble Space Telescope, which primarily observed the universe in visible and ultraviolet light, JWST operates predominantly in the infrared spectrum.",
          tr: "Evreni esas olarak görünür ve morötesi ışıkta gözlemleyen selefi Hubble Uzay Teleskobu'nun aksine JWST, ağırlıklı olarak kızılötesi spektrumda çalışmaktadır.",
          keywords: ["predecessor", "predominantly", "infrared spectrum"]
        },
        {
          num: 3,
          en: "This technical capability allows it to pierce through dense cosmic dust clouds and detect the faint, redshifted light emitted by the very first stars and galaxies formed over 13.5 billion years ago.",
          tr: "Bu teknik yetenek, teleskobun yoğun kozmik toz bulutlarını delip geçmesine ve 13,5 milyar yıldan daha uzun bir süre önce oluşmuş en erken yıldızlar ve galaksiler tarafından yayılan zayıf, kırmızıya kaymış ışığı saptamasına olanak tanır.",
          keywords: ["pierce through", "faint", "emitted"]
        },
        {
          num: 4,
          en: "In addition to peering into the deep universe, JWST has provided unprecedented data regarding the atmospheric composition of exoplanets.",
          tr: "JWST, derin evreni incelemenin yanı sıra, ötegezegenlerin atmosferik bileşimine ilişkin benzeri görülmemiş veriler sağlamıştır.",
          keywords: ["peering into", "unprecedented", "composition"]
        },
        {
          num: 5,
          en: "By analyzing the filtered starlight passing through the gaseous envelopes of distant planets, astronomers can identify key chemical signatures, such as water vapor, carbon dioxide, and methane.",
          tr: "Gökbilimciler, uzak gezegenlerin gaz tabakalarından geçen filtrelenmiş yıldız ışığını analiz ederek su buharı, karbondioksit ve metan gibi temel kimyasal işaretleri belirleyebilmektedir.",
          keywords: ["envelopes", "signatures"]
        },
        {
          num: 6,
          en: "Consequently, these observations not only shed light on how early cosmic structures evolved, but also bring scientists one step closer to assessing whether distant worlds possess habitable conditions capable of sustaining life.",
          tr: "Sonuç olarak bu gözlemler, yalnızca erken kozmik yapıların nasıl evrildiğine ışık tutmakla kalmaz, aynı zamanda bilim insanlarını uzak dünyaların yaşamı destekleyebilecek yaşanabilir koşullara sahip olup olmadığını değerlendirmeye bir adım daha yaklaştırır.",
          keywords: ["shed light on", "assessing", "habitable", "sustaining"]
        }
      ],
      vocabulary: [
        {
          word: "fundamentally",
          type: "adv.",
          level: "B2",
          meaningTr: "kökten, esaslı biçimde, tamamen",
          synonyms: ["essentially", "drastically", "profoundly", "radically"],
          collocations: ["fundamentally transform", "fundamentally different"],
          example: "The new discovery has fundamentally altered human knowledge of cosmology."
        },
        {
          word: "predecessor",
          type: "n.",
          level: "C1",
          meaningTr: "selef, kendinden önce gelen (araç/kişi)",
          synonyms: ["forerunner", "ancestor", "precursor", "antecedent"],
          collocations: ["unlike its predecessor", "immediate predecessor"],
          example: "The current space probe is far more sophisticated than its predecessor."
        },
        {
          word: "pierce through",
          type: "phr. v.",
          level: "B2",
          meaningTr: "delip geçmek, içinden geçmek, nüfuz etmek",
          synonyms: ["penetrate", "pass through", "puncture", "break through"],
          collocations: ["pierce through clouds", "pierce through darkness"],
          example: "Infrared beams can pierce through the dense interstellar dust."
        },
        {
          word: "faint",
          type: "adj.",
          level: "B2",
          meaningTr: "zayıf, soluk, güçlükle fark edilen",
          synonyms: ["dim", "weak", "subtle", "indistinct", "feeble"],
          collocations: ["faint light", "faint signal", "faint trace"],
          example: "Astronomers captured a faint signal from a galaxy billions of light-years away."
        },
        {
          word: "unprecedented",
          type: "adj.",
          level: "C1",
          meaningTr: "eşi benzeri görülmemiş, görülmemiş düzeyde",
          synonyms: ["unparalleled", "extraordinary", "matchless", "historic"],
          collocations: ["unprecedented data", "unprecedented success", "unprecedented rate"],
          example: "The telescope delivers images with unprecedented resolution."
        },
        {
          word: "shed light on",
          type: "idiom",
          level: "B2",
          meaningTr: "ışık tutmak, aydınlatmak, açıklık kazandırmak",
          synonyms: ["illuminate", "clarify", "elucidate", "explain"],
          collocations: ["shed light on the origin", "shed light on the mystery"],
          example: "These deep-field photos shed light on the formation of primordial galaxies."
        },
        {
          word: "habitable",
          type: "adj.",
          level: "B2",
          meaningTr: "yaşanabilir, ikamete uygun",
          synonyms: ["livable", "inhabitable", "viable"],
          collocations: ["habitable zone", "habitable conditions"],
          example: "Scientists seek exoplanets in the habitable zone where liquid water can exist."
        },
        {
          word: "sustain",
          type: "v.",
          level: "B2",
          meaningTr: "sürdürmek, devam ettirmek, beslemek/desteklemek",
          synonyms: ["maintain", "support", "preserve", "keep up"],
          collocations: ["sustain life", "sustain growth", "sustain damage"],
          example: "The presence of water vapor suggests the planet could sustain biological life."
        }
      ],
      questions: [
        {
          id: "q1",
          number: 1,
          stem: "It is clearly stated in the passage that the James Webb Space Telescope differs from Hubble in that it ----.",
          stemTr: "Parçada açıkça belirtildiği üzere James Webb Uzay Teleskobu Hubble'dan ---- yönüyle ayrılmaktadır.",
          questionType: "Doğrudan Bilgi (Detail)",
          targetLines: [2],
          options: [
            { key: "A", text: "is solely designed to search for signs of alien life on exoplanets" },
            { key: "B", text: "primarily utilizes infrared radiation rather than visible and ultraviolet light" },
            { key: "C", text: "was unable to send data back to Earth during its first year in orbit" },
            { key: "D", text: "requires astronauts to manually clear cosmic dust from its main lens" },
            { key: "E", text: "focuses exclusively on our own solar system's planetary atmospheres" }
          ],
          correctKey: "B",
          explanation: {
            correct: "2. cümlede açıkça 'Unlike its predecessor, the Hubble Space Telescope, which primarily observed the universe in visible and ultraviolet light, JWST operates predominantly in the infrared spectrum.' (Görünür ve morötesi ışık kullanan Hubble'ın aksine JWST kızılötesi spektrumda çalışır) denilmiştir.",
            traps: {
              A: "Aşırı genelleme tuzağı ('solely designed to search for alien life'). JWST sadece uzaylı aramak için değil, erken evren galaksilerini incelemek için de tasarlandı.",
              C: "Metin dışı uydurma bilgi; ilk yıl veri gönderemediği asla geçmez.",
              D: "Astronotların elle toz temizlemesi gerektiği yönünde asılsız kurgu.",
              E: "'exclusively on our own solar system' aşırı sınırlama tuzağıdır; JWST derin evrendeki ötegezegenleri inceler."
            }
          }
        },
        {
          id: "q2",
          number: 2,
          stem: "According to the passage, analyzing the filtered starlight through exoplanetary atmospheres allows astronomers to ----.",
          stemTr: "Parçaya göre, ötegezegen atmosferlerinden geçen filtrelenmiş yıldız ışığını analiz etmek gökbilimcilerin ---- olanağı tanır.",
          questionType: "Neden - Sonuç / Amaç",
          targetLines: [5, 6],
          options: [
            { key: "A", text: "confirm that extraterrestrial life definitively exists in nearby galaxies" },
            { key: "B", text: "calculate the exact landing coordinates for future manned space missions" },
            { key: "C", text: "detect specific chemical substances that might indicate planetary habitability" },
            { key: "D", text: "prevent catastrophic cosmic collisions between stars and rogue asteroids" },
            { key: "E", text: "prove that all distant exoplanets possess oceans identical to those on Earth" }
          ],
          correctKey: "C",
          explanation: {
            correct: "5. ve 6. cümlelerde yıldız ışığı analiziyle 'identify key chemical signatures, such as water vapor, carbon dioxide... assessing whether distant worlds possess habitable conditions' (su buharı ve gazları saptayarak yaşanabilirlik şartlarını değerlendirmek) sağlandığı belirtilmiştir.",
            traps: {
              A: "'definitively exists' kesinlik tuzağıdır. Henüz uzaylı yaşamının kesin kanıtlandığı söylenmemiştir.",
              B: "İnsanlı görevler için iniş koordinatı belirleme metinle ilgisizdir.",
              D: "Kozmik çarpışmaları önlemek metin dışıdır.",
              E: "'identical to those on Earth' (Dünya ile birebir aynı okyanuslar) aşırı iddiadır."
            }
          }
        },
        {
          id: "q3",
          number: 3,
          stem: "What is the primary purpose of the author in this passage?",
          stemTr: "Yazarın bu parçadaki temel amacı nedir?",
          questionType: "Ana Fikir / Yazarın Amacı",
          targetLines: [1, 2, 3, 4, 5, 6],
          options: [
            { key: "A", text: "To argue that funding for space telescopes should be diverted to terrestrial observatories" },
            { key: "B", text: "To criticize the technical shortcomings and limitations of the Hubble Space Telescope" },
            { key: "C", text: "To provide an overview of how JWST operates and its scientific contributions to astronomy" },
            { key: "D", text: "To explain why human beings will inevitably migrate to exoplanets within decades" },
            { key: "E", text: "To dispute the estimated age of the universe proposed by early 20th-century astronomers" }
          ],
          correctKey: "C",
          explanation: {
            correct: "Yazar, metin boyunca James Webb Teleskobu'nun teknik işleyiş prensibini (kızılötesi, tozları delme) ve astronomiye getirdiği çığır açıcı bilimsel katkıları genel olarak tanıtmaktadır.",
            traps: {
              A: "Bütçenin yer gözlemevlerine aktarılması gerektiği gibi bir tartışma metinde yoktur.",
              B: "Hubble'ı yermek değil, JWST ile olan teknolojik farkı ortaya koymak amaçlanmıştır.",
              D: "İnsanların onlarca yıl içinde göç edeceği yönünde spekülatif bir iddia bulunmaz.",
              E: "Evrenin yaşı üzerine herhangi bir uyuşmazlık veya tartışma işlenmemiştir."
            }
          }
        }
      ]
    },
    {
      id: "passage_2",
      number: 2,
      title: "Göbeklitepe: Rewriting the Dawn of Human Civilization",
      category: "Arkeoloji & Tarih",
      badge: "Archaeology & History",
      icon: "landmark",
      summary: "Göbeklitepe'nin yerleşik hayattan ve tarımdan önce dini ritüellerin başladığını kanıtlayarak geleneksel antropoloji teorilerini nasıl değiştirdiği anlatılmaktadır.",
      text: [
        {
          num: 1,
          en: "Located in southeastern Türkiye, Göbeklitepe is widely regarded by archaeologists as one of the most monumental discoveries in human history.",
          tr: "Güneydoğu Türkiye'de bulunan Göbeklitepe, arkeologlar tarafından insanlık tarihindeki en çığır açıcı keşiflerden biri olarak kabul edilmektedir.",
          keywords: ["monumental"]
        },
        {
          num: 2,
          en: "Dating back to approximately 9600 BCE, this prehistoric sanctuary predates Stonehenge by over 6,000 years and the Egyptian pyramids by more than 7,000 years.",
          tr: "M.Ö. yaklaşık 9600 yıllarına dayanan bu tarih öncesi kutsal alan, Stonehenge'den 6.000 yıldan fazla, Mısır piramitlerinden ise 7.000 yıldan uzun bir süre önceye dayanmaktadır.",
          keywords: ["sanctuary", "predates"]
        },
        {
          num: 3,
          en: "Before its excavation led by German archaeologist Klaus Schmidt, the prevailing anthropological consensus was that complex monumental architecture, religious hierarchies, and organized labor only emerged after hunter-gatherer groups adopted sedentary agriculture.",
          tr: "Alman arkeolog Klaus Schmidt önderliğindeki kazılardan önce, hâkim antropolojik uzlaşı; karmaşık anıtsal mimarinin, dini hiyerarşilerin ve örgütlü iş gücünün ancak avcı-toplayıcı grupların yerleşik tarıma geçmesinden sonra ortaya çıktığı yönündeydi.",
          keywords: ["prevailing", "consensus", "sedentary"]
        },
        {
          num: 4,
          en: "However, Göbeklitepe dramatically upended this paradigm; massive T-shaped limestone pillars, meticulously carved with intricate reliefs of dangerous beasts and abstract symbols, were erected by nomadic hunter-gatherers who had not yet domesticated crops or animals.",
          tr: "Ancak Göbeklitepe bu paradigmayı kökten altüst etti; tehlikeli hayvanların ve soyut sembollerin karmaşık kabartmalarıyla titizlikle oyulmuş devasa T biçimli kireçtaşı sütunlar, henüz bitkileri veya hayvanları evcilleştirmemiş olan göçebe avcı-toplayıcılar tarafından dikilmişti.",
          keywords: ["upended", "paradigm", "meticulously", "intricate", "domesticated"]
        },
        {
          num: 5,
          en: "This striking revelation suggests that the innate human desire for communal rituals and spiritual expression may have served as the primary catalyst for permanent settlement and agriculture, rather than merely being a consequence of it.",
          tr: "Bu çarpıcı keşif, toplumsal ritüellere ve ruhani ifadeye yönelik doğuştan gelen insan arzusunun, yerleşik hayatın ve tarımın yalnızca bir sonucu olmaktan ziyade, onların ana tetikleyicisi (katalizörü) olmuş olabileceğini düşündürmektedir.",
          keywords: ["striking", "revelation", "innate", "catalyst", "consequence"]
        }
      ],
      vocabulary: [
        {
          word: "monumental",
          type: "adj.",
          level: "C1",
          meaningTr: "anıtsal, devasa, çığır açıcı / tarihi öneme sahip",
          synonyms: ["historic", "landmark", "colossal", "stupendous"],
          collocations: ["monumental discovery", "monumental task", "monumental achievement"],
          example: "The excavation of the ancient temple was a monumental breakthrough."
        },
        {
          word: "predate",
          type: "v.",
          level: "B2",
          meaningTr: "-den önce gelmek, daha eski bir tarihe dayanmak",
          synonyms: ["antedate", "precede", "come before"],
          collocations: ["predate by centuries", "predate the discovery"],
          example: "This newly discovered artifact predates the Bronze Age."
        },
        {
          word: "prevailing",
          type: "adj.",
          level: "C1",
          meaningTr: "hâkim olan, geçerli, yaygın kabul gören",
          synonyms: ["dominant", "widespread", "current", "established"],
          collocations: ["prevailing view", "prevailing consensus", "prevailing attitude"],
          example: "The study contradicted the prevailing scientific theory."
        },
        {
          word: "sedentary",
          type: "adj.",
          level: "B2",
          meaningTr: "yerleşik (yaşam), hareketsiz",
          synonyms: ["settled", "stationary", "non-nomadic", "inactive"],
          collocations: ["sedentary lifestyle", "sedentary agriculture"],
          example: "The transition from nomadic foraging to a sedentary lifestyle took generations."
        },
        {
          word: "upend",
          type: "v.",
          level: "C1",
          meaningTr: "altüst etmek, kökünden değiştirmek, tersyüz etmek",
          synonyms: ["overturn", "disrupt", "subvert", "invert"],
          collocations: ["upend the paradigm", "upend expectations"],
          example: "The new archaeological evidence completely upended traditional theories."
        },
        {
          word: "meticulously",
          type: "adv.",
          level: "C1",
          meaningTr: "titizlikle, kılı kırk yararak, büyük bir özenle",
          synonyms: ["painstakingly", "scrupulously", "thoroughly", "carefully"],
          collocations: ["meticulously carved", "meticulously planned"],
          example: "The animal figures were meticulously engraved into the stone pillars."
        },
        {
          word: "catalyst",
          type: "n.",
          level: "C1",
          meaningTr: "katalizör, tetikleyici güç, hızlandırıcı etken",
          synonyms: ["trigger", "stimulus", "driving force", "spark"],
          collocations: ["primary catalyst", "catalyst for change"],
          example: "Religious congregation served as a catalyst for urban development."
        }
      ],
      questions: [
        {
          id: "q4",
          number: 4,
          stem: "Prior to the discovery of Göbeklitepe, anthropologists generally believed that ----.",
          stemTr: "Göbeklitepe'nin keşfinden önce antropologlar genel olarak ---- inanmaktaydılar.",
          questionType: "Doğrudan Bilgi (Prior Consensus)",
          targetLines: [3],
          options: [
            { key: "A", text: "nomadic hunter-gatherers were incapable of creating any artistic symbols" },
            { key: "B", text: "monumental structures could only be constructed by societies that practiced farming" },
            { key: "C", text: "religious rituals played no significant role in ancient human interactions" },
            { key: "D", text: "Egyptian pyramids were the oldest stone monuments ever built on Earth" },
            { key: "E", text: "hunter-gatherers developed agricultural tools long before building shelter" }
          ],
          correctKey: "B",
          explanation: {
            correct: "3. cümlede açıkça Klaus Schmidt'in kazılarından önce genel kanının 'complex monumental architecture... only emerged after hunter-gatherer groups adopted sedentary agriculture' (anıt yapıların yalnızca yerleşik tarım başladıktan sonra inşa edilebileceği) olduğu belirtilmiştir.",
            traps: {
              A: "Avcı toplayıcıların hiçbir sanat sembolü yapamayacağına inandıkları yönünde aşırı bir iddia yoktur.",
              C: "Dinin hiçbir rolü olmadığı iddiası paragrafta geçmez.",
              D: "Mısır piramitlerinin en eski olduğu kanısı genel kabul olarak sunulmamıştır.",
              E: "Barınaktan önce tarım aletleri geliştirildiği iddiası metin dışıdır."
            }
          }
        },
        {
          id: "q5",
          number: 5,
          stem: "It is clearly stated in the passage that the T-shaped pillars at Göbeklitepe ----.",
          stemTr: "Parçada açıkça belirtildiği üzere Göbeklitepe'deki T biçimli sütunlar ----.",
          questionType: "Doğrudan Bilgi (Detail)",
          targetLines: [4],
          options: [
            { key: "A", text: "were carved and erected by communities that had not yet domesticated plants or animals" },
            { key: "B", text: "served as defensive fortifications against rival nomadic tribes" },
            { key: "C", text: "were brought from thousands of miles away using advanced sailing ships" },
            { key: "D", text: "contain written alphabetic inscriptions detailing royal genealogies" },
            { key: "E", text: "were built thousands of years after the construction of Stonehenge" }
          ],
          correctKey: "A",
          explanation: {
            correct: "4. cümlede 'erected by nomadic hunter-gatherers who had not yet domesticated crops or animals' (henüz bitki ya da hayvanları evcilleştirmemiş göçebelerce dikildiği) açık bir şekilde doğrulanır.",
            traps: {
              B: "Savunma kalesi olduğu bilgisi asılsızdır.",
              C: "Binlerce mil uzaktan yelkenlilerle taşındığı bilgisi metin dışıdır.",
              D: "Yazılı alfabe veya krallar soyu içermez (Yalnızca hayvan kabartmaları ve soyut semboller vardır).",
              E: "Stonehenge'den sonra değil, 6000 yıl önce inşa edilmiştir."
            }
          }
        },
        {
          id: "q6",
          number: 6,
          stem: "It can be inferred from the passage that Göbeklitepe is significant because it ----.",
          stemTr: "Parçadan çıkarılabileceği üzere Göbeklitepe önemlidir, çünkü ----.",
          questionType: "Çıkarım (Inference)",
          targetLines: [4, 5],
          options: [
            { key: "A", text: "proves that early humans prioritized animal farming over religious gatherings" },
            { key: "B", text: "demonstrates that Klaus Schmidt was mistaken about the age of hunter-gatherers" },
            { key: "C", text: "reverses the traditional belief regarding the causal relationship between religion and agriculture" },
            { key: "D", text: "shows that hunter-gatherers abandoned their rituals as soon as they invented agriculture" },
            { key: "E", text: "confirms that monumental architecture originated in Western Europe rather than Anatolia" }
          ],
          correctKey: "C",
          explanation: {
            correct: "5. cümlede 'rituals and spiritual expression may have served as the primary catalyst for permanent settlement and agriculture, rather than merely being a consequence of it' denmektedir. Eskiden tarımın dini doğurduğu düşünülürken Göbeklitepe dinin tarımı tetiklediğini göstererek geleneksel nedensellik ilişkisini tersine çevirmiştir.",
            traps: {
              A: "Hayvancılığı dine tercih ettiklerini kanıtlamaz.",
              B: "Klaus Schmidt'in yanıldığını değil, teoriyi değiştirdiğini söyler.",
              D: "Tarım bulunur bulunmaz ritüellerin terk edildiği söylenmez.",
              E: "Batı Avrupa kökenli olduğunu iddia etmez; tam aksine Anadolu'nun öncülüğünü vurgular."
            }
          }
        }
      ]
    },
    {
      id: "passage_3",
      number: 3,
      title: "Decision Fatigue: Why Willpower Depletes Throughout the Day",
      category: "Bilişsel Psikoloji",
      badge: "Psychology & Cognitive",
      icon: "brain",
      summary: "İnsan iradesinin bir kas gibi çalıştığını, gün boyu verilen yüzlerce kararın zihinsel enerjiyi tüketerek karar felcine veya fevri kararlara yol açtığını inceler.",
      text: [
        {
          num: 1,
          en: "In our modern, choice-saturated world, the average adult makes thousands of decisions every single day, ranging from trivial wardrobe choices to critical professional judgments.",
          tr: "Seçeneklerle dolu modern dünyamızda, ortalama bir yetişkin her gün önemsiz kıyafet tercihlerinden kritik mesleki kararlara kadar binlerce karar almaktadır.",
          keywords: ["choice-saturated", "trivial"]
        },
        {
          num: 2,
          en: "Psychological research indicates that human willpower and cognitive control function remarkably like a physical muscle; they possess a finite reservoir of energy that steadily depletes with prolonged exertion.",
          tr: "Psikolojik araştırmalar, insan iradesinin ve bilişsel kontrolünün dikkat çekici biçimde fiziksel bir kas gibi çalıştığını; uzun süreli eforla istikrarlı bir şekilde tükenen sınırlı bir enerji rezervine sahip olduğunu göstermektedir.",
          keywords: ["willpower", "finite", "depletes", "exertion"]
        },
        {
          num: 3,
          en: "This psychological phenomenon, formally known as 'decision fatigue,' explains why individuals become progressively worse at evaluating options and resisting temptations as the day wears on.",
          tr: "Resmi olarak 'karar yorgunluğu' (decision fatigue) olarak bilinen bu psikolojik olgu, bireylerin gün ilerledikçe seçenekleri değerlendirmede ve ayartmalara direnmede neden giderek daha yetersiz hale geldiğini açıklar.",
          keywords: ["phenomenon", "progressively", "temptations"]
        },
        {
          num: 4,
          en: "When the brain is overwhelmed by a continuous barrage of choices, it unconsciously seeks shortcuts to conserve remaining cognitive resources.",
          tr: "Beyin sürekli bir seçim bombardımanıyla bunaldığında, kalan bilişsel kaynakları korumak için bilinçsizce kestirme yollar arar.",
          keywords: ["overwhelmed", "barrage", "conserve"]
        },
        {
          num: 5,
          en: "Typically, this manifests in two contrasting behavioral extremes: either becoming reckless and making impulsive, poorly considered decisions, or succumbing to decision paralysis by avoiding any choice whatsoever.",
          tr: "Bu durum tipik olarak iki zıt davranışsal uçta kendini gösterir: ya pervasızlaşıp fevri ve düşüncesizce kararlar vermek ya da hiçbir seçim yapmaktan kaçınarak karar felcine yenik düşmek.",
          keywords: ["manifests", "contrasting", "reckless", "impulsive", "succumbing to", "paralysis"]
        },
        {
          num: 6,
          en: "Consequently, high-performing individuals often streamline their daily routines—such as adopting uniform wardrobes or planning meals in advance—to preserve their executive decision-making bandwidth for high-stakes matters.",
          tr: "Sonuç olarak, yüksek başarı gösteren bireyler, yönetici karar verme kapasitelerini yüksek riskli/önemli konulara saklamak amacıyla günlük rutinlerini (örneğin tek tip kıyafet benimsemek veya öğünleri önceden planlamak gibi) sıklıkla sadeleştirirler.",
          keywords: ["streamline", "preserve", "bandwidth", "high-stakes"]
        }
      ],
      vocabulary: [
        {
          word: "deplete",
          type: "v.",
          level: "B2",
          meaningTr: "tüketmek, bitirmek, azaltmak",
          synonyms: ["exhaust", "drain", "diminish", "use up"],
          collocations: ["deplete energy", "deplete resources"],
          example: "Constant multi-tasking quickly depletes mental energy."
        },
        {
          word: "exertion",
          type: "n.",
          level: "C1",
          meaningTr: "aşırı çaba, efor, kendini zorlama",
          synonyms: ["strain", "effort", "struggle", "labor"],
          collocations: ["physical exertion", "mental exertion"],
          example: "Prolonged cognitive exertion leads to exhaustion."
        },
        {
          word: "barrage",
          type: "n.",
          level: "C1",
          meaningTr: "yaylım ateşi, peş peşe gelen yoğun bombardıman",
          synonyms: ["flood", "torrent", "onslaught", "stream"],
          collocations: ["barrage of questions", "barrage of choices"],
          example: "Consumers are faced with a continuous barrage of digital ads."
        },
        {
          word: "manifest",
          type: "v.",
          level: "B2",
          meaningTr: "kendini göstermek, ortaya çıkmak, tezahür etmek",
          synonyms: ["display", "exhibit", "reveal", "demonstrate"],
          collocations: ["manifest symptoms", "manifest in behavior"],
          example: "Stress often manifests in physical ailments and irritability."
        },
        {
          word: "reckless",
          type: "adj.",
          level: "B2",
          meaningTr: "pervasız, sorumsuz, düşüncesizce yapılan",
          synonyms: ["rash", "careless", "hasty", "heedless"],
          collocations: ["reckless decision", "reckless driving"],
          example: "Fatigued drivers often make reckless maneuvers on the road."
        },
        {
          word: "succumb to",
          type: "phr. v.",
          level: "C1",
          meaningTr: "yenik düşmek, boyun eğmek, karşı koyamamak",
          synonyms: ["yield to", "give in", "surrender to", "fall victim to"],
          collocations: ["succumb to temptation", "succumb to illness"],
          example: "When exhausted, people easily succumb to impulse purchases."
        },
        {
          word: "streamline",
          type: "v.",
          level: "B2",
          meaningTr: "sadeleştirmek, basitleştirip verimli hale getirmek",
          synonyms: ["simplify", "rationalize", "optimize"],
          collocations: ["streamline the process", "streamline daily routine"],
          example: "She streamlined her morning routine to save time and mental energy."
        }
      ],
      questions: [
        {
          id: "q7",
          number: 7,
          stem: "According to the passage, the human capacity for self-control and decision-making ----.",
          stemTr: "Parçaya göre, insanların özdenetim ve karar alma kapasitesi ----.",
          questionType: "Benzetme / Doğrudan Bilgi",
          targetLines: [2],
          options: [
            { key: "A", text: "improves significantly as an individual is exposed to more consecutive dilemmas" },
            { key: "B", text: "remains completely unaffected by the number of mundane choices made earlier in the day" },
            { key: "C", text: "acts similar to a muscle that runs out of stamina after continuous use" },
            { key: "D", text: "operates independently of biological energy stores and psychological rest" },
            { key: "E", text: "is inherently stronger in individuals who avoid consuming nutritious meals" }
          ],
          correctKey: "C",
          explanation: {
            correct: "2. cümlede 'function remarkably like a physical muscle; they possess a finite reservoir of energy that steadily depletes with prolonged exertion' (sürekli kullanımla gücü tükenen bir kas gibi işlediği) net biçimde ifade edilmiştir.",
            traps: {
              A: "Karar aldıkça geliştiği yönündeki iddia metnin tam zıddıdır.",
              B: "'completely unaffected' mutlakiyet tuzağı; aksine basit tercihler de enerjiyi tüketir.",
              D: "Biyolojik depolardan bağımsız değildir.",
              E: "Beslenmemekle iradenin güçlenmesi asılsızdır."
            }
          }
        },
        {
          id: "q8",
          number: 8,
          stem: "The author points out that when people experience decision fatigue, they may ----.",
          stemTr: "Yazar, insanlar karar yorgunluğu yaşadıklarında ---- yapabileceklerini belirtmektedir.",
          questionType: "Davranışsal Sonuç (Detail)",
          targetLines: [5],
          options: [
            { key: "A", text: "develop superior analytical abilities to solve highly complex mathematical puzzles" },
            { key: "B", text: "either act hastily without thinking or avoid making any decision at all" },
            { key: "C", text: "immediately consult professional counselors before proceeding with simple tasks" },
            { key: "D", text: "increase their cognitive bandwidth and resist commercial advertisements more easily" },
            { key: "E", text: "become completely immune to emotional stress and physical exhaustion" }
          ],
          correctKey: "B",
          explanation: {
            correct: "5. cümlede 'either becoming reckless and making impulsive, poorly considered decisions, or succumbing to decision paralysis by avoiding any choice whatsoever' denilmiştir. Bu durum B şıkkında 'either act hastily without thinking or avoid making any decision at all' şeklinde parafraz edilmiştir.",
            traps: {
              A: "Üstün analitik zeka kazanacakları iddiası saçma bir çeldiricidir.",
              C: "Her basit görevde uzman psikoloğa danışmak metinde geçmez.",
              D: "Bilişsel kapasiteyi artırmaz, tüketir.",
              E: "Strese karşı bağışıklık kazanılmaz."
            }
          }
        },
        {
          id: "q9",
          number: 9,
          stem: "It can be inferred from the passage that simplifying daily routines helps people ----.",
          stemTr: "Parçadan çıkarılabileceği üzere, günlük rutinleri basitleştirmek insanların ---- yardımcı olur.",
          questionType: "Çıkarım / Amaç (Inference)",
          targetLines: [6],
          options: [
            { key: "A", text: "eliminate the necessity of ever making difficult professional choices" },
            { key: "B", text: "guarantee that they will never feel physical tiredness in their muscles" },
            { key: "C", text: "reserve their mental energy for far more critical and consequential judgments" },
            { key: "D", text: "avoid interacting with colleagues and superiors in the workplace" },
            { key: "E", text: "completely replace all intuitive thinking with automated robotic algorithms" }
          ],
          correctKey: "C",
          explanation: {
            correct: "Son cümlede yüksek performanslı kişilerin 'streamline their daily routines... to preserve their executive decision-making bandwidth for high-stakes matters' (kritik ve önemli kararlar için zihinsel enerjilerini korumak) amacıyla rutinlerini sadeleştirdiği belirtilmiştir.",
            traps: {
              A: "'eliminate the necessity' zor kararları tamamen yok etmez.",
              B: "Kas yorgunluğunun hiç olmayacağını garanti etmez.",
              D: "İş yerinde insanlardan kaçmak amacıyla yapılmaz.",
              E: "İnsan düşüncesini robotlarla değiştirmekten bahsedilmez."
            }
          }
        }
      ]
    },
    {
      id: "passage_4",
      number: 4,
      title: "Ocean Acidification: The Unseen Ecological Crisis",
      category: "Çevre & Okyanus Bilimi",
      badge: "Ecology & Climate",
      icon: "droplet",
      summary: "Sanayi devriminden bu yana denizlerin karbondioksiti emerek asitlenmesi ve kabuklu deniz canlıları ile mercan resifleri üzerindeki yıkıcı etkileri incelenmektedir.",
      text: [
        {
          num: 1,
          en: "Since the onset of the Industrial Revolution, global oceans have absorbed approximately 30 percent of the anthropogenic carbon dioxide released into the Earth's atmosphere.",
          tr: "Sanayi Devrimi'nin başlangıcından bu yana küresel okyanuslar, Dünya atmosferine salınan insan kaynaklı karbondioksitin yaklaşık yüzde 30'unu emmiştir.",
          keywords: ["onset", "anthropogenic"]
        },
        {
          num: 2,
          en: "While this immense absorption has substantially mitigated the rate of atmospheric warming, it has simultaneously triggered a profound chemical transformation known as ocean acidification.",
          tr: "Bu muazzam emilim atmosferik ısınma hızını önemli ölçüde hafifletmiş olsa da, eş zamanlı olarak okyanus asitlenmesi olarak bilinen derin bir kimyasal dönüşümü tetiklemiştir.",
          keywords: ["mitigated", "simultaneously", "profound", "acidification"]
        },
        {
          num: 3,
          en: "When carbon dioxide dissolves in seawater, it reacts with water molecules to form carbonic acid, which subsequently releases hydrogen ions and lowers the pH of the marine environment.",
          tr: "Karbondioksit deniz suyunda çözündüğünde, su molekülleriyle reaksiyona girerek karbonik asit oluşturur; bu asit daha sonra hidrojen iyonları salarak deniz ortamının pH değerini düşürür.",
          keywords: ["dissolves", "subsequently"]
        },
        {
          num: 4,
          en: "This shift in chemistry dramatically depletes the concentration of carbonate ions, a vital chemical building block that marine calcifiers—such as corals, mollusks, and microscopic plankton—rely on to build and preserve their protective shells and skeletal structures.",
          tr: "Kimyadaki bu değişim; mercanlar, yumuşakçalar ve mikroskobik planktonlar gibi deniz kabuklularının koruyucu kabuklarını ve iskelet yapılarını inşa etmek ve korumak için güvendikleri hayati bir kimyasal yapı taşı olan karbonat iyonlarının yoğunluğunu ciddi biçimde azaltır.",
          keywords: ["depletes", "concentration", "calcifiers", "preserve"]
        },
        {
          num: 5,
          en: "If current emissions trajectories continue unabated, vulnerable coral reef ecosystems could dissolve faster than they can regenerate, threatening the collapse of marine food webs that support hundreds of millions of people worldwide.",
          tr: "Mevcut emisyon eğilimleri hız kesmeden devam ederse, hassas mercan resifi ekosistemleri yenilenme hızlarından daha hızlı eriyebilir ve bu da dünya çapında yüz milyonlarca insanı destekleyen deniz besin zincirlerinin çökme tehdidini doğurur.",
          keywords: ["trajectories", "unabated", "vulnerable", "regenerate", "collapse"]
        }
      ],
      vocabulary: [
        {
          word: "anthropogenic",
          type: "adj.",
          level: "C1",
          meaningTr: "insan kaynaklı, insan faaliyetlerinden doğan",
          synonyms: ["human-induced", "man-made", "artificial"],
          collocations: ["anthropogenic emissions", "anthropogenic climate change"],
          example: "Anthropogenic pollution has had a catastrophic effect on wildlife."
        },
        {
          word: "mitigate",
          type: "v.",
          level: "B2",
          meaningTr: "hafifletmek, azaltmak, etkisini düşürmek",
          synonyms: ["alleviate", "lessen", "reduce", "diminish"],
          collocations: ["mitigate risks", "mitigate global warming"],
          example: "Forest conservation helps mitigate the severity of droughts."
        },
        {
          word: "dissolve",
          type: "v.",
          level: "B2",
          meaningTr: "çözünmek, erimek, sıvı içinde dağılmak",
          synonyms: ["disintegrate", "melt", "liquefy"],
          collocations: ["dissolve in water", "dissolve completely"],
          example: "Sugar dissolves rapidly in hot water."
        },
        {
          word: "unabated",
          type: "adj.",
          level: "C1",
          meaningTr: "hız kesmeden, azalmadan, aralıksız",
          synonyms: ["relentless", "persistent", "unchecked", "continuous"],
          collocations: ["continue unabated", "unabated growth"],
          example: "If deforestation continues unabated, rain patterns will permanently shift."
        },
        {
          word: "regenerate",
          type: "v.",
          level: "B2",
          meaningTr: "kendini yenilemek, yeniden oluşmak, canlanmak",
          synonyms: ["renew", "restore", "revive", "rebuild"],
          collocations: ["regenerate tissue", "regenerate forests"],
          example: "Certain marine organisms can regenerate damaged bodily appendages."
        }
      ],
      questions: [
        {
          id: "q10",
          number: 10,
          stem: "It is understood from the passage that the absorption of carbon dioxide by the oceans ----.",
          stemTr: "Parçadan anlaşıldığına göre, karbondioksitin okyanuslar tarafından emilmesi ----.",
          questionType: "İkili Etki / Doğrudan Bilgi",
          targetLines: [2],
          options: [
            { key: "A", text: "has completely reversed the effects of global warming worldwide" },
            { key: "B", text: "has had the positive effect of slowing atmospheric warming while harming marine chemistry" },
            { key: "C", text: "occurred at a much higher rate prior to the beginning of the Industrial Revolution" },
            { key: "D", text: "is primarily driven by the respiration of deep-sea marine mammals" },
            { key: "E", text: "has produced an abundance of carbonate ions beneficial to corals" }
          ],
          correctKey: "B",
          explanation: {
            correct: "2. cümlede 'While this immense absorption has substantially mitigated the rate of atmospheric warming, it has simultaneously triggered a profound chemical transformation known as ocean acidification.' denmiştir. Yani havanın ısınmasını yavaşlatmış ancak deniz kimyasını bozmuştur.",
            traps: {
              A: "'completely reversed' küresel ısınmayı tamamen durdurup geri çevirmemiştir (Aşırı uç).",
              C: "Sanayi devriminden önce daha yüksek olduğu iddiası yanlıştır.",
              D: "Deniz memelilerinin solunumuyla oluşmaz.",
              E: "Karbonat iyonlarını bollaştırmaz, tam tersine tüketir (*depletes*)."
            }
          }
        },
        {
          id: "q11",
          number: 11,
          stem: "According to the passage, marine organisms such as corals and mollusks are harmed because ----.",
          stemTr: "Parçaya göre, mercanlar ve yumuşakçalar gibi deniz canlıları zarar görmektedir çünkü ----.",
          questionType: "Neden - Sonuç (Cause & Effect)",
          targetLines: [4],
          options: [
            { key: "A", text: "rising water temperatures cause them to migrate to polar regions" },
            { key: "B", text: "the acidification process reduces the carbonate ions needed to sustain their shells" },
            { key: "C", text: "commercial fishing vessels constantly destroy their natural breeding habitats" },
            { key: "D", text: "toxic metals released from sunken ships poison their digestive tracts" },
            { key: "E", text: "excess hydrogen ions stimulate an uncontrollable growth of predatory seaweed" }
          ],
          correctKey: "B",
          explanation: {
            correct: "4. cümlede asitlenmenin bu canlıların kabuk ve iskelet inşa etmek için muhtaç olduğu karbonat iyonlarını tükettiği ('dramatically depletes the concentration of carbonate ions... rely on to build and preserve their protective shells') belirtilmiştir.",
            traps: {
              A: "Kutuplara göç ettikleri bilgisi yoktur.",
              C: "Balıkçı gemilerinin tahribatı metin dışıdır.",
              D: "Gemi batıklarından zehirlenme uydurma çeldiricidir.",
              E: "Yırtıcı deniz yosunlarının büyümesi metinde yer almaz."
            }
          }
        },
        {
          id: "q12",
          number: 12,
          stem: "The author warns that if carbon dioxide emissions are not curbed, ----.",
          stemTr: "Yazar, karbondioksit salımları sınırlandırılmazsa ---- uyarısında bulunmaktadır.",
          questionType: "Uyarı / Koşullu Çıkarım",
          targetLines: [5],
          options: [
            { key: "A", text: "marine calcifiers will rapidly evolve into land-dwelling organisms" },
            { key: "B", text: "atmospheric oxygen levels will drop to zero within the next century" },
            { key: "C", text: "coral reefs could erode at a rate exceeding their natural regeneration, endangering marine food webs" },
            { key: "D", text: "global oceans will completely evaporate due to extreme chemical overheating" },
            { key: "E", text: "all industrial factories near coastlines will be immediately submerged by rising tides" }
          ],
          correctKey: "C",
          explanation: {
            correct: "Son cümlede 'vulnerable coral reef ecosystems could dissolve faster than they can regenerate, threatening the collapse of marine food webs' (mercan resifleri kendini yenileme hızından daha çabuk çözünebilir ve bu da deniz besin ağlarının çökmesine yol açabilir) uyarısı doğrudan verilmiştir.",
            traps: {
              A: "Karada yaşayan canlılara dönüşecekleri bilim dışı bir çeldiricidir.",
              B: "Oksijenin sıfıra ineceği iddiası aşırıdır.",
              D: "Okyanusların tamamen buharlaşacağı asılsızdır.",
              E: "Fabrikaların su altında kalması uyarısı yapılmamıştır."
            }
          }
        }
      ]
    },
    {
      id: "passage_5",
      number: 5,
      title: "The Evolution of Human Language and Cultural Transmission",
      category: "Sosyoloji & Dilbilim",
      badge: "Linguistics & Society",
      icon: "message-square",
      summary: "İnsan dilinin hayvan iletişiminden farkları (displacement, productivity) ve dilin kültürün nesiller arası aktarımında üstlendiği evrimsel rolü ele alır.",
      text: [
        {
          num: 1,
          en: "Unlike the communication systems of other animal species, which are predominantly restricted to fixed, immediate responses to environmental stimuli, human language is distinctively characterized by 'displacement' and 'productivity.'",
          tr: "Diğer hayvan türlerinin ağırlıklı olarak çevresel uyaranlara verilen sabit, anlık tepkilerle sınırlı olan iletişim sistemlerinin aksine, insan dili belirgin bir şekilde 'yer/zaman bağımsızlığı' (displacement) ve 'üretkenlik' (productivity) özellikleri ile ayrışır.",
          keywords: ["stimuli", "displacement", "productivity"]
        },
        {
          num: 2,
          en: "Displacement enables speakers to converse fluently about entities, events, and abstract concepts that are removed in time and space—such as recounting ancient history or envisioning speculative futures.",
          tr: "Yer/zaman bağımsızlığı, konuşucuların zamanda ve mekanda uzak olan varlıklar, olaylar ve soyut kavramlar hakkında akıcı bir şekilde konuşabilmelerini sağlar; örneğin antik tarihi anlatmak veya spekülatif gelecekler hayal etmek gibi.",
          keywords: ["converse", "entities", "speculative"]
        },
        {
          num: 3,
          en: "Productivity, on the other hand, refers to the infinite capacity of human grammar to combine a finite set of sounds and words into an infinite array of novel, meaningful sentences.",
          tr: "Üretkenlik ise, insan dilbilgisinin sınırlı sayıdaki ses ve kelimeyi sonsuz sayıda yeni ve anlamlı cümle halinde birleştirme yönündeki sınırsız kapasitesini ifade eder.",
          keywords: ["capacity", "finite", "array", "novel"]
        },
        {
          num: 4,
          en: "Evolutionary linguists argue that these linguistic hallmarks did not emerge overnight; rather, they evolved incrementally over hundreds of thousands of years alongside advancements in brain volume and complex social structures.",
          tr: "Evrimsel dilbilimciler, bu dilbilimsel ayırt edici özelliklerin bir gecede ortaya çıkmadığını; aksine beyin hacmindeki ve karmaşık sosyal yapılardaki ilerlemelerle birlikte yüz binlerce yıl boyunca kademeli olarak evrildiğini savunmaktadır.",
          keywords: ["hallmarks", "incrementally", "advancements"]
        },
        {
          num: 5,
          en: "As ancestral human bands grew larger and their collaborative endeavors—such as cooperative hunting and tool manufacture—became more intricate, language evolved from rudimentary gestural and vocal signals into a sophisticated symbolic medium that facilitated the cumulative transmission of culture across successive generations.",
          tr: "İlk insan toplulukları büyüdükçe ve işbirlikçi girişimleri (örneğin ortak avlanma ve alet yapımı gibi) daha karmaşık hale geldikçe, dil ilkel jestsel ve sesli sinyallerden, kültürün ardışık nesiller boyunca birikimli aktarımını kolaylaştıran sofistike sembolik bir araca dönüştü.",
          keywords: ["endeavors", "intricate", "rudimentary", "sophisticated", "facilitated", "cumulative", "successive"]
        }
      ],
      vocabulary: [
        {
          word: "displacement",
          type: "n.",
          level: "C1",
          meaningTr: "yer/zaman bağımsızlığı (burada ve şu anda olmayan şeylerden bahsedebilme)",
          synonyms: ["spatial-temporal freedom"],
          collocations: ["displacement in language", "linguistic displacement"],
          example: "Displacement allows humans to discuss historical events or imaginary scenarios."
        },
        {
          word: "productivity",
          type: "n.",
          level: "B2",
          meaningTr: "üretkenlik (dilbilimde sonsuz sayıda yeni cümle kurabilme kabiliyeti)",
          synonyms: ["generativity", "creativity", "inventiveness"],
          collocations: ["linguistic productivity", "infinite productivity"],
          example: "Linguistic productivity ensures we can create sentences never spoken before."
        },
        {
          word: "incrementally",
          type: "adv.",
          level: "C1",
          meaningTr: "kademeli olarak, azar azar, adım adım",
          synonyms: ["gradually", "progressively", "step-by-step"],
          collocations: ["evolve incrementally", "increase incrementally"],
          example: "Complex grammatical rules developed incrementally over generations."
        },
        {
          word: "hallmark",
          type: "n.",
          level: "C1",
          meaningTr: "belirleyici özellik, simge, ayırıcı nitelik",
          synonyms: ["trademark", "distinguishing feature", "characteristic"],
          collocations: ["hallmark of human intelligence", "hallmark of civilization"],
          example: "Abstract symbolism is a fundamental hallmark of human language."
        },
        {
          word: "endeavor",
          type: "n.",
          level: "C1",
          meaningTr: "yoğun çaba, girişim, büyük uğraş",
          synonyms: ["venture", "enterprise", "undertaking", "effort"],
          collocations: ["collaborative endeavor", "scientific endeavor"],
          example: "Space exploration is one of humanity's greatest collaborative endeavors."
        },
        {
          word: "rudimentary",
          type: "adj.",
          level: "B2",
          meaningTr: "ilkel, temel, henüz gelişmemiş",
          synonyms: ["primitive", "basic", "crude", "elementary"],
          collocations: ["rudimentary tools", "rudimentary signals"],
          example: "Early ancestors used rudimentary hand gestures to communicate danger."
        },
        {
          word: "cumulative",
          type: "adj.",
          level: "C1",
          meaningTr: "birikimli, giderek katlanan/artan",
          synonyms: ["collective", "additive", "accumulated"],
          collocations: ["cumulative effect", "cumulative transmission of culture"],
          example: "Scientific knowledge is cumulative; each discovery builds upon the past."
        }
      ],
      questions: [
        {
          id: "q13",
          number: 13,
          stem: "According to the passage, the concept of 'displacement' in human language refers to the ability to ----.",
          stemTr: "Parçaya göre, insan dilindeki 'displacement' (yer/zaman bağımsızlığı) kavramı ---- becerisini ifade eder.",
          questionType: "Tanım / Kavram Açıklama",
          targetLines: [2],
          options: [
            { key: "A", text: "communicate instantly with different animal species using basic hand gestures" },
            { key: "B", text: "talk about things, times, and ideas that are not physically present in the immediate surroundings" },
            { key: "C", text: "memorize thousands of foreign vocabulary words without formal grammar instruction" },
            { key: "D", text: "change one's vocal pitch and tone depending on emotional distress" },
            { key: "E", text: "replace written alphabets with digital binary code for faster electronic transmission" }
          ],
          correctKey: "B",
          explanation: {
            correct: "2. cümlede displacement açıkça 'enables speakers to converse fluently about entities, events, and abstract concepts that are removed in time and space' (zamanda ve mekanda uzak olan varlıklar ve soyut kavramlar hakkında konuşabilme) şeklinde açıklanmıştır. Bu da tam olarak B seçeneğidir.",
            traps: {
              A: "Hayvanlarla el hareketleriyle iletişim kurmak değildir.",
              C: "Yabancı kelime ezberlemekle ilgisi yoktur.",
              D: "Ses perdesini değiştirmek değildir.",
              E: "Alfabeyi ikili koda dönüştürmek alakasızdır."
            }
          }
        },
        {
          id: "q14",
          number: 14,
          stem: "It is clearly stated in the passage that human language ----.",
          stemTr: "Parçada açıkça belirtildiği üzere insan dili ----.",
          questionType: "Süreç / Doğrudan Bilgi",
          targetLines: [4],
          options: [
            { key: "A", text: "developed suddenly due to a single genetic mutation in early hominids" },
            { key: "B", text: "is essentially identical in scope and flexibility to animal communication systems" },
            { key: "C", text: "evolved step-by-step alongside increasing brain size and expanding social coordination" },
            { key: "D", text: "was strictly confined to vocal utterances and never incorporated physical gestures" },
            { key: "E", text: "declined in complexity once early humans established permanent agricultural settlements" }
          ],
          correctKey: "C",
          explanation: {
            correct: "4. cümlede dilin 'evolved incrementally over hundreds of thousands of years alongside advancements in brain volume and complex social structures' (beyin hacmi ve sosyal yapıdaki ilerlemelerle beraber kademeli olarak evrildiği) açıkça ifade edilir.",
            traps: {
              A: "'developed suddenly' (aniden gelişti) yanlıştır; metin 'did not emerge overnight' demektedir.",
              B: "Hayvan iletişimi ile aynı esneklikte değildir, çok daha üstündür.",
              D: "Sadece sese dayanmamıştır, jestler de yer almıştır (*rudimentary gestural and vocal signals*).",
              E: "Tarımla birlikte gerilediği iddia edilmemiştir."
            }
          }
        },
        {
          id: "q15",
          number: 15,
          stem: "One can infer from the passage that without the development of complex language, early humans would have ----.",
          stemTr: "Parçadan çıkarılabileceği üzere, karmaşık dil gelişimi olmasaydı ilk insanlar ----.",
          questionType: "Varsayımsal Çıkarım (Inference)",
          targetLines: [5],
          options: [
            { key: "A", text: "struggled to pass down cumulative cultural knowledge and complex skills to subsequent generations" },
            { key: "B", text: "been completely unable to survive in any terrestrial climate on Earth" },
            { key: "C", text: "developed telepathic communication methods to coordinate their hunts" },
            { key: "D", text: "avoided creating social groups and lived entirely solitary lifestyles" },
            { key: "E", text: "lost their capacity to feel emotions and respond to environmental danger" }
          ],
          correctKey: "A",
          explanation: {
            correct: "5. cümlenin sonunda dilin 'facilitated the cumulative transmission of culture across successive generations' (kültürün nesiller boyu birikimli aktarımını sağladığı) vurgulanmıştır. Dil olmasaydı kültür ve karmaşık becerilerin sonraki nesillere aktarılmasında büyük zorluk yaşanırdı.",
            traps: {
              B: "'completely unable to survive' (hiçbir iklimde hayatta kalamazlardı) aşırı genellemedir.",
              C: "Telepati geliştirecekleri kurgusal bir çeldiricidir.",
              D: "Tamamen yalnız yaşayacakları aşırı uç bir iddiadır.",
              E: "Duygularını ve tehlike tepkilerini kaybedecekleri bilgisi yoktur."
            }
          }
        }
      ]
    }
  ],
  tactics: [
    {
      title: "1. Soru Kökü Odaklı Hızlı Tarama (Reverse Reading)",
      content: "Paragrafa bodoslama dalmadan önce 3 sorunun kökünü okuyarak beyninizi arayacağı bilgiye programlayın. Soru 'It is clearly stated' (doğrudan bilgi) mi, 'The main reason why' (neden-sonuç) mu, yoksa 'It can be inferred' (çıkarım) mı istiyor? Böylece metni okurken cevabın geçtiği yerin altını ilk okuyuşta çizebilirsiniz."
    },
    {
      title: "2. Eş Anlamlı ve Parafraz (Paraphrasing) Yakalama",
      content: "ÖSYM doğru cevapta asla metindeki aynı söz dizimini vermez. Metindeki 'steadily depletes with prolonged exertion' ifadesi şıkta 'runs out of stamina after continuous use' veya 'vital building block' ifadesi 'essential chemical substance' olarak karşınıza çıkar. Kelime kelime değil, anlam eşleşmesi arayın."
    },
    {
      title: "3. Aşırı Genelleme ve Uç Kelimeler (Extreme Words)",
      content: "Şıklarda gördüğünüz 'solely, exclusively, only, completely, entirely, definitely, never, impossible, perfectly, all' gibi mutlakiyet bildiren kelimeler %90 oranında tuzaktır. Parçada 'bütün ötegezegenler' demiyorsa şıktaki 'all exoplanets' doğrudan elenmelidir."
    },
    {
      title: "4. Metin Dışı 'Genel Kültür' Tuzağı",
      content: "Öğrencilerin en çok düştüğü hata, şıktaki bilginin gerçek dünyada doğru olmasından ötürü onu işaretlemeleridir. Bir bilgi genel kültür olarak %100 doğru olsa bile, eğer metinde bahsedilmiyorsa ÖSYM için YANLIŞTIR."
    },
    {
      title: "5. Zaman ve Hız Yönetimi (YDT Timeboxing)",
      content: "1 paragraf metni ve 3 sorusu için ideal süre 3.5 - 4 dakikadır. 5 paragraftan oluşan toplam 15 soru için sınavda maksimum 18-20 dakika ayrılmalıdır. Bir soruya 1.5 dakikadan fazla takılmadan işaret koyup geçmek sınav stratejisinin temelidir."
    }
  ]
};

// Export if in node environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = YDT_DATA;
}
