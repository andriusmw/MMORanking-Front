import React from "react";


const SocialShareButtons = ({ title, url }) => {
  // Función para compartir en Twitter
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  // Función para compartir en Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  // Función para compartir en WhatsApp
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title} - ${url}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Función para copiar el enlace al portapapeles
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link Copied!");
    });
  };

  return (
    <div className="social-share-buttons">
      <button className="share-button twitter" onClick={shareOnTwitter}>
        X post
      </button>
      <button className="share-button facebook" onClick={shareOnFacebook}>
        Facebook
      </button>
      <button className="share-button whatsapp" onClick={shareOnWhatsApp}>
        WhatsApp
      </button>
      <button className="share-button copy" onClick={copyToClipboard}>
        Copy Link
      </button>
    </div>
  );
};

export default SocialShareButtons;