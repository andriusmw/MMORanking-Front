import { ErrorMessage } from "../components/ErrorMessage";
import { LadderRecordList } from "../components/LadderRecordsList";

export const LaddersPage = () => {
  return (
    <section>
      <h2>TOP 100!</h2>
      <LadderRecordList />
    </section>
  );
};

export default LaddersPage;