import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { CharacterList } from "../components/CharacterList";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import swal from "sweetalert";
import { editUserDataService } from "../services";
import { getAllCharactersService } from "../services";

export const ProfilePage = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let imageInputRef = useRef();
  const [biography, setBiography] = useState("");
  const [region, setRegion] = useState("");
  const [wlUsername, setWlUsername] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");

  // Estado para los personajes
  const [characters, setCharacters] = useState(user?.characters || []);

  const redirectBack = async () => {
    const url = "https://localhost:3000/123";
    window.open(url, "_blank");
  };

  const EditEntry = async (e) => {
    let idUser = user?.user?.id;
    try {
      setSending(true);
      const data = new FormData();
      data.append("name", userName);
      data.append("email", userEmail);
      if (imageInputRef.current.files[0]) {
        data.append("image", imageInputRef.current.files[0]);
      }
      data.append("bio", biography);
      data.append("region", region);
      data.append("wl_username", wlUsername);
      const entry = await editUserDataService({ idUser, data, token });
      setError("");
      navigate(0);
    } catch (error) {
      swal(`Error`, `${error.message}`, `error`);
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  // Función para eliminar un personaje del estado
  const handleDeleteCharacter = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== id)
    );
  };

  return (
    <section>
      {user ? (
        <>
          <div>
            <h2>My profile page!</h2>
            <div>
              <button
                onClick={() => {
                  setVisible(true);
                  setUserName(user?.user?.name);
                  setUserEmail(user?.user?.email);
                  setBiography(user?.user?.bio);
                  setRegion(user?.user?.region);
                  setWlUsername(user?.user?.wl_username);
                }}
              >
                EDIT
              </button>
            </div>
            <button onClick={() => redirectBack()}>Sync Characters</button>
          </div>

          <p>Avatar: {user?.user?.avatar}</p>
          {user?.user?.avatar ? (
            <img
              src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
              alt={user?.user?.name}
            />
          ) : null}

          <p>Name: {user?.user?.name}</p>
          <p>Email: {user?.user?.email}</p>
          <p>
            Password: Hidden{" "}
            <Link to={"/changepass"}>Do you wish to change it?</Link>
          </p>
          <p>Role: {user?.user?.role}</p>
          <p>Biography: {user?.user?.bio}</p>
          <p>Region: {user?.user?.region}</p>
          <p>BattleTag: {user?.user?.battle_tag}</p>
          <p>Warcraft Logs Username: {user?.user?.wl_username}</p>

          <h3>My Characters!</h3>
          <CharacterList
            characters={characters}
            onDeleteCharacter={handleDeleteCharacter}
          />

          {visible ? (
            <form onSubmit={EditEntry} className="editform">
              <h1 className="edith1">EDIT USER DATA</h1>
              <fieldset>
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="image">Avatar (optional): </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  ref={imageInputRef}
                  onChange={() =>
                    setPreviewPhoto(
                      URL.createObjectURL(imageInputRef.current.files[0])
                    )
                  }
                />
                {previewPhoto ? (
                  <img src={previewPhoto} alt={user?.user?.name} />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
                    alt={user?.user?.name}
                  />
                )}
              </fieldset>
              <fieldset>
                <label htmlFor="biography">Biography: </label>
                <input
                  type="text"
                  id="biography"
                  name="biography"
                  defaultValue={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="region">Region: </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  defaultValue={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="wlusername">Warcraft Log Username: </label>
                <input
                  type="text"
                  id="wlusername"
                  name="wlusername"
                  defaultValue={wlUsername}
                  onChange={(e) => setWlUsername(e.target.value)}
                />
              </fieldset>
              <button>Send Entry</button>
              {sending ? <p>Sending New data for User</p> : null}
              {error ? <p>{error}</p> : null}
            </form>
          ) : null}
        </>
      ) : (
        <p>user not logged</p>
      )}
    </section>
  );
};