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