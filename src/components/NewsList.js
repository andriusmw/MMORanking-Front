//import { Record } from "./Record";
import { Link } from "react-router-dom";

export const NewsList = ({ news }) => {
  return news.length ? (
  <>
        {news.map((newNew) => (
          <div key={newNew.id}>
             <span> 
                <Link to={`/news/${newNew.id}`}> 
                     <h3> {newNew.title}</h3>  
                </Link>              
                {newNew.created_at} by {newNew.user_name} 
            </span> 

            <p>{newNew.preview}</p> 
            {newNew.image}
    
           
          </div>
        ))}
    </>
  ) : (
    <p>There are no news yet</p>
  );
};
