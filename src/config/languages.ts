export type SupportedLanguage = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
};

export const supportedLanguages: SupportedLanguage[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "EN" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "HI" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", flag: "BN" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", flag: "TA" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", flag: "TE" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", flag: "MR" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം", flag: "ML" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "ES" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "FR" },
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "DE" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", flag: "JA" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", flag: "KO" },
];

export const defaultLanguage = supportedLanguages[0];

export const audioLanguageLabels: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  bn: "Bengali",
  ta: "Tamil",
  te: "Telugu",
  mr: "Marathi",
  ml: "Malayalam",
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  ko: "Korean",
  id: "Indonesian",
  zh: "Chinese",
  pt: "Portuguese",
  ru: "Russian",
  tr: "Turkish",
};

export const getLanguageLabel = (code: string) =>
  audioLanguageLabels[code] ?? code.toUpperCase();
