import { ErrorMessage } from "../components/ErrorMessage";
import { PrivateStatsComp } from "../components/privateStatsComp";
import { StatsComp } from "../components/StatsComp";
import useStats from "../hooks/useStats";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import html2pdf from "html2pdf.js"; // Importamos la librería

export const StatsPage = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const { stats, loading, error } = useStats();

  if (loading) return <p>Loading Records...</p>;
  if (error) return <ErrorMessage message={error} />;

  console.log(stats);

  // Función para generar el PDF de lo visible
  const handleExportToPDF = () => {
    const element = document.querySelector("#stats-page-content"); // Seleccionamos el contenido visible
    const opt = {
      margin: 1,
      filename: "stats_page.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  

  return (
    <section id="stats-page-content">
      <h2>Public Stats</h2>
      <StatsComp stats={stats} />

      {user?.user?.role === "mod" || user?.user?.role === "admin" ? (
        <>
          <h2>Private Stats</h2>
          <PrivateStatsComp />
        </>
      ) : null}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleExportToPDF} style={{ marginRight: "10px" }}>
          Export to PDF
        </button>
       
      </div>
    </section>
  );
};