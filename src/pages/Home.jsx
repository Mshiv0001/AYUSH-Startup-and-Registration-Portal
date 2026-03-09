import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const goToSignup = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate("/signup"));
      return;
    }
    navigate("/signup");
  };

  const goToLogin = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate("/login"));
      return;
    }
    navigate("/login");
  };

  const [isHindi, setIsHindi] = useState(() => {
    try {
      return localStorage.getItem("lang") === "hi";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const lang = isHindi ? "hi" : "en";
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Ignore storage failures to prevent UI crash.
    }
  }, [isHindi, i18n]);

  return (
    <div className="home-container">
      <div className="home-shell">
        <header className="header">
          <div className="header-logo-box">
            <img src="/logo1.png" alt="AYUSH Logo" className="brand-logo" />
          </div>

          <h1 className="portal-title header-center-title">
            {isHindi ? (
              <>
                <span>आयुष</span> स्टार्टअप पंजीकरण एवं प्रबंधन पोर्टल
              </>
            ) : (
              <>
                <span>AYUSH</span> Startup Registration &amp; Management Portal
              </>
            )}
          </h1>

          <div className="header-controls">
            <button
              className="lang-switch-btn"
              onClick={() => setIsHindi((prev) => !prev)}
              aria-label="Language toggle"
            >
              <span className={`lang-pill ${isHindi ? "active" : ""}`}>
                <span className="lang-knob">{isHindi ? "हि" : "En"}</span>
              </span>
            </button>
            <button className="btn btn-light header-action-btn" onClick={goToLogin}>
              {t("login")}
            </button>
            <button className="btn btn-green header-action-btn" onClick={goToSignup}>
              {t("signup")}
            </button>
          </div>

          <div className="header-logo-box">
            <img src="/logo3.png" alt="Partner Logo" className="header-logo-right" />
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-split">
            <div className="hero-box hero-box-left">
              <div className="hero-content">
                <h2>{t("heroTitle")}</h2>
                <p className="subtitle1">{t("heroSubtitle1")}</p>
                <p className="subtitle2">
                  <Trans i18nKey="heroSubtitle2" components={{ strong: <strong /> }} />
                </p>

                <div className="hero-buttons">
                  <button className="btn btn-green" onClick={goToSignup}>
                    {t("getStarted")}
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => window.open("https://ayush.gov.in/#!/", "_blank", "noopener,noreferrer")}
                  >
                    {t("learnMore")}
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-box hero-box-right">
              <div className="hero-box-right-fill" />
            </div>
          </div>
        </section>

        <section className="quote-strip">
  <div className="quote-image-wrap">
    <img
      src="/modiji.png"
      alt="Shri Narendra Modi"
      className="quote-image"
    />
  </div>

  <div className="quote-content">
    <div className="quote-mark">"</div>

    <p className="quote-text">
      {t("quoteText")}
    </p>

    <div className="quote-divider" />

    <p className="quote-author">
      {t("quoteAuthor")}
    </p>
  </div>
        </section>

        <section className="about-ministry-section">
          <div className="about-ministry-left">
            <h3 className="about-ministry-title">{t("aboutTitle")}</h3>
            <p className="about-ministry-text">
              <Trans i18nKey="aboutDescription" components={{ strong: <strong /> }} />
            </p>

          </div>

          <aside className="about-ministry-right">
            <div className="minister-photo-wrap">
              <img src="/Prataprao-Jadhav.jpeg" alt={t("ministerName")} className="minister-photo" />
            </div>
            <div className="minister-divider" />
            <h4 className="minister-name">{t("ministerName")}</h4>
            <p className="minister-role">
              <Trans i18nKey="ministerDesignation" components={{ strong: <strong /> }} />
              <br />
              <strong>{t("government")}</strong>
            </p>
          </aside>
        </section>

        <section className="info-section">
          <div className="info-section-title">
            <a href="/our-team" className="info-title-card" aria-label="Our Team">
              <svg className="info-title-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM4 19a4 4 0 0 1 8 0M12 19a4 4 0 0 1 8 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t("infoTabTeam")}</span>
            </a>
            <a href="/our-team?tab=orgchart" className="info-title-card" aria-label="Our Organizations">
              <svg className="info-title-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 4h7v7H4Zm9 0h7v7h-7ZM4 13h7v7H4Zm9 0h7v7h-7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t("infoTabOrganizations")}</span>
            </a>
            <a
              href="/our-team?tab=performance"
              className="info-title-card"
              aria-label="Our Performance"
            >
              <svg className="info-title-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 19h16M6 16v-4M12 16V8M18 16v-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t("infoTabPerformance")}</span>
            </a>
          </div>

          <div className="info-grid" />
        </section>

        <footer className="page-footer">
          <p>{"\u00A9"} 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
          <span className="version-badge">Version 1.0</span>
        </footer>

      </div>
    </div>
  );
}

export default Home;
