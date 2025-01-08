import { useEffect, useState } from "react";
import { getAllRecordsService } from "../services";

const useRecords = () => {
    const [records,setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //useEffect se ejecuta en cuanto carga, renderiza todo
    useEffect(() => {
        const loadRecords = async () => {
            try {
                setLoading(true);
                const data = await getAllRecordsService();
                setRecords(data);
              

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);       
            }
        }

        loadRecords();

    },[]);

    return { records, loading, error}

}

export default useRecords;