import { useEffect, useState } from "react";
import { getAllNewsService } from "../services";

const useNews = () => {
    const [news,setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //useEffect se ejecuta en cuanto carga, renderiza todo
    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = await getAllNewsService();
                setNews(data);
              

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);       
            }
        }

        loadNews();

    },[]);

    return { news, loading, error}

}

export default useNews;