import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      portalTitle: "AYUSH Startup Registration & Management Portal",
      login: "Login",
      signup: "Sign Up",
      getStarted: "Get Started",
      learnMore: "Learn More",
      heroTitle: "Empowering AYUSH Innovations",
      heroSubtitle1: "Register & Grow Your AYUSH Startup",
      heroSubtitle2: "An initiative under <strong>Ministry of AYUSH</strong>, Government of India",
      quoteText: "India is a treasure trove of herbal plants; it is, in a way, our Green Gold.",
      quoteAuthor: "SHRI NARENDRA MODI",

      loginTitle: "AYUSH Startup Portal Login",
      loginSubtitle: "Sign in to continue",
      loginIdentifier: "Email ID or Mobile Number",
      loginPassword: "Password",
      loginShow: "Show",
      loginHide: "Hide",
      loginCaptcha: "Simple Verification",
      loginCaptchaPrompt: "What is",
      loginCaptchaError: "Verification answer is incorrect.",
      forgotPassword: "Forgot Password?",
      newUserRegister: "New User? Register",
      helpSupport: "Help / Contact Support",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",

      signupTitle: "Create Startup Account",
      signupSubtitle: "Complete the required details to create your login credentials.",
      createAccount: "Create Account",
      alreadyRegistered: "Already Registered? Login",
      aboutTitle: "About Ministry",
      aboutDescription:
  "The <strong>Ministry of Ayush</strong> was formed on the 9th of November 2014 with a vision of reviving the profound knowledge of our ancient systems of medicine and ensuring the optimal development and propagation of the Ayush systems of healthcare.",
ministerName: "Shri Prataprao Jadhav",
      ministerDesignation:
  "Minister of State (Independent Charge) of <strong>Ministry of Ayush</strong> and Minister of State in <strong>Ministry of Health and Family Welfare</strong>",
      government: "Government of India",
      infoTabTeam: "Our Team",
      infoTabOrganizations: "Our Organisations",
      infoTabPerformance: "Our Performance",

    }
  },
  hi: {
    translation: {
      portalTitle: "आयुष स्टार्टअप पंजीकरण एवं प्रबंधन पोर्टल",
      login: "लॉगिन",
      signup: "साइन अप",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      heroTitle: "आयुष नवाचारों को सशक्त बनाना",
      heroSubtitle1: "अपने आयुष स्टार्टअप को पंजीकृत करें और आगे बढ़ाएं",
      heroSubtitle2: "<strong>आयुष मंत्रालय</strong>, भारत सरकार के अंतर्गत एक पहल",
      quoteText: "भारत जड़ी-बूटी वाले पौधों का खजाना है; यह एक तरह से हमारा हरित स्वर्ण है।",
      quoteAuthor: "श्री नरेंद्र मोदी",

      loginTitle: "आयुष स्टार्टअप पोर्टल लॉगिन",
      loginSubtitle: "जारी रखने के लिए साइन इन करें",
      loginIdentifier: "ईमेल आईडी या मोबाइल नंबर",
      loginPassword: "पासवर्ड",
      loginShow: "दिखाएं",
      loginHide: "छिपाएं",
      loginCaptcha: "सरल सत्यापन",
      loginCaptchaPrompt: "क्या है",
      loginCaptchaError: "सत्यापन उत्तर गलत है।",
      forgotPassword: "पासवर्ड भूल गए?",
      newUserRegister: "नए यूजर? रजिस्टर करें",
      helpSupport: "सहायता / संपर्क सपोर्ट",
      terms: "नियम और शर्तें",
      privacy: "प्राइवेसी पॉलिसी",

      signupTitle: "स्टार्टअप अकाउंट बनाएं",
      signupSubtitle: "लॉगिन क्रेडेंशियल बनाने के लिए आवश्यक विवरण भरें।",
      createAccount: "अकाउंट बनाएं",
      alreadyRegistered: "पहले से पंजीकृत? लॉगिन",
      aboutTitle: "मंत्रालय के बारे में",
aboutDescription:
  "<strong>आयुष मंत्रालय</strong> की स्थापना 9 नवंबर 2014 को हमारे प्राचीन चिकित्सा प्रणालियों के गहन ज्ञान को पुनर्जीवित करने तथा आयुष स्वास्थ्य प्रणालियों के समुचित विकास और प्रसार को सुनिश्चित करने के उद्देश्य से की गई थी।",
ministerName: "श्री प्रतापराव जाधव",
      ministerDesignation:
  "<strong>आयुष मंत्रालय</strong> में राज्य मंत्री (स्वतंत्र प्रभार) तथा <strong>स्वास्थ्य एवं परिवार कल्याण मंत्रालय</strong> में राज्य मंत्री",
      government: "भारत सरकार",
      infoTabTeam: "हमारी टीम",
      infoTabOrganizations: "हमारे संगठन",
      infoTabPerformance: "हमारा प्रदर्शन",

section1Title: "खंड 1 - मूल खाता जानकारी (अनिवार्य)",
fullName: "पूरा नाम (संस्थापक / अधिकृत व्यक्ति)",
officialEmail: "आधिकारिक ईमेल पता",
mobileNumber: "मोबाइल नंबर",
password: "पासवर्ड",
confirmPassword: "पासवर्ड की पुष्टि करें",

passwordRulesTitle: "आपका पासवर्ड निम्न होना चाहिए:",
min8Chars: "कम से कम 8 अक्षरों का होना चाहिए",
oneUppercase: "कम से कम 1 बड़ा अक्षर (A-Z) होना चाहिए",
oneLowercase: "कम से कम 1 छोटा अक्षर (a-z) होना चाहिए",
oneNumber: "कम से कम 1 अंक (0-9) होना चाहिए",
oneSpecialChar: "कम से कम 1 विशेष चिन्ह होना चाहिए",

passwordMustNotContain: "निम्न शामिल नहीं होना चाहिए:",
noConsecutiveLetters: "लगातार बढ़ते हुए 3 अक्षर (abc, xyz)",
noConsecutiveNumbers: "लगातार बढ़ते हुए 3 अंक (123, 456)",
noIdenticalChars: "लगातार 3 समान अक्षर या अंक (aaa, 111)",

section2Title: "खंड 2 - स्टार्टअप पहचान",
startupName: "स्टार्टअप का नाम",
ayushSector: "आयुष क्षेत्र",
selectSector: "क्षेत्र चुनें",
stateUT: "राज्य / केंद्र शासित प्रदेश",
selectStateUT: "राज्य / केंद्र शासित प्रदेश चुनें",

startupNameRulesTitle: "स्टार्टअप नाम के नियम:",
min3Chars: "न्यूनतम 3 अक्षर होने चाहिए",
max100Chars: "अधिकतम 100 अक्षर होने चाहिए",
allowedCharacters: "केवल अक्षर, अंक, स्पेस, डॉट (.), एम्परसैंड (&), हाइफ़न (-) मान्य हैं",
notOnlyNumbers: "केवल अंकों से बना नहीं होना चाहिए",
cannotStartSpecial: "विशेष चिन्ह से प्रारंभ नहीं होना चाहिए",
noThreeSpecialChars: "लगातार 3 विशेष चिन्ह नहीं होने चाहिए",
trimSpaces: "आरंभ और अंत में अतिरिक्त स्पेस नहीं होना चाहिए",

noDocumentUpload: "यहाँ दस्तावेज़ अपलोड न करें। दस्तावेज़ संग्रहण पंजीकरण चरण का भाग है।",

section3Title: "खंड 3 - घोषणा",

declarationText:
  "मैं पुष्टि करता/करती हूँ कि प्रदान की गई जानकारी सही एवं प्रामाणिक है। मैं पंजीकरण एवं सत्यापन उद्देश्यों के लिए भारत सरकार तथा संबंधित प्राधिकरणों के साथ प्रदान किए गए डेटा को साझा करने के लिए सहमत हूँ। मैंने नियम एवं शर्तें तथा गोपनीयता नीति को पढ़ लिया है और स्वीकार करता/करती हूँ।",

    }
  }
};

const initialLang = (() => {
  try {
    return localStorage.getItem("lang") || "en";
  } catch {
    return "en";
  }
})();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
