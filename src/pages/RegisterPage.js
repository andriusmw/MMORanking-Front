import { useState } from "react";
import { registerUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [wlNameError, setWlNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const regionOptions = [
    { value: "", label: "-- Select a region --" },
    { value: "EU", label: "EU" },
    { value: "US", label: "US" },
    { value: "TW", label: "TW" },
  ];

  // Validación para el nombre de usuario de Warcraft Logs
  const validateWLName = (username) => {
    if (!username) {
      return "Warcraft Logs Username is required";
    }

    const hasWesternChars = /[a-zA-Z]/.test(username);
    if (hasWesternChars) {
      const firstChar = username[0];
      const restOfChars = username.slice(1);
      const isFirstCharUpper = /[A-Z]/.test(firstChar);
      const hasUppercaseInRest = /[A-Z]/.test(restOfChars);

      if (!isFirstCharUpper) {
        return "The first letter must be uppercase (e.g., Krusty1)";
      }
      if (hasUppercaseInRest) {
        return "All letters after the first must be lowercase (e.g., Krusty1)";
      }
    }
    return "";
  };

  // Función para validar la contraseña, ahora incluye "-" y "_" como símbolos
  const validatePassword = (password) => {
    const minLength = password.length > 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_-]/.test(password); // Añadidos "-" y "_"

    if (!minLength) {
      return "Password must be longer than 6 characters";
    }
    if (!hasUppercase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowercase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumber) {
      return "Password must contain at least one number";
    }
    if (!hasSymbol) {
      return "Password must contain at least one symbol (e.g., !, @, #, -, _, etc.)";
    }
    return "";
  };

  const handleWLNameChange = (e) => {
    const value = e.target.value;
    setWLName(value);
    const validationError = validateWLName(value);
    setWlNameError(validationError);
  };

  const handlePass1Change = (e) => {
    const value = e.target.value;
    setPass1(value);
    const validationError = validatePassword(value);
    setPasswordError(validationError);
  };

  const handlePass2Change = (e) => {
    const value = e.target.value;
    setPass2(value);
    if (!passwordError) {
      if (value !== pass1) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const wlNameValidationError = validateWLName(WLname);
    if (wlNameValidationError) {
      setWlNameError(wlNameValidationError);
      return;
    }

    const passwordValidationError = validatePassword(pass1);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (pass1 !== pass2) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    if (!isPolicyAccepted) {
      setError("You must accept the Data Usage Policy to proceed");
      return;
    }

    try {
      await registerUserService({
        name,
        email,
        password: pass1,
        region,
        WLname,
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
            value={pass1}
            onChange={handlePass1Change}
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
            value={pass2}
            onChange={handlePass2Change}
            className="form-input"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
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
            <label htmlFor="wlusername" className="form-label">Warcraft Logs Username: (you CAN change it later but must write something)</label>
            <input
              type="text"
              id="wlusername"
              name="wlusername"
              required
              value={WLname}
              onChange={handleWLNameChange}
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
          {wlNameError && <p className="error-message">{wlNameError}</p>}
          {showHelpWLName && (
            <div className="help-text">
              <p>
                Introduce your username on Warcraft Logs. This will be used later to verify that the logs you
                upload are yours and prevent others from copying your results with a character of the same name.
                <b>Keep in mind, the name should be written here with the first letter capitalized and the others 
                in lowercase, example: Krusty1 </b>
              </p>
              <img src="/images/personal-logs2.png" alt="merch-img" />
              For other languages it should be written as shown in your "Personal logs tab" (as in photo)
             <img src="/images/personal-logs1.png" alt="merch-img" />
             
            </div>
          )}
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="policy" className="form-label">
            <input
              type="checkbox"
              id="policy"
              name="policy"
              checked={isPolicyAccepted}
              onChange={(e) => setIsPolicyAccepted(e.target.checked)}
              className="form-checkbox"
            />
            I accept the <a href="/data-policy" target="_blank">Data Usage Policy</a>:
          </label>
          <p className="policy-text">
            At Speedrun Dungeons (https://www.speedrundungeons.com), we are committed to protecting your privacy. 
            By using our site, you agree that we may collect personal data you provide (e.g., name, email) and technical 
            data (e.g., IP address, cookies) to enhance your experience. We use this data to provide services, personalize 
            content, and comply with legal obligations. Your data will not be sold or shared with third parties except 
            as required for site operation or legal compliance. You can request access, correction, or deletion of your 
            data by contacting us. Full details are in our <a href="/data-policy" target="_blank">Privacy Policy</a>.
          </p>
        </fieldset>
        <ReCAPTCHA
          sitekey="6Ld7LOQqAAAAALyLVudIvQ4_bB2I8I1gYtrS1r8i"
          onChange={(token) => setRecaptchaToken(token)}
        />
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