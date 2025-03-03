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

  return (
    <section className="form-section">
      {user?.user ? (
        <>
       <h2> Upload a New Record!</h2>
         {/* <h1 className="form-title">Upload a New Record!</h1> */}
          <form onSubmit={CreateRecord} className="form-container">
            <fieldset className="form-fieldset">
              <label htmlFor="character" className="form-label">Select Character:</label>
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
              <label htmlFor="logURL" className="form-label">Warcraft Logs URL:</label>
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
           {/* {sending && <p className="sending-message">Sending New data for post</p>}*/} 
            {error && <p className="error-message">{error}</p>}
          </form>
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