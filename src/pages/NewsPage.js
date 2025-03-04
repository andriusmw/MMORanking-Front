import { ErrorMessage } from "../components/ErrorMessage";
import { NewsList } from "../components/NewsList";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";


export const NewsPage = () => {
  //carga el hook
  const {news, loading, error} = useNews();

    if(loading) return <p>Loading News...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    //console.log(news);
  
  return <section>
        <h2>News Page!</h2>
      
        <button className="submit-button news-button" id="news-button" >   <Link to={"/news/create"}>CREATE NEW!</Link></button>
      
  <NewsList news={news} />
        
    </section> 
} 