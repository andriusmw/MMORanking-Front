import { useEffect, useState } from "react"; // Eliminamos useMemo porque no lo necesitamos
import { getLadderRecordsService } from "../services";

const useLadderRecords = (filters) => {
  const [ladderRecords, setLadderRecords] = useState([]);
  const [loading, setLoading] = useState(false); // Cambiado a false para evitar "cargando" inicial
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        const data = await getLadderRecordsService(filters); // Usa filters directamente
        setLadderRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (filters) { // Solo ejecuta si filters no es null/undefined
      loadRecords();
    }
  }, [filters]); // Dependencia directa en filters

  return { ladderRecords, loading, error };
};

export default useLadderRecords;