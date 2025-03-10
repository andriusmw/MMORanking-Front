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
            {/* ----------------------MAKE VISIBLE EDIT PROFILE MODAL ---------------------------*/}
            {visible && (
  <div className="modal-overlay">
    <div className="modal-content-profile">
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
            onChange={(e) => {
              const file = e.target.files[0]; // Obtener el archivo seleccionado
              const maxSize = 2 * 1024 * 1024; // 2MB en bytes

              if (file && file.size > maxSize) {
                alert("El archivo es demasiado grande. El tamaño máximo permitido es 2MB.");
                e.target.value = ""; // Limpiar el input
                return;
              }

              // Si el tamaño es válido, actualizar la vista previa
              if (file) {
                setPreviewPhoto(URL.createObjectURL(file));
              }
            }}
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
            Save
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
          <div className="profile-page-instructions">
            <h2>INSTRUCTIONS:</h2>

            <p>Welcome, this is your profile page, here you can 
              edit your profile data and add characters to your account.
            </p>


            <h2>HOW TO SYNC CHARACTERS:</h2>

          <p>When you registered your account you introduced you BattleTag and
            the REGION, both fields must be completed. Now just click on
            "Sync Characters" button. The first time you do it you will be
            re-directed to Blizzard's Login page, you must introduce your password
            and email and if everything is ok, magic! all your characters
            will be loaded and linked to your profile on the database.</p>

         <p> NOW you need to logout and login once more on this page so
            the browser gets your data from the server and you can see 
            a list of your characters. </p>

          <p><b>NOTE:</b> If you have an error trying to sync your characters, logout, 
          log in and try again and if you cotinue having issues send an
          e-mail using the contact form with all possible information.</p>

            <h2>ABOUT DELETING CHARACTERS:</h2>

            <p>This is a list of your characters linked to your account,
            If you delete one of them FROM THE LIST, YOU WILL
            STILL HAVE YOUR CHARACTER IN THE GAME. for security reasons
            here all your characters should have unique names to avoid confusions.</p>

            <p>You can Delete a character FROM YOUR LIST by clicking on
            the "Delete" button at the end of its row.</p>


            <h2>NOTES</h2>

<p>Due to security reasons you can not change your BattleTag or
Warcraft Logs Username because those are used to authenticate you
and to link you to your characters allowing integrity and honor
during the competition. </p>

<p>However you can change your region if you want to add characters from
other servers that you created in your acount.</p>

<p>If you introduced a wrong WarcraftLogUsername during
your register and wish to change it, you can delete your account 
and create a new account.</p>


<p> BattleTag name is linked to your account in order 
to load your characters and use the website, This means if you are banned from this website, you will need
to create a new blizzard account and buy the game again if you want
to play so be careful.</p>

<p>ENJOY!!!</p>


          </div>
        </>
      ) : (
        <p>user not logged</p>
      )}
    </section>
  );
};