import { useState, useEffect } from "react";
import { registerUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [region, setRegion] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showHelpWLName, setShowHelpWLName] = useState(false);
  const [WLname, setWLName] = useState("");

  const regionOptions = [
    { value: "", label: "-- Select a region --" },
    { value: "EU", label: "EU" },
    { value: "US", label: "US" },
    { value: "TW", label: "TW" },
  ];

  useEffect(() => {
    const loadRecaptcha = () => {
      // Cargar el script si no está presente
      if (!document.querySelector("#recaptcha-script")) {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          console.log("reCAPTCHA script loaded");
          // Renderizar el CAPTCHA explícitamente después de cargar
          if (window.grecaptcha && window.grecaptcha.render) {
            window.grecaptcha.render("recaptcha-widget", {
              sitekey: "6Ld7LOQqAAAAALyLVudIvQ4_bB2I8I1gYtrS1r8i",
            });
          }
        };
        script.onerror = () => {
          setError("Failed to load reCAPTCHA");
        };
      } else if (window.grecaptcha && window.grecaptcha.render) {
        // Si el script ya está cargado, renderizar el CAPTCHA
        window.grecaptcha.render("recaptcha-widget", {
          sitekey: "6Ld7LOQqAAAAALyLVudIvQ4_bB2I8I1gYtrS1r8i",
        });
      }
    };

    loadRecaptcha();

    // Limpieza al desmontar
    return () => {
      // Solo limpiar si hay un widget renderizado
      const widget = document.querySelector(".g-recaptcha");
      if (widget && window.grecaptcha) {
        try {
          window.grecaptcha.reset(); // Resetear solo si existe el widget
        } catch (err) {
          console.log("Error resetting reCAPTCHA:", err);
        }
      }
      // No eliminamos el script para que esté disponible al volver
    };
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (pass1 !== pass2) {
      setError("Passwords do not match");
      return;
    }

    const recaptchaToken = window.grecaptcha?.getResponse();
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    try {
      await registerUserService({
        name,
        email,
        password: pass1,
        region,
        WLname,
        recaptchaToken,
      });
      setSuccess(true);
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <section className="form-section">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleForm} className="form-container">
        <fieldset className="form-fieldset">
          <label htmlFor="name" className="form-label">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="email" className="form-label">Email:</label>
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
          <label htmlFor="pass1" className="form-label">Password:</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
            className="form-input"
          />
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="pass2" className="form-label">Repeat password:</label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
            className="form-input"
          />
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="region" className="form-label">
            Region: the region of your Battle.net Account for synchronizing your characters
          </label>
          <div className="region-container">
            <select
              id="region"
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              className="form-select"
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="help-button"
              onClick={() => setShowHelp(!showHelp)}
            >
              ?
            </button>
          </div>
          {showHelp && (
            <div className="help-text">
              <p>Select the region that corresponds to your Battle.net account:</p>
              <ul className="help-list">
                <li><strong>EU:</strong> Europe (servers in Europe AND Russia)</li>
                <li><strong>US:</strong> Americas (servers in the United States, Canada, México, South America and Australia)</li>
                <li><strong>TW:</strong> Taiwan (servers in Asia (China, Japan, South-Korea, Taiwan))</li>
              </ul>
              <p>This helps us sync your characters correctly with Blizzard's servers.</p>
            </div>
          )}
        </fieldset>
        <fieldset className="form-fieldset">
          <div className="input-with-help">
            <label htmlFor="wlusername" className="form-label">Warcraft Logs Username:</label>
            <input
              type="text"
              id="wlusername"
              name="wlusername"
              required
              onChange={(e) => setWLName(e.target.value)}
              className="form-input"
            />
            <button
              type="button"
              className="help-button"
              onClick={() => setShowHelpWLName(!showHelpWLName)}
            >
              ?
            </button>
          </div>
          {showHelpWLName && (
            <div className="help-text">
              <p>
                Introduce your username on Warcraft Logs. This will be used later to verify that the logs you
                upload are yours and prevent others from copying your results with a character of the same name.
              </p>
            </div>
          )}
        </fieldset>
        <div className="recaptcha-container">
          <div
            id="recaptcha-widget"
            className="g-recaptcha"
            data-sitekey="6Ld7LOQqAAAAALyLVudIvQ4_bB2I8I1gYtrS1r8i"
          ></div>
        </div>
        <button className="submit-button">Register</button>
        {error && <p className="error-message">{error}</p>}
        {success && (
          <p className="success-message">
            Register initiated, check your E-mail Inbox to activate your Account. Click here to go to{" "}
            <Link to="/login" className="login-link">Login Page</Link>
          </p>
        )}
      </form>
    </section>
  );
};