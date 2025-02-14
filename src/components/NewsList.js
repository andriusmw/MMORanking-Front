import { useState } from "react";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";

export const NewsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { news, loading, error, totalNews } = useNews(currentPage, 15);
  //console.log("news= " + news)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalPages = Math.ceil(totalNews / 15); // Assuming 15 items per page

  return (
    <>
      {news?.length ? (
        <>
          {news.map((newItem) => (
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
          <div>
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
        </>
      ) : (
        <p>There are no news yet</p>
      )}
    </>
  );
};