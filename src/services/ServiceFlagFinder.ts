import countries_file from './countries.json';
import regions_file from './regions.json';

export interface Country {
  country: string;
  isoCode: string;
  emojiFlag: string;
}

export interface Region {
  region: string;
  englishName?: string; // optional English name for regions
  path: string;
}

const countries: Country[] = countries_file;
const regions: Region[] = regions_file;

enum FlagType {
  Country = 'Country',
  Region = 'Region',
  Auto = 'Auto'
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .trim();
}

export function getFlag(input: string, scope: "international" | "national" | "auto" = "auto"): string | null {
  const normInput = normalize(input);
  if (!normInput) return null;

  function searchCountries(): string | null {
    const exactMatch = countries.find(
      (c) => normalize(c.country) === normInput || normalize(c.isoCode) === normInput
    );
    if (exactMatch) return exactMatch.emojiFlag;

    const partialMatch = countries.find(
      (c) => normalize(c.country).includes(normInput) || normalize(c.isoCode).includes(normInput)
    );
    return partialMatch ? partialMatch.emojiFlag : null;
  }

  function searchRegions(): string | null {
    const exactMatch = regions.find(
      (r) =>
        normalize(r.region) === normInput || (r.englishName && normalize(r.englishName) === normInput)
    );
    if (exactMatch) return exactMatch.path;

    const partialMatch = regions.find(
      (r) =>
        normalize(r.region).includes(normInput) ||
        (r.englishName && normalize(r.englishName).includes(normInput))
    );
    return partialMatch ? partialMatch.path : null;
  }

  if (scope === "international") {
    return searchCountries();
  } else if (scope === "national") {
    return searchRegions();
  } else {  // auto
    const countryResult = searchCountries();
    if (countryResult) return countryResult;
    return searchRegions();
  }
}


const italianRegions: Set<string> = new Set(
  regions_file.map(r => r.region.toLowerCase())
);

export function determineEventScope(data: string[][]): 'international' | 'national' {
  for (const entry of data) {
    // Assuming region is at index 4 (like "Veneto", "Lombardia" in your dataset)
    const region = entry[4]?.toLowerCase();

    // If region is missing or not in italian regions, classify as international
    if (!region || !italianRegions.has(region)) {
      return 'international';
    }
  }
  // If all participants have valid Italian regions, it's national
  return 'national';
}