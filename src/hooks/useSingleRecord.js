import { useEffect, useState } from "react";
import { getSingleRecordService } from "../services";

const useSingleRecord = (id) => {
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRecord = async () => {
            try {
                setLoading(true);
                const data = await getSingleRecordService(id);

                setRecord(data);

            } catch(error) {
                setError(error.message)

            } finally {
                setLoading(false);
                
            }
        }

        loadRecord();
    }, [id])

    return {record, loading, error};
}

export default useSingleRecord;