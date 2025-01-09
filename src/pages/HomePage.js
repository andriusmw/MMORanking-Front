import { ErrorMessage } from "../components/ErrorMessage";
import { RecordList } from "../components/RecordsList";
import useRecords from "../hooks/useRecords"

export const HomePage = () => {
  //carga el hook
  const {records, loading, error} = useRecords();

    if(loading) return <p>Loading Records...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    console.log(records);
  
  return <section>
        <h2>Latest records!</h2>
     
        <RecordList records={records} />
    </section> 
} 