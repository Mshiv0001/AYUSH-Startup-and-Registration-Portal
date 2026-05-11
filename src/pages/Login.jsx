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
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
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
            <div className="header-lang-dropdown">
              <button
                className="header-lang-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="true"
              >
                {isHindi ? "हिन्दी" : "English"}
                <svg className={`dropdown-arrow ${isLangDropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </button>
              {isLangDropdownOpen && (
                <div className="header-lang-menu">
                  <button 
                    className={`lang-option ${!isHindi ? 'selected' : ''}`} 
                    onClick={() => { setIsHindi(false); setIsLangDropdownOpen(false); }}
                  >
                    English
                  </button>
                  <button 
                    className={`lang-option ${isHindi ? 'selected' : ''}`} 
                    onClick={() => { setIsHindi(true); setIsLangDropdownOpen(false); }}
                  >
                    हिन्दी
                  </button>
                </div>
              )}
            </div>
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
          <button type="button" className="link-btn" onClick={() => setPolicyModalOpen(true)}>{t("terms")}</button>
          <button type="button" className="link-btn" onClick={() => setPolicyModalOpen(true)}>{t("privacy")}</button>
        </footer>
      </div>
      <footer className="page-footer">
        <p>© 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
        <span className="version-badge">Version 1.0</span>
      </footer>

      {policyModalOpen ? (
        <div className="policy-modal-backdrop" role="presentation" onClick={() => setPolicyModalOpen(false)}>
          <div className="policy-modal" role="dialog" aria-modal="true" aria-labelledby="policy-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="policy-modal-header">
              <h2 id="policy-modal-title">Terms &amp; Conditions and Privacy Policy</h2>
              <button type="button" className="policy-modal-close" onClick={() => setPolicyModalOpen(false)} aria-label="Close policy popup">
                X
              </button>
            </div>
            <div className="policy-modal-body">
              <h3>Terms &amp; Conditions</h3>
              <h4>1. Scope of Service</h4>
              <p>This portal serves as a digital registration platform for AYUSH-related business entities, practitioners, and manufacturers. The issuance of a registration number does not constitute a clinical endorsement of specific medical products.</p>
              <h4>2. Business &amp; Product Listings</h4>
              <p><strong>Compliance:</strong> All businesses must comply with the Drugs and Cosmetics Act, 1940 and the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954.</p>
              <p><strong>Verification:</strong> Users are responsible for the authenticity of the licenses and certifications (e.g., GMP certification) uploaded to the portal.</p>
              <p><strong>Prohibitions:</strong> Listing of banned substances or unlicensed medicinal "stuff" is strictly prohibited and will lead to immediate account termination.</p>
              <h4>3. Medical Disclaimer</h4>
              <p>The information provided on this portal is for administrative and registration purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
              <h4>4. Intellectual Property</h4>
              <p>The "AYUSH" logo and departmental branding are the property of the Ministry of AYUSH, Government of India. Unauthorized use for private business branding is a legal offense.</p>
              <h3>Privacy Policy</h3>
              <h4>1. Nature of Data Collected</h4>
              <p>In addition to basic contact details, this portal collects:</p>
              <p><strong>Business Credentials:</strong> GSTIN, Manufacturing Licenses, and Professional Certifications.</p>
              <p><strong>Product Data:</strong> Ingredients, formulations, and clinical trial references for AYUSH medicines.</p>
              <p><strong>Biometric/ID Data:</strong> Aadhaar-based e-KYC data (processed via secure UIDAI encrypted gateways).</p>
              <h4>2. Purpose of Processing</h4>
              <p>Data is collected for:</p>
              <p>Statutory registration and licensing of AYUSH businesses.</p>
              <p>Maintaining a national database of AYUSH practitioners and medicine manufacturers.</p>
              <p>Monitoring the quality and safety standards of traditional medicines.</p>
              <h4>3. Data Storage &amp; Security</h4>
              <p>All data is stored on National Informatics Centre (NIC) servers within India. We employ 256-bit encryption for all sensitive business documents and medicine formulations to prevent corporate espionage or data leaks.</p>
              <h4>4. Grievance Redressal</h4>
              <p>In compliance with the DPDP Act 2023, any data-related concerns can be directed to the Grievance Officer, Ministry of AYUSH.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
