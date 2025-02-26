import { useState } from "react";
import { getPrivateStatsService } from "../services";

const usePrivateStats = () => {
  const [pstats, setPStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStats = async (start = null, end = null) => {
    try {
      setLoading(true);
      const data = await getPrivateStatsService(start, end);
      setPStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsByDate = (start, end) => {
    if (start && end) {
      loadStats(start, end);
    }
  };

  return { pstats, loading, error, fetchStatsByDate };
};

export default usePrivateStats;