import { Link } from "react-router-dom";

export const DataPolicyPage = () => {
  return (
    <section className="policy-section">
      <h1 className="policy-title">Data Usage Policy</h1>
      <div className="policy-content">
        <p><strong>Last updated: March 24, 2025</strong></p>
        <p>
          At Speedrun Dungeons (<a href="https://www.speedrundungeons.com" target="_blank" rel="noopener noreferrer">https://www.speedrundungeons.com</a>),
          we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your data. This Data Usage Policy explains 
          our practices regarding the personal and technical information you provide while using our website and services. By accessing or using our site, you agree 
          to the terms outlined in this policy. If you do not agree, please refrain from using our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Data:</strong> Information you voluntarily provide, such as your username, email address, Warcraft Logs username, and any other details 
            entered during registration or account management.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Technical Data:</strong> Information automatically collected when you interact with our site, including your IP address, browser type, operating 
            system, device information, and cookies or similar tracking technologies.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Game-Related Data:</strong> Information linked to your Battle.net account region and Warcraft Logs data for synchronization and verification 
            purposes, as provided by you during registration or gameplay integration.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your data for the following purposes:</p>
        <ul>
          <li>To provide and maintain our services, including account creation, character synchronization, and leaderboard functionality.</li>
          <li>To personalize your experience, such as tailoring content or recommendations based on your preferences and gameplay data.</li>
          <li>To communicate with you, including sending account activation emails, updates, or promotional messages (if you opt in).</li>
          <li>To improve our website through analytics and technical optimization.</li>
          <li>To comply with legal obligations or respond to lawful requests from authorities.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal data to third parties. However, we may share your information in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> With trusted third-party providers (e.g., hosting services, email providers) who assist in operating our site, 
            provided they agree to keep your data confidential.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law, regulation, or legal process, or to protect the rights, property, or safety of Speedrun 
            Dungeons, our users, or the public.
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect your data from unauthorized access, loss, or alteration. However, no online 
          transmission or storage method is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
          <li><strong>Correction:</strong> Request updates or corrections to inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> Request the removal of your data, subject to legal retention requirements.</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from optional communications (e.g., newsletters) at any time.</li>
        </ul>
        <p>
          To exercise these rights, contact us at the contact form. will respond within a reasonable timeframe, 
          typically within 30 days.
        </p>

        <h2>6. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience, analyze site usage, and store preferences. You can manage cookie settings through 
          your browser, though disabling them may affect site functionality.
        </p>

        <h2>7. Third-Party Links</h2>
        <p>
          Our site may contain links to external websites (e.g., Battle.net, Warcraft Logs). We are not responsible for the privacy practices or content of these 
          third-party sites. We encourage you to review their policies before providing any personal information.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Data Usage Policy from time to time. Significant changes will be communicated via a notice on our site or by email (if applicable). 
          Your continued use of the site after such updates constitutes acceptance of the revised policy.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this policy or your data, please contact us using the contact form.
        </p>
       

        <p>
          Thank you for trusting Speedrun Dungeons with your data. We’re here to ensure your experience is both enjoyable and secure!
        </p>
      </div>
      <Link to="/" className="back-link">Back to Home</Link>
    </section>
  );
};