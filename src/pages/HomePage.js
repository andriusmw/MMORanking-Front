import { ErrorMessage } from "../components/ErrorMessage";
import { RecordList } from "../components/RecordsList";
import { HomeNews } from "../components/HomeNewsComp";
import useRecords from "../hooks/useRecords";
import useLastNews from "../hooks/useLastNews";
import { Link } from "react-router-dom";
import { DonationsComp } from "../components/DonationsComp";
import { WordsComp } from "../components/WordsComp";

import "../styles/App.css";

export const HomePage = () => {
  const { records, loading, error } = useRecords();
  const { latestNews } = useLastNews();

  // Scroll functions
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Changed from 'bottom' to 'top'
      behavior: "smooth"
    });
  };

  if (loading) return <p>Loading Records...</p>;
  if (error) return <ErrorMessage message={error} />;
    
  //console.log(records);

  return (
    <section>
      <h2>Latest records!</h2>
      <RecordList records={records} />

      <h2>Latest News!</h2>
      <HomeNews latestNews={latestNews} />

     

      <DonationsComp />
      <WordsComp />

      {/* Scroll Buttons */}
      <div className="scroll-buttons">
        <button 
          onClick={scrollToTop}
          className="scroll-button scroll-up"
          aria-label="Scroll to top"
        >
          ↑
        </button>
        <button 
          onClick={scrollToBottom}
          className="scroll-button scroll-down"
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      </div>
    </section>
  );
};