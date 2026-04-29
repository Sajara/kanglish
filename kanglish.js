// ─── Kanglish Translation Engine v2 ────────────────────────────────────────

const VERBS = {
  "come":     { madi: "banni",     gerund: "barthaa",   past: "bande",     present: "barthini" },
  "go":       { madi: "hogi",      gerund: "hogthaa",   past: "hoyde",     present: "hogthini" },
  "bring":    { madi: "thogondu banni", gerund: "thogondu", past: "thogonde", present: "thogothini" },
  "take":     { madi: "thogondu hogi",  gerund: "thogondu", past: "thogonde", present: "thogothini" },
  "give":     { madi: "kodi",      gerund: "kodthaa",   past: "kotte",     present: "kodthini" },
  "eat":      { madi: "tinni",     gerund: "tinthaa",   past: "tinde",     present: "tinthini" },
  "drink":    { madi: "kudi",      gerund: "kudithaa",  past: "kudide",    present: "kudithini" },
  "wait":     { madi: "thadi",     gerund: "thadthaa",  past: "thadide",   present: "thadthini" },
  "call":     { madi: "call-madi", gerund: "call-maadthaa", past: "call-maadde", present: "call-maadthini" },
  "pay":      { madi: "pay-madi",  gerund: "pay-maadthaa",  past: "pay-maadde",  present: "pay-maadthini" },
  "start":    { madi: "shuru-madi",gerund: "shuru-maadthaa",past: "shuru-maadde",present: "shuru-maadthini" },
  "stop":     { madi: "nilsu",     gerund: "nilsthaa",  past: "nilside",   present: "nilsthini" },
  "tell":     { madi: "heli",      gerund: "helthaa",   past: "helde",     present: "helthini" },
  "say":      { madi: "heli",      gerund: "helthaa",   past: "helde",     present: "helthini" },
  "show":     { madi: "thorsu",    gerund: "thorsthaa", past: "thorside",  present: "thorsthini" },
  "see":      { madi: "nodi",      gerund: "nodthaa",   past: "node",      present: "nodthini" },
  "look":     { madi: "nodi",      gerund: "nodthaa",   past: "node",      present: "nodthini" },
  "watch":    { madi: "nodi",      gerund: "nodthaa",   past: "node",      present: "nodthini" },
  "sit":      { madi: "kutkoli",   gerund: "kutkothaa", past: "kutkonde",  present: "kutkothini" },
  "stand":    { madi: "nilli",     gerund: "nilthaa",   past: "ninte",     present: "nilthini" },
  "walk":     { madi: "nadee",     gerund: "nadeethaa", past: "nadede",    present: "nadeethini" },
  "run":      { madi: "odu",       gerund: "odthaa",    past: "odide",     present: "odthini" },
  "send":     { madi: "kalsu",     gerund: "kalsthaa",  past: "kalside",   present: "kalsthini" },
  "keep":     { madi: "itkoli",    gerund: "itkothaa",  past: "itkonde",   present: "itkothini" },
  "put":      { madi: "haku",      gerund: "hakthaa",   past: "hakide",    present: "hakthini" },
  "open":     { madi: "open-madi", gerund: "open-maadthaa", past: "open-maadde", present: "open-maadthini" },
  "close":    { madi: "close-madi",gerund: "close-maadthaa",past: "close-maadde",present: "close-maadthini" },
  "clean":    { madi: "clean-madi",gerund: "clean-maadthaa",past: "clean-maadde",present: "clean-maadthini" },
  "wash":     { madi: "tholee",    gerund: "tholeethaa",past: "tholeede",  present: "tholeethini" },
  "cook":     { madi: "aduge-madi",gerund: "aduge-maadthaa",past: "aduge-maadde",present: "aduge-maadthini" },
  "help":     { madi: "help-madi", gerund: "help-maadthaa", past: "help-maadde", present: "help-maadthini" },
  "work":     { madi: "kelsa-madi",gerund: "kelsa-maadthaa",past: "kelsa-maadde",present: "kelsa-maadthini" },
  "finish":   { madi: "mugsu",     gerund: "mugsthaa",  past: "mugside",   present: "mugsthini" },
  "buy":      { madi: "thogoli",   gerund: "thogothaa", past: "thogonde",  present: "thogothini" },
  "sell":     { madi: "maaru",     gerund: "maaruthaa", past: "maarude",   present: "maaruthini" },
  "read":     { madi: "odu",       gerund: "odthaa",    past: "odide",     present: "odthini" },
  "write":    { madi: "baree",     gerund: "bareethaa", past: "bareede",   present: "bareethini" },
  "drive":    { madi: "drive-madi",gerund: "drive-maadthaa",past: "drive-maadde",present: "drive-maadthini" },
  "park":     { madi: "park-madi", gerund: "park-maadthaa", past: "park-maadde", present: "park-maadthini" },
  "book":     { madi: "book-madi", gerund: "book-maadthaa", past: "book-maadde", present: "book-maadthini" },
  "cancel":   { madi: "cancel-madi",gerund:"cancel-maadthaa",past:"cancel-maadde",present:"cancel-maadthini" },
  "check":    { madi: "check-madi",gerund: "check-maadthaa",past: "check-maadde",present: "check-maadthini" },
  "fix":      { madi: "fix-madi",  gerund: "fix-maadthaa",  past: "fix-maadde",  present: "fix-maadthini" },
  "order":    { madi: "order-madi",gerund: "order-maadthaa",past: "order-maadde",present: "order-maadthini" },
  "deliver":  { madi: "deliver-madi",gerund:"deliver-maadthaa",past:"deliver-maadde",present:"deliver-maadthini" },
  "install":  { madi: "install-madi",gerund:"install-maadthaa",past:"install-maadde",present:"install-maadthini" },
  "update":   { madi: "update-madi",gerund:"update-maadthaa",past:"update-maadde",present:"update-maadthini" },
  "download": { madi: "download-madi",gerund:"download-maadthaa",past:"download-maadde",present:"download-maadthini" },
  "share":    { madi: "share-madi",gerund: "share-maadthaa",past: "share-maadde",present: "share-maadthini" },
  "print":    { madi: "print-madi",gerund: "print-maadthaa",past: "print-maadde",present: "print-maadthini" },
  "move":     { madi: "move-madi", gerund: "move-maadthaa", past: "move-maadde", present: "move-maadthini" },
  "turn":     { madi: "thirgu",    gerund: "thirgthaa", past: "thirgide",  present: "thirgthini" },
  "use":      { madi: "use-madi",  gerund: "use-maadthaa",  past: "use-maadde",  present: "use-maadthini" },
  "ask":      { madi: "kelu",      gerund: "kelthaa",   past: "kelde",     present: "kelthini" },
  "sleep":    { madi: "malkoli",   gerund: "malkothaa", past: "malkonde",  present: "malkothini" },
  "wake":     { madi: "yeddu",     gerund: "yeddthaa",  past: "yeddide",   present: "yeddthini" },
  "make":     { madi: "maadi",     gerund: "maadthaa",  past: "maadde",    present: "maadthini" },
  "do":       { madi: "maadi",     gerund: "maadthaa",  past: "maadde",    present: "maadthini" },
  "talk":     { madi: "maathaadu", gerund: "maathaadthaa",past:"maathaadde",present:"maathaadthini" },
  "speak":    { madi: "maathaadu", gerund: "maathaadthaa",past:"maathaadde",present:"maathaadthini" },
  "listen":   { madi: "keli",      gerund: "kelthaa",   past: "kelde",     present: "kelthini" },
  "learn":    { madi: "kalthkoli", gerund: "kalthkothaa",past:"kalthkonde",present:"kalthkothini" },
  "play":     { madi: "aadu",      gerund: "aadthaa",   past: "aadide",    present: "aadthini" },
  "sing":     { madi: "haadu",     gerund: "haadthaa",  past: "haadide",   present: "haadthini" },
  "know":     { madi: "gottu",     gerund: "gottu",     past: "gottittu",  present: "gottu" },
  "think":    { madi: "yochne-madi",gerund:"yochne-maadthaa",past:"yochne-maadde",present:"yochne-maadthini" },
  "forget":   { madi: "marathbedi",gerund: "marethaa",  past: "marethde",  present: "marethini" },
  "remember": { madi: "nenpu-itkoli",gerund:"nenpu-itkothaa",past:"nenpu-itkonde",present:"nenpu-itkothini" },
  "try":      { madi: "try-madi",  gerund: "try-maadthaa",  past: "try-maadde",  present: "try-maadthini" },
  "leave":    { madi: "bidu",      gerund: "bidthaa",   past: "bidde",     present: "bidthini" },
  "stay":     { madi: "iru",       gerund: "irthaa",    past: "idde",      present: "irthini" },
  "reach":    { madi: "reach-aagu",gerund: "reach-aagthaa", past: "reach-aaytu", present: "reach-aagthini" },
  "return":   { madi: "vapas-banni",gerund:"vapas-barthaa",past:"vapas-bande",present:"vapas-barthini" },
  "change":   { madi: "change-madi",gerund:"change-maadthaa",past:"change-maadde",present:"change-maadthini" },
  "pick":     { madi: "thogoli",   gerund: "thogothaa", past: "thogonde",  present: "thogothini" },
  "drop":     { madi: "bidu",      gerund: "bidthaa",   past: "bidde",     present: "bidthini" },
  "meet":     { madi: "meet-madi", gerund: "meet-maadthaa", past: "meet-maadde", present: "meet-maadthini" },
  "complete": { madi: "mugsu",     gerund: "mugsthaa",  past: "mugside",   present: "mugsthini" },
  "prepare":  { madi: "ready-madi",gerund: "ready-maadthaa",past: "ready-maadde",present: "ready-maadthini" },
  "hold":     { madi: "hidkoli",   gerund: "hidkothaa", past: "hidkonde",  present: "hidkothini" },
  "push":     { madi: "thallu",    gerund: "thallthaa", past: "thallide",  present: "thallthini" },
  "pull":     { madi: "eelu",      gerund: "eelthaa",   past: "eelde",     present: "eelthini" },
  "need":     { madi: "beku",      gerund: "beku",      past: "bekittu",   present: "beku" },
  "want":     { madi: "beku",      gerund: "beku",      past: "bekittu",   present: "beku" },
};

// ─── Irregular verb form → base form lookup ────────────────────────────────
const VERB_FORMS = {};
(function() {
  const irregulars = {
    "came":"come","coming":"come","comes":"come",
    "went":"go","going":"go","goes":"go","gone":"go",
    "brought":"bring","bringing":"bring","brings":"bring",
    "took":"take","taking":"take","takes":"take","taken":"take",
    "gave":"give","giving":"give","gives":"give","given":"give",
    "ate":"eat","eating":"eat","eats":"eat","eaten":"eat",
    "drank":"drink","drinking":"drink","drinks":"drink","drunk":"drink",
    "told":"tell","telling":"tell","tells":"tell",
    "said":"say","saying":"say","says":"say",
    "saw":"see","seeing":"see","sees":"see","seen":"see",
    "sat":"sit","sitting":"sit","sits":"sit",
    "stood":"stand","standing":"stand","stands":"stand",
    "ran":"run","running":"run","runs":"run",
    "sent":"send","sending":"send","sends":"send",
    "kept":"keep","keeping":"keep","keeps":"keep",
    "held":"hold","holding":"hold","holds":"hold",
    "made":"make","making":"make","makes":"make",
    "did":"do","doing":"do","does":"do","done":"do",
    "spoke":"speak","speaking":"speak","speaks":"speak","spoken":"speak",
    "talked":"talk","talking":"talk","talks":"talk",
    "knew":"know","knowing":"know","knows":"know","known":"know",
    "thought":"think","thinking":"think","thinks":"think",
    "forgot":"forget","forgetting":"forget","forgets":"forget","forgotten":"forget",
    "tried":"try","trying":"try","tries":"try",
    "left":"leave","leaving":"leave","leaves":"leave",
    "stayed":"stay","staying":"stay","stays":"stay",
    "reached":"reach","reaching":"reach","reaches":"reach",
    "returned":"return","returning":"return","returns":"return",
    "picked":"pick","picking":"pick","picks":"pick",
    "dropped":"drop","dropping":"drop","drops":"drop",
    "met":"meet","meeting":"meet","meets":"meet",
    "slept":"sleep","sleeping":"sleep","sleeps":"sleep",
    "woke":"wake","waking":"wake","wakes":"wake","woken":"wake",
    "walked":"walk","walking":"walk","walks":"walk",
    "waited":"wait","waiting":"wait","waits":"wait",
    "called":"call","calling":"call","calls":"call",
    "paid":"pay","paying":"pay","pays":"pay",
    "started":"start","starting":"start","starts":"start",
    "stopped":"stop","stopping":"stop","stops":"stop",
    "opened":"open","opening":"open","opens":"open",
    "closed":"close","closing":"close","closes":"close",
    "cleaned":"clean","cleaning":"clean","cleans":"clean",
    "washed":"wash","washing":"wash","washes":"wash",
    "cooked":"cook","cooking":"cook","cooks":"cook",
    "helped":"help","helping":"help","helps":"help",
    "worked":"work","working":"work","works":"work",
    "finished":"finish","finishing":"finish","finishes":"finish",
    "bought":"buy","buying":"buy","buys":"buy",
    "sold":"sell","selling":"sell","sells":"sell",
    "wrote":"write","writing":"write","writes":"write","written":"write",
    "drove":"drive","driving":"drive","drives":"drive","driven":"drive",
    "parked":"park","parking":"park","parks":"park",
    "booked":"book","booking":"book","books":"book",
    "cancelled":"cancel","cancelling":"cancel","cancels":"cancel",
    "checked":"check","checking":"check","checks":"check",
    "fixed":"fix","fixing":"fix","fixes":"fix",
    "ordered":"order","ordering":"order","orders":"order",
    "delivered":"deliver","delivering":"deliver","delivers":"deliver",
    "installed":"install","installing":"install","installs":"install",
    "updated":"update","updating":"update","updates":"update",
    "shared":"share","sharing":"share","shares":"share",
    "printed":"print","printing":"print","prints":"print",
    "moved":"move","moving":"move","moves":"move",
    "turned":"turn","turning":"turn","turns":"turn",
    "used":"use","using":"use","uses":"use",
    "asked":"ask","asking":"ask","asks":"ask",
    "played":"play","playing":"play","plays":"play",
    "sang":"sing","singing":"sing","sings":"sing","sung":"sing",
    "danced":"dance","dancing":"dance","dances":"dance",
    "liked":"like","liking":"like","likes":"like",
    "loved":"love","loving":"love","loves":"love",
    "learned":"learn","learning":"learn","learns":"learn",
    "listened":"listen","listening":"listen","listens":"listen",
    "completed":"complete","completing":"complete","completes":"complete",
    "prepared":"prepare","preparing":"prepare","prepares":"prepare",
    "changed":"change","changing":"change","changes":"change",
    "attended":"attend","attending":"attend","attends":"attend",
    "pushed":"push","pushing":"push","pushes":"push",
    "pulled":"pull","pulling":"pull","pulls":"pull",
    "needed":"need","needing":"need","needs":"need",
    "wanted":"want","wanting":"want","wants":"want",
    "remembered":"remember","remembering":"remember","remembers":"remember",
    "loaded":"load","loading":"load","loads":"load",
    "locked":"lock","locking":"lock","locks":"lock",
    "unlocked":"unlock","unlocking":"unlock","unlocks":"unlock",
    "packed":"pack","packing":"pack","packs":"pack",
    "signed":"sign","signing":"sign","signs":"sign",
    "scanned":"scan","scanning":"scan","scans":"scan",
    "downloaded":"download","downloading":"download","downloads":"download",
    "charged":"charge","charging":"charge","charges":"charge",
  };
  // Add base forms
  for (const base of Object.keys(VERBS)) {
    VERB_FORMS[base] = base;
  }
  // Add irregulars
  for (const [form, base] of Object.entries(irregulars)) {
    VERB_FORMS[form] = base;
  }
})();


// ─── Nouns: any word not recognized gets "-u" appended ─────────────────────
const KNOWN_NOUNS = new Set([
  "bus","office","store","bill","shop","auto","metro","train","ticket",
  "phone","laptop","bag","card","cash","change","food","coffee","tea",
  "water","juice","milk","rice","lunch","dinner","breakfast","snack",
  "room","house","flat","road","signal","bridge","mall","park","hotel",
  "hospital","school","college","temple","church","mosque","market",
  "meeting","class","exam","job","salary","rent","deposit","loan",
  "tax","fine","receipt","form","file","report","mail","message",
  "number","address","name","date","time","price","rate","size",
  "color","type","brand","model","plan","offer","deal","pass",
  "key","lock","gate","door","lift","stair","floor","seat",
  "table","chair","glass","plate","cup","bottle","box","cover",
  "light","tubelight","bulb","fan","ac","tv","fridge","oven",
  "bike","car","scooter","cycle","truck","van","cab","uber","ola",
  "shirt","pant","dress","shoe","chappal","belt","watch","ring",
  "book","pen","paper","note","photo","video","song","movie",
  "money","rupee","paisa","coin","wallet","purse","atm","bank",
  "doctor","teacher","driver","cook","maid","guard","plumber","electrician",
  "brother","sister","friend","uncle","aunty","boss","sir","madam",
  "morning","evening","night","afternoon","today","tomorrow","yesterday",
  "week","month","year","minute","hour","second",
  "place","area","side","corner","center","top","bottom","front","back",
  "problem","issue","reason","answer","question","idea","thing","stuff",
  "clothes","vehicle","medicine","tablet","injection","test","result",
]);

// ─── Question words ────────────────────────────────────────────────────────
const QUESTION_WORDS = {
  "where": "yelli", "when": "yavaga", "how much": "eshtu",
  "how many": "eshtu", "how": "hege", "what": "yenu",
  "why": "yaake", "who": "yaaru", "which": "yaavudu",
};

// ─── Time / adverb words ──────────────────────────────────────────────────
const ADVERBS = {
  "tomorrow": "naaleki", "today": "ivattu", "yesterday": "ninne",
  "now": "eega", "later": "amele", "quickly": "begne",
  "slowly": "nidhaanvaagi", "already": "aagale", "again": "innomme",
  "here": "illi", "there": "alli", "always": "yavaglu",
  "never": "yaavaglu illa", "sometimes": "kelavu sarti",
  "morning": "beligge", "evening": "saanje", "night": "raathri",
  "afternoon": "madhyaahna", "daily": "dinaa", "soon": "begne",
  "first": "modlu", "then": "amele", "after": "amele",
  "before": "munche", "together": "serthu", "alone": "ondu",
  "outside": "horage", "inside": "olage", "up": "mele", "down": "kelage",
  "very": "thumba", "little": "swalpa", "more": "innashtu", "less": "kammi",
  "much": "thumba", "many": "thumba", "enough": "saaku",
};

// ─── Pronouns & misc ──────────────────────────────────────────────────────
const PRONOUNS = {
  "i": "naanu", "me": "nanage", "my": "nanna", "mine": "nanadu",
  "you": "neenu", "your": "ninna", "yours": "ninadu",
  "he": "avnu", "him": "avanige", "his": "avna",
  "she": "avlu", "her": "avalige",
  "we": "naavu", "our": "namma", "us": "namage",
  "they": "avru", "them": "avrige", "their": "avra",
  "it": "adu", "this": "idu", "that": "adu",
  "these": "ivugalu", "those": "avugalu",
};

const MISC_WORDS = {
  "yes": "haudu", "no": "illa", "not": "illa",
  "ok": "sari", "okay": "sari", "fine": "sari",
  "good": "chennaagi", "bad": "kelsa illa",
  "big": "doddu", "small": "chikku",
  "new": "hosa", "old": "halae",
  "hot": "bisi", "cold": "thandi",
  "fast": "begne", "slow": "nidhaana",
  "right": "sari", "wrong": "tappu",
  "all": "ella", "some": "kelavu", "any": "yaavdu",
  "also": "kooda", "too": "kooda", "only": "ashte",
  "but": "aadre", "and": "mathu", "or": "athva",
  "if": "andre", "because": "yaakandre",
  "with": "jothege", "without": "illade",
  "please": "dayavittu", "sorry": "sorry",
  "thanks": "dhanyavaada", "thank": "dhanyavaada",
  "sir": "sir", "madam": "madam",
  "really": "nijvaaglu", "maybe": "belki",
  "sure": "khachit", "definitely": "khachit",
};

// Words that stay as-is in Kanglish (English loanwords common in Bengaluru)
const LOANWORDS = new Set([
  "late","early","free","busy","ready","full","empty","fresh","nice",
  "tension","chance","adjust","manage","settle","pending",
  "urgent","important","different","same","direct","correct",
  "simple","double","single","extra","total","half",
  "super","solid","mass","scene","mood",
  "strict","tight","loose","heavy","strong","weak",
  "happy","sad","angry","tired","bored","confused","worried",
  "online","offline","available",
  "cleaning","washing","cooking","shopping","parking","packing",
]);

// ─── Tamil → Kanglish word map ─────────────────────────────────────────────
const TAMIL_MAP = {
  "enge":"yelli","enga":"yelli","eppo":"yavaga","eppadi":"hege",
  "evvalo":"eshtu","yenna":"yenu","enna":"yenu","yaaru":"yaaru","yaar":"yaaru",
  "naan":"naanu","nee":"neenu","avanga":"avru","avaru":"avru",
  "avan":"avnu","aval":"avlu","naanga":"naavu","neenga":"neevu","ivanga":"ivru",
  "vanga":"banni","vaanga":"banni","ponga":"hogi","poda":"hogo","podi":"hogo",
  "sollu":"helu","solu":"helu","sollunga":"helri",
  "paaru":"nodu","paarunga":"nodri",
  "kudu":"kodu","kudunga":"kodri",
  "saapdu":"tinnu","saapdunga":"tinnri",
  "kelu":"kelu","kelunga":"kelri",
  "iru":"iru","irunga":"irri","irukinga":"iddira","irukken":"iddini",
  "irukku":"ide","illai":"illa","illa":"illa",
  "theriyum":"gottu","theriyadu":"gottilla",
  "venum":"beku","vendam":"beda",
  "mudiyum":"aagutte","mudiyadu":"aagalla",
  "pannunga":"maadri","pannu":"maadu","pannuren":"maadtini",
  "pogalam":"hogona","varavaa":"barthiya","vandhuruchu":"bandide",
  "panam":"dud-du","paisaa":"paisa","kadai":"angadi","veedu":"mane",
  "ooru":"ooru","saapaadu":"oota","thanni":"neeru","velai":"kelsa",
  "nalla":"chennaagi","romba":"thumba","konjam":"swalpa",
  "seri":"sari","aama":"haudu","aamaa":"haudu",
  "inga":"illi","anga":"alli",
  "inniku":"ivattu","innaiku":"ivattu","naalaikku":"naaleki",
  "nethu":"ninne","nethi":"ninne",
  "nanri":"dhanyavaada",
  "thogondu":"thogondu","eduthutu":"thogondu",
  "kondu":"thogondu","eduthu":"thogondu",
};

// Tamil phrase patterns
const TAMIL_PHRASES = [
  [/\beppadi\s+irukkinga\b/i, "hege iddira?"],
  [/\beppadi\s+irukinga\b/i, "hege iddira?"],
  [/\bnaan\s+nalla\s+irukken\b/i, "naanu chennaagi iddini"],
  [/\benge\s+irukinga\b/i, "yelli iddira?"],
  [/\benge\s+irukkinga\b/i, "yelli iddira?"],
  [/\beppo\s+vareenga\b/i, "yavaga barthira?"],
  [/\beppo\s+varinga\b/i, "yavaga barthira?"],
  [/\bvanga\s+pogalam\b/i, "banni hogona"],
  [/\bvaanga\s+pogalam\b/i, "banni hogona"],
  [/\byenna\s+achu\b/i, "yenu aaytu?"],
  [/\benna\s+aachu\b/i, "yenu aaytu?"],
  [/\bidu\s+enna\b/i, "idu yenu?"],
  [/\badu\s+enna\b/i, "adu yenu?"],
];

// ─── English phrase patterns (full sentence matches) ───────────────────────
const ENG_PHRASES = [
  [/\bis\s+it\s+done\b/i, "aita?"],
  [/\bare\s+you\s+done\b/i, "aita?"],
  [/\bis\s+it\s+over\b/i, "aita?"],
  [/\bhow\s+are\s+you\b/i, "hege iddira?"],
  [/\b(?:please\s+)?wait\s+(?:i\s+am|i'm)\s+coming\b/i, "thadi, naanu barthini"],
  [/\bi('| a)?m\s+fine\b/i, "naanu chennaagi iddini"],

  // ── "can you come/go" polite request patterns ──
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+today\s+for\s+(\w+)\b/i, (m, task) => "ivattu swalpa late banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+tomorrow\s+for\s+(\w+)\b/i, (m, task) => "naaleki swalpa late banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+today\b/i, "ivattu swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+tomorrow\b/i, "naaleki swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\b/i, "swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+early\s+today\b/i, "ivattu swalpa early banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+early\s+tomorrow\b/i, "naaleki swalpa early banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+early\b/i, "swalpa early banni"],
  [/\bcan\s+you\s+come\s+early\s+tomorrow\s+for\s+(\w+)\b/i, (m, task) => "naaleki early banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+late\s+tomorrow\s+for\s+(\w+)\b/i, (m, task) => "naaleki late banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+early\s+today\s+for\s+(\w+)\b/i, (m, task) => "ivattu early banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+early\s+tomorrow\b/i, "naaleki early banni"],
  [/\bcan\s+you\s+come\s+late\s+tomorrow\b/i, "naaleki late banni"],
  [/\bcan\s+you\s+come\s+today\s+for\s+(\w+)\b/i, (m, task) => "ivattu banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+tomorrow\s+for\s+(\w+)\b/i, (m, task) => "naaleki banni, " + nounU(task) + " maadoke"],
  [/\bcan\s+you\s+come\s+today\b/i, "ivattu banni"],
  [/\bcan\s+you\s+come\s+tomorrow\b/i, "naaleki banni"],
  [/\bcan\s+you\s+come\b/i, "banni"],
  [/\bcan\s+you\s+(\w+)\s+(?:the\s+)?(\w+)\b/i, (m, verb, obj) => {
    const base = VERB_FORMS[verb.toLowerCase()];
    const v = base && VERBS[base] ? VERBS[base].madi : verb + "-madi";
    return nounU(obj) + " " + v;
  }],
  [/\bcan\s+you\s+(\w+)\b/i, (m, verb) => {
    const base = VERB_FORMS[verb.toLowerCase()];
    if (base && VERBS[base]) return VERBS[base].madi;
    return verb + "-madi";
  }],
  [/\bi\s+don'?t\s+know\b/i, "nanage gottilla"],
  [/\bi\s+know\b/i, "nanage gottu"],
  [/\bcome\s+early\s+tomorrow\s+for\s+(\w+)\b/i, (m, task) => {
    const base = VERB_FORMS[task.toLowerCase()];
    if (base && VERBS[base]) return "naaleki early banni, " + nounU(task) + " maadoke";
    return "naaleki early banni, " + nounU(task) + "-ge";
  }],
  [/\bcome\s+early\s+tomorrow\b/i, "naaleki early banni"],
  [/\bcome\s+late\s+tomorrow\b/i, "naaleki late banni"],
  [/\bcome\s+early\s+today\b/i, "ivattu early banni"],
  [/\bcome\s+here\b/i, "illi banni"],
  [/\bgo\s+there\b/i, "alli hogi"],
  [/\btell\s+(?:him|her|them)\s+to\s+come\b/i, (m) => {
    const who = /him/i.test(m) ? "avanige" : /her/i.test(m) ? "avalige" : "avrige";
    return who + " baa helu";
  }],
  [/\bno\s+problem\b/i, "yenu problem-u illa"],
  [/\bwhat\s+happened\b/i, "yenu aaytu?"],
  [/\bwhat('| i)?s\s+this\b/i, "idu yenu?"],
  [/\bwhat('| i)?s\s+that\b/i, "adu yenu?"],
  [/\bwhere\s+are\s+you\b/i, "yelli iddira?"],
  [/\bwhen\s+are\s+you\s+coming\b/i, "yavaga barthira?"],
  [/\blet('| u)?s\s+go\b/i, "hogona"],
  [/\bdon'?t\s+want\b/i, "beda"],
  [/\bi\s+want\s+(\w+)\b/i, (m, thing) => "nanage " + nounU(thing) + " beku"],
  [/\bi\s+need\s+(\w+)\b/i, (m, thing) => "nanage " + nounU(thing) + " beku"],
  [/\bi\s+want\b/i, "nanage beku"],
  [/\bi\s+need\b/i, "nanage beku"],
  [/\bthank\s+you\b/i, "dhanyavaada"],
  [/\bthanks\b/i, "dhanyavaada"],
  [/\bnot\s+possible\b/i, "aagalla"],
  [/\bvery\s+good\b/i, "thumba chennaagi"],
  [/\btoo\s+much\b/i, "thumba jaasti"],
  [/\ba\s+little\b/i, "swalpa"],
  [/\bis\s+(\w+)\s+done\??/i, (m, noun) => nounU(noun) + " aita?"],

  // ── "please bring X while coming tomorrow" full-sentence patterns ──
  [/\b(?:please\s+)?bring\s+(.+?)\s+while\s+coming\s+tomorrow\b/i, (m, obj) => "naaleki barthaa " + translateObject(obj) + " thogondu banni"],
  [/\b(?:please\s+)?bring\s+(.+?)\s+while\s+coming\b/i, (m, obj) => "barthaa " + translateObject(obj) + " thogondu banni"],
  [/\b(?:please\s+)?bring\s+(.+?)\s+tomorrow\b/i, (m, obj) => "naaleki " + translateObject(obj) + " thogondu banni"],
  [/\bwhile\s+coming\s+tomorrow\s*,?\s*(?:please\s+)?bring\s+(.+)/i, (m, obj) => "naaleki barthaa, " + translateObject(obj) + " thogondu banni"],
  [/\bwhile\s+coming\s*,?\s*(?:please\s+)?bring\s+(.+)/i, (m, obj) => "barthaa, " + translateObject(obj) + " thogondu banni"],
  [/\b(?:please\s+)?bring\s+(.+)/i, (m, obj) => translateObject(obj) + " thogondu banni"],

  // ── "while coming/going" patterns ──
  [/\bwhile\s+coming\s+tomorrow\b/i, "naaleki barthaa"],
  [/\bwhile\s+going\s+to\s+(\w+)\b/i, (m, place) => nounU(place) + "-ge hogthaa"],
  [/\bwhile\s+coming\s+to\s+(\w+)\b/i, (m, place) => nounU(place) + "-ge barthaa"],
  [/\bwhile\s+coming\b/i, "barthaa"],
  [/\bwhile\s+going\b/i, "hogthaa"],
  [/\bto\s+(\w+)\b/i, (m, place) => {
    if (KNOWN_NOUNS.has(place.toLowerCase())) return nounU(place) + "-ge";
    return m;
  }],
];


// ─── Helper: add "-u" to nouns ─────────────────────────────────────────────
function nounU(word) {
  const w = word.toLowerCase();
  if (/[aeiou]$/.test(w)) return w;
  return w + "-u";
}

// ─── Helper: translate an object phrase like "two tubelights", "my bag" ────
function translateObject(objStr) {
  const NUMBER_WORDS = {
    "one":"ondu","two":"eradu","three":"mooru","four":"naaku",
    "five":"aidu","six":"aaru","seven":"yelu","eight":"entu",
    "nine":"ombattu","ten":"hattu",
  };
  return objStr.trim().split(/\s+/).map(w => {
    const lower = w.toLowerCase();
    if (NUMBER_WORDS[lower]) return NUMBER_WORDS[lower];
    if (/^\d+$/.test(w)) return w;
    if (PRONOUNS[lower]) return PRONOUNS[lower];
    // strip plural
    const cleaned = lower.replace(/s$/, "");
    if (KNOWN_NOUNS.has(lower)) return nounU(lower);
    if (KNOWN_NOUNS.has(cleaned)) return nounU(cleaned);
    // strip plural for unknown words too
    if (/^[a-zA-Z]{3,}s$/.test(w)) return nounU(cleaned);
    // unknown word → noun-u
    if (/^[a-zA-Z]{2,}$/.test(w)) return nounU(lower);
    return w;
  }).join(" ");
}

// ─── Detect if a word is an -ing verb form ─────────────────────────────────
function isIngForm(word) {
  return word.toLowerCase().endsWith("ing") && VERB_FORMS[word.toLowerCase()];
}

// ─── Resolve any verb form to its base ─────────────────────────────────────
function resolveVerb(word) {
  return VERB_FORMS[word.toLowerCase()] || null;
}

// ─── Detect tense/mood of a verb in context ────────────────────────────────
// Returns: "gerund" | "past" | "command" | "present" | null
function detectVerbMood(words, idx) {
  const w = words[idx].toLowerCase();
  const prev = idx > 0 ? words[idx - 1].toLowerCase() : "";
  const prev2 = idx > 1 ? words[idx - 2].toLowerCase() : "";

  // "while coming", "while going" → gerund
  if (prev === "while" || prev === "when" || prev === "before" || prev === "after") {
    return "gerund";
  }
  // "-ing" form → gerund
  if (w.endsWith("ing") && VERB_FORMS[w]) {
    return "gerund";
  }
  // past tense indicators
  if (prev === "already" || prev === "just" || prev2 === "did") {
    return "past";
  }
  // Check if the word itself is a known past form
  const base = VERB_FORMS[w];
  if (base && base !== w && !w.endsWith("ing") && !w.endsWith("s")) {
    // Likely a past/irregular form
    return "past";
  }
  // "will come", "can go" → present/future (use madi for simplicity)
  if (prev === "will" || prev === "can" || prev === "should" || prev === "must" || prev === "shall") {
    return "command";
  }
  // bare imperative: "bring 2 tubelights"
  if (idx === 0 || prev === "," || prev === "and" || prev === "then" || prev === "please" || prev === "also") {
    if (VERBS[w]) return "command";
  }

  return "command"; // default for English input = polite command
}

// ─── Glue words to strip (English structural words) ────────────────────────
const STRIP_WORDS = new Set([
  "the","a","an","is","are","am","was","were","be","been","being",
  "do","does","did","will","shall","would","could","should","can","may","might",
  "have","has","had","to","for","of","at","in","on","by","from",
  "into","about","between","through","during","just",
]);

// ─── Language detection ────────────────────────────────────────────────────
function detectLanguage(text) {
  const words = text.toLowerCase().replace(/[?.!,]/g, "").split(/\s+/).filter(Boolean);
  let tamil = 0, english = 0;
  for (const w of words) {
    if (TAMIL_MAP[w]) tamil++;
    if (VERB_FORMS[w] || ADVERBS[w] || PRONOUNS[w] || MISC_WORDS[w] ||
        QUESTION_WORDS[w] || KNOWN_NOUNS.has(w) || STRIP_WORDS.has(w)) {
      english++;
    }
  }
  return tamil > english ? "tamil" : "english";
}

// ─── Tamil translator ──────────────────────────────────────────────────────
function translateTamil(text) {
  let result = text;
  for (const [pat, rep] of TAMIL_PHRASES) {
    if (typeof rep === "function") {
      result = result.replace(pat, rep);
    } else {
      result = result.replace(pat, rep);
    }
  }
  result = result.replace(/[a-zA-Z]+/g, (word) => {
    const lower = word.toLowerCase();
    const mapped = TAMIL_MAP[lower];
    if (mapped) {
      return word[0] === word[0].toUpperCase()
        ? mapped.charAt(0).toUpperCase() + mapped.slice(1)
        : mapped;
    }
    return word;
  });
  return cleanUp(result);
}

// ─── English translator (the big one) ──────────────────────────────────────
function translateEnglish(text) {
  let result = text;

  // 1. Full phrase matches first
  for (const [pat, rep] of ENG_PHRASES) {
    if (pat.test(result)) {
      if (typeof rep === "function") {
        result = result.replace(pat, rep);
      } else {
        result = result.replace(pat, rep);
      }
    }
  }

  // 2. Multi-word question words
  const sortedQ = Object.entries(QUESTION_WORDS).sort((a, b) => b[0].length - a[0].length);
  for (const [eng, kan] of sortedQ) {
    result = result.replace(new RegExp("\\b" + eng + "\\b", "gi"), kan);
  }

  // 3. Tokenize and translate word by word
  const tokens = result.split(/(\s+|,|\.|\?|!)/);
  const outTokens = [];
  let skipNext = false;

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];

    // Preserve whitespace / punctuation
    if (/^(\s+|,|\.|\?|!)$/.test(tok)) {
      outTokens.push(tok);
      continue;
    }

    if (skipNext) { skipNext = false; continue; }

    const lower = tok.toLowerCase();

    // Already translated (from phrase matching)?
    if (lower.includes("-") || /^[a-z]+(thu|thaa|tta|dde|nde|idu|ira|ini|lli|agu|eke|ttu)$/i.test(lower)) {
      outTokens.push(tok);
      continue;
    }

    // "while" → skip it, the next verb will use gerund
    if (lower === "while" || lower === "when" && i + 2 < tokens.length) {
      // Check if next meaningful token is a verb
      const nextWord = getNextWord(tokens, i);
      if (nextWord && resolveVerb(nextWord)) {
        // Don't output "while", the verb gerund handles it
        continue;
      }
    }

    // "for + verb-ing" → "<noun>-u maadoke" (purpose)
    // "for + noun" → "<noun>-ge" (destination/purpose)
    if (lower === "for") {
      const nextWord = getNextWord(tokens, i);
      if (nextWord) {
        const nextLower = nextWord.toLowerCase();
        const nextBase = resolveVerb(nextLower);
        if (nextBase && VERBS[nextBase]) {
          // "for cleaning" → "cleaning-u maadoke"
          outTokens.push(nounU(nextLower) + " maadoke");
          for (let j = i + 1; j < tokens.length; j++) {
            if (!/^(\s+|,|\.|\?|!)$/.test(tokens[j])) { tokens[j] = ""; break; }
          }
          continue;
        }
        if (KNOWN_NOUNS.has(nextLower) || KNOWN_NOUNS.has(nextLower.replace(/s$/, ""))) {
          // "for meeting" → "meeting-ge"
          const noun = KNOWN_NOUNS.has(nextLower) ? nextLower : nextLower.replace(/s$/, "");
          outTokens.push(nounU(noun) + "-ge");
          for (let j = i + 1; j < tokens.length; j++) {
            if (!/^(\s+|,|\.|\?|!)$/.test(tokens[j])) { tokens[j] = ""; break; }
          }
          continue;
        }
      }
    }

    // Strip structural English words
    if (STRIP_WORDS.has(lower)) {
      continue;
    }

    // Loanwords — keep as-is (common English words used in Bengaluru Kanglish)
    if (LOANWORDS.has(lower)) {
      outTokens.push(lower);
      continue;
    }

    // Pronouns
    if (PRONOUNS[lower]) {
      outTokens.push(PRONOUNS[lower]);
      continue;
    }

    // Adverbs / time words
    if (ADVERBS[lower]) {
      outTokens.push(ADVERBS[lower]);
      continue;
    }

    // Misc words
    if (MISC_WORDS[lower]) {
      outTokens.push(MISC_WORDS[lower]);
      continue;
    }

    // Numbers — keep as-is (or translate number words)
    if (/^\d+$/.test(tok)) {
      outTokens.push(tok);
      continue;
    }
    const NUMBER_WORDS = {
      "one":"ondu","two":"eradu","three":"mooru","four":"naaku",
      "five":"aidu","six":"aaru","seven":"yelu","eight":"entu",
      "nine":"ombattu","ten":"hattu",
    };
    if (NUMBER_WORDS[lower]) {
      outTokens.push(NUMBER_WORDS[lower]);
      continue;
    }

    // Verb?
    const verbBase = resolveVerb(lower);
    if (verbBase && VERBS[verbBase]) {
      const wordTokens = tokens.filter(t => !/^(\s+|,|\.|\?|!)$/.test(t));
      const wordIdx = wordTokens.indexOf(tok);
      const mood = detectVerbMood(wordTokens, wordIdx >= 0 ? wordIdx : 0);
      const v = VERBS[verbBase];

      if (mood === "gerund") {
        outTokens.push(v.gerund);
      } else if (mood === "past") {
        outTokens.push(v.past);
      } else {
        outTokens.push(v.madi);
      }
      continue;
    }

    // Known noun → add -u
    if (KNOWN_NOUNS.has(lower)) {
      outTokens.push(nounU(lower));
      continue;
    }

    // Unknown word: if it looks like a noun (not a common English word), add -u
    // This catches things like "tubelights", "samosa", brand names, etc.
    const cleaned = lower.replace(/s$/, ""); // strip plural
    if (KNOWN_NOUNS.has(cleaned)) {
      outTokens.push(nounU(cleaned));
      continue;
    }

    // Fallback: treat unknown words as nouns and add -u
    // (This is the Kanglish way — everything gets a -u!)
    // Strip plural 's' first
    const fallbackWord = (/^[a-zA-Z]{3,}s$/.test(tok)) ? cleaned : lower;
    if (/^[a-zA-Z]{2,}$/.test(tok) && !isKanglishWord(lower)) {
      outTokens.push(nounU(fallbackWord));
    } else {
      outTokens.push(tok);
    }
  }

  return cleanUp(reorderSOV(outTokens.join("")));
}

// ─── SOV Reorder: move time-context to front, command verbs to end ─────────
function reorderSOV(text) {
  // Split by comma into clauses and reorder each
  const clauses = text.split(/\s*,\s*/);
  const reordered = clauses.map(clause => {
    const words = clause.trim().split(/\s+/);
    if (words.length <= 2) return clause;

    const timeWords = [];
    const verbWords = [];
    const rest = [];

    const TIME_SET = new Set(Object.values(ADVERBS));
    const VERB_OUTPUTS = new Set();
    for (const v of Object.values(VERBS)) {
      VERB_OUTPUTS.add(v.madi);
      // multi-word madi forms like "thogondu banni"
      v.madi.split(" ").forEach(w => VERB_OUTPUTS.add(w));
    }

    for (const w of words) {
      const lower = w.toLowerCase();
      if (TIME_SET.has(lower) && !verbWords.length) {
        timeWords.push(w);
      } else if (VERB_OUTPUTS.has(lower) || /-(madi|aagu)$/.test(lower)) {
        verbWords.push(w);
      } else {
        rest.push(w);
      }
    }

    // Only reorder if we have all parts
    if (timeWords.length && verbWords.length && rest.length) {
      return [...timeWords, ...rest, ...verbWords].join(" ");
    }
    if (verbWords.length && rest.length) {
      return [...rest, ...verbWords].join(" ");
    }
    return clause;
  });

  return reordered.join(", ");
}

function getNextWord(tokens, fromIdx) {
  for (let j = fromIdx + 1; j < tokens.length; j++) {
    if (!/^(\s+|,|\.|\?|!)$/.test(tokens[j])) return tokens[j];
  }
  return null;
}

function isKanglishWord(w) {
  // Check if this word is already a Kanglish output word
  const allKanglish = new Set([
    ...Object.values(ADVERBS),
    ...Object.values(PRONOUNS),
    ...Object.values(MISC_WORDS),
    ...Object.values(QUESTION_WORDS),
    ...Object.values(TAMIL_MAP),
  ]);
  return allKanglish.has(w);
}

function cleanUp(text) {
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .replace(/([?.!])\1+/g, "$1")  // collapse repeated punctuation
    .replace(/,\s*,/g, ",")
    .replace(/^\s+|\s+$/g, "")
    .replace(/^./, c => c.toUpperCase());
}

// ─── Main ──────────────────────────────────────────────────────────────────
function translate(input) {
  const text = input.trim();
  if (!text) return { result: "", lang: "unknown" };
  const lang = detectLanguage(text);
  const result = lang === "tamil" ? translateTamil(text) : translateEnglish(text);
  return { result, lang };
}

// ─── UI Wiring ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const inputEl      = document.getElementById("inputText");
  const translateBtn  = document.getElementById("translateBtn");
  const clearBtn      = document.getElementById("clearBtn");
  const outputBox     = document.getElementById("outputBox");
  const outputText    = document.getElementById("outputText");
  const detectedEl    = document.getElementById("detectedLang");
  const copyBtn       = document.getElementById("copyBtn");
  const toastEl       = document.getElementById("toast");

  inputEl.addEventListener("input", () => {
    clearBtn.style.display = inputEl.value.trim() === "" ? "none" : "block";
  });

  clearBtn.addEventListener("click", () => {
    inputEl.value = "";
    clearBtn.style.display = "none";
    outputBox.classList.remove("visible");
    inputEl.focus();
  });

  translateBtn.addEventListener("click", () => {
    const { result, lang } = translate(inputEl.value);
    if (!result) return;
    outputText.textContent = result;
    detectedEl.textContent = lang === "tamil"
      ? "Detected: Tamil (transliterated)" : "Detected: English";
    outputBox.classList.add("visible");
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      translateBtn.click();
    }
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.textContent).then(() => showToast("Copied!"));
  });

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove("show");
    // Force reflow to restart animation
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 1600);
  }
});
