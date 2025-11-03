export type CampusKey = "la paz" | "cochabamba" | "santa cruz";

const CAMPUS_COORDINATES: Record<
  CampusKey,
  { latitude: number; longitude: number; title: string }
> = {
  "la paz": { latitude: -16.57491, longitude: -68.12711, title: "La Paz" },
  cochabamba: { latitude: -17.2318, longitude: -66.22568, title: "Cochabamba" },
  "santa cruz": {
    latitude: -17.81922,
    longitude: -63.23354,
    title: "Santa Cruz",
  },
};

export const parseCampuses = (campusString: string): CampusKey[] => {
  if (!campusString) return ["la paz"];

  if (typeof campusString === "string" && campusString.startsWith("[")) {
    try {
      const parsedArray = JSON.parse(campusString);
      if (Array.isArray(parsedArray)) {
        const result = convertToCampusKeys(parsedArray);
        return result;
      }
    } catch (error) {
      console.error("Error parsing campus array:", error);
    }
  }

  const normalized = campusString.toLowerCase().trim();

  if (
    normalized.includes("todos") ||
    normalized.includes("all") ||
    normalized.includes("todos los campus")
  ) {
    return ["la paz", "cochabamba", "santa cruz"];
  }

  if (normalized.includes(",")) {
    const campusArray = normalized.split(",").map((c) => c.trim());
    const result = convertToCampusKeys(campusArray);
    return result;
  }

  const result = convertToCampusKeys([normalized]);
  return result;
};

export const convertToCampusKeys = (campuses: string[]): CampusKey[] => {
  const validCampuses: CampusKey[] = [];

  campuses.forEach((campus) => {
    const normalized = campus.toLowerCase().trim();

    if (
      normalized === "la paz" ||
      normalized === "lapaz" ||
      normalized === "lapaz"
    ) {
      validCampuses.push("la paz");
    } else if (
      normalized === "cochabamba" ||
      normalized === "cocha" ||
      normalized.includes("cochabamba")
    ) {
      validCampuses.push("cochabamba");
    } else if (
      normalized === "santa cruz" ||
      normalized === "santacruz" ||
      normalized.includes("santa cruz")
    ) {
      validCampuses.push("santa cruz");
    } else if (normalized === "lapaz") {
      validCampuses.push("la paz");
    } else if (normalized === "santacruz") {
      validCampuses.push("santa cruz");
    }
  });

  const uniqueCampuses = Array.from(new Set(validCampuses));
  return uniqueCampuses.length > 0 ? uniqueCampuses : ["la paz"];
};

export const getCampusesCoordinates = (campuses: CampusKey[]) => {
  return campuses.map((campus) => CAMPUS_COORDINATES[campus]);
};

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

  return {
    latitude: -17.20942,
    longitude: -65.80328,
    latitudeDelta: 4.0,
    longitudeDelta: 6.0,
  };
};

export const formatCampusName = (campus: string): string => {
  const campusMap: { [key: string]: string } = {
    "la paz": "La Paz",
    lapaz: "La Paz",
    "santa cruz": "Santa Cruz",
    santacruz: "Santa Cruz",
    cochabamba: "Cochabamba",
    cocha: "Cochabamba",
  };

  const lowerCampus = campus.toLowerCase().trim();
  return (
    campusMap[lowerCampus] ||
    campus.charAt(0).toUpperCase() + campus.slice(1).toLowerCase()
  );
};
