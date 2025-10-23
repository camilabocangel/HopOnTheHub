// utils/campusUtils.ts
export type CampusKey = 'la paz' | 'cochabamba' | 'santa cruz';

const CAMPUS_COORDINATES: Record<CampusKey, { latitude: number; longitude: number; title: string }> = {
  'la paz': { latitude: -16.57491, longitude: -68.12711, title: "La Paz" }, 
  'cochabamba': { latitude: -17.23180, longitude: -66.22568, title: "Cochabamba" }, 
  'santa cruz': { latitude: -17.81922, longitude: -63.23354, title: "Santa Cruz" }, 
};

// Function to parse campus string and return array of campuses
export const parseCampuses = (campusString: string): CampusKey[] => {
  if (!campusString) return ['la paz']; // Default
  
  const normalized = campusString.toLowerCase().trim();
  
  // Check for multi-campus indicators
  if (normalized.includes('todos') || 
      normalized.includes('all') || 
      normalized.includes('todos los campus') ||
      normalized.includes('todos los campus')) {
    return ['la paz', 'cochabamba', 'santa cruz'];
  }
  
  // Check for specific campuses
  const campuses: CampusKey[] = [];
  
  if (normalized.includes('la paz') || normalized.includes('lapaz')) {
    campuses.push('la paz');
  }
  if (normalized.includes('cochabamba') || normalized.includes('cocha')) {
    campuses.push('cochabamba');
  }
  if (normalized.includes('santa cruz') || normalized.includes('santacruz')) {
    campuses.push('santa cruz');
  }
  
  return campuses.length > 0 ? campuses : ['la paz']; // Default fallback
};

// NEW: Function to convert string array to CampusKey array safely
export const convertToCampusKeys = (campuses: string[]): CampusKey[] => {
  const validCampuses: CampusKey[] = [];
  
  campuses.forEach(campus => {
    const normalized = campus.toLowerCase().trim();
    if (normalized === 'la paz' || normalized === 'lapaz') {
      validCampuses.push('la paz');
    } else if (normalized === 'cochabamba' || normalized === 'cocha') {
      validCampuses.push('cochabamba');
    } else if (normalized === 'santa cruz' || normalized === 'santacruz') {
      validCampuses.push('santa cruz');
    }
  });
  
  return validCampuses.length > 0 ? validCampuses : ['la paz'];
};

// Function to get coordinates for campuses
export const getCampusesCoordinates = (campuses: CampusKey[]) => {
  return campuses.map(campus => CAMPUS_COORDINATES[campus]);
};

// Function to calculate map region based on campuses
export const getMapRegionForCampuses = (campuses: CampusKey[]) => {
  if (campuses.length === 1) {
    const campus = campuses[0];
    return {
      latitude: CAMPUS_COORDINATES[campus].latitude,
      longitude: CAMPUS_COORDINATES[campus].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }
  
  // For multiple campuses, show a wider view of Bolivia
  return {
    latitude: -17.20942, // Center of Bolivia
    longitude: -65.80328,
    latitudeDelta: 4.0,
    longitudeDelta: 6.0,
  };
};