import { useEffect, useState } from "react";
import { getStatsService } from "../services";

const useStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        // Clave específica para almacenar stats en localStorage
        const statsKey = "app_stats";
        const timestampKey = "app_stats_timestamp";

        // Obtener datos y timestamp de localStorage
        const cachedStats = localStorage.getItem(statsKey);
        const cachedTimestamp = localStorage.getItem(timestampKey);

        const now = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        // Verificar si hay datos en caché y no han pasado 24 horas
        if (cachedStats && cachedTimestamp && (now - parseInt(cachedTimestamp)) < oneDayInMs) {
          // Usar los datos del caché
          setStats(JSON.parse(cachedStats));
        } else {
          // Llamar al servicio si no hay datos o han pasado 24 horas
          const data = await getStatsService();
          setStats(data);

          // Guardar los datos y el timestamp en localStorage
          localStorage.setItem(statsKey, JSON.stringify(data));
          localStorage.setItem(timestampKey, now.toString());
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return { stats, loading, error };
};

export default useStats;