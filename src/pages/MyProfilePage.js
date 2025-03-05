import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { CharacterList } from "../components/CharacterList";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import swal from "sweetalert";
import { deleteAccountService, editUserDataService } from "../services";
import { getAllCharactersService } from "../services";


export const ProfilePage = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
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
  const [characters, setCharacters] = useState(user?.characters || []);

  const redirectBack = async () => {
    const url = "https://localhost:3000/123";
    window.open(url, "_blank");
  };

  const EditEntry = async (e) => {
    e.preventDefault();
    let idUser = user?.user?.id;

    try {
      setSending(true);
      const data = new FormData();
      data.append("name", userName);
      data.append("email", userEmail);

      // Si hay una nueva imagen, agregar la imagen y la referencia a la anterior
      if (imageInputRef.current.files[0]) {
        data.append("image", imageInputRef.current.files[0]);
        // Enviar la referencia a la imagen anterior para que el backend la elimine
        if (user?.user?.avatar) {
          data.append("oldAvatar", user.user.avatar); // Enviar el nombre/ruta del avatar anterior
        }
      }

      data.append("bio", biography);
      data.append("region", region);
      data.append("wl_username", wlUsername);

      const updatedUserData = await editUserDataService({ idUser, data, token });

      setUser({
        ...user,
        user: {
          ...user.user,
          name: userName,
          email: userEmail,
          bio: biography,
          region: region,
          wl_username: wlUsername,
          avatar: updatedUserData.avatar || user.user.avatar,
        },
      });

      if (updatedUserData.characters) {
        setCharacters(updatedUserData.characters);
      }

      setError("");
      setVisible(false);
      swal("Success", "Your profile has been updated!", "success");
    } catch (error) {
      swal("Error", `${error.message}`, "error");
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteCharacter = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.id !== id)
    );
  };

  const deleteACC = async () => {
    const confirmation = await swal({
      title: "Are you sure?",
      text: "This action will permanently delete your account and all associated data. This cannot be undone!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Yes, delete my account",
          value: true,
          className: "swal-delete-button",
        },
      },
      dangerMode: true,
    });

    if (confirmation) {
      try {
        let idUser = user?.user?.id;
        await deleteAccountService(idUser, token);
        swal("Success", "Your account has been deleted!", "success");
        logout();
        navigate("/");
      } catch (error) {
        swal("Error", `Failed to delete account: ${error.message}`, "error");
        setError(error.message);
      }
    } else {
      swal("Cancelled", "Your account is safe!", "info");
    }
  };

  const openEditModal = () => {
    setVisible(true);
    setUserName(user?.user?.name || "");
    setUserEmail(user?.user?.email || "");
    setBiography(user?.user?.bio || "");
    setRegion(user?.user?.region || "");
    setWlUsername(user?.user?.wl_username || "");
    setPreviewPhoto("");
  };

  return (
    <section>
      {user ? (
        <>
          <h2>My profile page!</h2>
          <div className="profile-page-data">
            <button className="submit-button profile-button" onClick={deleteACC}>
              DELETE ACCOUNT
            </button>

            <div>
              <button className="submit-button profile-button" onClick={openEditModal}>
                EDIT
              </button>
            </div>

            <p>Avatar: {user?.user?.avatar}</p>
            {user?.user?.avatar ? (
              <img className="profile-img"
                src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
                alt={user?.user?.name}
              />
            ) : null}

            <p>Name: {user?.user?.name}</p>
            <p>Email: {user?.user?.email}</p>
            <p>
              Password: Hidden{" "}
              <Link to={"/forpass"} className="forgot-link">
                Do you wish to change it?
              </Link>
            </p>
            <p>Role: {user?.user?.role}</p>
            <p>Biography: {user?.user?.bio}</p>
            <p>Region: {user?.user?.region}</p>
            <p>BattleTag: {user?.user?.battle_tag}</p>
            <p>Warcraft Logs Username: {user?.user?.wl_username}</p>

            <button
              className="submit-button profile-button"
              onClick={() => redirectBack()}
            >
              Sync Characters
            </button>
            <h3>My Characters!</h3>

            <CharacterList
              characters={characters}
              onDeleteCharacter={handleDeleteCharacter}
            />

            {visible && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h1 className="edith1">EDIT USER DATA</h1>
                  <form onSubmit={EditEntry} className="editform">
                    <fieldset>
                      <label htmlFor="username">Username: </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="email">Email: </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={userEmail}
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
                        user?.user?.avatar && (
                          <img
                            src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
                            alt={user?.user?.name}
                          />
                        )
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="biography">Biography: </label>
                      <input
                        type="text"
                        id="biography"
                        name="biography"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="region">Region: </label>
                      <input
                        type="text"
                        id="region"
                        name="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      />
                    </fieldset>
                    <fieldset>
                      <label htmlFor="wlusername">Warcraft Log Username: </label>
                      <input
                        type="text"
                        id="wlusername"
                        name="wlusername"
                        value={wlUsername}
                        onChange={(e) => setWlUsername(e.target.value)}
                      />
                    </fieldset>
                    <div className="modal-buttons">
                      <button type="submit" disabled={sending}>
                        Send Entry
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisible(false)}
                        disabled={sending}
                      >
                        Cancel
                      </button>
                    </div>
                    {sending && <p>Sending New data for User</p>}
                    {error && <p>{error}</p>}
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>user not logged</p>
      )}
    </section>
  );
};