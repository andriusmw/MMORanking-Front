//import { Record } from "./Record";
import { Link } from "react-router-dom";

export const HomeNews = ({ latestNews }) => {
  return latestNews.length ? (
  <>
        {latestNews.map((newItem) => (
           <div key={newItem.id}>
           <span>
             <Link to={`/news/${newItem.id}`}>
               <h3>{newItem.title}</h3>
             </Link>
             {newItem.created_at} by {newItem.user_name}
           </span>
           <p>{newItem.preview}</p>
           {newItem.image && <img src={newItem.image} alt={newItem.title} />}
         </div>


        ))}
    </>
  ) : (
    <p>There are no News yet</p>
  );
};
