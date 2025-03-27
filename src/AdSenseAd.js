import { useEffect, useState } from 'react';

const AdSenseAd = () => {
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error cargando AdSense:', e);
      setAdError(true);
    }
  }, []);

  if (adError) {
    return null; // O puedes mostrar un mensaje como: <div>Anuncios no disponibles</div>
  }

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7991732431010472"
        data-ad-slot="6633367707"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;