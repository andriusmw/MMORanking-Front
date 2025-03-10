
export const Footer = () => {
    return (
      <footer className="footer">
        © 2025 Speed Run Dungeons -{' '}
        <a
          href="https://andrewdeveloper.net"
          target="_blank"
          rel="noopener noreferrer" // Recomendado para seguridad con target="_blank"
          style={{ color: 'white' }} // Objeto de estilo en React
        >
          Made By Andrew
        </a>
      </footer>
    );
  };