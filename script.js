import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock, Calendar, Trophy, Flame, BookOpen, Brain, Map as MapIcon,
  CheckCircle2, ChevronRight, ChevronLeft, X, Sparkles, Zap, Target,
  Atom, Globe2, Languages, BookText, Timer as TimerIcon, Play, RotateCcw,
  Plus, Minus, Home as HomeIcon, ListChecks, Award, Star, ScrollText,
  Sigma, Swords, PartyPopper, Sun, Moon, MapPin
} from "lucide-react";

/* ============================================================================
   DATA — Comprehensive Class 10 CBSE Curriculum including Prashant Kirad Science
   Notes & Digraj Singh Rajput Social Science Marathon Notes
   ============================================================================ */

const ch = (name, marks, concepts) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name,
  marks,
  concepts: concepts.map(([t, d]) => ({ t, d })),
});

const SUBJECTS = [
  {
    id: "math",
    name: "Mathematics",
    code: "041 / 241",
    Icon: Sigma,
    color: "#6B58EE",
    glow: "rgba(107,88,238,0.45)",
    vaultLabel: "Detailed Theorem & Formula Bank",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("Real Numbers", "06M", [
        ["Euclid's Division Lemma", "Given positive integers a and b, unique integers q and r satisfy a = bq + r (0 ≤ r < b), forming the algorithmic foundation for HCF."],
        ["Fundamental Theorem of Arithmetic", "Every composite number factorises uniquely into prime factors, independent of order."],
        ["Irrationality Proofs (√2, √3, √5)", "Proved via contradiction by demonstrating that assumed rational forms lead to shared factors other than 1."],
      ]),
      ch("Polynomials", "Algebra · 20M", [
        ["Geometrical Meaning of Zeros", "The zeros of a polynomial p(x) correspond precisely to the x-intercepts of its graphical curve."],
        ["Sum & Product of Zeros", "For ax² + bx + c, sum of zeros α + β = −b/a, product αβ = c/a."],
        ["Division Algorithm", "p(x) = g(x)q(x) + r(x) where degree of remainder r(x) is strictly less than divisor g(x)."],
      ]),
      ch("Pair of Linear Equations in Two Variables", "Algebra", [
        ["Graphical Cases", "Lines can intersect (unique solution), be parallel (no solution), or coincide (infinite solutions)."],
        ["Consistency Ratios", "Unique solution condition: a₁/a₂ ≠ b₁/b₂."],
        ["Solution Methods", "Solved analytically via substitution, elimination, or cross-multiplication."],
      ]),
      ch("Quadratic Equations", "Algebra", [
        ["Standard Form", "ax² + bx + c = 0 where a ≠ 0."],
        ["Quadratic Formula", "x = (−b ± √(b² − 4ac)) / 2a."],
        ["Discriminant (D)", "D = b² − 4ac. Determines root nature: D > 0 (distinct real), D = 0 (equal real), D < 0 (no real roots)."],
      ]),
      ch("Arithmetic Progressions", "Algebra", [
        ["nth Term Formula", "aₙ = a + (n − 1)d where d is the constant common difference."],
        ["Sum of n Terms", "Sₙ = (n/2)[2a + (n − 1)d]."],
      ]),
      ch("Coordinate Geometry", "06M", [
        ["Distance Formula", "d = √[(x₂ − x₁)² + (y₂ − y₁)²]."],
        ["Section Formula", "Internal division coordinates: ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))."],
      ]),
      ch("Triangles", "Geometry · 15M", [
        ["Thales Theorem (BPT)", "A line parallel to one side of a triangle divides the other two sides in equal ratios."],
        ["Similarity Criteria", "AA, SSS, and SAS similarity criteria."],
        ["Pythagoras Theorem", "Hypotenuse square equals the sum of squares of the other two sides."],
      ]),
      ch("Circles", "Geometry", [
        ["Tangent Theorem", "The tangent at any point of a circle is perpendicular to the radius through the point of contact."],
        ["Tangent Lengths", "Tangents drawn from an external point to a circle have equal lengths."],
      ]),
      ch("Introduction to Trigonometry", "12M", [
        ["Trigonometric Ratios", "sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj."],
        ["Standard Identities", "sin²A + cos²A = 1, 1 + tan²A = sec²A, 1 + cot²A = cosec²A."],
      ]),
      ch("Heights and Distances", "Trig application", [
        ["Line of Sight", "Angles of elevation look upward from the horizontal; angles of depression look downward."],
      ]),
      ch("Areas Related to Circles", "Mensuration · 10M", [
        ["Sector Area Formula", "(θ / 360°) × πr² and corresponding arc length."],
      ]),
      ch("Surface Areas and Volumes", "Mensuration", [
        ["Combined Solids & Frustum", "Summing outer areas for combined solids; Frustum volume = (⅓)πh(r₁² + r₂² + r₁r₂)."],
      ]),
      ch("Statistics", "11M", [
        ["Central Tendencies", "Direct/assumed mean methods, median via cumulative frequency, and modal class estimation."],
      ]),
      ch("Probability", "part of Statistics", [
        ["Classical Probability", "P(E) = (Favorable outcomes) / (Total outcomes). 0 ≤ P(E) ≤ 1."],
      ]),
    ],
  },
  {
    id: "science",
    name: "Science",
    code: "086",
    Icon: Atom,
    color: "#0E9E8B",
    glow: "rgba(14,158,139,0.45)",
    vaultLabel: "Prashant Kirad Concise Science Notes",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("Chemical Reactions and Equations", "Unit I · 25M", [
        ["Chemical Equations & Balancing", "Mass is conserved in reactions (Lavoisier's Law). Balance equations by equating atom counts on reactants and products sides. Example: Mg + O₂ → MgO unbalanced becomes 2Mg + O₂ → 2MgO."],
        ["Types of Chemical Reactions", "Combination (A+B→C), Decomposition (AB→A+B, requires energy like heat/electricity/light), Displacement (more reactive element displaces less reactive one, e.g., Fe + CuSO₄ → FeSO₄ + Cu), Double Displacement (exchange of ions)."],
        ["Oxidation & Reduction", "Oxidation is gain of oxygen or loss of hydrogen. Reduction is gain of hydrogen or loss of oxygen. Redox reactions occur simultaneously. Everyday effects: Corrosion (rusting of iron) and Rancidity (oxidation of fats/oils in food prevented by antioxidants/nitrogen flushing)."],
      ]),
      ch("Acids, Bases and Salts", "Unit I", [
        ["Properties of Acids and Bases", "Acids furnish H⁺ ions in water, turn blue litmus red, and have pH < 7. Bases furnish OH⁻ ions, turn red litmus blue, and have pH > 7. Indicators like litmus, methyl orange, and phenolphthalein signal endpoints."],
        ["Chemical Properties & Neutralization", "Acid + Base → Salt + Water. Acids react with metals to evolve hydrogen gas (tested with a burning candle popping). Acids react with metal carbonates/bicarbonates to release CO₂ gas (turns lime water milky)."],
        ["Important Chemical Compounds", "Sodium Hydroxide (Chlor-alkali process: 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂), Bleaching Powder (CaOCl₂), Baking Soda (NaHCO₃), Washing Soda (Na₂CO₃·10H₂O), and Plaster of Paris (CaSO₄·½H₂O)."],
      ]),
      ch("Metals and Non-metals", "Unit I", [
        ["Physical & Chemical Properties", "Metals are malleable, ductile, lustrous, good conductors, and form basic oxides. Non-metals are brittle, poor conductors, and form acidic/neutral oxides."],
        ["Reactivity Series", "K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Hg > Ag > Au. Metals above hydrogen react with dilute acids to evolve H₂ gas."],
        ["Metallurgy & Ionic Bonding", "Ionic compounds form via complete electron transfer, possessing high melting points. Metallurgy involves ore concentration, conversion to oxides (roasting/calcination), reduction, and electrolytic refining."],
      ]),
      ch("Carbon and its Compounds", "Unit I", [
        ["Covalent Bonding & Catenation", "Carbon shares 4 valence electrons to attain stable octets, forming strong covalent bonds. Catenation is carbon's unique self-linking property forming long chains and rings."],
        ["Functional Groups & Homologous Series", "Functional groups like Halogens, Alcohols (−OH), Aldehydes (−CHO), Ketones (>C=O), and Carboxylic Acids (−COOH) dictate chemical characteristics across homologous series differing by −CH₂−."],
        ["Soaps and Detergents", "Soaps are sodium/potassium salts of fatty acids. Micelles trap greasy dirt inside hydrophobic tails while hydrophilic heads dissolve in water."],
      ]),
      ch("Life Processes", "Unit II · 25M", [
        ["Nutrition & Photosynthesis", "Autotrophic nutrition via chlorophyll and sunlight: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Heterotrophic nutrition involves ingestion and intracellular/extracellular digestion."],
        ["Respiration", "Aerobic respiration yields 38 ATP using oxygen in mitochondria. Anaerobic respiration occurs without oxygen (yeast produces ethanol; muscle cells produce lactic acid)."],
        ["Transportation & Excretion", "Human heart features double circulation separating oxygenated and deoxygenated blood. Nephrons in human kidneys filter nitrogenous metabolic waste (urea) to form urine."],
      ]),
      ch("Control and Co-ordination", "Unit II", [
        ["Nervous System & Reflex Arc", "Neurons transmit electrical impulses across synapses. Reflex arcs bypass the brain for instantaneous, involuntary protective responses."],
        ["Plant & Animal Hormones", "Plant hormones (Auxin, Gibberellin, Cytokinin, Abscisic Acid) control growth and phototropism/geotropism. Animal endocrine hormones (insulin, thyroxine, adrenaline, growth hormone) regulate metabolism and stress response."],
      ]),
      ch("Reproduction", "Unit II", [
        ["Asexual & Sexual Reproduction", "Asexual modes include fission, budding, fragmentation, regeneration, and spore formation. Sexual reproduction introduces genetic variation via gametic fusion."],
        ["Human Reproductive Health", "Barrier, chemical, IUD, and surgical birth control methods manage population growth and prevent STIs like HIV/AIDS."],
      ]),
      ch("Heredity", "Unit II", [
        ["Mendel's Laws", "Law of Segregation and Law of Independent Assortment govern phenotypic and genotypic trait inheritance."],
        ["Sex Determination", "Human males (XY) and females (XX) determine offspring gender depending on whether the fertilizing sperm carries an X or Y chromosome."],
      ]),
      ch("Light – Reflection and Refraction", "Unit III · 12M", [
        ["Mirrors & Lenses", "Mirror formula: 1/v + 1/u = 1/f. Lens formula: 1/v − 1/u = 1/f. Power of lens P = 1/f (in meters, measured in Dioptres)."],
        ["Human Eye & Vision Defects", "Myopia corrected with concave lenses; hypermetropia corrected with convex lenses. Dispersion through prisms creates spectra."],
      ]),
      ch("Electricity", "Unit IV · 13M", [
        ["Ohm's Law & Circuits", "V = IR. Series resistance: R_s = R₁ + R₂ + ... Parallel resistance: 1/R_p = 1/R₁ + 1/R₂ + ... Power P = VI = I²R = V²/R."],
      ]),
      ch("Magnetic Effects of Electric Current", "Unit IV", [
        ["Electromagnetism", "Magnetic field lines around current-carrying wires and solenoids. Fleming's Left-Hand Rule (motor rule) and Right-Hand Thumb Rule."],
      ]),
      ch("Our Environment", "Unit V · 05M", [
        ["Ecosystem Dynamics", "Energy flow follows the 10% trophic law. Ozone layer depletion is caused by chlorofluorocarbons (CFCs), damaging UV radiation filters."],
      ]),
    ],
  },
  {
    id: "sst",
    name: "Social Science",
    code: "087",
    Icon: Globe2,
    color: "#D96B1E",
    glow: "rgba(217,107,30,0.45)",
    vaultLabel: "Digraj Singh Rajput Marathon Vault",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("The Rise of Nationalism in Europe", "History · 20M", [
        ["French Revolution (1789)", "First explicit expression of nationalism; transferred sovereignty from absolute monarchs to French citizens using symbols like la patrie and le citoyen."],
        ["Napoleon's Civil Code (1804)", "Abolished birth-based privileges, secured equality before the law, standardized weights/measures, and dismantled feudal systems across conquered European territories."],
        ["Unification of Germany & Italy", "German unification (1871) was engineered by Otto von Bismarck via three wars. Italian unification was led by Cavour, Garibaldi, and King Victor Emmanuel II."],
      ]),
      ch("Nationalism in India", "History · 20M", [
        ["Non-Cooperation Movement (1920–22)", "Launched by Mahatma Gandhi after WWI hardships, Rowlatt Act, and Jallianwala Bagh massacre; suspended following the Chauri Chaura violent clash."],
        ["Civil Disobedience & Salt March (1930)", "Began with the 240-mile Dandi March defying British salt monopolies, uniting diverse societal groups across India."],
        ["Quit India Movement (1942)", "Radical mass struggle launched at the Bombay Congress session with the slogan 'Do or Die' demanding immediate British departure."],
      ]),
      ch("The Making of a Global World", "History · 20M", [
        ["Silk Routes & Pre-Modern Trade", "Vibrant overland and sea networks connecting Asia, Europe, and Africa, facilitating the exchange of silk, pottery, spices, and spiritual philosophies like Buddhism."],
        ["Conquest and Diseases", "European colonisation of the Americas was significantly aided by lethal Old World diseases like smallpox, against which native populations lacked immunity."],
      ]),
      ch("The Age of Industrialisation", "History · 20M", [
        ["Proto-Industrialisation", "Early phase of decentralized production where rural peasants produced goods for international merchant capitalists."],
        ["Industrial Mechanisation", "Inventions like James Hargreaves' Spinning Jenny (1764) accelerated textile output, transforming Britain into the 'workshop of the world'."],
      ]),
      ch("Print Culture and the Modern World", "History · 20M", [
        ["Gutenberg's Printing Press (1440s)", "Combined movable metal type with winepress mechanics, sparking the print revolution and lowering book production costs."],
        ["Impact on Reform & Revolution", "Enabled Martin Luther's Ninety-Five Theses, fuelled the Protestant Reformation, and popularized Enlightenment ideas preceding the French Revolution."],
      ]),
      ch("Resources and Development", "Geography · 20M", [
        ["Resource Planning", "Essential strategy for sustainable utilization, especially given India's uneven resource distribution. Highlighted globally during the 1992 Rio Earth Summit (Agenda 21)."],
        ["Land Degradation & Soils", "Driven by mining (Jharkhand/Odisha), overgrazing, and over-irrigation (Punjab/Haryana). Categorized into Alluvial, Black, Red/Yellow, Laterite, Arid, and Forest soils."],
      ]),
      ch("Forest and Wildlife Resources", "Geography · 20M", [
        ["Conservation Initiatives", "Wildlife Protection Act (1972) and Project Tiger (1973). Forests classified into Reserved, Protected, and Unclassed categories."],
        ["Community Conservation", "Sacred groves, the Chipko movement, and Joint Forest Management (JFM) reflect traditional Indian ecological preservation."],
      ]),
      ch("Water Resources", "Geography · 20M", [
        ["Multipurpose River Projects", "Dams ('temples of modern India') provide irrigation and electricity but cause ecological fragmentation and displacement. Traditional rooftop rainwater harvesting remains a viable alternative."],
      ]),
      ch("Agriculture", "Geography · 20M", [
        ["Cropping Seasons", "Kharif (monsoon: paddy, maize), Rabi (winter: wheat, barley), and Zaid (summer: watermelon, cucumber). Staple crops include rice, wheat, millets, and pulses."],
      ]),
      ch("Minerals and Energy Resources", "Geography · 20M", [
        ["Mineral Ores & Energy", "Metallic (ferrous iron ore, non-ferrous copper/bauxite) and non-metallic (mica, limestone). Conventional energy (coal, petroleum) versus non-conventional clean energy (solar, wind, tidal, nuclear)."],
      ]),
      ch("Manufacturing Industries", "Geography · 20M", [
        ["Industrial Significance", "Modernises agriculture, eradicates unemployment, and earns foreign exchange. Grouped into agro-based (cotton, jute, sugar) and mineral-based (iron & steel, aluminium smelting, chemical) industries."],
      ]),
      ch("Lifelines of National Economy", "Geography · 20M", [
        ["Transport Networks", "Roadways, dense railway networks, pipelines, waterways, and international airways connect remote regions and drive international trade."],
      ]),
      ch("Power-sharing", "Political Science · 20M", [
        ["Belgium vs Sri Lanka", "Belgium successfully accommodated linguistic diversity via power-sharing and community governments; Sri Lanka's Sinhala-majoritarian policies triggered a prolonged civil war."],
      ]),
      ch("Federalism", "Political Science · 20M", [
        ["Indian Federal System", "Features a three-tier government with legislative powers split across Union, State, and Concurrent lists. Strengthened by the 1992 constitutional decentralisation amendment."],
      ]),
      ch("Gender, Religion and Caste", "Political Science · 20M", [
        ["Social Divisions in Politics", "Addresses patriarchal disadvantages, secular state principles (no official state religion), and how caste equations influence political mobilization."],
      ]),
      ch("Political Parties", "Political Science · 20M", [
        ["Party Systems & Challenges", "India operates a robust multi-party system. Key challenges include lack of internal democracy, dynastic succession, money/muscle power, and limited voter choices."],
      ]),
      ch("Outcomes of Democracy", "Political Science · 20M", [
        ["Democratic Efficacy", "Democracy produces accountable, responsive, and legitimate governance, promotes individual dignity and freedom, and accommodates social diversity."],
      ]),
      ch("Development", "Economics · 20M", [
        ["Economic Metrics", "Evaluated using Per Capita Income, Infant Mortality Rate, Literacy Rate, and Net Attendance Ratio. The UNDP publishes the Human Development Index (HDI)."],
      ]),
      ch("Sectors of the Indian Economy", "Economics · 20M", [
        ["Sectoral Breakdown", "Primary (agriculture), Secondary (manufacturing), and Tertiary (services). Distinguishes between secure Organised sectors and unprotected Unorganised sectors."],
      ]),
      ch("Money and Credit", "Economics · 20M", [
        ["Credit Systems", "Compares regulated Formal credit (banks, cooperatives) against exploitative Informal credit (moneylenders). Self-Help Groups (SHGs) empower rural women without collateral."],
      ]),
      ch("Globalisation and the Indian Economy", "Economics · 20M", [
        ["Liberalisation (1991)", "Removal of trade barriers that integrated Indian markets globally, facilitated by Multinational Corporations (MNCs) and rapid advancements in IT."],
      ]),
    ],
  },
  {
    id: "english",
    name: "English",
    code: "184",
    Icon: BookText,
    color: "#D92E79",
    glow: "rgba(217,46,121,0.45)",
    vaultLabel: "Grammar & Chapter Summaries",
    tagline: "Lang. & Literature · 80 + 20",
    chapters: [
      ch("Unseen Passage Comprehension", "Reading · 20M", [
        ["Skimming & Scanning", "Read questions beforehand, scan text for keywords, and answer with precise analytical inference."],
      ]),
      ch("Determiners & Tenses", "Grammar", [
        ["Grammar Essentials", "Articles, quantifiers, and tense consistency rules for error-correction and gap-filling tasks."],
      ]),
      ch("Modals & Reported Speech", "Grammar", [
        ["Transformation Rules", "Mastering auxiliary modal verbs and backshifting tenses in indirect speech conversions."],
      ]),
      ch("Formal Letter & Analytical Paragraph", "Writing", [
        ["Writing Formats", "Strict formal letter layout and data-driven analytical paragraph writing based on charts and graphs."],
      ]),
      ch("A Letter to God", "First Flight Summary", [
        ["Plot Summary", "Lencho's crops are destroyed by a hailstorm. With profound faith, he writes a letter to God asking for 100 pesos."],
        ["Character & Irony", "Post office staff collect money to help him, but Lencho suspects them of stealing part of the funds."],
      ]),
      ch("Nelson Mandela: Long Walk to Freedom", "First Flight Summary", [
        ["Plot Summary", "Autobiographical account of South Africa's 1994 inauguration, reflecting on courage, sacrifice, and true freedom."],
      ]),
      ch("Two Stories about Flying", "First Flight Summary", [
        ["Part 1 & 2", "A young seagull overcomes his fear of flying; a pilot is mysteriously guided through a severe storm."],
      ]),
      ch("From the Diary of Anne Frank", "First Flight Summary", [
        ["Plot Summary", "Excerpts detailing Anne's life, thoughts, and reflections while hiding from Nazi persecution in Amsterdam."],
      ]),
      ch("Glimpses of India", "First Flight Summary", [
        ["Travelogues", "Portraits of Goan baking traditions, Coorg's martial culture, and Assamese tea plantations."],
      ]),
      ch("Mijbil the Otter", "First Flight Summary", [
        ["Plot Summary", "Gavin Maxwell's delightful experiences keeping and traveling with an intelligent pet otter named Mijbil."],
      ]),
      ch("Madam Rides the Bus", "First Flight Summary", [
        ["Plot Summary", "Valli's determined solo bus journey that opens her eyes to the wonders and bittersweet realities of life."],
      ]),
      ch("The Sermon at Benares", "First Flight Summary", [
        ["Plot Summary", "Buddha's profound lesson to grieving Kisa Gotami that death and suffering are universal human truths."],
      ]),
      ch("The Proposal", "First Flight Summary", [
        ["Plot Summary", "A satirical Russian play by Anton Chekhov where a marriage proposal dissolves into comical property arguments."],
      ]),
      ch("Poems of First Flight", "10 Poems Summary", [
        ["Poetic Themes", "Covers 'Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo', 'The Ball Poem', 'Amanda!', and 'Custard the Dragon'."],
      ]),
      ch("A Triumph of Surgery", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Dr. Herriot restores an overfed, pampered dog named Tricki to health through simple diet and exercise."],
      ]),
      ch("The Thief's Story", "Footprints w/o Feet Summary", [
        ["Plot Summary", "A young thief named Hari Singh undergoes a moral transformation after being shown trust and kindness by Anil."],
      ]),
      ch("The Midnight Visitor", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Ausable, an unconventional secret agent, outwits an armed intruder using quick wit and a fabricated balcony story."],
      ]),
      ch("A Question of Trust", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Horace Danby, a meticulous safe-cracker, is outsmarted and framed by a cunning female cat burglar."],
      ]),
      ch("Footprints without Feet", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Griffin discovers invisibility but misuses his scientific breakthrough, descending into lawlessness and chaos."],
      ]),
      ch("The Making of a Scientist", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Richard Ebright's childhood curiosity about monarch butterflies sparks a lifelong career in cellular and genetic research."],
      ]),
      ch("The Necklace", "Footprints w/o Feet Summary", [
        ["Plot Summary", "Mathilde suffers years of poverty replacing a lost diamond necklace, only to learn late it was a cheap imitation."],
      ]),
      ch("Bholi", "Footprints w/o Feet Summary", [
        ["Plot Summary", "A neglected, stammering girl transforms through education and courageously rejects an exploitative groom."],
      ]),
      ch("The Book That Saved the Earth", "Footprints w/o Feet Summary", [
        ["Plot Summary", "A 25th-century Martian invasion is averted because aliens misinterpret Mother Goose nursery rhymes as military tactics."],
      ]),
    ],
  },
  {
    id: "sanskrit",
    name: "Sanskrit",
    code: "119",
    Icon: Languages,
    color: "#B8860B",
    glow: "rgba(184,134,11,0.45)",
    vaultLabel: "Vyakaran & Shabda Vault",
    tagline: "Communicative · 80 + 20",
    chapters: [
      ch("Upthita-Avabodhanam", "10M", [
        ["Unseen Passage Rules", "Read questions carefully before reading the prose passage. Focus on exact word forms for one-word answers and full-sentence responses."],
      ]),
      ch("Patra Lekhanam (Letter Writing)", "Rachana · 15M", [
        ["Formal & Informal Letters", "Includes proper salutations (sambodhanam), body paragraphs, and closings using the Manjusha help box."],
      ]),
      ch("Chitra Varnanam (Picture Description)", "Rachana · 15M", [
        ["Visual Description Rules", "Construct 5 grammatically correct sentences in the present tense (lat lakar) based on picture cues."],
      ]),
      ch("Katha/Samvada Purti", "Rachana · 15M", [
        ["Story & Dialogue Completion", "Fill blanks in narratives or dialogues by matching case endings and subject-verb agreements."],
      ]),
      ch("Sandhi Rules", "Vyakaran · 25M", [
        ["Swar, Vyanjan & Visarga Sandhi", "Master vowel joining rules, consonant substitutions, and visarga transformations."],
      ]),
      ch("Samasa (Compound Words)", "Vyakaran · 25M", [
        ["Tatpurusha, Dvigu & Bahuvrihi", "Deconstruct compound words (vigraha) and form single compound terms with appropriate case rules."],
      ]),
      ch("Suffixes: Krit, Taddhit, Stree", "Vyakaran · 25M", [
        ["Pratyaya Rules", "Krit suffixes (tavya, aniyar), secondary taddhit suffixes, and feminine stree suffixes."],
      ]),
      ch("Voice Transformation (Vachya)", "Vyakaran · 25M", [
        ["Kartari & Karmani Vachya", "Convert active voice sentences into passive voice in the present tense."],
      ]),
      ch("Time-telling (Samay)", "Vyakaran · 25M", [
        ["Sanskrit Time Expressions", "Express exact hours, half-hours (sardha), quarters past (sapad), and quarters to (padon)."],
      ]),
      ch("Indeclinables (Avyaya)", "Vyakaran · 25M", [
        ["Fixed Words", "Words like atra, tatra, sada, kada, api, and ca that remain unchanged across genders and cases."],
      ]),
      ch("Error Correction", "Vyakaran · 25M", [
        ["Syntax Corrections", "Identify and correct errors in noun cases, verb tenses, and agreement."],
      ]),
      ch("Vaingmayam Tapah", "Pathita · 30M", [
        ["Chapter Summary", "Emphasises that truthful, pleasant, and thoughtful speech is the greatest form of spiritual discipline."],
      ]),
      ch("Nasti Tyagasamam Sukham", "Pathita · 30M", [
        ["Chapter Summary", "Teaches that true, lasting happiness comes from renunciation and self-sacrifice rather than material accumulation."],
      ]),
      ch("Ramaniya Hi Srishtih Esha", "Pathita · 30M", [
        ["Chapter Summary", "Describes the sublime beauty of nature and creation, inspiring reverence for the natural world."],
      ]),
      ch("Ajna Gurunam", "Pathita · 30M", [
        ["Chapter Summary", "Highlights the absolute duty of students to follow teachers' instructions without hesitation."],
      ]),
      ch("Abhyasavashagam Manah", "Pathita · 30M", [
        ["Chapter Summary", "Explains that the restless human mind can only be subdued and controlled through persistent practice."],
      ]),
      ch("Rashtra Samrakshyam", "Pathita · 30M", [
        ["Chapter Summary", "Outlines the fundamental patriotic duty of every citizen to protect and serve their motherland."],
      ]),
      ch("Sadhuvrittim", "Pathita · 30M", [
        ["Chapter Summary", "Illustrates the noble, righteous conduct and moral integrity exhibited by virtuous individuals."],
      ]),
      ch("Tirukkural (in Sanskrit)", "Pathita · 30M", [
        ["Chapter Summary", "Sanskrit translation of classical Tamil couplets offering timeless wisdom on ethics, friendship, and virtue."],
      ]),
      ch("Suswagatam Bho!", "Pathita · 30M", [
        ["Chapter Summary", "Focuses on traditional Indian hospitality and the etiquette of welcoming guests with open arms."],
      ]),
      ch("Kalo'ham", "Pathita · 30M", [
        ["Chapter Summary", "An allegorical reflection on the unstoppable, eternal power of Time (Kala) that governs all creation."],
      ]),
    ],
  },
];

/* ============================================================================
   QUIZ BANK
   ============================================================================ */

const QUIZ_BANK = {
  math: [
    { q: "The discriminant of ax² + bx + c = 0 is:", opts: ["b² − 4ac", "b² + 4ac", "2b − 4ac", "b² − 4a"], a: 0, pyq: true },
    { q: "HCF × LCM of two numbers equals:", opts: ["Their sum", "Product of the numbers", "Their difference", "Their average"], a: 1 },
    { q: "The nth term of an AP is:", opts: ["a + nd", "a + (n − 1)d", "a − (n − 1)d", "na + d"], a: 1, pyq: true },
    { q: "sin²A + cos²A equals:", opts: ["0", "1", "2", "tan A"], a: 1 },
    { q: "Distance between (x1,y1) and (x2,y2) is:", opts: ["(x2−x1)+(y2−y1)", "√[(x2−x1)²+(y2−y1)²]", "(x2−x1)²+(y2−y1)²", "x2y2 − x1y1"], a: 1 },
    { q: "Area of a sector with angle θ, radius r:", opts: ["(θ/360)πr²", "(θ/180)πr²", "2πr", "πr²"], a: 0, pyq: true },
  ],
  science: [
    { q: "The pH of a neutral solution is:", opts: ["0", "7", "14", "1"], a: 1 },
    { q: "Gas evolved when a metal reacts with dilute acid:", opts: ["Oxygen", "Hydrogen", "Nitrogen", "CO2"], a: 1, pyq: true },
    { q: "Ohm's Law states:", opts: ["V = I/R", "V = IR", "V = I + R", "V = I − R"], a: 1 },
    { q: "The functional group −COOH represents:", opts: ["Alcohol", "Ketone", "Carboxylic acid", "Aldehyde"], a: 2 },
    { q: "Which part of a neuron receives signals?", opts: ["Axon", "Dendrite", "Synapse", "Nucleus"], a: 1, pyq: true },
    { q: "Power of a lens is measured in:", opts: ["Watt", "Dioptre", "Joule", "Ohm"], a: 1 },
  ],
  sst: [
    { q: "The Dandi Salt March took place in:", opts: ["1920", "1930", "1942", "1857"], a: 1, pyq: true },
    { q: "Defence and Foreign Affairs fall under the:", opts: ["State List", "Union List", "Concurrent List", "Residuary powers"], a: 1 },
    { q: "The Green Revolution mainly boosted:", opts: ["Cotton", "Wheat & Rice", "Tea", "Jute"], a: 1, pyq: true },
    { q: "HDI stands for:", opts: ["Human Development Index", "Health Development Index", "Human Deprivation Index", "High Development Index"], a: 0 },
    { q: "Formal sources of credit include:", opts: ["Moneylenders", "Banks & Cooperatives", "Traders", "Relatives"], a: 1 },
    { q: "The Congress of Vienna was held in:", opts: ["1789", "1815", "1848", "1871"], a: 1 },
  ],
  english: [
    { q: "In 'A Letter to God', Lencho writes his letter to:", opts: ["The postman", "God", "The bank manager", "His neighbour"], a: 1, pyq: true },
    { q: "'Fire and Ice' was written by:", opts: ["Robert Frost", "William Wordsworth", "John Keats", "Rudyard Kipling"], a: 0 },
    { q: "In reported speech, 'will' changes to:", opts: ["shall", "would", "can", "must"], a: 1, pyq: true },
    { q: "Which article is used before a vowel sound?", opts: ["a", "an", "the", "some"], a: 1 },
    { q: "In 'The Thief's Story', Hari Singh ultimately:", opts: ["Steals more money", "Returns and reforms", "Gets arrested", "Runs away abroad"], a: 1 },
    { q: "Subject and verb must agree in:", opts: ["Tense only", "Number and person", "Gender", "Voice"], a: 1 },
  ],
  sanskrit: [
    { q: "'Sandhi' refers to:", opts: ["Compound words", "Joining of sounds", "Verb conjugation", "Case endings"], a: 1 },
    { q: "'Kartari Vachya' refers to:", opts: ["Passive voice", "Active voice", "Future tense", "Imperative mood"], a: 1, pyq: true },
    { q: "'Avyaya' words do not change according to:", opts: ["Meaning", "Gender/number/case", "Context", "Sound"], a: 1 },
    { q: "'Nasti Tyagasamam Sukham' teaches that happiness lies in:", opts: ["Wealth", "Sacrifice", "Fame", "Power"], a: 1 },
    { q: "'Krit-pratyaya' suffixes form:", opts: ["Feminine nouns", "Verbal nouns/adjectives", "Plural nouns", "Compound words"], a: 1 },
    { q: "A formal Sanskrit letter begins with:", opts: ["Vishayam", "Sambodhanam", "Iti", "Prashna"], a: 1 },
  ],
};

/* ============================================================================
   SOCIAL SCIENCE — INDIA MAP DATA
   ============================================================================ */

const LIFELINES_ID = "lifelines-of-national-economy";

const SST_MAP_LOCATIONS = {
  "resources-and-development": [
    { x: 148, y: 148, label: "Pan-India resource base — land, soil & minerals surveyed nationwide." },
  ],
  "forest-and-wildlife-resources": [
    { x: 106, y: 216, label: "Western Ghats & central forest belts — key wildlife corridors." },
  ],
  "water-resources": [
    { x: 140, y: 166, label: "Narmada valley & major river basins — multipurpose dam projects." },
  ],
  "agriculture": [
    { x: 122, y: 76, label: "Punjab & Haryana — Green Revolution's wheat heartland." },
  ],
  "minerals-and-energy-resources": [
    { x: 184, y: 172, label: "Chota Nagpur Plateau — India's mineral & coal belt." },
  ],
  "manufacturing-industries": [
    { x: 92, y: 158, label: "Mumbai–Ahmedabad corridor — cotton textile & petrochemical hub." },
  ],
  "nationalism-in-india": [
    { x: 115, y: 60, label: "Amritsar, Punjab — Jallianwala Bagh massacre (1919), the spark for Non-Cooperation." },
    { x: 178, y: 115, label: "Champaran, Bihar — site of Gandhi's first Satyagraha (1917)." },
    { x: 165, y: 95, label: "Chauri Chaura, U.P. — violence that led Gandhi to call off Non-Cooperation (1922)." },
    { x: 85, y: 140, label: "Sabarmati, Gujarat — the ashram from where the 1930 Salt March began." },
    { x: 80, y: 165, label: "Dandi, Gujarat — where Gandhi broke the salt law, ending the march." },
  ],
};

const QUAD_CITIES = [
  { name: "Delhi", x: 140, y: 88 },
  { name: "Kolkata", x: 205, y: 158 },
  { name: "Chennai", x: 168, y: 262 },
  { name: "Mumbai", x: 98, y: 188 },
];

/* ============================================================================
   HELPERS
   ============================================================================ */

const BOARD_EXAM_DATE = new Date("2027-02-15T09:00:00");

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

function marksNum(label) {
  const m = String(label).match(/(\d+)M/);
  return m ? parseInt(m[1], 10) : 8;
}

function allChapters() {
  const out = [];
  SUBJECTS.forEach((s) =>
    s.chapters.forEach((c) => out.push({ subjectId: s.id, subjectName: s.name, color: s.color, ...c }))
  );
  return out;
}

async function loadProgress() {
  try {
    const res = await window.storage.get("progress");
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
async function saveProgress(p) {
  try {
    await window.storage.set("progress", JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

const DEFAULT_PROGRESS = { xp: 0, streak: 0, lastActive: null, done: {}, quizHistory: [], theme: "dark" };

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* ============================================================================
   CONFETTI
   ============================================================================ */

function Confetti({ show }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2 + Math.random() * 1.4,
        rot: Math.random() * 360,
        color: ["#6B58EE", "#0E9E8B", "#D96B1E", "#D92E79", "#B8860B"][i % 5],
        size: 6 + Math.random() * 6,
      })),
    [show]
  );
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   SIDEBAR NAV
   ============================================================================ */

function NavItem({ icon: Icon, label, active, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all
        ${active ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-gray-600 dark:text-white/50 hover:text-black dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/5"}`}
    >
      <Icon size={18} style={{ color: active ? accent : undefined }} className="shrink-0" />
      <span className="truncate">{label}</span>
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: accent }} />}
    </button>
  );
}

/* ============================================================================
   DASHBOARD / HOME
   ============================================================================ */

function Dashboard({ progress, onGo }) {
  const cd = useCountdown(BOARD_EXAM_DATE);
  const totalChapters = allChapters().length;
  const doneCount = Object.keys(progress.done || {}).filter((k) => progress.done[k]).length;
  const pct = Math.round((doneCount / totalChapters) * 100);

  const digit = (n, label) => (
    <div className="flex flex-col items-center">
      <div className="digit-box">{String(n).padStart(2, "0")}</div>
      <span className="mt-1 text-[10px] uppercase tracking-widest text-gray-600 dark:text-white/40 font-bold">{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="hero-card rounded-3xl border border-gray-200 dark:border-white/10 p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: "#6B58EE" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gray-600 dark:text-white/50 text-xs uppercase tracking-widest mb-4 font-bold">
            <Clock size={14} /> Estimated Board Exam Countdown
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {digit(cd.days, "days")}
            <span className="text-2xl text-gray-500 dark:text-white/20 font-mono">:</span>
            {digit(cd.hours, "hrs")}
            <span className="text-2xl text-gray-500 dark:text-white/20 font-mono">:</span>
            {digit(cd.mins, "min")}
            <span className="text-2xl text-gray-500 dark:text-white/20 font-mono">:</span>
            {digit(cd.secs, "sec")}
          </div>
          <p className="mt-4 text-xs text-gray-700 dark:text-white/45 max-w-md font-semibold">
            Target date is an estimate (mid-Feb) based on past CBSE Class 10 patterns — the Board releases the exact
            date sheet closer to exams.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Flame} value={progress.streak} label="Day streak" color="#D96B1E" />
        <StatCard icon={Zap} value={progress.xp} label="Total XP" color="#B8860B" />
        <StatCard icon={CheckCircle2} value={`${doneCount}/${totalChapters}`} label="Chapters done" color="#0E9E8B" />
        <StatCard icon={Trophy} value={`${pct}%`} label="Syllabus covered" color="#6B58EE" />
      </div>

      <div>
        <h2 className="mb-3 text-xs font-bold text-gray-600 dark:text-white/60 uppercase tracking-widest">Subject Vaults</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SUBJECTS.map((s) => {
            const subDone = s.chapters.filter((c) => progress.done[c.id]).length;
            return (
              <button
                key={s.id}
                onClick={() => onGo(s.id)}
                className="text-left rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 hover:border-gray-300 dark:hover:border-white/20 transition-all group shadow-sm"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}22`, color: s.color }}
                >
                  <s.Icon size={20} />
                </div>
                <div className="font-bold text-gray-900 dark:text-white/90">{s.name}</div>
                <div className="text-xs text-gray-600 dark:text-white/40 mb-2 font-medium">{s.tagline}</div>
                <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.round((subDone / s.chapters.length) * 100)}%`, background: s.color }}
                  />
                </div>
                <div className="mt-1.5 text-[11px] font-semibold text-gray-600 dark:text-white/40">
                  {subDone}/{s.chapters.length} chapters mastered
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 flex items-center gap-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}22`, color }}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-lg font-extrabold text-gray-900 dark:text-white leading-tight">{value}</div>
        <div className="text-[11px] font-bold text-gray-600 dark:text-white/40">{label}</div>
      </div>
    </div>
  );
}

/* ============================================================================
   MIND MAP (per chapter)
   ============================================================================ */

function MindMap({ chapter, color, theme }) {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState(null);
  const nodes = chapter.concepts;
  const R = 140;
  const isLight = theme === "light";
  const nodeIdleBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)";
  const nodeIdleBorder = isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";
  const nodeIdleText = isLight ? "#111827" : "rgba(255,255,255,0.85)";
  const nodeActiveText = "#ffffff";

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-white/50 font-bold">
          <MapIcon size={14} /> Mind Map — click a node
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="rounded-lg border border-gray-300 dark:border-white/10 p-1.5 text-gray-800 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            className="rounded-lg border border-gray-300 dark:border-white/10 p-1.5 text-gray-800 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <div className="relative mx-auto h-[300px] w-full overflow-hidden">
        <div
          className="relative mx-auto h-full w-full transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 300">
            {nodes.map((_, i) => {
              const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
              const x = 160 + R * Math.cos(angle);
              const y = 150 + R * Math.sin(angle);
              return (
                <line key={i} x1={160} y1={150} x2={x} y2={y} stroke={color} strokeOpacity={0.45} strokeWidth={1.5} />
              );
            })}
          </svg>
          <div
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl px-3 py-2 text-center text-[11px] font-bold text-white shadow-lg"
            style={{ left: "50%", top: "50%", background: color, maxWidth: 110, boxShadow: `0 0 24px ${color}55` }}
          >
            {chapter.name}
          </div>
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
            const x = 160 + R * Math.cos(angle);
            const y = 150 + R * Math.sin(angle);
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-2.5 py-1.5 text-[10.5px] font-semibold transition-all hover:scale-105 shadow-xs"
                style={{
                  left: x,
                  top: y,
                  maxWidth: 100,
                  background: isActive ? color : nodeIdleBg,
                  borderColor: isActive ? color : nodeIdleBorder,
                  color: isActive ? nodeActiveText : nodeIdleText,
                }}
              >
                {n.t}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 min-h-[44px] rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-xs text-gray-900 dark:text-white/70 font-semibold shadow-2xs">
        {active !== null ? (
          <>
            <span className="font-bold" style={{ color }}>
              {nodes[active].t}:{" "}
            </span>
            {nodes[active].d}
          </>
        ) : (
          <span className="text-gray-600 dark:text-white/40">Tap a node above to reveal the concept in under 10 seconds.</span>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   INDIA MAP (Social Science — geography chapters)
   ============================================================================ */

function IndiaMap({ activeChapterId, onSelect, color, theme }) {
  const isLight = theme === "light";
  const landFill = isLight ? "#E7EAF0" : "rgba(255,255,255,0.06)";
  const landStroke = isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)";
  const dotIdle = isLight ? "#9CA3AF" : "rgba(255,255,255,0.35)";
  const isQuad = activeChapterId === LIFELINES_ID;
  const activeLocations = SST_MAP_LOCATIONS[activeChapterId] || [];
  const isSaltMarchActive = activeChapterId === "nationalism-in-india";

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-700 dark:text-white/50 font-bold">
        <MapPin size={14} /> Where it happens — India map (Geography & History)
      </div>
      <div className="relative mx-auto h-[300px] w-full max-w-[280px]">
        <svg viewBox="0 0 300 340" className="h-full w-full">
          <path
            d="M150,8 L172,18 L192,32 L212,44 L232,58 L248,76 L262,96 L256,114 L242,122 L232,142 L222,154 L212,174 L202,194 L197,214 L192,234 L186,254 L178,272 L168,292 L156,312 L148,328 L140,312 L128,292 L118,272 L108,254 L100,234 L92,214 L86,194 L80,174 L74,154 L68,132 L72,110 L82,92 L94,74 L108,56 L124,40 L138,22 Z"
            fill={landFill}
            stroke={landStroke}
            strokeWidth="1.5"
          />
          {QUAD_CITIES.map((c, i) => {
            const next = QUAD_CITIES[(i + 1) % QUAD_CITIES.length];
            return (
              <line
                key={c.name}
                x1={c.x}
                y1={c.y}
                x2={next.x}
                y2={next.y}
                stroke={isQuad ? color : "transparent"}
                strokeWidth={isQuad ? 2 : 0}
                strokeDasharray="4 3"
                opacity={isQuad ? 0.9 : 0}
              />
            );
          })}
          {isQuad &&
            QUAD_CITIES.map((c) => (
              <g key={c.name} onClick={() => onSelect(LIFELINES_ID)} className="cursor-pointer">
                <circle cx={c.x} cy={c.y} r={6} fill={color} stroke="#fff" strokeWidth={1.2} />
              </g>
            ))}

          {isSaltMarchActive && (
            <line x1={85} y1={140} x2={80} y2={165} stroke={color} strokeWidth={2} strokeDasharray="3 3" opacity={0.9} />
          )}

          {Object.entries(SST_MAP_LOCATIONS).map(([id, locs]) =>
            locs.map((p, i) => {
              const isActive = activeChapterId === id;
              return (
                <g key={`${id}-${i}`} onClick={() => onSelect(id)} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 8 : 5}
                    fill={isActive ? color : dotIdle}
                    stroke="#fff"
                    strokeWidth={1.2}
                    opacity={isActive ? 1 : 0.75}
                  />
                  <title>{p.label}</title>
                </g>
              );
            })
          )}
        </svg>
      </div>
      <div className="mt-3 min-h-[40px] rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-xs text-gray-900 dark:text-white/70 font-semibold shadow-2xs">
        {isQuad ? (
          <span className="font-bold" style={{ color }}>
            Golden Quadrilateral — connects Delhi, Mumbai, Chennai & Kolkata.
          </span>
        ) : activeLocations.length ? (
          <div className="space-y-1.5">
            {activeLocations.map((p, i) => (
              <div key={i}>
                <span className="font-bold" style={{ color }}>
                  {p.label.split(" — ")[0]}
                </span>{" "}
                — {p.label.split(" — ").slice(1).join(" — ")}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-600 dark:text-white/40">
            Select a Geography chapter, or "Nationalism in India", to see it on the map.
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   SUBJECT VAULT PAGE (chapter list + detail)
   ============================================================================ */

function SubjectPage({ subject, progress, setDone, theme }) {
  const [openId, setOpenId] = useState(subject.chapters[0]?.id || null);
  const open = subject.chapters.find((c) => c.id === openId);

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="space-y-1.5">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 dark:text-white/40 font-bold">
          <ListChecks size={14} /> {subject.chapters.length} chapters
        </div>
        <div className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {subject.chapters.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpenId(c.id)}
              className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                openId === c.id
                  ? "border-gray-400 dark:border-white/25 bg-gray-200/80 dark:bg-white/10 text-gray-950 dark:text-white font-bold shadow-2xs"
                  : "border-gray-200 dark:border-white/5 text-gray-700 dark:text-white/55 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                {progress.done[c.id] ? (
                  <CheckCircle2 size={14} style={{ color: subject.color }} className="shrink-0" />
                ) : (
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-gray-400 dark:border-white/20" />
                )}
                <span className="flex-1 truncate">{c.name}</span>
              </div>
              <div className="ml-5 text-[10px] text-gray-600 dark:text-white/35 font-bold">{c.marks}</div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-widest font-extrabold" style={{ color: subject.color }}>
                  {open.marks}
                </div>
                <h3 className="text-xl font-extrabold text-gray-950 dark:text-white">{open.name}</h3>
              </div>
              <button
                onClick={() => setDone(open.id, !progress.done[open.id])}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-2xs ${
                  progress.done[open.id]
                    ? "bg-gray-900 dark:bg-white/15 text-white"
                    : "text-gray-800 dark:text-white/60 border border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                <CheckCircle2 size={14} />
                {progress.done[open.id] ? "Mastered" : "Mark as mastered"}
              </button>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-600 dark:text-white/50 font-bold">
                <BookOpen size={14} /> {subject.vaultLabel}
              </div>
              <div className="space-y-3">
                {open.concepts.map((n, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-3.5 shadow-2xs">
                    <div className="text-sm font-bold mb-1" style={{ color: subject.color }}>
                      {n.t}
                    </div>
                    <div className="text-xs text-gray-900 dark:text-white/80 font-semibold leading-relaxed">{n.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <MindMap chapter={open} color={subject.color} theme={theme} />

          {subject.id === "sst" && (
            <IndiaMap activeChapterId={open.id} onSelect={setOpenId} color={subject.color} theme={theme} />
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   TIMETABLE GENERATOR
   ============================================================================ */

function TimetablePage() {
  const [selected, setSelected] = useState({});
  const [minutesPerDay, setMinutesPerDay] = useState(120);
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState(null);
  const chapters = allChapters();

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const selectedChapters = chapters.filter((c) => selected[c.id]);

  function generate() {
    if (selectedChapters.length === 0) return;
    const safeDays = Math.min(60, Math.max(1, Number.isFinite(days) ? days : 7));
    const safeMinutesPerDay = Math.min(600, Math.max(20, Number.isFinite(minutesPerDay) ? minutesPerDay : 120));

    const weighted = selectedChapters.map((c) => ({ ...c, weight: marksNum(c.marks) }));
    const totalWeight = weighted.reduce((a, c) => a + c.weight, 0);
    const totalMinutes = safeDays * safeMinutesPerDay;
    const queue = weighted.map((c) => ({
      ...c,
      remaining: Math.max(20, Math.round((c.weight / totalWeight) * totalMinutes / 5) * 5),
    }));

    const dayPlans = [];
    let qi = 0;
    for (let d = 1; d <= safeDays; d++) {
      let budget = safeMinutesPerDay;
      const sessions = [];
      let guard = 0;
      while (budget >= 25 && queue.some((c) => c.remaining > 0) && guard < 200) {
        guard++;
        let tries = 0;
        while (queue[qi % queue.length].remaining <= 0 && tries < queue.length) {
          qi++;
          tries++;
        }
        const c = queue[qi % queue.length];
        if (c.remaining <= 0) break;
        const block = Math.min(45, c.remaining, budget - 10);
        if (block < 15) {
          c.remaining = 0;
          qi++;
          continue;
        }
        sessions.push({ subject: c.subjectName, name: c.name, color: c.color, minutes: block });
        c.remaining -= block;
        budget -= block;
        qi++;
        if (budget >= 25 && queue.some((c) => c.remaining > 0)) {
          sessions.push({ break: true, minutes: 10 });
          budget -= 10;
        }
      }
      dayPlans.push({ day: d, sessions: sessions.length ? sessions : [{ note: "Buffer day — light revision & rest" }] });
    }
    setPlan(dayPlans);
  }

  const grouped = SUBJECTS.map((s) => ({ ...s, chapters: s.chapters }));

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-950 dark:text-white/80 mb-4">
          <Calendar size={16} /> Build your revision roadmap
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs text-gray-700 dark:text-white/50 font-bold">
            Days available
            <input
              type="number"
              min={1}
              max={60}
              value={days}
              onChange={(e) => setDays(Math.min(60, Math.max(1, parseInt(e.target.value || "1", 10) || 1)))}
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/30 px-3 py-2 text-gray-950 dark:text-white font-semibold outline-none focus:border-gray-500 dark:focus:border-white/30"
            />
          </label>
          <label className="text-xs text-gray-700 dark:text-white/50 font-bold">
            Minutes available per day
            <input
              type="number"
              min={20}
              step={10}
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(Math.min(600, Math.max(20, parseInt(e.target.value || "20", 10) || 20)))}
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/30 px-3 py-2 text-gray-950 dark:text-white font-semibold outline-none focus:border-gray-500 dark:focus:border-white/30"
            />
          </label>
        </div>

        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
          {grouped.map((s) => (
            <div key={s.id}>
              <div className="mb-1 text-xs font-extrabold" style={{ color: s.color }}>
                {s.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.chapters.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`rounded-lg border px-2 py-1 text-[11px] font-semibold transition-all ${
                      selected[c.id]
                        ? "text-white dark:text-black shadow-2xs font-bold"
                        : "text-gray-700 dark:text-white/50 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white"
                    }`}
                    style={selected[c.id] ? { background: s.color, borderColor: s.color } : {}}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={selectedChapters.length === 0}
          className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6B58EE] to-[#0E9E8B] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40 shadow-xs cursor-pointer"
        >
          <Sparkles size={16} /> Generate roadmap ({selectedChapters.length} selected)
        </button>
      </div>

      {plan && (
        <div className="space-y-3">
          {plan.map((dp) => (
            <div key={dp.day} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-widest text-gray-600 dark:text-white/50">Day {dp.day}</div>
              <div className="space-y-1.5">
                {dp.sessions.map((s, i) =>
                  s.break ? (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-white/[0.02] px-3 py-1.5 text-[11px] text-gray-600 dark:text-white/35 font-semibold">
                      <TimerIcon size={12} /> {s.minutes} min burnout break
                    </div>
                  ) : s.note ? (
                    <div key={i} className="rounded-lg bg-gray-100 dark:bg-white/[0.02] px-3 py-1.5 text-xs text-gray-700 dark:text-white/50 font-semibold">
                      {s.note}
                    </div>
                  ) : (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-white/5 px-3 py-1.5 text-xs shadow-2xs bg-gray-50 dark:bg-transparent">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-gray-600 dark:text-white/40 font-bold">{s.subject}</span>
                        <span className="text-gray-950 dark:text-white/85 font-extrabold">{s.name}</span>
                      </span>
                      <span className="text-gray-700 dark:text-white/40 font-mono font-bold">{s.minutes} min</span>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   QUIZ ARENA
   ============================================================================ */

function QuizArena({ addXP, onCelebrate }) {
  const [subjectId, setSubjectId] = useState("math");
  const [running, setRunning] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [finished, setFinished] = useState(false);
  const [pyqOnly, setPyqOnly] = useState(false);
  const timerRef = useRef(null);

  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const allQs = QUIZ_BANK[subjectId];
  const questions = pyqOnly ? allQs.filter((q) => q.pyq) : allQs;
  const q = questions[qIndex];

  useEffect(() => {
    if (!running || finished || picked !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPicked(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running, qIndex, finished, picked]);

  function start() {
    setSubjectId(subjectId);
    setRunning(true);
    setQIndex(0);
    setScore(0);
    setPicked(null);
    setTimeLeft(20);
    setFinished(false);
  }

  function pick(i) {
    if (picked !== null) return;
    clearInterval(timerRef.current);
    setPicked(i);
    if (i === q.a) {
      setScore((s) => s + 1);
      addXP(15);
    }
  }

  function next() {
    if (qIndex + 1 >= questions.length) {
      setFinished(true);
      setRunning(false);
      if (score >= Math.ceil(questions.length * 0.7)) onCelebrate();
      return;
    }
    setQIndex((i) => i + 1);
    setPicked(null);
    setTimeLeft(20);
  }

  if (!running && !finished) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-950 dark:text-white/80">
          <Swords size={16} /> Quiz Arena & 2026 PYQ Challenge Deck
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubjectId(s.id)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                subjectId === s.id
                  ? "text-white dark:text-black shadow-2xs font-bold"
                  : "text-gray-700 dark:text-white/60 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white"
              }`}
              style={subjectId === s.id ? { background: s.color, borderColor: s.color } : {}}
            >
              {s.name}
            </button>
          ))}
        </div>
        <label className="mb-4 flex items-center gap-2 text-xs text-gray-700 dark:text-white/50 font-bold cursor-pointer">
          <input type="checkbox" checked={pyqOnly} onChange={(e) => setPyqOnly(e.target.checked)} />
          2026 PYQ pattern questions only
        </label>
        <button
          onClick={start}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-xs cursor-pointer"
          style={{ background: subject.color }}
        >
          <Play size={16} /> Start quiz · {questions.length} questions · +15 XP each
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 text-center shadow-sm">
        <Trophy size={36} className="mx-auto mb-3" style={{ color: subject.color }} />
        <div className="text-2xl font-extrabold text-gray-950 dark:text-white">
          {score} / {questions.length}
        </div>
        <div className="text-sm font-semibold text-gray-600 dark:text-white/50 mb-4">correct in {subject.name}</div>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-white/15 px-4 py-2 text-sm font-bold text-gray-800 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 shadow-2xs cursor-pointer"
        >
          <RotateCcw size={14} /> Play again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-gray-600 dark:text-white/40 font-bold">
        <span>
          Question {qIndex + 1} / {questions.length}
        </span>
        <span className="flex items-center gap-1 font-mono" style={{ color: timeLeft <= 5 ? "#DC2626" : "inherit" }}>
          <TimerIcon size={12} /> {timeLeft}s
        </span>
      </div>
      <div className="mb-4 text-base font-bold text-gray-950 dark:text-white">{q.q}</div>
      <div className="space-y-2">
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.a;
          const isPicked = picked === i;
          let cls = "border-gray-300 dark:border-white/10 text-gray-800 dark:text-white/75 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white font-semibold";
          if (picked !== null) {
            if (isCorrect) cls = "border-emerald-500/80 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-bold";
            else if (isPicked) cls = "border-red-500/80 bg-red-500/10 text-red-900 dark:text-red-300 font-bold";
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-all shadow-2xs cursor-pointer ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button
          onClick={next}
          className="mt-4 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-xs cursor-pointer"
          style={{ background: subject.color }}
        >
          {qIndex + 1 >= questions.length ? "See results" : "Next question"} <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

/* ============================================================================
   APP SHELL
   ============================================================================ */

export default function App() {
  const [view, setView] = useState("home"); // home | subjectId | timetable | quiz
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    (async () => {
      const p = (await loadProgress()) || DEFAULT_PROGRESS;
      const t = todayStr();
      let streak = p.streak || 0;
      if (p.lastActive !== t) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        streak = p.lastActive === yesterday ? streak + 1 : 1;
      }
      const next = { ...DEFAULT_PROGRESS, ...p, streak, lastActive: t };
      setProgress(next);
      setLoaded(true);
      saveProgress(next);
    })();
  }, []);

  function persist(next) {
    setProgress(next);
    saveProgress(next);
  }

  function addXP(amount) {
    persist({ ...progress, xp: (progress.xp || 0) + amount });
  }

  function setDone(id, val) {
    const done = { ...progress.done, [id]: val };
    const xpDelta = val ? 25 : -25;
    persist({ ...progress, done, xp: Math.max(0, (progress.xp || 0) + xpDelta) });
    if (val) fireConfetti();
  }

  function fireConfetti() {
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 2600);
  }

  function toggleTheme() {
    persist({ ...progress, theme: progress.theme === "light" ? "dark" : "light" });
  }

  const theme = progress.theme === "light" ? "light" : "dark";

  if (!loaded) {
    return (
      <div className="flex h-[500px] items-center justify-center text-gray-600 dark:text-white/40 text-sm font-bold">
        Loading your board hub…
      </div>
    );
  }

  const activeSubject = SUBJECTS.find((s) => s.id === view);

  return (
    <div data-theme={theme} className="board-hub min-h-[640px] w-full rounded-3xl bg-[#0c0c14] text-white overflow-hidden shadow-xl">
      <style>{`
        .board-hub { font-family: 'Inter', system-ui, sans-serif; }
        .board-hub .font-mono, .digit-box { font-family: 'JetBrains Mono', 'Courier New', monospace; }
        .digit-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 8px 12px;
          font-size: 28px;
          font-weight: 700;
          min-width: 58px;
          text-align: center;
          box-shadow: inset 0 0 20px rgba(107,88,238,0.15);
        }
        .confetti-piece {
          position: absolute;
          top: -20px;
          border-radius: 2px;
          animation-name: confetti-fall;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(650px) rotate(540deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .confetti-piece { animation: none; display: none; }
        }
        .board-hub ::-webkit-scrollbar { width: 6px; height: 6px; }
        .board-hub ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        /* ---------------------------------------------------------------
           LIGHT THEME — crisp, clean, high-contrast dark text
           --------------------------------------------------------------- */
        .board-hub[data-theme="light"] { background: #F8F9FC !important; color: #111827 !important; }
        .board-hub[data-theme="light"] .hero-card {
          background: linear-gradient(135deg, #EEF2F6, #F8FAFC) !important;
          border-color: rgba(0,0,0,0.1) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .board-hub[data-theme="light"] .digit-box {
          background: #FFFFFF;
          border-color: rgba(0,0,0,0.15);
          color: #111827;
          box-shadow: inset 0 0 15px rgba(107,88,238,0.08), 0 2px 4px rgba(0,0,0,0.02);
        }
        .board-hub[data-theme="light"] .theme-toggle { border-color: rgba(0,0,0,0.15); background: #FFFFFF; }
        .board-hub[data-theme="light"] ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); }
      `}</style>

      <Confetti show={celebrate} />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-transparent p-4 flex md:flex-col gap-1 md:gap-1 overflow-x-auto md:overflow-visible">
          <div className="mb-3 hidden md:flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6B58EE] to-[#0E9E8B]">
              <Award size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-extrabold leading-tight text-gray-950 dark:text-white">Board Hub</div>
              <div className="text-[10px] text-gray-600 dark:text-white/40 font-bold">Class 10 CBSE 2026-27</div>
            </div>
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              className="theme-toggle flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 shadow-2xs cursor-pointer"
            >
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            className="md:hidden ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white/60 shadow-2xs cursor-pointer"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <NavItem icon={HomeIcon} label="Dashboard" active={view === "home"} onClick={() => setView("home")} accent="#6B58EE" />
          <NavItem icon={Calendar} label="Timetable Setter" active={view === "timetable"} onClick={() => setView("timetable")} accent="#0E9E8B" />
          <NavItem icon={Swords} label="Quiz Arena" active={view === "quiz"} onClick={() => setView("quiz")} accent="#D96B1E" />

          <div className="mt-3 mb-1 px-2 text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/30 font-bold hidden md:block">Subjects</div>
          {SUBJECTS.map((s) => (
            <NavItem key={s.id} icon={s.Icon} label={s.name} active={view === s.id} onClick={() => setView(s.id)} accent={s.color} />
          ))}

          <div className="mt-auto hidden md:flex items-center gap-2 rounded-xl bg-gray-200/60 dark:bg-white/5 px-3 py-2.5 border border-gray-200/70 dark:border-transparent">
            <Flame size={16} className="text-[#D96B1E]" />
            <div className="text-xs">
              <div className="font-extrabold text-gray-950 dark:text-white">{progress.streak} day streak</div>
              <div className="text-gray-600 dark:text-white/40 font-bold">{progress.xp} XP earned</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
          {view === "home" && <Dashboard progress={progress} onGo={setView} />}
          {view === "timetable" && <TimetablePage />}
          {view === "quiz" && <QuizArena addXP={addXP} onCelebrate={fireConfetti} />}
          {activeSubject && <SubjectPage subject={activeSubject} progress={progress} setDone={setDone} theme={theme} />}
        </div>
      </div>
    </div>
  );
}
