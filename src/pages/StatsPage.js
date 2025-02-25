import { ErrorMessage } from "../components/ErrorMessage";
import { StatsComp } from "../components/StatsComp";
import useStats from "../hooks/useStats";

export const StatsPage = () => {
  //carga el hook
  const {stats, loading, error} = useStats();

    if(loading) return <p>Loading Records...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    console.log(stats);
  
  return <section>
        <h2>Public Stats</h2>
     
        <StatsComp stats={stats} />
    </section> 
} 