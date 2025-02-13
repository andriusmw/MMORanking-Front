import { useParams } from "react-router-dom"
//replace for useSingleNew
import useSingleRecord from "../hooks/useSingleRecord"
import { ErrorMessage } from "../components/ErrorMessage";
// replace for singleNew
import  { Record} from "../components/Record"

export const RecordPage = () => {
    //to get the id that comes in the params at the url
    const {id} = useParams();
    //to load the states and the functions and ServicesCall of the SingleRecord
   // Moreover we send the Id to the hook so it can work properly.
     const {record, loading, error} = useSingleRecord(id);

      if(loading) return <p>Loading Record...</p>;
      if(error) return <ErrorMessage message={error} />

    return (
        <section>
            <h1>RecordPage</h1>
            <Record record={record} />
        </section>
    )
}