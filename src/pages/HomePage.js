import useRecords from "../hooks/useRecords"

export const HomePage = () => {
  
  const {records, loading, error} = useRecords();

  
  
  
  return <section>
        <h2>Latest records!</h2>
        <p>here we will have the list of latest records</p>
    </section> 
} 