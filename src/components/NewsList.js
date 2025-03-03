import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import useNews from "../hooks/useNews";


export const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { news, loading, error, totalNews } = useNews(currentPage, 15);
  const location = useLocation(); // Get current location to determine the page

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalPages = Math.ceil(totalNews / 15); // Assuming 15 items per page

  // Determine if we’re on the NewsPage (you can adjust this condition based on your routing)
  const isNewsPage = location.pathname === "/news";

  return (
    <>
      {news?.length ? (
        <div className={isNewsPage ? "news-list-vertical" : "news-list"}> {/* Conditional class */}
          {news.map((newItem) => (
            <div key={newItem.id} className="news-card">
              <section className="news-card-header">
              <span className="news-card-title">
                <Link to={`/news/${newItem.id}`}>
                  <h3>{newItem.title}</h3>
                </Link>
              
              </span>
            <span className="news-card-date">
            {newItem.created_at} by {newItem.user_name}
            </span>
            </section>

              <section className="news-card-data">
              {newItem.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${newItem.image}`}
                    alt={newItem.title}
                />
            ) : null}

            <p>{newItem.preview}</p>
            </section>
            </div>
          ))}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPage(i + 1)}
                style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>There are no news yet</p>
      )}
    </>
  );
};