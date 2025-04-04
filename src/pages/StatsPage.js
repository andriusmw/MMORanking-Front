import { ErrorMessage } from "../components/ErrorMessage";
import { PrivateStatsComp } from "../components/privateStatsComp";
import { StatsComp } from "../components/StatsComp";
import { DeepStatsComp } from "../components/DeepStatsComp";
import useStats from "../hooks/useStats";
import useDeepStats from "../hooks/useDeepStats";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import html2pdf from "html2pdf.js";

export const StatsPage = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const { stats, loading, error } = useStats();
  const { Deepstats } = useDeepStats();
  const contentRef = useRef(null);

  useEffect(() => {
    if (!loading && contentRef.current) {
      console.log("Stats:", stats);
      console.log("DeepStats:", Deepstats);
      console.log("Contenido renderizado:", contentRef.current.innerHTML);
    }
  }, [loading, stats, Deepstats]);

  const handleExportToPDF = () => {
    const element = contentRef.current; // Use the contentRef instead of document.body

    if (!element) {
      console.error("No se pudo encontrar el elemento del contenido");
      return;
    }

    const elementClone = element.cloneNode(true);

    // Ocultar botones en el PDF
    const buttons = elementClone.querySelectorAll('.print-button');
    buttons.forEach(button => (button.style.display = 'none'));

    console.log("Contenido antes de convertir a PDF:", elementClone.innerHTML);

    const options = {
      margin: 10,
      filename: `SpeedRunDungeons_Stats_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: element.scrollWidth,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compress: true,
      },
    };

    html2pdf()
      .set(options)
      .from(elementClone)
      .save()
      .catch(err => console.error("Error generando PDF:", err));
  };

  if (loading) return <p>Loading Records...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div ref={contentRef} style={{ width: "100%", minHeight: "100vh" }}>
      <nav>{/* Agrega tu navegación aquí si la tienes */}</nav>
      <main>
        <section id="stats-page-content">
          <h2>Public Stats</h2>
          <div className="stats-page">
            <div className="stats-section">
              <StatsComp stats={stats} />
            </div>
            <div className="stats-section">
              <DeepStatsComp Deepstats={Deepstats} />
            </div>
            {user?.user?.role === "mod" || user?.user?.role === "admin" ? (
              <div className="stats-section">
                <PrivateStatsComp />
              </div>
            ) : null}
            <div className="print-button">
              <button
                onClick={handleExportToPDF}
                style={{
                  margin: "20px 10px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Export to PDF
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Estilos para impresión */}
      <style>
        {`
          @media print {
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
            .stats-section {
              page-break-before: always;
              margin: 0;
              padding: 0;
              position: relative;
              top: 0;
              height: 100%;
            }
            .print-button {
              display: none !important;
            }
            header, nav, footer {
              display: none;
            }
            #stats-page-content {
              margin: 0;
              padding: 0;
            }
            .stats-page {
              width: 100%;
              margin: 0;
              padding: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default StatsPage;