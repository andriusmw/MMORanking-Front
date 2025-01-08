import { useState } from "react";

const useRecords = () => {
    const [records,setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    return { records, loading, error}

}

export default useRecords;