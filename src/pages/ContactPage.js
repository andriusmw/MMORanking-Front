import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }
    setFormSubmitted(false);
    setError("");

    const form = e.target;
    const formData = new FormData(form);
    formData.append("g-recaptcha-response", recaptchaToken);

    try {
      const response = await fetch("https://formspree.io/f/xkgnrvjj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to send message");
      setFormSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="form-section">
      <h2>Contact <span>Me!</span></h2>
      <form onSubmit={handleSubmit} className="form-container">
        <fieldset className="form-fieldset">
          <label htmlFor="email" className="form-label">Your email:</label>
          <input type="email" id="email" name="email" required className="form-input" />
        </fieldset>
        <fieldset className="form-fieldset">
          <label htmlFor="message" className="form-label">Your message:</label>
          <textarea id="message" name="message" rows="5" className="form-textarea"></textarea>
        </fieldset>
        <ReCAPTCHA
          sitekey="6Ld7LOQqAAAAALyLVudIvQ4_bB2I8I1gYtrS1r8i" // Reemplaza con tu clave de reCAPTCHA
          onChange={(token) => setRecaptchaToken(token)}
        />
        <button type="submit" className="submit-button">Send</button>
        {formSubmitted && <p className="success-message">Message sent successfully!</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};