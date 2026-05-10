import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { INTERNATIONAL_COUNTRY_CODES } from "../data/countryCodes";
import "./Signup.css";

const TEMP_EMAIL_OTP = "123456";
const STARTUP_STAGES = ["Idea", "MVP", "Revenue Stage", "Scaling"];
const LEGAL_ENTITY_TYPES = ["Private Limited", "LLP", "Partnership", "Proprietorship"];
const PRIMARY_OBJECTIVES = ["Seeking Funding", "Regulatory Support", "Market Access", "Other"];

function Signup() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isHindi, setIsHindi] = useState(() => {
    try {
      return localStorage.getItem("lang") === "hi";
    } catch {
      return false;
    }
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailOtpIssued, setIsEmailOtpIssued] = useState(false);
  const [emailOtpStatus, setEmailOtpStatus] = useState("");
  const [ayushSector, setAyushSector] = useState([]);
  const [startupName, setStartupName] = useState("");
  const [currentStage, setCurrentStage] = useState("");
  const [countryOfRegistration, setCountryOfRegistration] = useState("India");
  const [legalEntityType, setLegalEntityType] = useState("");
  const [dpiitRecognition, setDpiitRecognition] = useState("No");
  const [primaryObjective, setPrimaryObjective] = useState("");
  const [otherPrimaryObjective, setOtherPrimaryObjective] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const emailOtpRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const startupNameRef = useRef(null);
  const currentStageRef = useRef(null);
  const countryOfRegistrationRef = useRef(null);
  const legalEntityTypeRef = useRef(null);
  const primaryObjectiveRef = useRef(null);
  const otherPrimaryObjectiveRef = useRef(null);
  const ayushSectorRef = useRef(null);
  const declarationRef = useRef(null);

  const hasIncreasingLetterTriplet = (value) => {
    const normalized = value.toLowerCase();
    for (let i = 0; i < normalized.length - 2; i += 1) {
      const a = normalized.charCodeAt(i);
      const b = normalized.charCodeAt(i + 1);
      const c = normalized.charCodeAt(i + 2);
      const isLetter = a >= 97 && a <= 122 && b >= 97 && b <= 122 && c >= 97 && c <= 122;
      if (isLetter && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const hasIncreasingNumberTriplet = (value) => {
    for (let i = 0; i < value.length - 2; i += 1) {
      const a = value.charCodeAt(i);
      const b = value.charCodeAt(i + 1);
      const c = value.charCodeAt(i + 2);
      const isDigit = a >= 48 && a <= 57 && b >= 48 && b <= 57 && c >= 48 && c <= 57;
      if (isDigit && b === a + 1 && c === b + 1) {
        return true;
      }
    }
    return false;
  };

  const hasThreeIdenticalInRow = (value) => /(.)\1\1/.test(value);

  const handleMobileChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 15);
    setMobile(digitsOnly);
  };

  const handleFullNameChange = (event) => {
    const val = event.target.value;
    setFullName(val);
    if (val && !/^[A-Za-z\s]+$/.test(val)) {
      setFullNameError("Full Name can only contain letters and spaces — no numbers or special characters.");
    } else {
      setFullNameError("");
    }
  };

  const handleGetEmailOtp = () => {
    const email = emailRef.current?.value?.trim() || "";

    setError("");
    setSuccess("");
    setErrorField("");
    setEmailOtpStatus("");

    if (!email) {
      setErrorAndFocus("Official Email Address is required before getting OTP.", emailRef, "email");
      return;
    }

    if (!emailRef.current?.checkValidity()) {
      setErrorAndFocus("Please enter a valid official email address.", emailRef, "email");
      return;
    }

    setIsEmailOtpIssued(true);
    setEmailOtp("");
    setEmailOtpStatus("Temporary OTP enabled. Use 123456.");
  };

  const validatePassword = (password) => {
    const rules = getPasswordRuleStatus(password);
    if (!rules.minLength) return "Password must be at least 8 characters.";
    if (!rules.uppercase) return "Password must include at least 1 uppercase letter.";
    if (!rules.lowercase) return "Password must include at least 1 lowercase letter.";
    if (!rules.number) return "Password must include at least 1 number.";
    if (!rules.special) return "Password must include at least 1 special character.";
    if (!rules.noIncreasingLetters) return "Password must not contain 3 consecutive increasing letters (abc, xyz).";
    if (!rules.noIncreasingNumbers) return "Password must not contain 3 consecutive increasing numbers (123, 456).";
    if (!rules.noTripleSame) return "Password must not contain 3 identical characters in a row (aaa, 111).";
    return "";
  };

  const validateStartupName = (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) return "Startup Name must be at least 3 characters.";
    if (trimmed.length > 100) return "Startup Name must be 100 characters or fewer.";
    if (!/^[A-Za-z0-9 .&-]+$/.test(trimmed)) {
      return "Startup Name can only include letters, numbers, spaces, dot (.), ampersand (&), and hyphen (-).";
    }
    if (/^[0-9]+$/.test(trimmed)) return "Startup Name must not contain only numbers.";
    if (!/^[A-Za-z0-9]/.test(trimmed)) return "Startup Name cannot start with a special character.";
    if (/[.&-]{3,}/.test(trimmed)) return "Startup Name cannot contain 3 consecutive special characters.";
    return "";
  };

  const getStartupNameRuleStatus = (value) => {
    const trimmed = value.trim();
    return {
      minLength: trimmed.length >= 3,
      maxLength: trimmed.length <= 100,
      allowedChars: /^[A-Za-z0-9 .&-]+$/.test(trimmed || " "),
      notOnlyNumbers: !/^[0-9]+$/.test(trimmed || ""),
      validStart: trimmed.length > 0 ? /^[A-Za-z0-9]/.test(trimmed) : false,
      noThreeSpecials: !/[.&-]{3,}/.test(trimmed),
      trimmed: value === trimmed,
    };
  };

  const getPasswordRuleStatus = (value) => ({
    minLength: value.length >= 8,
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
    noIncreasingLetters: !hasIncreasingLetterTriplet(value),
    noIncreasingNumbers: !hasIncreasingNumberTriplet(value),
    noTripleSame: !hasThreeIdenticalInRow(value),
  });

  const passwordRuleStatus = getPasswordRuleStatus(password);
  const startupNameRuleStatus = getStartupNameRuleStatus(startupName);

  const setErrorAndFocus = (message, fieldRef, fieldKey) => {
    setError(message);
    setErrorField(fieldKey);
    if (fieldRef?.current) {
      fieldRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        window.scrollBy({ top: -280, behavior: "smooth" });
        fieldRef.current.focus({ preventScroll: true });
      }, 120);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setErrorField("");

    const mobileValue = mobile.trim();
    const startupNameValue = startupName.trim();
    const passwordValue = password;
    const confirmPasswordValue = confirmPassword;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      if (!fullNameRef.current?.value?.trim()) return setErrorAndFocus("Full Name is required.", fullNameRef, "fullName");
      if (!emailRef.current?.value?.trim()) return setErrorAndFocus("Official Email Address is required.", emailRef, "email");
      if (!mobileValue) return setErrorAndFocus("Mobile Number is required.", mobileRef, "mobile");
      if (!emailOtp.trim()) return setErrorAndFocus("Email OTP is required.", emailOtpRef, "emailOtp");
      if (!passwordValue) return setErrorAndFocus("Password is required.", passwordRef, "password");
      if (!confirmPasswordValue) return setErrorAndFocus("Confirm Password is required.", confirmPasswordRef, "confirmPassword");
      if (!startupNameValue) return setErrorAndFocus("Startup Name is required.", startupNameRef, "startupName");
      if (!currentStage) return setErrorAndFocus("Current Stage is required.", currentStageRef, "currentStage");
      if (!countryOfRegistration) return setErrorAndFocus("Country of Origin is required.", countryOfRegistrationRef, "countryOfRegistration");
      if (!legalEntityType) return setErrorAndFocus("Legal Entity Type is required.", legalEntityTypeRef, "legalEntityType");
      if (!primaryObjective) return setErrorAndFocus("Primary Objective is required.", primaryObjectiveRef, "primaryObjective");
      if (primaryObjective === "Other" && !otherPrimaryObjective.trim()) {
        return setErrorAndFocus("Please specify the other Primary Objective.", otherPrimaryObjectiveRef, "otherPrimaryObjective");
      }
      if (!ayushSector.length) return setErrorAndFocus("AYUSH Sector is required.", ayushSectorRef, "ayushSector");
      if (!declarationAccepted) return setErrorAndFocus("Please accept the declaration to continue.", declarationRef, "declaration");
    }

    if (!isEmailOtpIssued) {
      setErrorAndFocus("Please get Email OTP first.", emailOtpRef, "emailOtp");
      return;
    }

    if (emailOtp.trim() !== TEMP_EMAIL_OTP) {
      setErrorAndFocus("Email OTP is incorrect. For now, use 123456.", emailOtpRef, "emailOtp");
      return;
    }

    const startupNameError = validateStartupName(startupNameValue);
    if (startupNameError) {
      setErrorAndFocus(startupNameError, startupNameRef, "startupName");
      return;
    }

    if (!STARTUP_STAGES.includes(currentStage)) {
      setErrorAndFocus("Please select a valid Current Stage.", currentStageRef, "currentStage");
      return;
    }

    if (!INTERNATIONAL_COUNTRY_CODES.some((country) => country.country === countryOfRegistration)) {
      setErrorAndFocus("Please select a valid Country of Origin.", countryOfRegistrationRef, "countryOfRegistration");
      return;
    }

    if (!LEGAL_ENTITY_TYPES.includes(legalEntityType)) {
      setErrorAndFocus("Please select a valid Legal Entity Type.", legalEntityTypeRef, "legalEntityType");
      return;
    }

    if (!PRIMARY_OBJECTIVES.includes(primaryObjective)) {
      setErrorAndFocus("Please select a valid Primary Objective.", primaryObjectiveRef, "primaryObjective");
      return;
    }

    if (primaryObjective === "Other" && otherPrimaryObjective.trim().length < 3) {
      setErrorAndFocus("Other Primary Objective must be at least 3 characters.", otherPrimaryObjectiveRef, "otherPrimaryObjective");
      return;
    }

    const passwordError = validatePassword(String(passwordValue || ""));
    if (passwordError) {
      setErrorAndFocus(passwordError, passwordRef, "password");
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      setErrorAndFocus("Password and Confirm Password must match.", confirmPasswordRef, "confirmPassword");
      return;
    }

    setSuccess("Account created successfully. Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  useEffect(() => {
    i18n.changeLanguage(isHindi ? "hi" : "en");
    try {
      localStorage.setItem("lang", isHindi ? "hi" : "en");
    } catch {
      // Ignore storage failures to prevent UI crash.
    }
  }, [i18n, isHindi]);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <header className="signup-header">
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
        <p className="signup-subtitle">Complete the required details to create your login credentials.</p>
        <div className="signup-divider" />

        <form className="signup-form" onSubmit={handleSubmit}>
          {error ? <p className="form-error">{error}</p> : null}
          {success ? <p className="form-success">{success}</p> : null}

          <section className="form-section">
            <h2>Account Information</h2>
            <div className="form-grid">
              <label className="full-row">
                Full Name (Founder / Authorized Person)
                <input
                  type="text"
                  name="fullName"
                  ref={fullNameRef}
                  value={fullName}
                  onChange={handleFullNameChange}
                  className={errorField === "fullName" || fullNameError ? "input-error" : ""}
                  required
                />
                {fullNameError && (
                  <p className="inline-error">{fullNameError}</p>
                )}
              </label>

              <label>
                Official Email Address
                <input type="email" name="email" ref={emailRef} className={errorField === "email" ? "input-error" : ""} required />
              </label>

              <label>
                Email OTP
                <div className="otp-row">
                  <input
                    type="text"
                    name="emailOtp"
                    value={emailOtp}
                    onChange={(event) => {
                      const digits = event.target.value.replace(/\D/g, "").slice(0, 6);
                      setEmailOtp(digits);
                    }}
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    ref={emailOtpRef}
                    className={errorField === "emailOtp" ? "input-error" : ""}
                    required
                  />
                  <button type="button" className="otp-btn" onClick={handleGetEmailOtp}>
                    Get OTP
                  </button>
                </div>
                {emailOtpStatus ? <p className="otp-hint">{emailOtpStatus}</p> : null}
              </label>

              <label>
                Contact Number
                <div className="phone-input-row">
                  <div className="country-code-picker">
                    <span className="country-code-display" aria-hidden="true">
                      {countryCode}
                    </span>
                    <select
                      className="country-code-select"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country code"
                    >
                      {INTERNATIONAL_COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}`} value={c.code}>
                          {c.code} {c.country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    value={mobile}
                    onChange={handleMobileChange}
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="Phone number"
                    autoComplete="tel-national"
                    ref={mobileRef}
                    className={errorField === "mobile" ? "input-error" : ""}
                    required
                  />
                </div>
              </label>

              <label>
                Password
                <div className="password-input-wrap">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    ref={passwordRef}
                    className={errorField === "password" ? "input-error" : ""}
                    required
                  />
                  <button
                    type="button"
                    className="password-visibility-btn"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    title={isPasswordVisible ? "Hide password" : "Show password"}
                  >
                    {isPasswordVisible ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
                        <path d="M4 4l16 16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M1.2 12.8a1.6 1.6 0 0 1 0-1.6C2.5 9 6.5 4 12 4s9.5 5 10.8 7.2a1.6 1.6 0 0 1 0 1.6C21.5 15 17.5 20 12 20s-9.5-5-10.8-7.2Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              <label>
                {confirmTouched && confirmPassword && password !== confirmPassword ? (
                  <p className="inline-error">Password and Confirm Password must match.</p>
                ) : null}
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmTouched(true);
                    setConfirmPassword(event.target.value);
                  }}
                  onBlur={() => setConfirmTouched(true)}
                  disabled={!password}
                  ref={confirmPasswordRef}
                  className={errorField === "confirmPassword" ? "input-error" : ""}
                  required
                />
              </label>
            </div>
            <div className="password-rules">
              <p className={passwordRuleStatus.minLength && passwordRuleStatus.uppercase && passwordRuleStatus.lowercase && passwordRuleStatus.number && passwordRuleStatus.special ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {passwordRuleStatus.minLength && passwordRuleStatus.uppercase && passwordRuleStatus.lowercase && passwordRuleStatus.number && passwordRuleStatus.special ? "\u2713" : "\u2717"}
                </span>
                <span>Minimum 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special character.</span>
              </p>
              <p className={passwordRuleStatus.noIncreasingLetters && passwordRuleStatus.noIncreasingNumbers && passwordRuleStatus.noTripleSame ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {passwordRuleStatus.noIncreasingLetters && passwordRuleStatus.noIncreasingNumbers && passwordRuleStatus.noTripleSame ? "\u2713" : "\u2717"}
                </span>
                <span>No 3 consecutive letters (abc), numbers (123), or identical characters (aaa).</span>
              </p>
            </div>
          </section>

          <section className="form-section">
            <h2>Section 2 - Startup Identity</h2>

            <div className="form-grid">
              <label className="full-row">
                Startup Name
                <input
                  type="text"
                  name="startupName"
                  value={startupName}
                  onChange={(event) => setStartupName(event.target.value)}
                  onBlur={() => setStartupName((prev) => prev.trim())}
                  maxLength={100}
                  ref={startupNameRef}
                  className={errorField === "startupName" ? "input-error" : ""}
                  required
                />
              </label>

              <div className="startup-rules full-row">
                <p className={startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "rule-done" : ""}>
                  <span className="rule-mark" aria-hidden="true">
                    {startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "\u2713" : "\u2717"}
                  </span>
                  <span>3-100 characters, using only letters, numbers, spaces, ., &, -.</span>
                </p>
                <p className={startupNameRuleStatus.notOnlyNumbers && startupNameRuleStatus.validStart && startupNameRuleStatus.noThreeSpecials ? "rule-done" : ""}>
                  <span className="rule-mark" aria-hidden="true">
                    {startupNameRuleStatus.notOnlyNumbers && startupNameRuleStatus.validStart && startupNameRuleStatus.noThreeSpecials ? "\u2713" : "\u2717"}
                  </span>
                  <span>Must not be only numbers, start with a special character, or contain 3 consecutive special characters.</span>
                </p>
                <p className={startupNameRuleStatus.trimmed ? "rule-done" : ""}>
                  <span className="rule-mark" aria-hidden="true">
                    {startupNameRuleStatus.trimmed ? "\u2713" : "\u2717"}
                  </span>
                  <span>Leading/trailing spaces will be trimmed.</span>
                </p>
              </div>

              <label>
                Current Stage
                <select
                  name="currentStage"
                  value={currentStage}
                  onChange={(event) => setCurrentStage(event.target.value)}
                  ref={currentStageRef}
                  className={errorField === "currentStage" ? "input-error" : ""}
                  required
                >
                  <option value="" disabled>
                    Select Current Stage
                  </option>
                  {STARTUP_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Primary Objective
                <select
                  name="primaryObjective"
                  value={primaryObjective}
                  onChange={(event) => {
                    setPrimaryObjective(event.target.value);
                    if (event.target.value !== "Other") {
                      setOtherPrimaryObjective("");
                    }
                  }}
                  ref={primaryObjectiveRef}
                  className={errorField === "primaryObjective" ? "input-error" : ""}
                  required
                >
                  <option value="" disabled>
                    Select Primary Objective
                  </option>
                  {PRIMARY_OBJECTIVES.map((objective) => (
                    <option key={objective} value={objective}>
                      {objective}
                    </option>
                  ))}
                </select>
              </label>

              {primaryObjective === "Other" ? (
                <label className="full-row">
                  Other Objective
                  <input
                    type="text"
                    name="otherPrimaryObjective"
                    value={otherPrimaryObjective}
                    onChange={(event) => setOtherPrimaryObjective(event.target.value)}
                    onBlur={() => setOtherPrimaryObjective((prev) => prev.trim())}
                    ref={otherPrimaryObjectiveRef}
                    className={errorField === "otherPrimaryObjective" ? "input-error" : ""}
                    placeholder="Enter objective"
                    required
                  />
                </label>
              ) : null}

              <label className="full-row">
                Country of Origin
                <select
                  name="countryOfRegistration"
                  value={countryOfRegistration}
                  onChange={(event) => setCountryOfRegistration(event.target.value)}
                  ref={countryOfRegistrationRef}
                  className={errorField === "countryOfRegistration" ? "input-error" : ""}
                  required
                >
                  {INTERNATIONAL_COUNTRY_CODES.map((country) => (
                    <option key={`${country.country}-${country.code}`} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Legal Entity Type
                <select
                  name="legalEntityType"
                  value={legalEntityType}
                  onChange={(event) => setLegalEntityType(event.target.value)}
                  ref={legalEntityTypeRef}
                  className={errorField === "legalEntityType" ? "input-error" : ""}
                  required
                >
                  <option value="" disabled>
                    Select Legal Entity Type
                  </option>
                  {LEGAL_ENTITY_TYPES.map((entityType) => (
                    <option key={entityType} value={entityType}>
                      {entityType}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="field-label-with-help">
                  <span>DPIIT Recognition</span>
                  <a
                    href="https://dpiit.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="field-help-link"
                    aria-label="Open DPIIT website"
                    title="Open DPIIT website"
                  >
                    ?
                  </a>
                </span>
                <select
                  name="dpiitRecognition"
                  value={dpiitRecognition}
                  onChange={(event) => setDpiitRecognition(event.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>

              <div
                className={`ayush-sector-field full-row ${errorField === "ayushSector" ? "input-error" : ""}`}
                ref={ayushSectorRef}
              >
                <span className="ayush-sector-label">AYUSH Sector</span>
                <div className="ayush-sector-options" role="group" aria-label="AYUSH Sector">
                  {["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"].map((sector) => {
                    const isChecked = ayushSector.includes(sector);

                    return (
                      <label key={sector} className="ayush-sector-option">
                        <input
                          type="checkbox"
                          value={sector}
                          checked={isChecked}
                          onChange={() =>
                            setAyushSector((prev) =>
                              isChecked
                                ? prev.filter((item) => item !== sector)
                                : [...prev, sector]
                            )
                          }
                        />
                        <span>{sector}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            

            <p className="section-note">Do not upload documents here. Document collection is part of the registration stage.</p>
          </section>

          <section className="form-section">
            <h2>Disclaimer</h2>
            <label className="declaration-row">
              <input
                type="checkbox"
                name="declaration"
                checked={declarationAccepted}
                onChange={(event) => setDeclarationAccepted(event.target.checked)}
                ref={declarationRef}
                required
              />
              <span>
                I confirm that the information provided is accurate and authentic. I agree to share the provided
                data with the Government of India and relevant authorities for registration and verification purposes.
                I have read and accept the{" "}
                <button type="button" className="policy-inline-btn" onClick={() => setPolicyModalOpen(true)}>
                  Terms &amp; Conditions
                </button>
                {" "}and{" "}
                <button type="button" className="policy-inline-btn" onClick={() => setPolicyModalOpen(true)}>
                  Privacy Policy
                </button>
                .
              </span>
            </label>
          </section>

          <div className="action-row">
            <button type="submit" className="primary-btn">
              Create Account
            </button>
            <button type="button" className="secondary-btn" onClick={() => navigate("/login")}>Already Registered? Login</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <p>Â© 2026 Ministry of AYUSH, Government of India. All rights reserved.</p>
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
      ) : null}    </div>
  );
}

export default Signup;
