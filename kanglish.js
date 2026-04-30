// ═══════════════════════════════════════════════════════════════════════════
// Kanglish v5 — "The Dravidian Bridge" Engine
// Uses Tamil sentence structure as interlingua for natural Kanglish output.
// English → Semantic Roles → SOV Assembly → Kanglish
// ═══════════════════════════════════════════════════════════════════════════

// ─── VERB DICTIONARY ───────────────────────────────────────────────────────
// Each verb has: madi (polite command), gerund (while doing), past, present,
// chain (adverbial participle for verb+verb joining: "come and eat" → "bandhu tinni")
const VERBS = {
  "come":     { madi:"banni",    gerund:"barthaa",  past:"bande",    present:"barthini",  chain:"bandhu" },
  "go":       { madi:"hogi",     gerund:"hogthaa",  past:"hoyde",    present:"hogthini",  chain:"hogidhu" },
  "bring":    { madi:"thogondu banni", gerund:"thogondu", past:"thogonde", present:"thogothini", chain:"thogondu" },
  "take":     { madi:"thogondu hogi",  gerund:"thogondu", past:"thogonde", present:"thogothini", chain:"thogondu" },
  "give":     { madi:"kodi",     gerund:"kodthaa",  past:"kotte",    present:"kodthini",  chain:"kottu" },
  "eat":      { madi:"tinni",    gerund:"tinthaa",  past:"tinde",    present:"tinthini",  chain:"tindhu" },
  "drink":    { madi:"kudi",     gerund:"kudithaa", past:"kudide",   present:"kudithini", chain:"kudidhu" },
  "wait":     { madi:"thadi",    gerund:"thadthaa", past:"thadide",  present:"thadthini", chain:"thadidhu" },
  "call":     { madi:"call-madi",gerund:"call-maadthaa",past:"call-maadde",present:"call-maadthini",chain:"call-maadidhu" },
  "pay":      { madi:"pay-madi", gerund:"pay-maadthaa", past:"pay-maadde", present:"pay-maadthini", chain:"pay-maadidhu" },
  "start":    { madi:"shuru-madi",gerund:"shuru-maadthaa",past:"shuru-maadde",present:"shuru-maadthini",chain:"shuru-maadidhu" },
  "stop":     { madi:"nilsu",    gerund:"nilsthaa", past:"nilside",  present:"nilsthini", chain:"nilsidhu" },
  "tell":     { madi:"heli",     gerund:"helthaa",  past:"helde",    present:"helthini",  chain:"heldhu" },
  "say":      { madi:"heli",     gerund:"helthaa",  past:"helde",    present:"helthini",  chain:"heldhu" },
  "show":     { madi:"thorsu",   gerund:"thorsthaa",past:"thorside", present:"thorsthini",chain:"thorsidhu" },
  "see":      { madi:"nodi",     gerund:"nodthaa",  past:"node",     present:"nodthini",  chain:"nodidhu" },
  "look":     { madi:"nodi",     gerund:"nodthaa",  past:"node",     present:"nodthini",  chain:"nodidhu" },
  "watch":    { madi:"nodi",     gerund:"nodthaa",  past:"node",     present:"nodthini",  chain:"nodidhu" },
  "sit":      { madi:"kutkoli",  gerund:"kutkothaa",past:"kutkonde", present:"kutkothini",chain:"kutkondhu" },
  "stand":    { madi:"nilli",    gerund:"nilthaa",  past:"ninte",    present:"nilthini",  chain:"ninthu" },
  "walk":     { madi:"nadee",    gerund:"nadeethaa",past:"nadede",   present:"nadeethini",chain:"nadedhu" },
  "run":      { madi:"odu",      gerund:"odthaa",   past:"odide",    present:"odthini",   chain:"odidhu" },
  "send":     { madi:"kalsu",    gerund:"kalsthaa", past:"kalside",  present:"kalsthini", chain:"kalsidhu" },
  "keep":     { madi:"itkoli",   gerund:"itkothaa", past:"itkonde",  present:"itkothini", chain:"itkondhu" },
  "put":      { madi:"haku",     gerund:"hakthaa",  past:"hakide",   present:"hakthini",  chain:"hakidhu" },
  "open":     { madi:"open-madi",gerund:"open-maadthaa",past:"open-maadde",present:"open-maadthini",chain:"open-maadidhu" },
  "close":    { madi:"close-madi",gerund:"close-maadthaa",past:"close-maadde",present:"close-maadthini",chain:"close-maadidhu" },
  "clean":    { madi:"clean-madi",gerund:"clean-maadthaa",past:"clean-maadde",present:"clean-maadthini",chain:"clean-maadidhu" },
  "wash":     { madi:"tholee",   gerund:"tholeethaa",past:"tholeede",present:"tholeethini",chain:"tholeedhu" },
  "cook":     { madi:"aduge-madi",gerund:"aduge-maadthaa",past:"aduge-maadde",present:"aduge-maadthini",chain:"aduge-maadidhu" },
  "help":     { madi:"help-madi",gerund:"help-maadthaa",past:"help-maadde",present:"help-maadthini",chain:"help-maadidhu" },
  "work":     { madi:"kelsa-madi",gerund:"kelsa-maadthaa",past:"kelsa-maadde",present:"kelsa-maadthini",chain:"kelsa-maadidhu" },
  "finish":   { madi:"mugsu",    gerund:"mugsthaa", past:"mugside",  present:"mugsthini", chain:"mugsidhu" },
  "buy":      { madi:"thogoli",  gerund:"thogothaa",past:"thogonde", present:"thogothini",chain:"thogondhu" },
  "sell":     { madi:"maaru",    gerund:"maaruthaa",past:"maarude",  present:"maaruthini",chain:"maarudhu" },
  "read":     { madi:"odu",      gerund:"odthaa",   past:"odide",    present:"odthini",   chain:"odidhu" },
  "write":    { madi:"baree",    gerund:"bareethaa",past:"bareede",  present:"bareethini",chain:"bareedhu" },
  "drive":    { madi:"drive-madi",gerund:"drive-maadthaa",past:"drive-maadde",present:"drive-maadthini",chain:"drive-maadidhu" },
  "park":     { madi:"park-madi",gerund:"park-maadthaa",past:"park-maadde",present:"park-maadthini",chain:"park-maadidhu" },
  "book":     { madi:"book-madi",gerund:"book-maadthaa",past:"book-maadde",present:"book-maadthini",chain:"book-maadidhu" },
  "cancel":   { madi:"cancel-madi",gerund:"cancel-maadthaa",past:"cancel-maadde",present:"cancel-maadthini",chain:"cancel-maadidhu" },
  "check":    { madi:"check-madi",gerund:"check-maadthaa",past:"check-maadde",present:"check-maadthini",chain:"check-maadidhu" },
  "fix":      { madi:"fix-madi", gerund:"fix-maadthaa",past:"fix-maadde",present:"fix-maadthini",chain:"fix-maadidhu" },
  "order":    { madi:"order-madi",gerund:"order-maadthaa",past:"order-maadde",present:"order-maadthini",chain:"order-maadidhu" },
  "deliver":  { madi:"deliver-madi",gerund:"deliver-maadthaa",past:"deliver-maadde",present:"deliver-maadthini",chain:"deliver-maadidhu" },
  "install":  { madi:"install-madi",gerund:"install-maadthaa",past:"install-maadde",present:"install-maadthini",chain:"install-maadidhu" },
  "update":   { madi:"update-madi",gerund:"update-maadthaa",past:"update-maadde",present:"update-maadthini",chain:"update-maadidhu" },
  "download": { madi:"download-madi",gerund:"download-maadthaa",past:"download-maadde",present:"download-maadthini",chain:"download-maadidhu" },
  "share":    { madi:"share-madi",gerund:"share-maadthaa",past:"share-maadde",present:"share-maadthini",chain:"share-maadidhu" },
  "print":    { madi:"print-madi",gerund:"print-maadthaa",past:"print-maadde",present:"print-maadthini",chain:"print-maadidhu" },
  "move":     { madi:"move-madi",gerund:"move-maadthaa",past:"move-maadde",present:"move-maadthini",chain:"move-maadidhu" },
  "turn":     { madi:"thirgu",   gerund:"thirgthaa",past:"thirgide", present:"thirgthini",chain:"thirgidhu" },
  "use":      { madi:"use-madi", gerund:"use-maadthaa",past:"use-maadde",present:"use-maadthini",chain:"use-maadidhu" },
  "ask":      { madi:"kelu",     gerund:"kelthaa",  past:"kelde",    present:"kelthini",  chain:"keldhu" },
  "sleep":    { madi:"malkoli",  gerund:"malkothaa",past:"malkonde", present:"malkothini",chain:"malkondhu" },
  "wake":     { madi:"yeddu",    gerund:"yeddthaa", past:"yeddide",  present:"yeddthini", chain:"yeddidhu" },
  "make":     { madi:"maadi",    gerund:"maadthaa", past:"maadde",   present:"maadthini", chain:"maadidhu" },
  "do":       { madi:"maadi",    gerund:"maadthaa", past:"maadde",   present:"maadthini", chain:"maadidhu" },
  "talk":     { madi:"maathaadu",gerund:"maathaadthaa",past:"maathaadde",present:"maathaadthini",chain:"maathaadidhu" },
  "speak":    { madi:"maathaadu",gerund:"maathaadthaa",past:"maathaadde",present:"maathaadthini",chain:"maathaadidhu" },
  "listen":   { madi:"keli",     gerund:"kelthaa",  past:"kelde",    present:"kelthini",  chain:"keldhu" },
  "learn":    { madi:"kalthkoli",gerund:"kalthkothaa",past:"kalthkonde",present:"kalthkothini",chain:"kalthkondhu" },
  "play":     { madi:"aadu",     gerund:"aadthaa",  past:"aadide",   present:"aadthini",  chain:"aadidhu" },
  "sing":     { madi:"haadu",    gerund:"haadthaa", past:"haadide",  present:"haadthini", chain:"haadidhu" },
  "know":     { madi:"gottu",    gerund:"gottu",    past:"gottittu", present:"gottu",     chain:"gottu" },
  "think":    { madi:"yochne-madi",gerund:"yochne-maadthaa",past:"yochne-maadde",present:"yochne-maadthini",chain:"yochne-maadidhu" },
  "forget":   { madi:"marathbedi",gerund:"marethaa",past:"marethde", present:"marethini", chain:"marethu" },
  "remember": { madi:"nenpu-itkoli",gerund:"nenpu-itkothaa",past:"nenpu-itkonde",present:"nenpu-itkothini",chain:"nenpu-itkondhu" },
  "try":      { madi:"try-madi", gerund:"try-maadthaa",past:"try-maadde",present:"try-maadthini",chain:"try-maadidhu" },
  "leave":    { madi:"bidu",     gerund:"bidthaa",  past:"bidde",    present:"bidthini",  chain:"biddhu" },
  "stay":     { madi:"iru",      gerund:"irthaa",   past:"idde",     present:"irthini",   chain:"iddhu" },
  "reach":    { madi:"reach-aagu",gerund:"reach-aagthaa",past:"reach-aaytu",present:"reach-aagthini",chain:"reach-aagidhu" },
  "return":   { madi:"vapas-banni",gerund:"vapas-barthaa",past:"vapas-bande",present:"vapas-barthini",chain:"vapas-bandhu" },
  "change":   { madi:"change-madi",gerund:"change-maadthaa",past:"change-maadde",present:"change-maadthini",chain:"change-maadidhu" },
  "pick":     { madi:"thogoli",  gerund:"thogothaa",past:"thogonde", present:"thogothini",chain:"thogondhu" },
  "drop":     { madi:"bidu",     gerund:"bidthaa",  past:"bidde",    present:"bidthini",  chain:"biddhu" },
  "meet":     { madi:"meet-madi",gerund:"meet-maadthaa",past:"meet-maadde",present:"meet-maadthini",chain:"meet-maadidhu" },
  "complete": { madi:"mugsu",    gerund:"mugsthaa", past:"mugside",  present:"mugsthini", chain:"mugsidhu" },
  "prepare":  { madi:"ready-madi",gerund:"ready-maadthaa",past:"ready-maadde",present:"ready-maadthini",chain:"ready-maadidhu" },
  "hold":     { madi:"hidkoli",  gerund:"hidkothaa",past:"hidkonde", present:"hidkothini",chain:"hidkondhu" },
  "push":     { madi:"thallu",   gerund:"thallthaa",past:"thallide", present:"thallthini",chain:"thallidhu" },
  "pull":     { madi:"eelu",     gerund:"eelthaa",  past:"eelde",    present:"eelthini",  chain:"eeldhu" },
  "need":     { madi:"beku",     gerund:"beku",     past:"bekittu",  present:"beku",      chain:"beku" },
  "want":     { madi:"beku",     gerund:"beku",     past:"bekittu",  present:"beku",      chain:"beku" },
  "like":     { madi:"ishta",    gerund:"ishta",    past:"ishta-aaytu",present:"ishta",   chain:"ishta" },
  "love":     { madi:"preeti-madi",gerund:"preeti-maadthaa",past:"preeti-maadde",present:"preeti-maadthini",chain:"preeti-maadidhu" },
  "dance":    { madi:"kunee",    gerund:"kuneethaa",past:"kuneede",  present:"kuneethini",chain:"kuneedhu" },
  "attend":   { madi:"attend-madi",gerund:"attend-maadthaa",past:"attend-maadde",present:"attend-maadthini",chain:"attend-maadidhu" },
  "charge":   { madi:"charge-madi",gerund:"charge-maadthaa",past:"charge-maadde",present:"charge-maadthini",chain:"charge-maadidhu" },
  "load":     { madi:"load-madi",gerund:"load-maadthaa",past:"load-maadde",present:"load-maadthini",chain:"load-maadidhu" },
  "lock":     { madi:"lock-madi",gerund:"lock-maadthaa",past:"lock-maadde",present:"lock-maadthini",chain:"lock-maadidhu" },
  "unlock":   { madi:"unlock-madi",gerund:"unlock-maadthaa",past:"unlock-maadde",present:"unlock-maadthini",chain:"unlock-maadidhu" },
  "pack":     { madi:"pack-madi",gerund:"pack-maadthaa",past:"pack-maadde",present:"pack-maadthini",chain:"pack-maadidhu" },
  "sign":     { madi:"sign-madi",gerund:"sign-maadthaa",past:"sign-maadde",present:"sign-maadthini",chain:"sign-maadidhu" },
  "scan":     { madi:"scan-madi",gerund:"scan-maadthaa",past:"scan-maadde",present:"scan-maadthini",chain:"scan-maadidhu" },
  "verify":   { madi:"verify-madi",gerund:"verify-maadthaa",past:"verify-aagide",present:"verify-maadthini",chain:"verify-maadidhu" },
};

// ─── VERB FORM RESOLVER ────────────────────────────────────────────────────
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
    "verified":"verify","verifying":"verify","verifies":"verify",
  };
  for (const base of Object.keys(VERBS)) VERB_FORMS[base] = base;
  for (const [form, base] of Object.entries(irregulars)) VERB_FORMS[form] = base;
})();

function resolveVerb(w) { return VERB_FORMS[w.toLowerCase()] || null; }

// ─── WORD DICTIONARIES ─────────────────────────────────────────────────────

const KNOWN_NOUNS = new Set([
  "bus","office","store","bill","shop","auto","metro","train","ticket",
  "phone","laptop","bag","card","cash","food","coffee","tea",
  "water","juice","milk","rice","lunch","dinner","breakfast","snack",
  "room","house","home","flat","road","signal","bridge","mall","park","hotel",
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
  "pen","paper","note","photo","video","song","movie",
  "money","rupee","paisa","coin","wallet","purse","atm","bank",
  "doctor","teacher","driver","cook","maid","guard","plumber","electrician",
  "brother","sister","friend","uncle","aunty","boss","sir","madam",
  "week","month","year","minute","hour","second",
  "place","area","side","corner","center","top","bottom","front","back",
  "problem","issue","reason","answer","question","idea","thing","stuff",
  "clothes","vehicle","medicine","tablet","injection","test","result",
  "book","change",
]);

// Special nouns with Kannada equivalents
const NOUN_MAP = {
  "home": "mane", "house": "mane", "food": "oota", "water": "neeru",
  "work": "kelsa", "money": "dud-du",
};

const QUESTION_WORDS = {
  "where":"yelli","when":"yavaga","how much":"eshtu","how many":"eshtu",
  "how":"hege","what":"yenu","why":"yaake","who":"yaaru","which":"yaavudu",
};

const ADVERBS = {
  "tomorrow":"naaleki","today":"ivattu","yesterday":"ninne",
  "now":"eega","later":"amele","quickly":"begne","slowly":"nidhaanvaagi",
  "already":"aagale","again":"innomme",
  "here":"illi","there":"alli","always":"yavaglu",
  "never":"yaavaglu illa","sometimes":"kelavu sarti",
  "morning":"beligge","evening":"saanje","night":"raathri",
  "afternoon":"madhyaahna","daily":"dinaa","soon":"begne",
  "first":"modlu","then":"amele","after":"amele","before":"munche",
  "together":"serthu","alone":"ondu",
  "outside":"horage","inside":"olage","up":"mele","down":"kelage",
  "very":"thumba","little":"swalpa","more":"innashtu","less":"kammi",
  "much":"thumba","many":"thumba","enough":"saaku",
};

// Subject pronouns → Kannada (nominative)
const SUBJ_PRONOUNS = {
  "i":"naanu","you":"neenu","he":"avnu","she":"avlu",
  "we":"naavu","they":"avru","it":"adu","this":"idu","that":"adu",
};
// Object/indirect pronouns → Kannada with case marker
const OBJ_PRONOUNS = {
  "me":"nanage","him":"avanige","her":"avalige",
  "us":"namage","them":"avrige","it":"adannu","this":"idannu","that":"adannu",
};
const POSSESSIVES = {
  "my":"nanna","your":"ninna","his":"avna","her":"avala",
  "our":"namma","their":"avra","its":"adara",
};

const MISC_WORDS = {
  "yes":"haudu","no":"illa","not":"illa",
  "ok":"sari","okay":"sari","fine":"sari",
  "good":"chennaagi","bad":"kelsa illa",
  "big":"doddu","small":"chikku","new":"hosa","old":"halae",
  "hot":"bisi","cold":"thandi","fast":"begne","slow":"nidhaana",
  "right":"sari","wrong":"tappu",
  "all":"ella","some":"kelavu","any":"yaavdu",
  "also":"kooda","too":"kooda","only":"ashte",
  "but":"aadre","and":"mathu","or":"athva",
  "if":"andre","because":"yaakandre",
  "with":"jothege","without":"illade",
  "please":"dayavittu","sorry":"sorry",
  "thanks":"dhanyavaada","thank":"dhanyavaada",
  "sir":"sir","madam":"madam",
  "really":"nijvaaglu","maybe":"belki",
  "sure":"khachit","definitely":"khachit",
};

const LOANWORDS = new Set([
  "late","early","free","busy","ready","full","empty","fresh","nice",
  "tension","chance","adjust","manage","settle","pending",
  "urgent","important","different","same","direct","correct",
  "simple","double","single","extra","total","half",
  "super","solid","mass","scene","mood",
  "strict","tight","loose","heavy","strong","weak",
  "happy","sad","angry","tired","bored","confused","worried",
  "online","offline","available",
]);

const NUMBER_WORDS = {
  "one":"ondu","two":"eradu","three":"mooru","four":"naaku",
  "five":"aidu","six":"aaru","seven":"yelu","eight":"entu",
  "nine":"ombattu","ten":"hattu",
};

// English structural words to ignore during parsing
const SKIP_WORDS = new Set([
  "the","a","an","is","are","am","was","were","be","been","being",
  "do","does","did","will","shall","would","could","should","can","may","might",
  "have","has","had","just","about","between","through","during","not",
]);

// ─── TAMIL DICTIONARIES ───────────────────────────────────────────────────

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
  "vandhu":"bandhu","vandhuttu":"bandhidhu",
};

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
  [/\bvandhu\s+saapdu\b/i, "bandhu tinni"],
  [/\bvandhu\s+saapdunga\b/i, "bandhu tinnri"],
];

// ─── HELPERS ───────────────────────────────────────────────────────────────

function nounU(word) {
  const w = word.toLowerCase();
  if (/[aeiou]$/.test(w)) return w;
  return w + "-u";
}

// Translate a noun to Kanglish: use NOUN_MAP if available, else add -u
function kannadaNoun(word) {
  const w = word.toLowerCase().replace(/s$/, "");
  if (NOUN_MAP[w]) return NOUN_MAP[w];
  return nounU(w);
}

// Translate any single word to its Kanglish form
function translateWord(word) {
  const w = word.toLowerCase();
  if (NUMBER_WORDS[w]) return NUMBER_WORDS[w];
  if (/^\d+$/.test(w)) return w;
  if (POSSESSIVES[w]) return POSSESSIVES[w];
  if (SUBJ_PRONOUNS[w]) return SUBJ_PRONOUNS[w];
  if (OBJ_PRONOUNS[w]) return OBJ_PRONOUNS[w];
  if (ADVERBS[w]) return ADVERBS[w];
  if (MISC_WORDS[w]) return MISC_WORDS[w];
  if (LOANWORDS.has(w)) return w;
  if (NOUN_MAP[w]) return NOUN_MAP[w];
  const cleaned = w.replace(/s$/, "");
  if (KNOWN_NOUNS.has(w)) return nounU(w);
  if (KNOWN_NOUNS.has(cleaned)) return nounU(cleaned);
  // Unknown word → noun-u
  if (/^[a-zA-Z]{2,}$/.test(w)) return nounU(cleaned);
  return w;
}

// ═══════════════════════════════════════════════════════════════════════════
// THE DRAVIDIAN BRIDGE — Semantic Parser + SOV Assembler
// ═══════════════════════════════════════════════════════════════════════════

// Expand contractions before parsing
function expandContractions(text) {
  return text
    .replace(/\bi'm\b/gi, "I am")
    .replace(/\bi'll\b/gi, "I will")
    .replace(/\bi've\b/gi, "I have")
    .replace(/\bi'd\b/gi, "I would")
    .replace(/\byou're\b/gi, "you are")
    .replace(/\byou'll\b/gi, "you will")
    .replace(/\byou've\b/gi, "you have")
    .replace(/\bhe's\b/gi, "he is")
    .replace(/\bshe's\b/gi, "she is")
    .replace(/\bit's\b/gi, "it is")
    .replace(/\bwe're\b/gi, "we are")
    .replace(/\bwe'll\b/gi, "we will")
    .replace(/\bthey're\b/gi, "they are")
    .replace(/\bthey'll\b/gi, "they will")
    .replace(/\bthat's\b/gi, "that is")
    .replace(/\bwhat's\b/gi, "what is")
    .replace(/\bwhere's\b/gi, "where is")
    .replace(/\bwho's\b/gi, "who is")
    .replace(/\bdon't\b/gi, "do not")
    .replace(/\bdoesn't\b/gi, "does not")
    .replace(/\bdidn't\b/gi, "did not")
    .replace(/\bcan't\b/gi, "cannot")
    .replace(/\bcannot\b/gi, "can not")
    .replace(/\bwon't\b/gi, "will not")
    .replace(/\bwouldn't\b/gi, "would not")
    .replace(/\bshouldn't\b/gi, "should not")
    .replace(/\bcouldn't\b/gi, "could not")
    .replace(/\blet's\b/gi, "let us")
    .replace(/\bain't\b/gi, "is not")
    .replace(/\bhasn't\b/gi, "has not")
    .replace(/\bhaven't\b/gi, "have not");
}

// ─── Detect tense from English words ───────────────────────────────────────
function detectTense(words) {
  const joined = words.join(" ").toLowerCase();
  // Negation
  if (/\bnot\b/.test(joined) || /\bdo not\b/.test(joined)) return "negative";
  // "is X done" → completion query
  if (/\bis\s+\w+\s+done/.test(joined)) return "aita";
  // Progressive: "am/is/are + verb-ing" (but not base forms like "bring")
  if (/\b(am|is|are)\s+\w+ing\b/.test(joined)) {
    // Verify the -ing word is actually a progressive form, not a base form
    const ingMatch = joined.match(/\b(am|is|are)\s+(\w+ing)\b/);
    if (ingMatch) {
      const ingWord = ingMatch[2];
      const base = resolveVerb(ingWord);
      if (base && base !== ingWord) return "present"; // genuine progressive
    }
  }
  // Past: "did", past verb forms, "already", "yesterday"
  if (/\b(did|already|yesterday)\b/.test(joined)) return "past";
  for (const w of words) {
    const base = resolveVerb(w);
    if (base && base !== w.toLowerCase() && !w.toLowerCase().endsWith("ing") && !w.toLowerCase().endsWith("s")) {
      return "past";
    }
  }
  // Future: "will", "shall"
  if (/\b(will|shall)\b/.test(joined)) return "present"; // future → present in Kannada
  // Imperative: starts with verb or "please"
  const first = words[0] && words[0].toLowerCase();
  if (first === "please" || (resolveVerb(first) && !SUBJ_PRONOUNS[first])) return "command";
  // "can you" → polite command
  if (/\bcan\s+(you|i)\b/.test(joined)) return "command";
  // "let us" → suggestion
  if (/\blet\s+us\b/.test(joined)) return "suggestion";
  // If starts with subject pronoun → present
  if (SUBJ_PRONOUNS[first]) return "present";
  return "command"; // default
}

// ─── Parse English into semantic roles ─────────────────────────────────────
// Returns: { subject, verb, verbBase, object, indirectObj, time, location,
//            purpose, adverbs, question, tense, negated, verbChain, emphasis }
function parseEnglish(text) {
  const expanded = expandContractions(text);
  const words = expanded.replace(/[?.!,]/g, " ").split(/\s+/).filter(Boolean);
  const isQuestion = /\?/.test(text);

  const roles = {
    subject: null, verb: null, verbBase: null, object: [],
    indirectObj: null, time: [], location: null,
    purpose: null, adverbs: [], question: null,
    tense: "command", negated: false, verbChain: [],
    emphasis: null, whileClause: null, loanAdj: [],
  };

  // Detect question word
  const joinedLower = words.map(w => w.toLowerCase()).join(" ");
  const sortedQ = Object.entries(QUESTION_WORDS).sort((a, b) => b[0].length - a[0].length);
  for (const [eng, kan] of sortedQ) {
    if (joinedLower.includes(eng)) {
      roles.question = kan;
      // Remove question words from the word list
      const qWords = eng.split(" ");
      for (const qw of qWords) {
        const idx = words.findIndex(w => w.toLowerCase() === qw);
        if (idx >= 0) words.splice(idx, 1);
      }
      break;
    }
  }

  roles.tense = detectTense(words);

  let i = 0;
  while (i < words.length) {
    const w = words[i].toLowerCase();
    const next = i + 1 < words.length ? words[i + 1] : null;
    const nextLow = next ? next.toLowerCase() : "";

    // Skip structural words
    if (SKIP_WORDS.has(w)) {
      // Track negation but don't output "illa"
      if (w === "not") roles.negated = true;
      i++; continue;
    }

    // "while/when + verb-ing" → while clause
    if ((w === "while" || w === "when") && next && resolveVerb(nextLow)) {
      const vb = resolveVerb(nextLow);
      roles.whileClause = vb;
      i += 2; continue;
    }

    // "and + verb" → verb chain (come and eat → bandhu tinni)
    if (w === "and" && next && resolveVerb(nextLow)) {
      const vb = resolveVerb(nextLow);
      if (vb && VERBS[vb]) roles.verbChain.push(vb);
      i += 2; continue;
    }

    // Prepositions with case markers
    if (w === "to" && next) {
      // "to + verb" → purpose
      if (resolveVerb(nextLow)) {
        roles.purpose = resolveVerb(nextLow);
        i += 2; continue;
      }
      // skip "the" after "to"
      let targetIdx = i + 1;
      let target = nextLow;
      if (target === "the" && i + 2 < words.length) {
        targetIdx = i + 2;
        target = words[targetIdx].toLowerCase();
      }
      // "to + noun" → location/indirect object with -ge
      // If it's a person pronoun, it's indirect object
      if (OBJ_PRONOUNS[target] || SUBJ_PRONOUNS[target]) {
        roles.indirectObj = target;
      } else {
        roles.location = { word: target, marker: "-ge" };
      }
      i = targetIdx + 1; continue;
    }
    if (w === "for" && next) {
      let target = nextLow;
      let targetIdx = i + 1;
      if (target === "the" && i + 2 < words.length) {
        targetIdx = i + 2;
        target = words[targetIdx].toLowerCase();
      }
      // "for + verb-ing" → purpose
      if (resolveVerb(target)) {
        roles.purpose = resolveVerb(target);
        i = targetIdx + 1; continue;
      }
      // "for + pronoun" → indirect object
      if (OBJ_PRONOUNS[target] || SUBJ_PRONOUNS[target]) {
        roles.indirectObj = target;
        i = targetIdx + 1; continue;
      }
      // "for + noun" → purpose noun
      roles.purpose = target;
      i = targetIdx + 1; continue;
    }
    if ((w === "in" || w === "at") && next) {
      let target = nextLow;
      let targetIdx = i + 1;
      if (target === "the" && i + 2 < words.length) {
        targetIdx = i + 2;
        target = words[targetIdx].toLowerCase();
      }
      roles.location = { word: target, marker: "-alli" };
      i = targetIdx + 1; continue;
    }
    if (w === "from" && next) {
      let target = nextLow;
      let targetIdx = i + 1;
      if (target === "the" && i + 2 < words.length) {
        targetIdx = i + 2;
        target = words[targetIdx].toLowerCase();
      }
      roles.location = { word: target, marker: "-inda" };
      i = targetIdx + 1; continue;
    }

    // Subject pronouns
    if (SUBJ_PRONOUNS[w] && !roles.subject && !roles.verb) {
      roles.subject = w;
      i++; continue;
    }

    // Possessive + noun → object
    if (POSSESSIVES[w] && next) {
      const nounWord = nextLow.replace(/s$/, "");
      roles.object.push(POSSESSIVES[w] + " " + kannadaNoun(nounWord));
      i += 2; continue;
    }

    // Time words
    if (ADVERBS[w] && ["naaleki","ivattu","ninne","beligge","saanje","raathri","madhyaahna","eega","amele","munche"].includes(ADVERBS[w])) {
      roles.time.push(ADVERBS[w]);
      i++; continue;
    }

    // Other adverbs
    if (ADVERBS[w]) {
      roles.adverbs.push(ADVERBS[w]);
      i++; continue;
    }

    // Loanwords (adjectives that stay as-is)
    if (LOANWORDS.has(w)) {
      roles.loanAdj.push(w);
      i++; continue;
    }

    // Misc words
    if (MISC_WORDS[w]) {
      roles.adverbs.push(MISC_WORDS[w]);
      i++; continue;
    }

    // Verb
    const vBase = resolveVerb(w);
    if (vBase && VERBS[vBase] && !roles.verb) {
      roles.verb = w;
      roles.verbBase = vBase;
      // Detect if this is an -ing form (progressive) — but not base forms ending in "ing"
      if (w.endsWith("ing") && VERB_FORMS[w] && VERB_FORMS[w] !== w) {
        roles.tense = roles.subject ? "present" : "gerund";
      }
      // Check if next word is a directional noun (go home, come home)
      const nextW = (i + 1 < words.length) ? words[i + 1].toLowerCase() : "";
      if ((vBase === "go" || vBase === "come" || vBase === "return") && 
          (KNOWN_NOUNS.has(nextW) || NOUN_MAP[nextW])) {
        roles.location = { word: nextW, marker: "-ge" };
        i += 2; continue;
      }
      i++; continue;
    }

    // Indirect object pronouns
    if (OBJ_PRONOUNS[w]) {
      roles.indirectObj = w;
      i++; continue;
    }

    // Number words
    if (NUMBER_WORDS[w]) {
      roles.object.push(NUMBER_WORDS[w]);
      i++; continue;
    }
    if (/^\d+$/.test(words[i])) {
      roles.object.push(words[i]);
      i++; continue;
    }

    // Nouns → object
    const cleaned = w.replace(/s$/, "");
    if (KNOWN_NOUNS.has(w) || KNOWN_NOUNS.has(cleaned)) {
      roles.object.push(kannadaNoun(w));
      i++; continue;
    }

    // Unknown word → treat as noun object
    if (/^[a-zA-Z]{2,}$/.test(words[i])) {
      roles.object.push(nounU(cleaned));
      i++; continue;
    }

    i++;
  }

  return roles;
}

// ─── SOV ASSEMBLER ─────────────────────────────────────────────────────────
// Dravidian order: Time → Subject → Location → IndObj(-ge) → Object → Verb
function assembleKanglish(roles) {
  const parts = [];

  // 1. Time
  if (roles.time.length) parts.push(roles.time.join(" "));

  // 2. While-clause (gerund)
  if (roles.whileClause && VERBS[roles.whileClause]) {
    parts.push(VERBS[roles.whileClause].gerund);
  }

  // 3. Subject
  if (roles.subject) {
    const skipSubject = (roles.tense === "command" || roles.tense === "suggestion") && roles.verbBase;
    if (!skipSubject) {
      if ((roles.verbBase === "want" || roles.verbBase === "need")) {
        const dativeMap = { "i":"nanage","you":"ninage","he":"avanige","she":"avalige","we":"namage","they":"avrige" };
        parts.push(dativeMap[roles.subject] || SUBJ_PRONOUNS[roles.subject]);
      } else {
        parts.push(SUBJ_PRONOUNS[roles.subject] || roles.subject);
      }
    }
  }

  // 4. Adverbs (before loan adjectives for natural order: "yavaglu late")
  if (roles.adverbs.length) parts.push(roles.adverbs.join(" "));

  // 5. Loan adjectives (late, early, etc.)
  if (roles.loanAdj.length) parts.push(roles.loanAdj.join(" "));

  // 6. Location with case marker
  if (roles.location) {
    const w = roles.location.word.toLowerCase().replace(/s$/, "");
    const marker = roles.location.marker;
    const base = NOUN_MAP[w] || w;
    // For -ge (dative/directional), don't add -u: driver-ge, office-ge
    if (marker === "-ge") {
      parts.push(base + "-ge");
    } else if (/[aeiou]$/.test(base)) {
      parts.push(base + marker);
    } else {
      parts.push(base + "-u" + marker);
    }
  }

  // 7. Indirect object with -ge (dative)
  if (roles.indirectObj) {
    const io = OBJ_PRONOUNS[roles.indirectObj] || SUBJ_PRONOUNS[roles.indirectObj];
    if (io) {
      parts.push(io);
    } else {
      parts.push(kannadaNoun(roles.indirectObj) + "-ge");
    }
  }

  // 8. Object
  if (roles.object.length) parts.push(roles.object.join(" "));

  // 9. Question word (in Kannada, question words often go near the verb)
  if (roles.question) parts.push(roles.question);

  // 10. Purpose
  if (roles.purpose) {
    if (VERBS[roles.purpose]) {
      // "to eat" → "tinni-okke", "to come" → "banni-okke" → but for "tell X to come" use madi
      // Only add -okke for genuine purpose clauses, not "tell him to come"
      if (roles.verbBase === "tell" || roles.verbBase === "say" || roles.verbBase === "ask") {
        // "tell him to come" → "avanige baa helu" (not purpose)
        // The purpose verb becomes the main instruction
        roles.verbChain = [roles.purpose];
        roles.purpose = null;
      } else {
        parts.push(VERBS[roles.purpose].madi.split(" ")[0] + "-okke");
      }
    } else {
      // "for meeting" → "meeting-ge"
      parts.push(kannadaNoun(roles.purpose) + "-ge");
    }
  }

  // 11. Verb chain (adverbial participle: "come and eat" → "bandhu tinni")
  if (roles.verbBase && VERBS[roles.verbBase]) {
    const v = VERBS[roles.verbBase];

    // Special: want/need → "X beku"
    if (roles.verbBase === "want" || roles.verbBase === "need") {
      parts.push("beku");
    }
    // Special: bring → always ends with "thogondu banni" in commands
    else if (roles.verbBase === "bring" && (roles.tense === "command" || roles.tense === "negative")) {
      if (roles.negated) {
        parts.push("thogondu bar-bedi");
      } else {
        parts.push("thogondu banni");
      }
    }
    // Special: "tell/ask X to Y" → "X-ge Y heli/kelu"
    else if ((roles.verbBase === "tell" || roles.verbBase === "say" || roles.verbBase === "ask") && roles.verbChain.length) {
      const targetVerb = roles.verbChain[roles.verbChain.length - 1];
      if (VERBS[targetVerb]) {
        parts.push(VERBS[targetVerb].madi);
      }
      parts.push(v.madi); // heli / kelu
    }
    // If there's a verb chain, use chain form for first verb
    else if (roles.verbChain.length) {
      parts.push(v.chain);
      for (let ci = 0; ci < roles.verbChain.length - 1; ci++) {
        const mv = VERBS[roles.verbChain[ci]];
        if (mv) parts.push(mv.chain);
      }
      const lastVerb = roles.verbChain[roles.verbChain.length - 1];
      const lastV = VERBS[lastVerb];
      if (lastV) parts.push(conjugate(lastV, roles));
    } else {
      // Negation
      if (roles.negated) {
        if (roles.tense === "command" || roles.tense === "negative") {
          parts.push(v.madi.split(" ")[0] + "-bedi");
        } else {
          parts.push(conjugate(v, roles) + " illa");
        }
      } else {
        parts.push(conjugate(v, roles));
      }
    }
  }

  // 12. Suggestion
  if (roles.tense === "suggestion" && roles.verbBase) {
    // Already handled above, but add -ona suffix
  }

  const result = parts.filter(Boolean).join(" ");
  return result;
}

// Conjugate verb based on tense and subject
function conjugate(v, roles) {
  switch (roles.tense) {
    case "command":    return v.madi;
    case "present":    return conjugatePresent(v, roles.subject);
    case "past":       return conjugatePast(v, roles.subject);
    case "gerund":     return v.gerund;
    case "suggestion": return v.madi.split(" ")[0] + "-ona"; // hogona, maadona
    case "aita":       return "aita?";
    case "negative":   return v.madi.split(" ")[0] + "-bedi";
    default:           return v.madi;
  }
}

// Present tense varies by person
function conjugatePresent(v, subject) {
  const s = (subject || "").toLowerCase();
  // First person: naanu barthini
  if (s === "i") return v.present; // -thini form
  // Second person: neenu barthiya
  if (s === "you") return v.present.replace(/ini$/, "iya");
  // Third person: avnu/avlu barthane/barthale
  if (s === "he") return v.present.replace(/ini$/, "aane");
  if (s === "she") return v.present.replace(/ini$/, "aale");
  // Plural: naavu barthivi, avru barthare
  if (s === "we") return v.present.replace(/ini$/, "ivi");
  if (s === "they") return v.present.replace(/ini$/, "aare");
  return v.present;
}

// Past tense varies by person
function conjugatePast(v, subject) {
  const s = (subject || "").toLowerCase();
  if (s === "i") return v.past.replace(/e$/, "e"); // naanu bande
  if (s === "he") return v.past.replace(/e$/, "a"); // avnu banda
  if (s === "she") return v.past.replace(/e$/, "lu"); // avlu bandlu
  if (s === "they") return v.past.replace(/e$/, "ru"); // avru bandru
  return v.past;
}

// ─── FULL PHRASE PATTERNS (bypass parser for common idioms) ────────────────
const ENG_PHRASES = [
  [/\bis\s+it\s+done\b/i, "aita?"],
  [/\bare\s+you\s+done\b/i, "aita?"],
  [/\bis\s+it\s+over\b/i, "aita?"],
  [/\bhow\s+are\s+you\b/i, "hege iddira?"],
  [/\bi('m| am)\s+fine\b/i, "naanu chennaagi iddini"],
  [/\bi\s+don'?t\s+know\b/i, "nanage gottilla"],
  [/\bi\s+know\b/i, "nanage gottu"],
  [/\bcome\s+here\b/i, "illi banni"],
  [/\bgo\s+there\b/i, "alli hogi"],
  [/\bno\s+problem\b/i, "yenu problem-u illa"],
  [/\bwhat\s+happened\b/i, "yenu aaytu?"],
  [/\bwhat('s| is)\s+this\b/i, "idu yenu?"],
  [/\bwhat('s| is)\s+that\b/i, "adu yenu?"],
  [/\bwhere\s+are\s+you\b/i, "yelli iddira?"],
  [/\bwhen\s+are\s+you\s+coming\b/i, "yavaga barthira?"],
  [/\blet('s| us)\s+go\b/i, "hogona"],
  [/\bdon'?t\s+want\b/i, "beda"],
  [/\bthank\s+you\b/i, "dhanyavaada"],
  [/\bthanks\b/i, "dhanyavaada"],
  [/\bnot\s+possible\b/i, "aagalla"],
  [/\bvery\s+good\b/i, "thumba chennaagi"],
  [/\btoo\s+much\b/i, "thumba jaasti"],
  [/\bis\s+(\w+)\s+done\??/i, (m, noun) => kannadaNoun(noun) + " aita?"],
  [/\b(?:please\s+)?wait[,.]?\s+(?:i'm|i am)\s+coming\b/i, "thadi, naanu barthini"],
  // "can you come" patterns
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+today\s+for\s+(\w+)\b/i, (m, task) => "ivattu swalpa late banni, " + kannadaNoun(task) + " maadokke"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+today\b/i, "ivattu swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\s+tomorrow\b/i, "naaleki swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+late\b/i, "swalpa late banni"],
  [/\bcan\s+you\s+come\s+(?:a\s+)?little\s+early\b/i, "swalpa early banni"],
  [/\bcan\s+you\s+come\s+early\s+tomorrow\b/i, "naaleki early banni"],
  [/\bcan\s+you\s+come\s+today\b/i, "ivattu banni"],
  [/\bcan\s+you\s+come\s+tomorrow\b/i, "naaleki banni"],
  [/\bcan\s+you\s+come\b/i, "banni"],
];

// ─── LANGUAGE DETECTION ────────────────────────────────────────────────────
function detectLanguage(text) {
  const words = text.toLowerCase().replace(/[?.!,']/g, "").split(/\s+/).filter(Boolean);
  let tamil = 0, english = 0;
  for (const w of words) {
    if (TAMIL_MAP[w]) tamil++;
    if (VERB_FORMS[w] || ADVERBS[w] || SUBJ_PRONOUNS[w] || OBJ_PRONOUNS[w] ||
        MISC_WORDS[w] || QUESTION_WORDS[w] || KNOWN_NOUNS.has(w) || SKIP_WORDS.has(w) ||
        POSSESSIVES[w] || LOANWORDS.has(w)) {
      english++;
    }
  }
  // Tamil-specific sounds
  if (/\b(zha|nga|ponga|vaanga|inga|anga|achu|aachu)\b/i.test(text)) tamil += 3;
  return tamil > english ? "tamil" : "english";
}

// ─── TAMIL TRANSLATOR ─────────────────────────────────────────────────────
function translateTamil(text) {
  let result = text;
  for (const [pat, rep] of TAMIL_PHRASES) {
    if (typeof rep === "function") result = result.replace(pat, rep);
    else result = result.replace(pat, rep);
  }
  result = result.replace(/[a-zA-Z]+/g, (word) => {
    const lower = word.toLowerCase();
    const mapped = TAMIL_MAP[lower];
    if (mapped) {
      return word[0] === word[0].toUpperCase()
        ? mapped.charAt(0).toUpperCase() + mapped.slice(1) : mapped;
    }
    return word;
  });
  return cleanUp(result);
}

// ─── ENGLISH TRANSLATOR (Dravidian Bridge) ─────────────────────────────────
function translateEnglish(text) {
  // 1. Try full phrase matches first
  for (const [pat, rep] of ENG_PHRASES) {
    if (pat.test(text)) {
      if (typeof rep === "function") return cleanUp(text.replace(pat, rep));
      return cleanUp(rep);
    }
  }

  // 2. Handle comma-separated clauses independently
  if (/,/.test(text)) {
    const clauses = text.split(/\s*,\s*/);
    const translated = clauses.map(c => {
      // Try phrase match on each clause
      for (const [pat, rep] of ENG_PHRASES) {
        if (pat.test(c)) {
          if (typeof rep === "function") return c.replace(pat, rep);
          return rep;
        }
      }
      const roles = parseEnglish(c);
      return assembleKanglish(roles);
    });
    return cleanUp(translated.filter(Boolean).join(", "));
  }

  // 3. Parse and assemble
  const roles = parseEnglish(text);
  return cleanUp(assembleKanglish(roles));
}

// ─── CLEANUP ───────────────────────────────────────────────────────────────
function cleanUp(text) {
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([?.!,])/g, "$1")
    .replace(/([?.!])\1+/g, "$1")
    .replace(/,\s*,/g, ",")
    .replace(/^\s+|\s+$/g, "")
    .replace(/^./, c => c.toUpperCase());
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
function translate(input) {
  const text = input.trim();
  if (!text) return { result: "", lang: "unknown" };
  const lang = detectLanguage(text);
  const result = lang === "tamil" ? translateTamil(text) : translateEnglish(text);
  return { result, lang };
}

// ─── UI WIRING ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const inputEl     = document.getElementById("inputText");
  const translateBtn = document.getElementById("translateBtn");
  const clearBtn     = document.getElementById("clearBtn");
  const outputBox    = document.getElementById("outputBox");
  const outputText   = document.getElementById("outputText");
  const detectedEl   = document.getElementById("detectedLang");
  const copyBtn      = document.getElementById("copyBtn");
  const toastEl      = document.getElementById("toast");

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
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 1600);
  }
});
