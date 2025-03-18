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
    // Usar document.body para capturar toda la página
    const element = document.body;

    if (!element) {
      console.error("No se pudo encontrar el elemento del body");
      return;
    }

    // Clonar el elemento para evitar modificar el DOM original
    const elementClone = element.cloneNode(true);
    
    // Opcional: Ocultar elementos que no quieres en el PDF
    const buttons = elementClone.querySelectorAll('.print-button');
    buttons.forEach(button => button.style.display = 'none');

    console.log("Contenido antes de convertir a PDF:", elementClone.innerHTML);

    const options = {
      margin: [10, 10, 10, 10], // Márgenes: [top, left, bottom, right]
      filename: `SpeedRunDungeons_Stats_${new Date().toISOString().slice(0,10)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2, // Mayor resolución
        useCORS: true, // Para imágenes externas
        logging: true,
        windowWidth: document.body.scrollWidth, // Asegura capturar todo el ancho
        scrollY: 0 // Comienza desde el top
      },
      jsPDF: { 
        unit: "mm", 
        format: "a4", 
        orientation: "portrait",
        putOnlyUsedFonts: true,
        compress: true
      }
    };

    // Generar el PDF
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
      <header>
        <h1>SPEED RUN DUNGEONS</h1>
      </header>
      <nav>
        {/* Agrega tu navegación aquí si la tienes */}
      </nav>
      <main>
        <section id="stats-page-content">
          <h2>Public Stats</h2>
          <StatsComp stats={stats} />
          <DeepStatsComp Deepstats={Deepstats} />
          {user?.user?.role === "mod" || user?.user?.role === "admin" ? (
            <PrivateStatsComp />
          ) : null}
          <div className="print-button">
            <button 
              onClick={handleExportToPDF} 
              style={{ 
                margin: "20px 10px",
                padding: "10px 20px",
                cursor: "pointer"
              }}
            >
              Export to PDF
            </button>
          </div>
        </section>
      </main>
      <footer>
        <p>© 2025 Speed Run Dungeons - Made By Andrew</p>
      </footer>
    </div>
  );
};

export default StatsPage;