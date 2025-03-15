import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";
import { createRecordService } from "../services";


export const NewRecordPage = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [logURL, setLogURL] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [isModal2Open, setIsModal2Open] = useState(false); // Estado para el modal

  const CreateRecord = async (e) => {
    e.preventDefault();
    setError("");
    let idUser = user?.user?.id;

    const characterData = selectedCharacter ? JSON.parse(selectedCharacter) : null;

    try {
      setSending(true);
      setIsLoading(true);
      const data = new FormData();
      data.append("user_id", idUser);
      data.append("character_id", characterData?.id || "");
      data.append("character_name", characterData?.name || "");
      data.append("character_class", characterData?.classFront || "");
      data.append("character_server", characterData?.server || "");
      data.append("log_link", logURL);

      console.log({
        user_id: idUser,
        character_id: characterData?.id,
        character_name: characterData?.name,
      });

      const CreateRecordS = await createRecordService({ data, token });

      // LIMPIA EL ESTADO
      setError("");
      setLogURL("");
      setSelectedCharacter("");
    } catch (error) {
      swal(`Error`, `${error.message}`, `error`);
      setError(error.message);
    } finally {
      setSending(false);
      setIsLoading(false);
    }
  };

  // Funciones para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Funciones para abrir y cerrar el modal
  const openModal2 = () => setIsModal2Open(true);
  const closeModal2 = () => setIsModal2Open(false);


  return (
    <section className="form-section">
      {user?.user ? (
        <>
        <div>
          <h2 className="new-rec-title">Upload a New Record!</h2>
              {/*button for explanation */}
                <button
                  type="button"
                  className="info-button new-rec-but"
                  onClick={openModal2}
                  aria-label="More information about Warcraft Logs URL"
                  >
                  ?
                </button>
          </div>

          <form onSubmit={CreateRecord} className="form-container">
            <fieldset className="form-fieldset">
              <label htmlFor="character" className="form-label">
                Select Character:
              </label>
              <select
                id="character"
                name="character"
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                disabled={isLoading}
                className="form-select"
              >
                <option value="">-- Select a character --</option>
                {user?.characters?.map((character) => (
                  <option
                    key={character.id}
                    value={JSON.stringify({
                      id: character.id,
                      name: character.name,
                      classFront: character.class1,
                      server: character.server,
                    })}
                  >
                    {character.name} {character.class1} {character.server}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="form-fieldset">
              <div className="label-with-info">
                <label htmlFor="logURL" className="form-label">
                  Warcraft Logs URL:
                </label>
                <button
                  type="button"
                  className="info-button"
                  onClick={openModal}
                  aria-label="More information about Warcraft Logs URL"
                >
                  ?
                </button>
              </div>
              <input
                type="text"
                id="logURL"
                name="logURL"
                value={logURL}
                onChange={(e) => setLogURL(e.target.value)}
                disabled={isLoading}
                className="form-input"
              />
            </fieldset>
            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? "Sending..." : "Send Record!"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>

          {isModalOpen && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content WLINFO" onClick={(e) => e.stopPropagation()}>
      <h3>Warcraft Logs URL Information</h3>
      <p>
        Enter the URL of your Warcraft Logs report here. Make sure the URL is public or accessible with your account to process the record correctly.
      </p>

      {/* Paso 1 */}
      <h4>STEP 1: TRANSLATE YOUR LOG TO ENGLISH</h4>
      <ul>
        <li><p className="p-record-instructions">
          (In case your log is in a different language) Its only 2 clicks.
          </p>
        </li>
        <li><p>
          -1.1 Open your log, no matter the place inside the log you are in, just go to the right corner and select "language" then "English".
          </p>
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/English.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
        <li>
        <p className="p-record-instructions">
          -1.2 When you are going to copy the "correct" URL on "STEP 2A/B" make sure to click on "translate" if the log doesn't appear on English.
          </p>
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/English-2.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
      </ul>

      {/* Paso 2A */}
      <h4>STEP 2A: If you are going to upload a log from a Dungeon in Mythic+2,3,4...up to +10</h4>
      <p className="p-record-instructions">
        If you are going to upload a log from a Dungeon in Normal, Heroic or Mythic +0 mode, go down to "STEP 2B", if you are going to upload a log from Dungeon in Mythic+2,3,4...up to +10 stay here.
      </p>
      <ul>
        <li>
          <p className="p-record-instructions">
          -2A.1 - Upload your log to Warcraft log's website as usual and then go to view yor log, select the Dungeon you want to upload the data here.
         </p>
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/upload-log-1.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
        <li>
        <p className="p-record-instructions">
          -2A.2 - Once the details view of the selected dungeon is loaded, copy the URL as shown on the image. Remember to translate to english first if you need it as shown on STEP 1.
         </p>
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/upload-log-2.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
      </ul>

      {/* Paso 2B */}
      <h4>STEP 2B: This is to upload a log on Normal, Heroic or Mythic+0 mode</h4>
      <p className="p-record-instructions">
        This is to upload a log on Normal, Heroic or Mythic+0 mode, intended to 1 Player or 2 Players for example. (Everyone can play this mode)
      </p>
      <ul>
        <li> 
        <p className="p-record-instructions">
          -2B.1- When you try to do a Dungeon in Normal, Heroic or Mythic+0 mode, the time counts each time, you hit an enemy, so we recomend login in front of the door, use consumeables and once you are ready go inside, clear the dungeon, use a stone to change your zone and end the record. Then you upload it before hitting anyone or anything. Otherwise the data may be corrupted and the log useless.
        </p>
          <br />
          So once you clear the dungeon, you upload the log and should see something like this:
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/normal-1.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
        <li>
        <p className="p-record-instructions">
          -2B.2 - Then you click on "Encounters and trash", remember to translate the log if it isn't in English, and copy the URL.
         </p>
          <br />
          <img
            src={`${process.env.REACT_APP_BACKEND}/images/normal-2.png`}
            alt="Selecting English"
            className="modal-image"
          />
        </li>
      </ul>

      <button className="modal-close-button" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
)}




    {/* Modal 2 for explanation */}      
{isModal2Open && (
  <div className="modal-overlay" onClick={closeModal2}>
    <div className="modal-content WLINFO" onClick={(e) => e.stopPropagation()}>
      <h3>Avaliability of Dungeons</h3>
      <p>
       Difficulties Normal, Heroic and Mythic 0 are only avalible for the following dungeons: 
       <b>Cinderbrew Meadery, Darkflame Cleft,The Rookery and Priory of the Sacred Flame. </b>

       On these Difficulties, you MUST defeat all minions and bosses in order for the log to be valid
       for the system.  <br />  

       These difficulties are thought to be played as a single player (1P) or 2 players.  <br /> <br />
       <b>NOTE: </b>have in mind you can also go to Mythic+1 or +2 as a single player when you are strong enought
        on every Dungeon avalible on the current season moreover of those 4.
        <br /> <br />

      


       If you are in a group of 3, 4 or 5 players you will find a more challenging activity trying
       to play in Mythic+2 to Mythic+4 in less time possible.<b>Keep in mind from Mythic +1  to +10 the key 
       must have been completed inside time to be a valid record. </b>  Also there is a limit at level Mythic +10,
       <b>the idea is </b>for players to try to make Dungeons as fast as possible, being Mythic+10 the level with 
       maximum rewards and difficulties in game, we decided to put that as the top level, after that instead
       of playing another 45+ minutes in a +11 try to do that +10 in less possible time for the ladder.
       <br /> <br />
       With this in mind we hope the more equipment and experience you get you will be able to do +10 runs
       in less possible time or maybe players decide to compete with each others in a lower difficulty so they
       finish even faster for example if you are able to do a +10 in 30 minutes, probably you will do a +9
       in 25 minutes so the run will be shorter and you still prove your worth it on it.    
       
       </p>

     

        </div>
        </div>
      )   
    }



















          {isLoading && (
            <div className="spinner-overlay">
              <div className="spinner"></div>
            </div>
          )}
        </>
      ) : (
        <p className="error-message">User not logged in</p>
      )}
    </section>
  );
};