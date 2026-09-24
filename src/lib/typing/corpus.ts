export type Language = "en" | "hi";
export type Level = "easy" | "medium" | "hard";
export type DrillKind = "home" | "common" | "numbers" | "punct" | "speed";

const EN_COMMON = [
  "the","be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at",
  "this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there",
  "their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time",
  "no","just","him","know","take","people","into","year","your","good","some","could","them","see","other","than",
  "then","now","look","only","come","its","over","think","also","back","after","use","two","how","our","work",
  "first","well","way","even","new","want","because","any","these","give","day","most","us","life","child","world",
  "school","state","family","keep","leave","put","while","mean","keep","let","great","seem","help","talk","turn",
  "start","show","play","run","move","live","believe","hold","bring","happen","write","sit","stand","lose","pay",
  "meet","include","continue","set","learn","change","lead","understand","watch","follow","stop","create","speak",
  "read","spend","grow","open","walk","win","offer","remember","love","consider","appear","buy","serve","die",
  "send","build","stay","fall","cut","reach","kill","raise","pass","sell","decide","return","explain","hope",
  "develop","carry","break","receive","agree","support","hit","produce","eat","cover","catch","draw","choose",
  "report","need","try","ask","feel","become","leave","call","come","find","give","tell","work","seem","feel",
  "try","leave","call","paper","letter","number","office","report","test","speed","accuracy","practice","keyboard",
  "finger","rhythm","focus","minute","second","result","error","space","shift","enter","screen","cursor","passage",
];

const EN_EASY = [
  "sit tall and keep both feet on the floor","look at the words not the keys","type with a calm and even rhythm",
  "start slow and stay accurate","rest your fingers on the home row","read a little ahead as you type",
  "short daily practice builds real skill","keep your shoulders loose and quiet","press each key and move to the next",
  "a steady pace is better than a rush","breathe and begin the next sentence","small sessions still count as training",
];

const EN_MEDIUM = [
  "Learning to type well is less about forcing speed and more about building a dependable rhythm. When each hand knows where to travel, attention can stay on the sentence instead of the keyboard.",
  "A focused practice session gives the brain a simple job: recognize the next word, choose the right keys, and keep the rhythm moving. Short, regular sessions create stronger habits than occasional bursts of effort.",
  "Accuracy deserves attention even when the goal is higher speed. Clean keystrokes create a useful foundation. When errors decrease, speed often follows because fewer pauses are needed to repair the text.",
  "Reading a little ahead is one of the easiest ways to make typing smoother. Let your eyes preview the upcoming phrase so the hands can keep a buffer between reading and pressing keys.",
  "Good posture quietly affects performance. Feet rest naturally, shoulders stay loose, and wrists remain neutral. The goal is not a rigid pose, but the removal of unnecessary tension.",
  "A five-minute test is long enough to reveal habits that hide in a short sprint. The first minute may feel energetic, the middle settles, and the last minute exposes fatigue or loss of focus.",
  "Different punctuation marks create different movements. Commas, periods, quotation marks, and brackets interrupt an easy rhythm until they become familiar through varied practice.",
  "When a mistake happens, avoid turning it into a chain of mistakes. Notice it, continue with the next word, and keep the hands emotionally quiet. Frustration adds another layer of error.",
  "Repeatable performance matters more than a single peak score. The useful benchmark is the speed you can reproduce with high accuracy on an ordinary day, not the fastest number you have ever seen.",
  "For many learners, the biggest change comes from stopping the habit of looking down after every few words. Keep the eyes on the text and let the fingers use their learned positions.",
];

const EN_HARD = [
  "Efficient keyboarding requires deliberate repetition, accurate finger placement, and the discipline to maintain rhythm when punctuation becomes irregular; 3.14159, 98.6%, and $1,250.00 should not break the line.",
  "Complex sentences challenge attention because commas, semicolons, quotation marks, parentheses, and dashes can interrupt an otherwise familiar sequence — recover without looking down.",
  "Professional writing often mixes short statements with longer clauses, technical vocabulary, numerical references (2026, 10,500, 9,000), and abbreviations that demand precise keystrokes.",
  "If net speed is computed as (gross words minus penalty) divided by minutes, then every extra error after the 5% allowance is expensive: ten words deducted per excess mistake.",
  "Maintain a sustainable pace: 40-45 words per minute in practice makes 35 words per minute on exam day feel ordinary, even with a new keyboard and a printed passage.",
];

const HI_COMMON = [
  "और","के","है","में","की","को","से","यह","एक","हैं","नहीं","लिए","पर","कर","इस","होता","था","तो","ही","भी",
  "आप","जो","वह","करने","बाद","लेकिन","अपने","रहा","दिया","गया","सकता","समय","बात","कुछ","अगर","जब","या","हम",
  "भारत","सरकार","परीक्षा","अभ्यास","गति","सटीकता","शब्द","मिनट","गलती","कीबोर्ड","उंगली","ध्यान","नियमित","कागज",
];

const HI_EASY = [
  "नियमित अभ्यास से टाइपिंग आसान होती है",
  "पहले सही लिखें फिर गति बढ़ाएं",
  "शांत रहें और शब्दों को आगे से पढ़ें",
  "हाथ होम रो पर रखें और कंधे ढीले रखें",
  "हर दिन दस मिनट का अभ्यास काफी है",
  "कीबोर्ड की ओर देखने की आदत छोड़ें",
];

const HI_MEDIUM = [
  "अच्छी टाइपिंग केवल गति पर निर्भर नहीं करती। एक समान लय बनाए रखें और हर शब्द को ध्यान से टाइप करें। छोटी गलती को श्रृंखला में बदलने से बचें।",
  "पांच या दस मिनट का लगातार अभ्यास मांसपेशियों की याददाश्त मजबूत करता है। गलती के बाद रुकने के बजाय अगले शब्द पर ध्यान लौटाएं।",
  "परीक्षा के दिन नई कीबोर्ड और छपा हुआ पैसेज दोनों अजीब लग सकते हैं। इसलिए अभ्यास में लक्ष्य सीमा से थोड़ी अधिक गति रखें।",
  "हिंदी टाइपिंग में मंगल फॉन्ट और इंस्क्रिप्ट या रेमिंगटन लेआउट का उपयोग आम है। जिस लेआउट पर परीक्षा होगी उसी पर अभ्यास करें।",
  "सटीकता को प्राथमिकता दें। पांच प्रतिशत से अधिक गलती पर हर अतिरिक्त त्रुटि दस शब्द काट सकती है, इसलिए जल्दबाजी महंगी पड़ती है।",
  "सीधी पीठ, आरामदायक कलाई और स्थिर सांस से लंबे पैराग्राफ आसान लगते हैं। तनाव कम होने पर उंगलियां सही कुंजी तक स्वयं पहुंचती हैं।",
];

const HI_HARD = [
  "कठिन वाक्यों, विराम चिह्नों, संख्याओं जैसे 30, 35, 9,000 और 10,500 तथा लंबे शब्दों के दौरान गति से अधिक सटीकता आवश्यक है।",
  "नेट गति की गणना में अतिरिक्त त्रुटियों पर दस शब्दों की कटौती लागू हो सकती है; इसलिए 97 प्रतिशत या उससे बेहतर सटीकता बनाए रखें।",
  "इंस्क्रिप्ट लेआउट में व्यंजन और मात्रा का संयोजन अभ्यास से स्वचालित होता है। बिना बैकस्पेस के दस मिनट लिखना परीक्षा के सबसे निकट का प्रशिक्षण है।",
];

const EN_EXAM = [
  ...EN_MEDIUM,
  ...EN_HARD,
  "The skill test is qualifying in nature. Marks from typing are not added to the merit list, but a candidate who does not meet the required speed and accuracy cannot proceed further in the process.",
  "A printed passage is placed beside the computer. The candidate reads the paper and types on the screen. Practice this transfer: eyes on paper, hands on keys, mind on the next phrase.",
  "Official English speed is often stated as thirty-five words per minute, equal to ten thousand five hundred key depressions per hour, for a ten-minute passage with a limited error allowance.",
];

const HI_EXAM = [
  ...HI_MEDIUM,
  ...HI_HARD,
  "यह कौशल परीक्षा अर्हक होती है। टाइपिंग के अंक मेरिट में नहीं जुड़ते, पर पास होना अनिवार्य है। निर्धारित गति और सटीकता पूरी न होने पर आगे की प्रक्रिया रुक सकती है।",
  "अक्सर छपा हुआ पैसेज कंप्यूटर के पास रखा जाता है। आंखें कागज पर, हाथ कुंजी पर, और ध्यान अगले वाक्यांश पर रखना ही सही अभ्यास है।",
  "हिंदी में तीस शब्द प्रति मिनट यानी नौ हजार की डिप्रेशन प्रति घंटा, दस मिनट का पैसेज, और सीमित त्रुटि छूट सामान्य नियम हैं। अधिसूचना से पुष्टि करें।",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function takeWords(pool: string[], count: number): string[] {
  const out: string[] = [];
  const src = shuffle(pool);
  while (out.length < count) {
    out.push(...src);
  }
  return out.slice(0, count);
}

export function wordsForPractice(lang: Language, level: Level, durationSec: number): string[] {
  const target = Math.max(80, Math.ceil((durationSec / 60) * 110));
  if (lang === "hi") {
    const pool =
      level === "easy" ? HI_EASY.flatMap((s) => s.split(" ")) : level === "hard" ? [...HI_COMMON, ...HI_HARD.flatMap((s) => s.split(" "))] : [...HI_COMMON, ...HI_MEDIUM.flatMap((s) => s.split(" "))];
    return takeWords(pool.filter(Boolean), target);
  }
  if (level === "easy") return takeWords(EN_EASY.flatMap((s) => s.split(" ")), target);
  if (level === "hard") return takeWords([...EN_COMMON, ...EN_HARD.flatMap((s) => s.split(/\s+/))], target);
  return takeWords(EN_COMMON, target);
}

export function wordsForDrill(kind: DrillKind, lang: Language, durationSec: number): string[] {
  const n = Math.max(80, Math.ceil((durationSec / 60) * 130));
  if (kind === "home") {
    const keys = lang === "hi" ? ["क","ख","ग","घ","च","ज","ट","त","न","प","म","र","ल","स","अ","आ"] : ["as","ad","af","ask","lad","fall","all","salad","flask","add","lass","fad","jak","kale","alaska","sad"];
    return takeWords(keys, n);
  }
  if (kind === "numbers") {
    const keys = ["2026","35","30","10,500","9,000","98.6","3.14","120","60","15","45","350","5%","10"];
    return takeWords(keys, n);
  }
  if (kind === "punct") {
    const keys = ["it's","don't","we'll","(note)","end.","wait,","yes;","quote:","A.","B,","ok?","done!"];
    return takeWords(keys, n);
  }
  if (kind === "speed") {
    return takeWords(lang === "hi" ? HI_COMMON : EN_COMMON.slice(0, 80), n);
  }
  return takeWords(lang === "hi" ? HI_COMMON : EN_COMMON, n);
}

export function passageForExam(lang: Language, durationSec: number): string {
  const need = Math.ceil((durationSec / 60) * 80 * 5 * 1.35);
  const bank = lang === "hi" ? HI_EXAM : EN_EXAM;
  const paras = shuffle(bank);
  const chunks: string[] = [];
  let total = 0;
  let i = 0;
  while (total < need) {
    const p = paras[i % paras.length]!;
    chunks.push(p);
    total += p.length + 1;
    i += 1;
  }
  return chunks.join(" ");
}
