import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const INDIAN_UTS = [
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

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
  const [mobile, setMobile] = useState("+91 ");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [ayushSector, setAyushSector] = useState([]);
  const [startupName, setStartupName] = useState("");
  const [stateUt, setStateUt] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [ayushDropdownOpen, setAyushDropdownOpen] = useState(false);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const emailOtpRef = useRef(null);
  const mobileOtpRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const startupNameRef = useRef(null);
  const ayushSectorRef = useRef(null);
  const ayushDropdownRef = useRef(null);
  const stateUtRef = useRef(null);
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
    let nextValue = event.target.value;
    if (!nextValue.startsWith("+91")) {
      nextValue = `+91 ${nextValue.replace(/^\+?91\s*/, "")}`;
    }
    const digitsOnly = nextValue.slice(4).replace(/\D/g, "");
    setMobile(`+91 ${digitsOnly}`);
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
      if (!mobileOtp.trim()) return setErrorAndFocus("Mobile OTP is required.", mobileOtpRef, "mobileOtp");
      if (!passwordValue) return setErrorAndFocus("Password is required.", passwordRef, "password");
      if (!confirmPasswordValue) return setErrorAndFocus("Confirm Password is required.", confirmPasswordRef, "confirmPassword");
      if (!startupNameValue) return setErrorAndFocus("Startup Name is required.", startupNameRef, "startupName");
      if (!ayushSector.length) return setErrorAndFocus("AYUSH Sector is required.", ayushSectorRef, "ayushSector");
      if (!stateUt) return setErrorAndFocus("State / UT is required.", stateUtRef, "stateUt");
      if (!declarationAccepted) return setErrorAndFocus("Please accept the declaration to continue.", declarationRef, "declaration");
    }

    if (!mobileValue.startsWith("+91")) {
      setErrorAndFocus("Mobile number must start with +91.", mobileRef, "mobile");
      return;
    }

    const startupNameError = validateStartupName(startupNameValue);
    if (startupNameError) {
      setErrorAndFocus(startupNameError, startupNameRef, "startupName");
      return;
    }

    const allLocations = new Set([...INDIAN_STATES, ...INDIAN_UTS]);
    if (!allLocations.has(stateUt)) {
      setErrorAndFocus("Please select a valid State / UT.", stateUtRef, "stateUt");
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

  useEffect(() => {
    if (!ayushDropdownOpen) return;
    const handleClickOutside = (event) => {
      if (ayushDropdownRef.current && !ayushDropdownRef.current.contains(event.target)) {
        setAyushDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ayushDropdownOpen]);

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
        <p className="signup-subtitle">Complete the required details to create your login credentials.</p>
        <div className="signup-divider" />

        <form className="signup-form" onSubmit={handleSubmit}>
          {error ? <p className="form-error">{error}</p> : null}
          {success ? <p className="form-success">{success}</p> : null}

          <section className="form-section">
            <h2>Section 1 - Basic Account Information (Required)</h2>
            <div className="form-grid">
              <label className="full-row">
                Full Name (Founder / Authorized Person)
                <input type="text" name="fullName" ref={fullNameRef} className={errorField === "fullName" ? "input-error" : ""} required />
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
                    onChange={(event) => setEmailOtp(event.target.value)}
                    ref={emailOtpRef}
                    className={errorField === "emailOtp" ? "input-error" : ""}
                    required
                  />
                  <button type="button" className="otp-btn">Send OTP</button>
                </div>
              </label>

              <label>
                Mobile Number
                <input
                  type="tel"
                  name="mobile"
                  value={mobile}
                  onChange={handleMobileChange}
                  inputMode="numeric"
                  autoComplete="tel"
                  ref={mobileRef}
                  className={errorField === "mobile" ? "input-error" : ""}
                  required
                />
              </label>

              <label>
                Mobile OTP
                <div className="otp-row">
                  <input
                    type="text"
                    name="mobileOtp"
                    value={mobileOtp}
                    onChange={(event) => setMobileOtp(event.target.value)}
                    ref={mobileOtpRef}
                    className={errorField === "mobileOtp" ? "input-error" : ""}
                    required
                  />
                  <button type="button" className="otp-btn">Send OTP</button>
                </div>
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  ref={passwordRef}
                  className={errorField === "password" ? "input-error" : ""}
                  required
                />
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

              <div
                className={`ayush-sector-field ${errorField === "ayushSector" ? "input-error" : ""}`}
                ref={ayushSectorRef}
              >
                <span className="ayush-sector-label">AYUSH Sector</span>
                <div className="ayush-dropdown" ref={ayushDropdownRef}>
                  <button
                    type="button"
                    className="ayush-dropdown-trigger"
                    onClick={() => setAyushDropdownOpen((prev) => !prev)}
                    aria-expanded={ayushDropdownOpen}
                  >
                    <span>
                      {ayushSector.length === 0
                        ? "Select sector(s)"
                        : ayushSector.join(", ")}
                    </span>
                    <span className="ayush-dropdown-caret">▾</span>
                  </button>
                  {ayushDropdownOpen && (
                    <div className="ayush-dropdown-menu">
                      {["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"].map(
                        (sector) => {
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
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>

              <label>
                State / UT
                <select
                  name="state"
                  className={`state-ut-input-lg ${errorField === "stateUt" ? "input-error" : ""}`}
                  value={stateUt}
                  onChange={(event) => setStateUt(event.target.value)}
                  ref={stateUtRef}
                  required
                >
                  <option value="" disabled>
                    Select State / UT
                  </option>
                  <optgroup label="States">
                    {INDIAN_STATES.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Union Territories">
                    {INDIAN_UTS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>

            <div className="startup-rules">
              <p className={startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "rule-done" : ""}>
                <span className="rule-mark" aria-hidden="true">
                  {startupNameRuleStatus.minLength && startupNameRuleStatus.maxLength && startupNameRuleStatus.allowedChars ? "\u2713" : "\u2717"}
                </span>
                <span>3–100 characters, using only letters, numbers, spaces, ., &, -.</span>
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

            <p className="section-note">Do not upload documents here. Document collection is part of the registration stage.</p>
          </section>

          <section className="form-section">
            <h2>Section 3 - Declaration</h2>
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
                I have read and accept the Terms &amp; Conditions and Privacy Policy.
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
    </div>
  );
}

export default Signup;
