import { ErrorMessage } from "../components/ErrorMessage";
import { LadderRecordList } from "../components/LadderRecordsList";

export const LaddersPage = () => {
  return (
    <section>
      <h2>Check the Ladder of a Dungeon:</h2>
      <LadderRecordList />
    </section>
  );
};

export default LaddersPage;