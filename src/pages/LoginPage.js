import { useContext, useState } from "react";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUserService({ email, password });
      await login(data.token); // Esperar a que login verifique el baneo
      navigate("/");
    } catch (error) {
      setError(error.message === "Cannot login: User is banned" 
        ? "Your account is banned. Contact support for more information." 
        : error.message || "Login failed");
    }
  };

  return (
    <section className="form-section">
      <h2>Login</h2>
      <form onSubmit={handleForm} className="form-container login-container">
        <fieldset className="form-fieldset">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </fieldset>
        <button className="submit-button">LogIn</button>
        <p className="forgot-password">
          <Link to={"/forpass"} className="forgot-link">Did you forget your password?</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};