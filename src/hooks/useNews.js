import { useEffect, useState } from "react";
import { getAllNewsService } from "../services";

const useNews = (page = 1, limit = 15) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalNews, setTotalNews] = useState(0);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const data = await getAllNewsService(page, limit);
               // console.log("data on useNews= " + data)
              //  console.log(data)
                setNews(data.data);  // Assuming your service returns an object with 'news' and 'total' properties
                setTotalNews(data.total);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [page, limit]);

    return { news, loading, error, totalNews };
};

export default useNews;