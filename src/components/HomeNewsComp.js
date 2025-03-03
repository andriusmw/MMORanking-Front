//import { Record } from "./Record";
import { Link } from "react-router-dom";

export const HomeNews = ({ latestNews }) => {
  return latestNews.length ? (
  <>   
  <div className="news-list"> {/* Wrap the news items in a container with class news-list */}
  {latestNews?.map((newItem) => (
    <div key={newItem.id} className="news-card"> {/* Add class news-card to each news item */}
        <section className="news-card-headerHome"> 
            <span>
             <Link to={`/news/${newItem.id}`}>
               <h3>{newItem.title}</h3>
             </Link>
           
           </span>
        </section>
          
          <section className="news-card-dataHome">
          
          {newItem.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${newItem.image}`}
                    alt={newItem.title}
                />
            ) : null}
        
         </section>
         <p>{newItem.preview}</p>
        <p> {newItem.created_at} by {newItem.user_name}</p>
         </div>
        ))}
         </div>
    </>
  ) : (
    <p>There are no News yet</p>
  );
 
};
