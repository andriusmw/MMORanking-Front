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
              ) : 
              <img src="/images/youtube_default.png" alt="youtube-default.png" />
            }

              


            </section>
            <p dangerouslySetInnerHTML={{ __html: newItem.preview }}></p>
           
            <p>{new Date(newItem.created_at).toLocaleDateString()} by {newItem.user_name}</p>
      
          </div>
        ))}
      </div>
      <span className="see-more-link">
        <Link to={`/news`}>See more news</Link>
      </span>
    </>
  ) : (
    <p>There are no News yet</p>
  );
};