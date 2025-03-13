import { useState, useContext } from "react"; // Añadí useContext al import
import { getUserBRIDService } from "../services";
import { banUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const AdminPanelPage = () => {
  const [error, setError] = useState("");
  const [recordId, setRecordId] = useState("");
  const [IdUser, setUserId] = useState("");
  const { token, user, setUser, logout } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const userData = await getUserBRIDService(recordId);
      console.log(userData);
    } catch (error) {
      setError(error.message || "An unexpected error occurred while searching");
    }
  };

  const handleBan = async () => {
    try {
      const bannedUser = await banUserService(IdUser, token);
      console.log(bannedUser);
    } catch (error) {
      setError(error.message || "An unexpected error occurred while banning");
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
          </fieldset>

          {error && <p className="error-message">{error}</p>}
        </section>
      ) : (
        <p>You need to be an admin to be here</p>
      )}
    </>
  );
};