import { useState, useContext } from "react"; // Añadí useContext al import
import { deleteAAPService, getUserBRIDService } from "../services";
import { banUserService } from "../services";
import { UnbanUserService } from "../services";
import { getABUService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const AdminPanelPage = () => {
  const [error, setError] = useState("");
  const [recordId, setRecordId] = useState("");
  const [IdUser, setUserId] = useState("");
  const [IdUserU, setUserIdU] = useState(""); // for the unban input
  const { token, user, setUser, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [bannedUser, setBannedUser] = useState(null);
  const [unBannedUser, setUnBannedUser] = useState(null);
  const [ABUData, setABUData] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

/*------------- SEARCH USER DATA BY RECORD ID -----------*/

  const handleSearch = async () => {
    try {
      const userData = await getUserBRIDService(recordId, token);
      console.log(userData);
      setUserData(userData);
    } catch (error) {
      setError(error.message || "An unexpected error occurred while searching");
    }
  };

/*----------- SEARCH ALL BANNED USERS -----------*/

  const handleSearchABU = async () => {
    try {
      const ABUData = await getABUService( token);
      console.log(ABUData);
      setABUData(ABUData);
    } catch (error) {
      setError(error.message || "An unexpected error occurred while searching");
    }
  };


/*--------------- BAN USER --------------*/

  const handleBan = async () => {
    try {
      const bannedUser = await banUserService(IdUser, token);
      console.log(bannedUser);
      console.log("user banned")
      setBannedUser(bannedUser)
    } catch (error) {
      setError(error.message || "An unexpected error occurred while banning");
    }
  };


/*-------------- UNBAN USER -------------*/

  const handleUBan = async () => {
    try {
      const unBannedUser = await UnbanUserService(IdUserU, token);
      console.log(unBannedUser);
      console.log("user unbanned")
      setUnBannedUser(unBannedUser)
    } catch (error) {
      setError(error.message || "An unexpected error occurred while banning");
    }
  };


/*--------------DELETE USER --------------------*/

  const handleDELETE = async () => {
    try {
      const deletedUser = await deleteAAPService(deleteUser, token);
      console.log(deletedUser);
      console.log("Account deleted")
      setDeleteUser(deletedUser)
    } catch (error) {
      setError(error.message || "An unexpected error occurred while deleting");
    }
  };




  return (
    <>
      {user?.user?.role === "admin" ? (
        <section className="form-section">
          <h2>Admin Panel</h2>

          <fieldset className="form-fieldset">
            <label htmlFor="subrid" className="form-label">
              Search User by Record id:
            </label>
            <input
              type="text"
              id="subrid"
              name="subrid"
              required
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              className="form-input"
            />
            <button onClick={handleSearch}>Search</button>

            {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : null}

          </fieldset>



          <fieldset className="form-fieldset">
            <label htmlFor="subrid" className="form-label">
              Search ALL banned users:
            </label>
           
            <button onClick={handleSearchABU}>Search</button>

            {ABUData ? <pre>{JSON.stringify(ABUData, null, 2)}</pre>: null}



          </fieldset>



          <fieldset className="form-fieldset">
            <label htmlFor="buser" className="form-label">
              Ban user by Userid:
            </label>
            <input
              type="text"
              id="buser"
              name="buser"
              required
              value={IdUser}
              onChange={(e) => setUserId(e.target.value)}
              className="form-input"
            />
            <button onClick={handleBan}>BAN USER</button>

            {bannedUser ? <pre>{JSON.stringify(bannedUser, null, 2)}</pre> : null}

          </fieldset>




          <fieldset className="form-fieldset">
            <label htmlFor="ubuser" className="form-label">
              UNBAN User by Userid:
            </label>
            <input
              type="text"
              id="ubuser"
              name="ubuser"
              required
              value={IdUserU}
              onChange={(e) => setUserIdU(e.target.value)}
              className="form-input"
            />
            <button onClick={handleUBan}>UNBAN USER</button>

            {unBannedUser ? <pre>{JSON.stringify(unBannedUser, null, 2)}</pre> : null}

          </fieldset>


          <fieldset className="form-fieldset">
            <label htmlFor="duser" className="form-label">
             DELETE USER BY USERID (FOR BOTS):
            </label>
            <input
              type="text"
              id="duser"
              name="duser"
              required
              value={deleteUser}
              onChange={(e) => setDeleteUser(e.target.value)}
              className="form-input"
            />
            <button onClick={handleDELETE}>DELETE USER</button>

           

          </fieldset>




        

          {error && <p className="error-message">{error}</p>}
        </section>
      ) : (
        <p>You need to be an admin to be here</p>
      )}
    </>
  );
};