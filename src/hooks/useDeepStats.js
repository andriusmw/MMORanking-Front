import { useEffect, useState } from "react";
import { getDeepStatsService} from "../services";

const useDeepStats = () => {
  const [Deepstats, setDeepStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDeepStats = async () => {
      try {
        setLoading(true);

        // Clave específica para almacenar stats en localStorage
        const DeepstatsKey = "app_Deepstats";
        const timestampDKey = "app_Deepstats_timestamp";

        // Obtener datos y timestamp de localStorage
        const cachedDStats = localStorage.getItem(DeepstatsKey);
        const cachedDTimestamp = localStorage.getItem(timestampDKey);

        const now = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        // Verificar si hay datos en caché y no han pasado 24 horas
        if (cachedDStats && cachedDTimestamp && (now - parseInt(cachedDTimestamp)) < oneDayInMs) {
          // Usar los datos del caché
          setDeepStats(JSON.parse(cachedDStats));
        } else {
          // Llamar al servicio si no hay datos o han pasado 24 horas
          const data = await getDeepStatsService();
          setDeepStats(data);

          // Guardar los datos y el timestamp en localStorage
          localStorage.setItem(DeepstatsKey, JSON.stringify(data));
          localStorage.setItem(timestampDKey, now.toString());
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDeepStats();
  }, []);

  return { Deepstats, loading, error };
};

export default useDeepStats;