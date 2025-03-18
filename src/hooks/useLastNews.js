import { useEffect, useState } from "react";
import { getLastestNewsService } from "../services";

const useLastNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await getLastestNewsService();
        //console.log("Data from useLastNews:", data); // Use more descriptive logging
        // Ensure data.news exists before setting it
        if (data ) {

          setLatestNews(data?.data?.news);
        } else {
          setLatestNews([]); // Default to empty array if no news is returned
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching latest news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []); // Empty dependency array ensures it runs only on mount

  return { latestNews, loading, error };
};

export default useLastNews;