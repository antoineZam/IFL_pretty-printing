// Country code to name mapping
export const countries: { [key: string]: string } = {
    "": "No Flag",
    "DZ": "Algeria",
    "AR": "Argentina",
    "AU": "Australia",
    "AT": "Austria",
    "BE": "Belgium",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "CA": "Canada",
    "CL": "Chile",
    "CN": "China",
    "CO": "Colombia",
    "HR": "Croatia",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "EG": "Egypt",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IN": "India",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JP": "Japan",
    "KE": "Kenya",
    "LV": "Latvia",
    "LT": "Lithuania",
    "MY": "Malaysia",
    "MT": "Malta",
    "MX": "Mexico",
    "MA": "Morocco",
    "NL": "Netherlands",
    "NZ": "New Zealand",
    "NG": "Nigeria",
    "NO": "Norway",
    "PK": "Pakistan",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "RO": "Romania",
    "RU": "Russia",
    "SA": "Saudi Arabia",
    "RS": "Serbia",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "ES": "Spain",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TW": "Taiwan",
    "TH": "Thailand",
    "TN": "Tunisia",
    "TR": "Turkey",
    "AE": "UAE",
    "GB": "United Kingdom",
    "US": "United States",
    "VE": "Venezuela",
    "VN": "Vietnam"
};

// Reverse lookup: country name to code (case-insensitive)
const nameToCodeMap: { [key: string]: string } = {};
Object.entries(countries).forEach(([code, name]) => {
    if (code) {
        nameToCodeMap[name.toLowerCase()] = code.toLowerCase();
    }
});

// Add common aliases
nameToCodeMap['uk'] = 'gb';
nameToCodeMap['england'] = 'gb';
nameToCodeMap['usa'] = 'us';

// Get country code from name or code (returns lowercase 2-letter code or null)
export function getCountryCode(input: string | null | undefined): string | null {
    if (!input) return null;
    
    const normalized = input.trim().toLowerCase();
    
    // Already a 2-letter code
    if (normalized.length === 2 && countries[normalized.toUpperCase()]) {
        return normalized;
    }
    
    // Look up by name
    return nameToCodeMap[normalized] || null;
}
