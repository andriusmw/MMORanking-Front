import { ErrorMessage } from "../components/ErrorMessage";
import { NewsList } from "../components/NewsList";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export const NewsPage = () => {
  //carga el hook
     const { token, user, setUser, logout } = useContext(AuthContext); 
  const {news, loading, error} = useNews();

    if(loading) return <p>Loading News...</p>;
    if(error) return <ErrorMessage message={error}/>
    
    //console.log(news);
  
  return <section>
        <h2>News Page!</h2>
      
        {user?.user?.role == "mod" || user?.user?.role == "admin" ? (
           <button className="submit-button news-button button-goBackNew" id="news-button" >   <Link to={"/news/create"}>CREATE NEW!</Link></button>
        ) : (null) }

  <NewsList news={news} />
        
    </section> 
} 