import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Clock, Calendar, Trophy, Flame, BookOpen, Brain, Map as MapIcon,
  CheckCircle2, ChevronRight, ChevronLeft, X, Sparkles, Zap, Target,
  Atom, Globe2, Languages, BookText, Timer as TimerIcon, Play, RotateCcw,
  Plus, Minus, Home as HomeIcon, ListChecks, Award, Star, ScrollText,
  Sigma, Swords, PartyPopper, Sun, Moon, MapPin, FileText, ExternalLink
} from "lucide-react";

/* ============================================================================
   DATA — every chapter across all 5 subjects, with weightage + concept nodes
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
    vaultLabel: "Formula & Theorem Vault",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("Real Numbers", "06M", [
        ["Euclid's Division Lemma", "a = bq + r, 0 ≤ r < b — the basis for finding HCF."],
        ["Fundamental Theorem of Arithmetic", "Every composite number factorises uniquely into primes."],
        ["Irrationality Proofs", "√2, √3, √5 are irrational — proved by contradiction."],
      ]),
      ch("Polynomials", "Algebra · 20M", [
        ["Zeros of a Polynomial", "Values of x where p(x) = 0; graph meets the x-axis there."],
        ["Sum & Product of Zeros", "For ax²+bx+c: α+β = −b/a, αβ = c/a."],
        ["Division Algorithm", "p(x) = g(x)·q(x) + r(x), degree(r) < degree(g)."],
      ]),
      ch("Pair of Linear Equations in Two Variables", "Algebra", [
        ["Graphical Solution", "Lines can intersect (unique), be parallel (no solution), or coincide (infinite)."],
        ["Consistency Condition", "a1/a2 ≠ b1/b2 → unique solution."],
        ["Algebraic Methods", "Substitution, elimination, and cross-multiplication."],
      ]),
      ch("Quadratic Equations", "Algebra", [
        ["Standard Form", "ax² + bx + c = 0, a ≠ 0."],
        ["Quadratic Formula", "x = (−b ± √(b²−4ac)) / 2a."],
        ["Discriminant", "D = b²−4ac decides real & equal / real & distinct / no real roots."],
      ]),
      ch("Arithmetic Progressions", "Algebra", [
        ["nth Term", "aₙ = a + (n−1)d."],
        ["Sum of n Terms", "Sₙ = n/2 [2a + (n−1)d]."],
        ["Common Difference", "d = aₙ − aₙ₋₁, constant throughout the AP."],
      ]),
      ch("Coordinate Geometry", "06M", [
        ["Distance Formula", "√[(x2−x1)² + (y2−y1)²]."],
        ["Section Formula", "Point dividing a line in ratio m:n."],
        ["Area of Triangle", "½ |x1(y2−y3)+x2(y3−y1)+x3(y1−y2)|."],
      ]),
      ch("Triangles", "Geometry · 15M", [
        ["Basic Proportionality Theorem", "A line parallel to one side divides the other two proportionally."],
        ["Similarity Criteria", "AA, SSS, SAS similarity of triangles."],
        ["Pythagoras Theorem", "Proved using similarity of right triangles."],
      ]),
      ch("Circles", "Geometry", [
        ["Tangent Properties", "A tangent is perpendicular to the radius at the point of contact."],
        ["Number of Tangents", "Exactly two tangents can be drawn from an external point."],
        ["Equal Tangent Lengths", "Tangents from the same external point are equal in length."],
      ]),
      ch("Introduction to Trigonometry", "12M", [
        ["Trig Ratios", "sin, cos, tan defined using sides of a right triangle."],
        ["Standard Angle Values", "Table for 0°, 30°, 45°, 60°, 90°."],
        ["Trigonometric Identities", "sin²A + cos²A = 1; 1 + tan²A = sec²A."],
      ]),
      ch("Heights and Distances", "Trig application", [
        ["Angle of Elevation", "Angle raised from the horizontal up to an object."],
        ["Angle of Depression", "Angle lowered from the horizontal down to an object."],
        ["Line of Sight", "Straight line from the observer's eye to the object."],
      ]),
      ch("Areas Related to Circles", "Mensuration · 10M", [
        ["Sector Area", "(θ/360) × πr²."],
        ["Segment Area", "Sector area − area of the corresponding triangle."],
        ["Arc Length", "(θ/360) × 2πr."],
      ]),
      ch("Surface Areas and Volumes", "Mensuration", [
        ["Combination of Solids", "Add/subtract surface areas & volumes of joined shapes."],
        ["Frustum of a Cone", "Volume = (πh/3)(r1² + r2² + r1r2)."],
        ["Conversion of Solids", "Volume stays constant when a solid is recast into another shape."],
      ]),
      ch("Statistics", "11M", [
        ["Mean of Grouped Data", "Direct, assumed-mean, and step-deviation methods."],
        ["Median", "Found at the n/2th position using cumulative frequency."],
        ["Mode", "Modal class formula using class frequencies."],
      ]),
      ch("Probability", "part of Statistics", [
        ["Classical Probability", "P(E) = favourable outcomes / total outcomes."],
        ["Complementary Events", "P(E) + P(not E) = 1."],
        ["Range of Probability", "0 ≤ P(E) ≤ 1."],
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
    vaultLabel: "Equation & Law Vault",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("Chemical Reactions and Equations", "Unit I · 25M", [
        ["Balancing Equations", "Equal number of atoms of every element on both sides."],
        ["Types of Reactions", "Combination, decomposition, displacement, double displacement."],
        ["Oxidation & Reduction", "Gain of oxygen = oxidation; gain of hydrogen = reduction."],
      ]),
      ch("Acids, Bases and Salts", "Unit I", [
        ["pH Scale", "0–14 scale: <7 acidic, 7 neutral, >7 basic."],
        ["Neutralisation", "Acid + Base → Salt + Water."],
        ["Common Salts", "NaCl, washing soda, baking soda, bleaching powder."],
      ]),
      ch("Metals and Non-metals", "Unit I", [
        ["Reactivity Series", "K > Na > Ca > Mg > Al > Zn > Fe > ... > Au."],
        ["Metallurgy", "Ore → concentration → reduction → refining."],
        ["Corrosion", "Rusting: Fe + O2 + H2O → Fe2O3·xH2O."],
      ]),
      ch("Carbon and its Compounds", "Unit I", [
        ["Covalent Bonding", "Sharing of electron pairs; carbon shows catenation."],
        ["Functional Groups", "–OH alcohol, –COOH carboxylic acid, and more."],
        ["Soaps & Detergents", "Micelle formation traps grease for cleaning."],
      ]),
      ch("Life Processes", "Unit II · 25M", [
        ["Nutrition", "Autotrophic (photosynthesis) vs heterotrophic nutrition."],
        ["Respiration", "Aerobic (uses O2) vs anaerobic (no O2) respiration."],
        ["Transportation & Excretion", "Human heart's double circulation; nephron filters blood."],
      ]),
      ch("Control and Co-ordination", "Unit II", [
        ["Nervous System", "Neuron structure and the reflex arc."],
        ["Plant Hormones", "Auxin, gibberellin, cytokinin, abscisic acid."],
        ["Animal Hormones", "Thyroxine, insulin, adrenaline, growth hormone."],
      ]),
      ch("Reproduction", "Unit II", [
        ["Asexual Reproduction", "Fission, budding, fragmentation, spore formation."],
        ["Sexual Reproduction", "Fusion of male and female gametes."],
        ["Reproductive Health", "Contraception, STIs, population control."],
      ]),
      ch("Heredity", "Unit II", [
        ["Mendel's Laws", "Dominance, segregation, and independent assortment."],
        ["Sex Determination", "XX = female, XY = male in humans."],
        ["Variation", "Inherited variation is the raw material for evolution."],
      ]),
      ch("Light – Reflection and Refraction", "Unit III · 12M", [
        ["Spherical Mirrors", "Mirror formula: 1/v + 1/u = 1/f."],
        ["Lens Formula", "1/v − 1/u = 1/f; Power P = 1/f."],
        ["Human Eye", "Accommodation; myopia and hypermetropia correction."],
      ]),
      ch("Electricity", "Unit IV · 13M", [
        ["Ohm's Law", "V = IR."],
        ["Series & Parallel Circuits", "Resistances add differently in series vs parallel."],
        ["Electric Power", "P = VI = I²R = V²/R."],
      ]),
      ch("Magnetic Effects of Electric Current", "Unit IV", [
        ["Field Lines", "Concentric circles around a straight current-carrying conductor."],
        ["Fleming's Rules", "Left-hand rule (motor), right-hand rule (generator)."],
        ["Domestic Circuits", "Fuses, earthing, overloading, short-circuiting."],
      ]),
      ch("Our Environment", "Unit V · 05M", [
        ["Ecosystem", "Producers, consumers, decomposers, and food chains."],
        ["Ozone Depletion", "CFCs break down stratospheric ozone."],
        ["Waste Management", "Biodegradable vs non-biodegradable waste."],
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
    vaultLabel: "Timeline & Milestone Vault",
    tagline: "80 Theory + 20 Internal",
    chapters: [
      ch("The Rise of Nationalism in Europe", "History · 20M", [
        ["French Revolution, 1789", "Gave Europe its first clear idea of nationalism."],
        ["Unification of Germany, 1871", "Engineered by Otto von Bismarck through three wars."],
        ["Congress of Vienna, 1815", "Redrew Europe's map after Napoleon's defeat."],
      ]),
      ch("Nationalism in India", "History · 20M", [
        ["Non-Cooperation Movement, 1920–22", "Launched by Gandhi after the Jallianwala Bagh massacre."],
        ["Civil Disobedience Movement, 1930", "Began with the Dandi Salt March."],
        ["Quit India Movement, 1942", "Mass movement demanding immediate British withdrawal."],
      ]),
      ch("The Making of a Global World", "History · 20M", [
        ["Silk Route", "Ancient trade network linking Asia, Europe and Africa."],
        ["Indentured Labour Migration", "19th-century movement of Indian workers overseas."],
        ["The Great Depression, 1929", "Global economic collapse hitting agriculture hardest."],
      ]),
      ch("The Age of Industrialisation", "History · 20M", [
        ["Proto-Industrialisation", "Production existed before factories emerged."],
        ["Spinning Jenny, 1764", "Symbol of Britain's early industrial mechanisation."],
        ["Colonial Impact", "British policies reshaped Indian textile & craft industries."],
      ]),
      ch("Print Culture and the Modern World", "History · 20M", [
        ["Gutenberg's Press, 1440s", "Made printed books widely available in Europe."],
        ["Print & the French Revolution", "Pamphlets spread Enlightenment ideas."],
        ["Print in Colonial India", "Vernacular press fuelled nationalist debate."],
      ]),
      ch("Resources and Development", "Geography · 20M", [
        ["Resource Classification", "Renewable vs non-renewable; ownership-based types."],
        ["Land Degradation", "Deforestation, mining and over-irrigation as key causes."],
        ["Soil Conservation", "Contour ploughing, terracing, and shelter belts."],
      ]),
      ch("Forest and Wildlife Resources", "Geography · 20M", [
        ["Flora & Fauna Types", "Normal, endangered, rare, endemic and extinct species."],
        ["Project Tiger", "Flagship conservation programme launched in 1973."],
        ["Biosphere Reserves", "Protect ecosystems along with local communities."],
      ]),
      ch("Water Resources", "Geography · 20M", [
        ["Multipurpose River Projects", "Dams built for irrigation, power and flood control."],
        ["Rainwater Harvesting", "Traditional and modern methods to store rainwater."],
        ["Water Scarcity", "Caused by overuse, pollution and unequal access."],
      ]),
      ch("Agriculture", "Geography · 20M", [
        ["Cropping Seasons", "Kharif (monsoon) and Rabi (winter) crops."],
        ["Green Revolution", "Boosted wheat and rice yields via HYV seeds."],
        ["Institutional Reforms", "Land reforms, minimum support price, subsidies."],
      ]),
      ch("Minerals and Energy Resources", "Geography · 20M", [
        ["Ferrous vs Non-ferrous", "Iron ore vs minerals like copper, bauxite."],
        ["Conventional vs Non-conventional Energy", "Coal/oil vs solar/wind/tidal power."],
        ["Mineral Conservation", "Recycling and efficient use to extend reserves."],
      ]),
      ch("Manufacturing Industries", "Geography · 20M", [
        ["Agro-based vs Mineral-based", "Cotton/sugar mills vs iron & steel plants."],
        ["Iron & Steel Industry", "Backbone of modern industrial development."],
        ["Industrial Pollution", "Air, water, and land pollution control measures."],
      ]),
      ch("Lifelines of National Economy", "Geography · 20M", [
        ["Transport Networks", "Roadways, railways, waterways, and airways."],
        ["Golden Quadrilateral", "Highway network linking Delhi-Mumbai-Chennai-Kolkata."],
        ["Trade & Communication", "Backbone services for the economy's growth."],
      ]),
      ch("Power-sharing", "Political Science · 20M", [
        ["Belgium & Sri Lanka", "Contrasting case studies in accommodating diversity."],
        ["Horizontal Power-sharing", "Between legislature, executive, and judiciary."],
        ["Vertical Power-sharing", "Between central, state, and local governments."],
      ]),
      ch("Federalism", "Political Science · 20M", [
        ["Union, State, Concurrent Lists", "Division of subjects between centre and states."],
        ["Third Tier of Government", "Panchayati Raj and urban local bodies."],
        ["Centre-State Relations", "Cooperation and occasional friction in governance."],
      ]),
      ch("Gender, Religion and Caste", "Political Science · 20M", [
        ["Gender Division of Labour", "Unequal roles in public and private spheres."],
        ["Communalism", "Politics based on religious identity vs a secular state."],
        ["Caste in Politics", "Caste-based inequality shapes political mobilisation."],
      ]),
      ch("Political Parties", "Political Science · 20M", [
        ["Party Systems", "One-party, two-party, and multi-party systems."],
        ["National & State Parties", "Classification based on vote share and presence."],
        ["Challenges to Parties", "Dynastic succession, money power, lack of internal democracy."],
      ]),
      ch("Outcomes of Democracy", "Political Science · 20M", [
        ["Accountable Government", "Democracy is expected to be responsive and legitimate."],
        ["Economic Growth", "Mixed evidence linking democracy to development."],
        ["Reducing Inequality", "Democracies aim to reduce poverty and disparity."],
      ]),
      ch("Development", "Economics · 20M", [
        ["GDP vs Per Capita Income", "National income measures vs average individual income."],
        ["Human Development Index", "Combines income, education, and health indicators."],
        ["Sustainable Development", "Growth that doesn't compromise future resources."],
      ]),
      ch("Sectors of the Indian Economy", "Economics · 20M", [
        ["Primary, Secondary, Tertiary", "Agriculture, industry, and services classification."],
        ["Organised vs Unorganised", "Job security and regulation differ sharply."],
        ["Disguised Unemployment", "More people employed than actually needed."],
      ]),
      ch("Money and Credit", "Economics · 20M", [
        ["Functions of Money", "Medium of exchange overcoming barter's limits."],
        ["Formal vs Informal Credit", "Banks/cooperatives vs moneylenders/traders."],
        ["Role of SHGs", "Self-help groups provide credit to rural households."],
      ]),
      ch("Globalisation and the Indian Economy", "Economics · 20M", [
        ["MNCs & Foreign Trade", "Multinational companies link production across countries."],
        ["Liberalisation, 1991", "Reduced trade barriers opened India's economy."],
        ["Role of WTO", "Sets rules to promote international trade."],
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
    vaultLabel: "Grammar & Format Vault",
    tagline: "Lang. & Literature · 80 + 20",
    chapters: [
      ch("Unseen Passage Comprehension", "Reading · 20M", [
        ["Skimming & Scanning", "Skim for gist, scan for specific facts and figures."],
        ["Inference Questions", "Answer using clues, not just copied lines."],
        ["Note-Making", "Compress a passage into headings and sub-points."],
      ]),
      ch("Determiners", "Grammar", [
        ["Articles", "a/an for unspecified, the for specific nouns."],
        ["Quantifiers", "some, any, many, much, few, little."],
        ["Demonstratives", "this, that, these, those point to nouns."],
      ]),
      ch("Tenses", "Grammar", [
        ["Simple Forms", "Present, past, and future simple express basic time."],
        ["Continuous Forms", "Describe ongoing action: is/was/will be + -ing."],
        ["Perfect Forms", "Show completed action: has/had/will have + V3."],
      ]),
      ch("Modals", "Grammar", [
        ["Ability & Permission", "can/could for ability, may/might for permission."],
        ["Obligation", "must/have to express necessity."],
        ["Advice", "should/ought to give suggestions."],
      ]),
      ch("Subject-Verb Concord", "Grammar", [
        ["Number Agreement", "Singular subject takes singular verb, and vice versa."],
        ["Collective Nouns", "Usually take a singular verb (team, family)."],
        ["Tricky Cases", "'Either/or' and 'neither/nor' agree with the nearer subject."],
      ]),
      ch("Reported Speech", "Grammar", [
        ["Tense Backshift", "Present tense in direct speech shifts back one tense."],
        ["Modal Changes", "will → would, can → could, may → might."],
        ["Reporting Verbs", "say/tell/ask change depending on statement or question."],
      ]),
      ch("Formal Letter & Analytical Paragraph", "Writing", [
        ["Letter Format", "Sender's address, date, receiver, subject, salutation, body, closing."],
        ["Analytical Paragraph", "Topic sentence → supporting evidence → concluding line."],
        ["Tone", "Formal, objective, and to the point."],
      ]),
      ch("A Letter to God", "First Flight", [
        ["Lencho's Faith", "Unwavering belief that God will help him after the hailstorm."],
        ["Irony", "Postmen sacrifice their own money to protect his faith."],
      ]),
      ch("Nelson Mandela: Long Walk to Freedom", "First Flight", [
        ["Courage & Ubuntu", "Freedom means fighting for others' dignity too."],
        ["Anti-Apartheid Struggle", "Excerpt from his 1994 presidential inauguration speech."],
      ]),
      ch("Two Stories about Flying", "First Flight", [
        ["His First Flight", "A seagull overcomes fear to finally fly."],
        ["Black Aeroplane", "A pilot is guided through a storm by a mysterious plane."],
      ]),
      ch("From the Diary of Anne Frank", "First Flight", [
        ["Anne's Diary 'Kitty'", "A personal confidante for a girl in hiding."],
        ["Life in Hiding", "Daily struggles during the Nazi occupation."],
      ]),
      ch("Glimpses of India", "First Flight", [
        ["A Baker from Goa", "Goan bread-making tradition and the baker's bell."],
        ["Coorg", "Geography, history and culture of a coffee-growing region."],
        ["Tea from Assam", "The journey of tea from plant to cup."],
      ]),
      ch("Mijbil the Otter", "First Flight", [
        ["Author-Otter Bond", "A deep bond forms between the author and his pet otter."],
        ["The Journey", "Bringing Mij from Iraq all the way to London."],
      ]),
      ch("Madam Rides the Bus", "First Flight", [
        ["Valli's Independence", "A determined child takes her first solo bus ride."],
        ["Innocent Curiosity", "Her observations reveal a child's wonder about the world."],
      ]),
      ch("The Sermon at Benares", "First Flight", [
        ["Buddha's Teaching", "Sorrow and death are universal, not personal alone."],
        ["Kisa Gotami's Grief", "Her search for a cure teaches acceptance of loss."],
      ]),
      ch("The Proposal", "First Flight (Play)", [
        ["Comic Quarrels", "Lomov and Natalya bicker over trivial property disputes."],
        ["Satire on Marriage", "Marriage treated as a transaction, not romance."],
      ]),
      ch("Poems of First Flight", "10 Poems", [
        ["Dust of Snow / Fire and Ice", "Small joys and destructive human emotions — Robert Frost."],
        ["A Tiger in the Zoo / How to Tell Wild Animals", "Freedom vs captivity; humour about identifying animals."],
        ["Amanda! / The Ball Poem / Animals / The Trees / Fog / Custard the Dragon", "Imagination, loss, freedom, and courage across varied tones."],
      ]),
      ch("A Triumph of Surgery", "Footprints w/o Feet", [
        ["Tricki's Recovery", "An overfed dog is cured through Dr. Herriot's strict diet."],
      ]),
      ch("The Thief's Story", "Footprints w/o Feet", [
        ["Hari Singh's Transformation", "A thief chooses honesty over betraying his trusting mentor."],
      ]),
      ch("The Midnight Visitor", "Footprints w/o Feet", [
        ["Ausable Outwits Max", "A clever lie about a balcony traps the spy."],
      ]),
      ch("A Question of Trust", "Footprints w/o Feet", [
        ["Horace Danby's Twist", "A jewel thief is himself outsmarted by a fellow con artist."],
      ]),
      ch("Footprints without Feet", "Footprints w/o Feet", [
        ["Griffin's Chaos", "An invisible man's scientific triumph turns into terror."],
      ]),
      ch("The Making of a Scientist", "Footprints w/o Feet", [
        ["Richard Ebright's Curiosity", "A childhood hobby grows into award-winning research."],
      ]),
      ch("The Necklace", "Footprints w/o Feet", [
        ["Mathilde's Pride", "A borrowed necklace's loss costs her ten years of hardship."],
      ]),
      ch("Bholi", "Footprints w/o Feet", [
        ["Overcoming Shyness", "Bholi rejects an unjust marriage and chooses self-respect."],
      ]),
      ch("The Book That Saved the Earth", "Footprints w/o Feet", [
        ["Comic Alien Invasion", "Martians are foiled by a misunderstood book — Mother Goose."],
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
        ["Unseen Comprehension", "Read the passage fully once, then answer using its own words."],
        ["Vocabulary Clues", "Use nearby words and context to guess unfamiliar terms."],
      ]),
      ch("Patra Lekhanam (Letter Writing)", "Rachana · 15M", [
        ["Format", "Sambodhanam (salutation) → Vishayam (subject) → Body → Closing."],
        ["Tone", "Respectful and simple sentence structures."],
      ]),
      ch("Chitra Varnanam (Picture Description)", "Rachana · 15M", [
        ["Simple Sentences", "Describe people, action and setting in short Sanskrit lines."],
        ["Present Tense Focus", "Mostly written using lat lakar (present tense)."],
      ]),
      ch("Katha/Samvada Purti", "Rachana · 15M", [
        ["Story Completion", "Continue logically from the given opening lines."],
        ["Dialogue Completion", "Keep responses consistent with the characters' tone."],
      ]),
      ch("Sandhi", "Vyakaran · 25M", [
        ["Swar Sandhi", "Joining of two vowels — e.g., a + a = ā."],
        ["Vyanjan Sandhi", "Joining involving consonants."],
        ["Visarga Sandhi", "Rules for combining visarga (ः) with following sounds."],
      ]),
      ch("Samasa", "Vyakaran · 25M", [
        ["Tatpurusha", "One word depends on the other in a case relation."],
        ["Dvigu", "First member is a numeral."],
        ["Bahuvrihi", "Compound describing an external attribute."],
      ]),
      ch("Suffixes: Krit, Taddhit, Stree", "Vyakaran · 25M", [
        ["Krit-pratyaya", "Forms verbal nouns/adjectives from roots (e.g., gam + tā = gatā)."],
        ["Taddhit-pratyaya", "Forms new words from nouns (e.g., indicating possession)."],
        ["Stree-pratyaya", "Suffixes that form the feminine gender."],
      ]),
      ch("Voice (Vachya)", "Vyakaran · 25M", [
        ["Kartari Vachya", "Active voice — subject performs the action."],
        ["Karmani Vachya", "Passive voice — object becomes the grammatical subject."],
      ]),
      ch("Time-telling (Samay)", "Vyakaran · 25M", [
        ["Clock Expressions", "Sanskrit phrases for hours and minutes."],
        ["Common Patterns", "Vadyate used to state 'the time is...'."],
      ]),
      ch("Indeclinables (Avyaya)", "Vyakaran · 25M", [
        ["Definition", "Words that never change with gender, number, or case."],
        ["Examples", "atra, tatra, sadā, kadā, api, ca, na."],
      ]),
      ch("Error Correction", "Vyakaran · 25M", [
        ["Common Errors", "Wrong case endings, sandhi mistakes, gender mismatches."],
        ["Approach", "Identify the rule first, then correct the smallest unit."],
      ]),
      ch("Vaingmayam Tapah", "Pathita · 30M", [
        ["Speech as Penance", "Truthful, kind speech is described as a form of tapas."],
      ]),
      ch("Nasti Tyagasamam Sukham", "Pathita · 30M", [
        ["Happiness in Sacrifice", "True joy comes from tyaga (renunciation), not possession."],
      ]),
      ch("Ramaniya Hi Srishtih Esha", "Pathita · 30M", [
        ["Beauty of Nature", "Celebrates the wonder of the natural world's creation."],
      ]),
      ch("Ajna Gurunam", "Pathita · 30M", [
        ["Obeying the Guru", "Emphasises discipline and respect for teachers."],
      ]),
      ch("Abhyasavashagam Manah", "Pathita · 30M", [
        ["Training the Mind", "Consistent practice (abhyasa) brings the mind under control."],
      ]),
      ch("Rashtra Samrakshyam", "Pathita · 30M", [
        ["Protecting the Nation", "Duty of citizens to safeguard their motherland."],
      ]),
      ch("Sadhuvrittim", "Pathita · 30M", [
        ["Virtuous Conduct", "Describes the ideal behaviour of good, righteous people."],
      ]),
      ch("Tirukkural (in Sanskrit)", "Pathita · 30M", [
        ["Ethical Couplets", "Tamil wisdom on virtue, wealth and love rendered in Sanskrit."],
      ]),
      ch("Suswagatam Bho!", "Pathita · 30M", [
        ["Hospitality Theme", "Warmth and etiquette of welcoming guests."],
      ]),
      ch("Kalo'ham", "Pathita · 30M", [
        ["Power of Time", "A dialogue on time's inevitability, drawn from epic tradition."],
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
   SOCIAL SCIENCE — INDIA MAP DATA (Geography chapters + India-based History)
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

/* ============================================================================
   DOCUMENT LIBRARY
   ============================================================================ */

const DOCUMENTS = [
  {
    group: "History",
    color: "#D96B1E",
    items: [
      {
        title: "History — Final Exam Revision 2026",
        file: "/documents/history-final-exam-revision-2026.pdf",
        description: "Complete Class 10 History revision notes and board-style questions.",
      },
    ],
  },
  {
    group: "Geography",
    color: "#0E9E8B",
    items: [
      {
        title: "Geography — Marathon Final Revision 2026",
        file: "/documents/geography-marathon-final-revision-2026.pdf",
        description: "Complete Class 10 CBSE Geography revision notes and practice questions.",
      },
    ],
  },
  {
    group: "Civics",
    color: "#6B58EE",
    items: [
      {
        title: "Civics — Four Shot Marathon",
        file: "/documents/civics-four-shot-marathon.pdf",
        description: "Class 10 Political Science/Civics revision notes.",
      },
    ],
  },
  {
    group: "Economics",
    color: "#B8860B",
    items: [
      {
        title: "Economics — Marathon Final Revision",
        file: "/documents/economics-marathon-final-revision.pdf",
        description: "Class 10 Economics complete revision notes and board-style questions.",
      },
    ],
  },
  {
    group: "Science",
    color: "#0E9E8B",
    items: [
      { title: "Chemical Reactions & Equations — Short Notes", file: "/documents/science/chemical-reactions-equations.pdf", description: "Quick revision notes." },
      { title: "Acids, Bases and Salts — Short Notes", file: "/documents/science/acids-bases-salts.pdf", description: "Quick revision notes." },
      { title: "Metals and Non-Metals — Short Notes", file: "/documents/science/metals-non-metals.pdf", description: "Quick revision notes." },
      { title: "Carbon and its Compounds — Short Notes", file: "/documents/science/carbon-compounds.pdf", description: "Quick revision notes." },
      { title: "Life Processes — Short Notes", file: "/documents/science/life-processes.pdf", description: "Quick revision notes." },
      { title: "Control and Coordination — Short Notes", file: "/documents/science/control-and-coordination.pdf", description: "Quick revision notes." },
      { title: "Reproduction — Short Notes", file: "/documents/science/reproduction.pdf", description: "Quick revision notes." },
      { title: "Heredity and Evolution — Short Notes", file: "/documents/science/heredity-evolution.pdf", description: "Quick revision notes." },
      { title: "Light — Short Notes", file: "/documents/science/light.pdf", description: "Quick revision notes." },
      { title: "Human Eye and the Colourful World — Short Notes", file: "/documents/science/human-eye-colourful-world.pdf", description: "Quick revision notes." },
      { title: "Electricity — Short Notes", file: "/documents/science/electricity.pdf", description: "Quick revision notes." },
      { title: "Magnetic Effects of Electric Current — Short Notes", file: "/documents/science/magnetic-effects.pdf", description: "Quick revision notes." },
      { title: "Our Environment — Short Notes", file: "/documents/science/our-environment.pdf", description: "Quick revision notes." },
    ],
  },
];


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
      <span className="mt-1 text-[10px] uppercase tracking-widest text-gray-500 dark:text-white/40 font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="hero-card rounded-3xl border border-gray-200 dark:border-white/10 p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: "#6B58EE" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-gray-500 dark:text-white/50 text-xs uppercase tracking-widest mb-4 font-bold">
            <Clock size={14} /> Estimated Board Exam Countdown
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {digit(cd.days, "days")}
            <span className="text-2xl text-gray-400 dark:text-white/20 font-mono">:</span>
            {digit(cd.hours, "hrs")}
            <span className="text-2xl text-gray-400 dark:text-white/20 font-mono">:</span>
            {digit(cd.mins, "min")}
            <span className="text-2xl text-gray-400 dark:text-white/20 font-mono">:</span>
            {digit(cd.secs, "sec")}
          </div>
          <p className="mt-4 text-xs text-gray-600 dark:text-white/45 max-w-md font-medium">
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
        <h2 className="mb-3 text-xs font-bold text-gray-500 dark:text-white/60 uppercase tracking-widest">Subject Vaults</h2>
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
                <div className="text-xs text-gray-500 dark:text-white/40 mb-2">{s.tagline}</div>
                <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${Math.round((subDone / s.chapters.length) * 100)}%`, background: s.color }}
                  />
                </div>
                <div className="mt-1.5 text-[11px] font-medium text-gray-500 dark:text-white/40">
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
        <div className="text-[11px] font-semibold text-gray-500 dark:text-white/40">{label}</div>
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
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-white/50 font-bold">
          <MapIcon size={14} /> Mind Map — click a node
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="rounded-lg border border-gray-300 dark:border-white/10 p-1.5 text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            className="rounded-lg border border-gray-300 dark:border-white/10 p-1.5 text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
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
      <div className="mt-3 min-h-[44px] rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-xs text-gray-800 dark:text-white/70 font-medium shadow-2xs">
        {active !== null ? (
          <>
            <span className="font-bold" style={{ color }}>
              {nodes[active].t}:{" "}
            </span>
            {nodes[active].d}
          </>
        ) : (
          <span className="text-gray-500 dark:text-white/40">Tap a node above to reveal the concept in under 10 seconds.</span>
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
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-600 dark:text-white/50 font-bold">
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
      <div className="mt-3 min-h-[40px] rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 text-xs text-gray-800 dark:text-white/70 font-medium shadow-2xs">
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
          <span className="text-gray-500 dark:text-white/40">
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
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 dark:text-white/40 font-bold">
          <ListChecks size={14} /> {subject.chapters.length} chapters
        </div>
        <div className="max-h-[70vh] space-y-1 overflow-y-auto pr-1">
          {subject.chapters.map((c) => (
            <button
              key={c.id}
              onClick={() => setOpenId(c.id)}
              className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                openId === c.id
                  ? "border-gray-400 dark:border-white/25 bg-gray-200/60 dark:bg-white/10 text-gray-900 dark:text-white font-bold shadow-2xs"
                  : "border-gray-200 dark:border-white/5 text-gray-600 dark:text-white/55 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
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
              <div className="ml-5 text-[10px] text-gray-500 dark:text-white/35 font-semibold">{c.marks}</div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-widest font-bold" style={{ color: subject.color }}>
                  {open.marks}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{open.name}</h3>
              </div>
              <button
                onClick={() => setDone(open.id, !progress.done[open.id])}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all shadow-2xs ${
                  progress.done[open.id]
                    ? "bg-gray-900 dark:bg-white/15 text-white"
                    : "text-gray-700 dark:text-white/60 border border-gray-300 dark:border-white/15 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                <CheckCircle2 size={14} />
                {progress.done[open.id] ? "Mastered" : "Mark as mastered"}
              </button>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500 dark:text-white/50 font-bold">
                <BookOpen size={14} /> {subject.vaultLabel}
              </div>
              <div className="space-y-2">
                {open.concepts.map((n, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 p-3 shadow-2xs">
                    <div className="text-sm font-bold" style={{ color: subject.color }}>
                      {n.t}
                    </div>
                    <div className="text-xs text-gray-700 dark:text-white/60 mt-0.5 font-medium">{n.d}</div>
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
   DOCUMENT LIBRARY
   ============================================================================ */

function DocumentsPage() {
  const total = DOCUMENTS.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6B58EE]/15 text-[#6B58EE]">
            <FileText size={21} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Study Documents</h2>
            <p className="mt-1 text-xs font-medium text-gray-600 dark:text-white/50">
              {total} Class 10 revision documents. Open any PDF in a new tab.
            </p>
          </div>
        </div>
      </div>

      {DOCUMENTS.map((group) => (
        <section key={group.group}>
          <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
            <span style={{ color: group.color }}>{group.group}</span>
            <span className="text-gray-400 dark:text-white/25">· {group.items.length}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((doc) => (
              <a
                key={doc.file}
                href={doc.file}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-white/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${group.color}18`, color: group.color }}>
                    <FileText size={19} />
                  </div>
                  <ExternalLink size={15} className="text-gray-400 dark:text-white/30 transition-colors group-hover:text-gray-700 dark:group-hover:text-white/80" />
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-gray-900 dark:text-white">{doc.title}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-white/45">{doc.description}</p>
                <div className="mt-3 text-[11px] font-bold" style={{ color: group.color }}>
                  Open PDF →
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
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
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white/80 mb-4">
          <Calendar size={16} /> Build your revision roadmap
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs text-gray-600 dark:text-white/50 font-bold">
            Days available
            <input
              type="number"
              min={1}
              max={60}
              value={days}
              onChange={(e) => setDays(Math.min(60, Math.max(1, parseInt(e.target.value || "1", 10) || 1)))}
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/30 px-3 py-2 text-gray-900 dark:text-white font-medium outline-none focus:border-gray-500 dark:focus:border-white/30"
            />
          </label>
          <label className="text-xs text-gray-600 dark:text-white/50 font-bold">
            Minutes available per day
            <input
              type="number"
              min={20}
              step={10}
              value={minutesPerDay}
              onChange={(e) => setMinutesPerDay(Math.min(600, Math.max(20, parseInt(e.target.value || "20", 10) || 20)))}
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/30 px-3 py-2 text-gray-900 dark:text-white font-medium outline-none focus:border-gray-500 dark:focus:border-white/30"
            />
          </label>
        </div>

        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
          {grouped.map((s) => (
            <div key={s.id}>
              <div className="mb-1 text-xs font-bold" style={{ color: s.color }}>
                {s.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {s.chapters.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`rounded-lg border px-2 py-1 text-[11px] font-semibold transition-all ${
                      selected[c.id]
                        ? "text-white dark:text-black shadow-2xs"
                        : "text-gray-600 dark:text-white/50 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
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
          className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6B58EE] to-[#0E9E8B] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40 shadow-xs"
        >
          <Sparkles size={16} /> Generate roadmap ({selectedChapters.length} selected)
        </button>
      </div>

      {plan && (
        <div className="space-y-3">
          {plan.map((dp) => (
            <div key={dp.day} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-widest text-gray-500 dark:text-white/50">Day {dp.day}</div>
              <div className="space-y-1.5">
                {dp.sessions.map((s, i) =>
                  s.break ? (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-white/[0.02] px-3 py-1.5 text-[11px] text-gray-500 dark:text-white/35 font-medium">
                      <TimerIcon size={12} /> {s.minutes} min burnout break
                    </div>
                  ) : s.note ? (
                    <div key={i} className="rounded-lg bg-gray-100 dark:bg-white/[0.02] px-3 py-1.5 text-xs text-gray-600 dark:text-white/50 font-medium">
                      {s.note}
                    </div>
                  ) : (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-white/5 px-3 py-1.5 text-xs shadow-2xs bg-gray-50 dark:bg-transparent">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-gray-500 dark:text-white/40 font-semibold">{s.subject}</span>
                        <span className="text-gray-900 dark:text-white/85 font-bold">{s.name}</span>
                      </span>
                      <span className="text-gray-600 dark:text-white/40 font-mono font-semibold">{s.minutes} min</span>
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
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white/80">
          <Swords size={16} /> Quiz Arena & 2026 PYQ Challenge Deck
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSubjectId(s.id)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                subjectId === s.id
                  ? "text-white dark:text-black shadow-2xs"
                  : "text-gray-600 dark:text-white/60 border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
              }`}
              style={subjectId === s.id ? { background: s.color, borderColor: s.color } : {}}
            >
              {s.name}
            </button>
          ))}
        </div>
        <label className="mb-4 flex items-center gap-2 text-xs text-gray-600 dark:text-white/50 font-bold cursor-pointer">
          <input type="checkbox" checked={pyqOnly} onChange={(e) => setPyqOnly(e.target.checked)} />
          2026 PYQ pattern questions only
        </label>
        <button
          onClick={start}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-xs"
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
        <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {score} / {questions.length}
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-white/50 mb-4">correct in {subject.name}</div>
        <button
          onClick={start}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-white/15 px-4 py-2 text-sm font-bold text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 shadow-2xs"
        >
          <RotateCcw size={14} /> Play again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-white/40 font-bold">
        <span>
          Question {qIndex + 1} / {questions.length}
        </span>
        <span className="flex items-center gap-1 font-mono" style={{ color: timeLeft <= 5 ? "#DC2626" : "inherit" }}>
          <TimerIcon size={12} /> {timeLeft}s
        </span>
      </div>
      <div className="mb-4 text-base font-bold text-gray-900 dark:text-white">{q.q}</div>
      <div className="space-y-2">
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.a;
          const isPicked = picked === i;
          let cls = "border-gray-300 dark:border-white/10 text-gray-700 dark:text-white/75 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium";
          if (picked !== null) {
            if (isCorrect) cls = "border-emerald-500/80 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold";
            else if (isPicked) cls = "border-red-500/80 bg-red-500/10 text-red-800 dark:text-red-300 font-bold";
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-all shadow-2xs ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button
          onClick={next}
          className="mt-4 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-xs"
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
  const [view, setView] = useState("home");
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
      <div className="flex h-[500px] items-center justify-center text-gray-500 dark:text-white/40 text-sm font-bold">
        Loading your board hub…
      </div>
    );
  }

  const activeSubject = SUBJECTS.find((s) => s.id === view);

  return (
    <div data-theme={theme} className={`board-hub min-h-[640px] w-full rounded-3xl overflow-hidden shadow-xl ${theme === "dark" ? "dark bg-[#0c0c14] text-white" : "bg-[#F8F9FC] text-gray-900"}`}>
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

        .board-hub[data-theme="light"] { background: #F8F9FC !important; color: #111827 !important; }
        .board-hub[data-theme="dark"] { background: #0c0c14 !important; color: #ffffff !important; }
        .board-hub[data-theme="light"] .text-white { color: #111827 !important; }
        .board-hub[data-theme="light"] .text-white\/90 { color: #111827 !important; }
        .board-hub[data-theme="light"] .text-white\/85 { color: #111827 !important; }
        .board-hub[data-theme="light"] .text-white\/80 { color: #1f2937 !important; }
        .board-hub[data-theme="light"] .text-white\/60 { color: #4b5563 !important; }
        .board-hub[data-theme="light"] .text-white\/55 { color: #4b5563 !important; }
        .board-hub[data-theme="light"] .text-white\/50 { color: #6b7280 !important; }
        .board-hub[data-theme="light"] .text-white\/45 { color: #6b7280 !important; }
        .board-hub[data-theme="light"] .text-white\/40 { color: #6b7280 !important; }
        .board-hub[data-theme="light"] .text-white\/35 { color: #6b7280 !important; }
        .board-hub[data-theme="light"] .text-white\/30 { color: #9ca3af !important; }
        .board-hub[data-theme="light"] .border-white\/10 { border-color: rgba(0,0,0,0.10) !important; }
        .board-hub[data-theme="light"] .border-white\/15 { border-color: rgba(0,0,0,0.15) !important; }
        .board-hub[data-theme="light"] .border-white\/20 { border-color: rgba(0,0,0,0.20) !important; }
        .board-hub[data-theme="light"] .bg-white\/5 { background: rgba(0,0,0,0.05) !important; }
        .board-hub[data-theme="light"] .bg-white\/10 { background: rgba(0,0,0,0.10) !important; }
        .board-hub[data-theme="light"] .bg-white\/15 { background: rgba(0,0,0,0.15) !important; }
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
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-transparent p-4 flex md:flex-col gap-1 md:gap-1 overflow-x-auto md:overflow-visible">
          <div className="mb-3 hidden md:flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6B58EE] to-[#0E9E8B]">
              <Award size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-extrabold leading-tight text-gray-900 dark:text-white">Board Hub</div>
              <div className="text-[10px] text-gray-500 dark:text-white/40 font-semibold">Class 10 CBSE 2026-27</div>
            </div>
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
              className="theme-toggle flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 shadow-2xs"
            >
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="md:hidden ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white/60 shadow-2xs"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <NavItem icon={HomeIcon} label="Dashboard" active={view === "home"} onClick={() => setView("home")} accent="#6B58EE" />
          <NavItem icon={Calendar} label="Timetable Setter" active={view === "timetable"} onClick={() => setView("timetable")} accent="#0E9E8B" />
          <NavItem icon={Swords} label="Quiz Arena" active={view === "quiz"} onClick={() => setView("quiz")} accent="#D96B1E" />
          <NavItem icon={FileText} label="Documents" active={view === "documents"} onClick={() => setView("documents")} accent="#B8860B" />

          <div className="mt-3 mb-1 px-2 text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30 font-bold hidden md:block">Subjects</div>
          {SUBJECTS.map((s) => (
            <NavItem key={s.id} icon={s.Icon} label={s.name} active={view === s.id} onClick={() => setView(s.id)} accent={s.color} />
          ))}

          <div className="mt-auto hidden md:flex items-center gap-2 rounded-xl bg-gray-200/50 dark:bg-white/5 px-3 py-2.5 border border-gray-200/60 dark:border-transparent">
            <Flame size={16} className="text-[#D96B1E]" />
            <div className="text-xs">
              <div className="font-extrabold text-gray-900 dark:text-white">{progress.streak} day streak</div>
              <div className="text-gray-500 dark:text-white/40 font-semibold">{progress.xp} XP earned</div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
          {view === "home" && <Dashboard progress={progress} onGo={setView} />}
          {view === "timetable" && <TimetablePage />}
          {view === "quiz" && <QuizArena addXP={addXP} onCelebrate={fireConfetti} />}
          {view === "documents" && <DocumentsPage />}
          {activeSubject && <SubjectPage subject={activeSubject} progress={progress} setDone={setDone} theme={theme} />}
        </div>
      </div>
    </div>
  );
}
