import { ErrorMessage } from "../components/ErrorMessage";
import { RecordList } from "../components/RecordsList";
import { HomeNews } from "../components/HomeNewsComp";
import useRecords from "../hooks/useRecords"
import useLastNews from "../hooks/useLastNews"
import { Link } from "react-router-dom";


import { DonationsComp } from "../components/DonationsComp";

import { WordsComp } from "../components/WordsComp";


export const HomePage = () => {
  //carga el hook
  const {records, loading, error} = useRecords();
  const {latestNews} = useLastNews();

    if(loading) return <p>Loading Records...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    console.log(records);
  
  return <section>
        <h2>Latest records!</h2>
     
        <RecordList records={records} />

        <h2>Latest News!</h2>
        <HomeNews latestNews={latestNews}/>

      

        <DonationsComp/>

        <WordsComp />
    
    </section> 
} 