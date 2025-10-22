import { useState, useEffect, useCallback } from "react";
import { Career } from "@/types/types";
import { fetchCareers } from "@/helpers/fetchCareers ";

export const useCareers = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCareers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const careersData = await fetchCareers();
      setCareers(careersData);
    } catch (err) {
      setError("Error al cargar las carreras");
      console.error("Error loading careers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCareers();
  }, [loadCareers]);

  const getCareerByName = useCallback((careerName: string) => {
    return careers.find((career) => career.name === careerName);
  }, [careers]);

  const getCurrentSemester = useCallback((userCareer: string | undefined, userSemester: number | undefined) => {
    if (!userCareer || !userSemester) return null;
    
    const career = getCareerByName(userCareer);
    return career?.semesters?.find((semester) => semester.semester === userSemester) || null;
  }, [getCareerByName]);

  return {
    careers,
    loading,
    error,
    refetch: loadCareers,
    getCareerByName,
    getCurrentSemester
  };
};