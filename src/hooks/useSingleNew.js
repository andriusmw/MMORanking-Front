import { useEffect, useState } from "react";
import { getSingleNewService } from "../services";

const useSingleNew = (id) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setLoading(true);
                const data = await getSingleNewService(id);

                setArticle(data);

            } catch(error) {
                setError(error.message)

            } finally {
                setLoading(false);
                
            }
        }

        loadArticle();
    }, [id])

    return {article, loading, error};
}

export default useSingleNew;