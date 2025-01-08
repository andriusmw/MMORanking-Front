import { RecordList } from "../components/RecordsList";
import useRecords from "../hooks/useRecords"

export const HomePage = () => {
  //carga el hook
  const {records, loading, error} = useRecords();

    if(loading) return <p>Loading Records...</p>;
    if(error) return <p>{error}</p>
    
    console.log(records);
  
  return <section>
        <h2>Latest records!</h2>
        <p>here we will have the list of latest records</p>
        <RecordList records={records} />
    </section> 
} 