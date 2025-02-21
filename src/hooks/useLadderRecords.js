import { useEffect, useState, useMemo } from "react";
import { getLadderRecordsService } from "../services";

const useLadderRecords = (filters) => {
  const [ladderRecords, setLadderRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Valores predeterminados estables
  const defaultFilters = useMemo(
    () => ({
      dungeonId: "1", // Ajusta según tu caso
      dungeonDifficulty: "*",
      season: "*",
      numPlayers: "*",
      charClass: "*",
      charSpec: "*",
      server: "*",
    }),
    []
  );

  // Usar filtros recibidos o los predeterminados si no se pasan
  const currentFilters = useMemo(
    () => (filters && Object.keys(filters).length > 0 ? filters : defaultFilters),
    [filters]
  );

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        const data = await getLadderRecordsService(currentFilters);
        setLadderRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [currentFilters]); // Dependencia estable

  return { ladderRecords, loading, error };
};

export default useLadderRecords;