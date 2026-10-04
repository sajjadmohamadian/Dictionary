/**
 * Computational Linguistics & Orthography Normalization Engine
 * for Iranian Azerbaijani Turkish and Persian
 */

// Arabic & Persian character normalization map
const CHAR_MAP: Record<string, string> = {
  'ي': 'ی',
  'ى': 'ی',
  'ك': 'ک',
  'ة': 'ه',
  'إ': 'ا',
  'أ': 'ا',
  'ٱ': 'ا',
  'آ': 'ا',
  'ؤ': 'و',
  'ئ': 'ی',
  'ء': '',
  // Zero-width non-joiner & spaces
  '\u200C': ' ', // ZWNJ to space or normalized
  '\u200D': '', // ZWJ
  '\u00A0': ' ', // Non-breaking space
};

// Diacritics to strip for fuzzy search
const DIACRITICS_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g;

// Azerbaijani vowel variations in Persian-Arabic orthography
// Many Iranian Azerbaijani words are written either with explicit vowel markers (وئ, ائ, اؤ, ؤ)
// or without them (و, ی, ا)
const AZERBAIJANI_VOWEL_EQUIVALENTS: [RegExp, string][] = [
  [/سئو/g, 'سو'], // e.g. سئوگی / سوگی
  [/کؤ/g, 'کو'],  // e.g. کؤنول / کونول
  [/گؤ/g, 'گو'],  // e.g. گؤز / گوز
  [/اؤ/g, 'او'],  // e.g. اؤلوم / اولوم
  [/ائ/g, 'ای'],  // e.g. ائشیتمک / ایشیتمک
  [/ئه/g, 'ه'],
  [/وْ/g, 'و'],
  [/ۆر/g, 'اور'],
];

// Common Azerbaijani suffixes in Iranian orthography
// Inflectional: Plural, Case, Possessive, Infinitive
const AZERBAIJANI_SUFFIXES = [
  // Plural
  'لار', 'لر',
  // Case suffixes
  'دا', 'ده', 'دان', 'دن', 'داندا', 'دنده',
  'ا', 'ه', 'یا', 'یه',
  'ی', 'نی', 'و', 'نو',
  'ین', 'نون', 'نین', 'نؤن',
  // Possessive
  'یم', 'وم', 'ام', 'م',
  'ینیز', 'ونوز', 'ینیز',
  'یمیز', 'وموز', 'میز',
  'لاری', 'لری', 'سی', 'سو',
  // Verb infinitives & common particles
  'ماق', 'مک', 'ماخ', 'مخ',
  'ییر', 'یر', 'ور', 'ور',
  'دی', 'دو', 'تو', 'تی',
  'میش', 'موش',
  'اجاق', 'ه‌جک', 'اجاخ', 'ه‌جخ',
];

const AZ_LATIN_TO_ARABIC_TABLE: Record<string, string> = {
  'a': 'ا',
  'ə': 'ه',
  'e': 'ائ',
  'ı': 'ی',
  'i': 'ی',
  'o': 'او',
  'ö': 'اؤ',
  'u': 'او',
  'ü': 'او',
  'b': 'ب',
  'c': 'ج',
  'ç': 'چ',
  'd': 'د',
  'f': 'ف',
  'g': 'گ',
  'ğ': 'غ',
  'h': 'ه',
  'x': 'خ',
  'k': 'ک',
  'q': 'ق',
  'l': 'ل',
  'm': 'م',
  'n': 'ن',
  'p': 'پ',
  'r': 'ر',
  's': 'س',
  'ş': 'ش',
  't': 'ت',
  'v': 'و',
  'y': 'ی',
  'z': 'ز',
};

/**
 * Normalize Persian or Arabic-script text
 */
export function normalizePersianArabic(text: string): string {
  if (!text) return '';
  let res = text.trim();

  // Replace Arabic variants
  for (const [k, v] of Object.entries(CHAR_MAP)) {
    res = res.replaceAll(k, v);
  }

  // Remove diacritics
  res = res.replace(DIACRITICS_REGEX, '');

  // Normalize multiple spaces
  res = res.replace(/\s+/g, ' ');

  return res.toLowerCase();
}

/**
 * Deep normalize for Iranian Azerbaijani orthographic variations
 */
export function normalizeAzerbaijani(text: string): string {
  if (!text) return '';
  let res = normalizePersianArabic(text);

  // Normalize specific vowel markers
  for (const [pattern, replacement] of AZERBAIJANI_VOWEL_EQUIVALENTS) {
    res = res.replace(pattern, replacement);
  }

  // Remove trailing and leading punctuation
  res = res.replace(/^[\s،,.;:!?\-—«»"']+|[\s،,.;:!?\-—«»"']+$/g, '');

  return res;
}

/**
 * Normalize Latin Azerbaijani text (accents, cases)
 */
export function normalizeLatin(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove standard accents if any
    .replace(/['’ʼ`]/g, '') // remove apostrophes
    .replace(/ə/g, 'e')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u');
}

/**
 * Transliterate Latin Azerbaijani to rough Persian-Arabic search pattern
 */
export function transliterateLatinToPersianArabic(latin: string): string {
  const norm = latin.toLowerCase().trim();
  let result = '';
  for (let i = 0; i < norm.length; i++) {
    const ch = norm[i];
    result += AZ_LATIN_TO_ARABIC_TABLE[ch] || ch;
  }
  return result;
}

/**
 * Strip common Azerbaijani suffixes to extract candidate stems
 */
export function extractAzerbaijaniStems(word: string): string[] {
  const norm = normalizeAzerbaijani(word);
  const stems = new Set<string>([norm]);

  // Strip potential suffixes if word is long enough
  if (norm.length >= 4) {
    for (const suffix of AZERBAIJANI_SUFFIXES) {
      if (norm.endsWith(suffix) && norm.length - suffix.length >= 2) {
        stems.add(norm.slice(0, norm.length - suffix.length).trim());
      }
    }
  }

  return Array.from(stems);
}

/**
 * Detect script and probable language
 */
export function detectLanguageAndScript(text: string): {
  script: 'arabic' | 'latin' | 'other';
  probableLanguage: 'az' | 'fa' | 'unknown';
} {
  const cleaned = text.trim();
  if (!cleaned) return { script: 'other', probableLanguage: 'unknown' };

  // Check Latin
  const isLatin = /^[A-Za-zÇçƏəĞğIıİiÖöŞşÜü0-9\s'’-]+$/.test(cleaned);
  if (isLatin) {
    // If it has distinct Azerbaijani Latin characters (ə, ç, ş, ğ, ı, ö, ü)
    return { script: 'latin', probableLanguage: 'az' };
  }

  // Check Arabic/Persian script
  const isArabicScript = /[\u0600-\u06FF]/.test(cleaned);
  if (isArabicScript) {
    // Specific markers often found in written Iranian Azerbaijani
    const azMarkers = [
      'ؤ', 'اؤ', 'ئ', 'گؤ', 'سؤ', 'کؤ', 'ماق', 'مک', 'ماخ',
      'یاشاماق', 'ائ', 'سیز', 'لوق', 'لیق', 'چی', 'چی‌', 'لار', 'لر'
    ];
    for (const marker of azMarkers) {
      if (cleaned.includes(marker)) {
        return { script: 'arabic', probableLanguage: 'az' };
      }
    }

    // Specific Persian vocabulary or markers
    const faMarkers = ['خواهم', 'می‌شود', 'است', 'نیست', 'بود', 'داشت', 'کردن', 'شدن'];
    for (const marker of faMarkers) {
      if (cleaned.includes(marker)) {
        return { script: 'arabic', probableLanguage: 'fa' };
      }
    }

    return { script: 'arabic', probableLanguage: 'unknown' };
  }

  return { script: 'other', probableLanguage: 'unknown' };
}

/**
 * Trigram similarity for fuzzy match calculation (0.0 to 1.0)
 */
export function calculateTrigramSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;
  if (str1 === str2) return 1;

  const s1 = `  ${str1} `;
  const s2 = `  ${str2} `;

  const getTrigrams = (s: string) => {
    const trigrams = new Map<string, number>();
    for (let i = 0; i <= s.length - 3; i++) {
      const tg = s.substring(i, i + 3);
      trigrams.set(tg, (trigrams.get(tg) || 0) + 1);
    }
    return trigrams;
  };

  const tg1 = getTrigrams(s1);
  const tg2 = getTrigrams(s2);

  let matches = 0;
  for (const [tg, count] of tg1.entries()) {
    if (tg2.has(tg)) {
      matches += Math.min(count, tg2.get(tg)!);
    }
  }

  const total = (s1.length - 2) + (s2.length - 2);
  return total > 0 ? (2 * matches) / total : 0;
}

/**
 * Levenshtein distance for fuzzy fallback
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
