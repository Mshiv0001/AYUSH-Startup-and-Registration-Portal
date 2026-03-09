import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const navigateWithTransition = (path) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(path));
      return;
    }
    navigate(path);
  };
  const [isHindi, setIsHindi] = useState(() => {
    try {
      return (localStorage.getItem("lang") || i18n.resolvedLanguage) === "hi";
    } catch {
      return i18n.resolvedLanguage === "hi";
    }
  });
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const lang = isHindi ? "hi" : "en";
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Ignore storage failures to prevent UI crash.
    }
  }, [i18n, isHindi]);

  const captcha = useMemo(() => ({ a: 7, b: 5, result: 12 }), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (Number(captchaAnswer) !== captcha.result) {
      setError(t("loginCaptchaError"));
      return;
    }
  };

  const canSubmit = identifier.trim() && password && captchaAnswer.trim();

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <div className="portal-logo-box">
            <img src="/logo1.png" alt="AYUSH Logo" className="portal-brand-logo" />
          </div>

          <h1 className="portal-title">
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

          <div className="portal-controls">
            <button
              className="portal-lang-switch-btn"
              onClick={() => setIsHindi(!isHindi)}
              aria-label="Language toggle"
            >
              <span className={`portal-lang-pill ${isHindi ? "active" : ""}`}>
                <span className="portal-lang-knob">{isHindi ? "हि" : "En"}</span>
              </span>
            </button>
          </div>

          <div className="portal-logo-box">
            <img src="/logo3.png" alt="Partner Logo" className="portal-logo-right" />
          </div>
        </header>

        <p className="login-subtitle">{t("loginSubtitle")}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error ? <p className="login-error">{error}</p> : null}

          <label>
            {t("loginIdentifier")}
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
            />
          </label>

          <label>
            {t("loginPassword")}
            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button type="button" className="toggle-btn" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? t("loginHide") : t("loginShow")}
              </button>
            </div>
          </label>

          <label>
            {t("loginCaptcha")}
            <div className="captcha-row">
              <span>
                {t("loginCaptchaPrompt")} {captcha.a} + {captcha.b}?
              </span>
              <input
                type="text"
                value={captchaAnswer}
                onChange={(event) => setCaptchaAnswer(event.target.value)}
                required
              />
            </div>
          </label>

          <button type="submit" className="login-btn" disabled={!canSubmit}>
            {t("login")}
          </button>

          <div className="support-links">
            <button type="button" className="link-btn">{t("forgotPassword")}</button>
            <button type="button" onClick={() => navigateWithTransition("/signup")} className="link-btn">{t("newUserRegister")}</button>
            <button type="button" className="link-btn">{t("helpSupport")}</button>
          </div>
        </form>

        <footer className="login-footer">
          <button type="button" className="link-btn">{t("terms")}</button>
          <button type="button" className="link-btn">{t("privacy")}</button>
        </footer>
      </div>
      <footer className="page-footer">
        <p>© 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
        <span className="version-badge">Version 1.0</span>
      </footer>
    </div>
  );
}

export default Login;
