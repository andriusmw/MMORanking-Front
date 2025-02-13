import { ErrorMessage } from "../components/ErrorMessage";
import { NewsList } from "../components/NewsList";

import useNews from "../hooks/useNews";

export const NewsPage = () => {
  //carga el hook
  const {news, loading, error} = useNews();

    if(loading) return <p>Loading News...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    console.log(news);
  
  return <section>
        <h2>News Page!</h2>
     
        <NewsList news={news} />
    </section> 
} 