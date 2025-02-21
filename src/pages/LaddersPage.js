import { ErrorMessage } from "../components/ErrorMessage";
import useLadderRecords from "../hooks/useLadderRecords";
import { LadderRecordList } from "../components/LadderRecordsList";

export const LaddersPage = () => {
  const { ladderRecords, loading, error } = useLadderRecords(); // Sin filtros para carga inicial

  if (loading) return <p>Loading Records...</p>;
  if (error) return <ErrorMessage message={error} />;

  console.log("Initial ladderRecords:", ladderRecords);

  return (
    <section>
      <h2>TOP 100!</h2>
      <LadderRecordList ladderRecords={ladderRecords} />
    </section>
  );
};