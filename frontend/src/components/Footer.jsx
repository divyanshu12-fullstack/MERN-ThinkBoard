const Footer = () => {
  return (
    <footer className="fixed bottom-4 right-4 z-50">
      <a
        href="https://github.com/divyanshu12-fullstack"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-40 hover:opacity-100 transition-opacity duration-200"
        aria-label="Visit my GitHub repository"
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          className="w-6 h-6"
        />
      </a>
    </footer>
  );
};

export default Footer;
