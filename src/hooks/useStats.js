import { useEffect, useState } from "react";
import { getStatsService } from "../services";

const useStats = () => {
    const [stats,setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //useEffect se ejecuta en cuanto carga, renderiza todo
    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const data = await getStatsService();
                setStats(data);
             // console.log("data", stats)
              

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);       
            }
        }

        loadStats();

    },[]);

    return { stats, loading, error}

}

export default useStats;