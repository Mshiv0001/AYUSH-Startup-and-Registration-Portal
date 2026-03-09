import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "./OurTeam.css";

function OurTeam() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("who");
  const location = useLocation();
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: "translateX(0)" });
  const [isHindi, setIsHindi] = useState(() => {
    try {
      return localStorage.getItem("lang") === "hi";
    } catch {
      return false;
    }
  });

  const performanceReports = [
    {
      session: "Departmental Submit 2025 Report",
      ministry: "National Ayush Mission, Ministry of Ayush",
      size: "4.23 MB",
    },
    {
      session: "NAM Conclave 2025 Report",
      ministry: "National Ayush Mission, Ministry of Ayush",
      size: "1.19 MB",
    },
    {
      session: "Annual session 2024-25",
      ministry: "Ministry of Ayush",
      size: "12.07 MB",
    },
    {
      session: "Annual session 2023-24",
      ministry: "Ministry of Ayush",
      size: "3.34 MB",
    },
    {
      session: "A Decade of Transformative Growth in Ayush 2014-2024",
      ministry: "Ministry of Ayush",
      size: "71.7 MB",
    },
    {
      session: "Annual session 2022-23",
      ministry: "Ministry of Ayush",
      size: "7.41 MB",
    },
    {
      session: "Annual session 2020-21",
      ministry: "Ministry of Ayush",
      size: "10.5 MB",
    },
    {
      session: "Annual session 2019-20",
      ministry: "Ministry of Ayush",
      size: "4.44 MB",
    },
    {
      session: "Annual session 2018-19",
      ministry: "Ministry of Ayush",
      size: "20.0 MB",
    },
    {
      session: "Annual session 2017-18",
      ministry: "Ministry of Ayush",
      size: "2.11 MB",
    },
    {
      session: "Annual session 2016-17",
      ministry: "Ministry of Ayush",
      size: "9.02 MB",
    },
    {
      session: "Annual session 2015-16",
      ministry: "Ministry of Ayush",
      size: "5.59 MB",
    },
    {
      session: "Annual session 2014-15",
      ministry: "Ministry of Ayush",
      size: "10.02 MB",
    },
    {
      session: "Annual session 2013-14",
      ministry: "Ministry of Ayush",
      size: "3.04 MB",
    },
    {
      session: "Annual session 2012-13",
      ministry: "Ministry of Ayush",
      size: "4.66 MB",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useLayoutEffect(() => {
    const container = tabsRef.current;
    const activeEl = tabRefs.current[activeTab];
    if (!container || !activeEl) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const left = activeRect.left - containerRect.left;
    setIndicatorStyle({
      width: activeRect.width,
      transform: `translateX(${left}px)`,
    });
  }, [activeTab]);

  useEffect(() => {
    const lang = isHindi ? "hi" : "en";
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Ignore storage failures to prevent UI crash.
    }
  }, [i18n, isHindi]);

  return (
    <div className="our-team-page">
      <section className="our-team-hero">
        <p className="our-team-breadcrumb">About Us / Who's who</p>
      </section>

      <nav className="our-team-tabs" ref={tabsRef}>
        <button
          type="button"
          ref={(el) => { tabRefs.current.about = el; }}
          className={`team-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Ministry
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.who = el; }}
          className={`team-tab ${activeTab === "who" ? "active" : ""}`}
          onClick={() => setActiveTab("who")}
        >
          Who's who?
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.domains = el; }}
          className={`team-tab ${activeTab === "domains" ? "active" : ""}`}
          onClick={() => setActiveTab("domains")}
        >
          Ayush Domains
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.minister = el; }}
          className={`team-tab ${activeTab === "minister" ? "active" : ""}`}
          onClick={() => setActiveTab("minister")}
        >
          Know the Minister
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.orgchart = el; }}
          className={`team-tab ${activeTab === "orgchart" ? "active" : ""}`}
          onClick={() => setActiveTab("orgchart")}
        >
          Organisational Chart
        </button>
        <button
          type="button"
          ref={(el) => { tabRefs.current.performance = el; }}
          className={`team-tab ${activeTab === "performance" ? "active" : ""}`}
          onClick={() => setActiveTab("performance")}
        >
          Our Performance
        </button>
        <span className="team-tab-indicator" style={indicatorStyle} />
        <div className="team-tab-actions">
          <button
            type="button"
            className="lang-switch-btn"
            onClick={() => setIsHindi((prev) => !prev)}
            aria-label="Language toggle"
          >
            <span className={`lang-pill ${isHindi ? "active" : ""}`}>
              <span className="lang-knob">{isHindi ? "हि" : "En"}</span>
            </span>
          </button>
        </div>
      </nav>

      {activeTab === "who" ? (
        <section className="who-card-wrap">
          <article className="who-main-card">
            <div className="who-main-photo">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <h1>HON&apos;BLE MINISTER OF STATE</h1>
            <p>(Independent Charge) of</p>
            <p className="who-bold">Ministry of Ayush and Minister of State in Ministry of</p>
            <p className="who-bold">Health and Family Welfare</p>
            <p className="who-bold">Government of India</p>
            <h2>Shri Prataprao Jadhav</h2>
          </article>

          <div className="who-link-line top" />

          <article className="who-secretary-card">
            <h3>SECRETARY</h3>
            <p>Vaidya Rajesh Kotecha</p>
          </article>

          <div className="who-link-line bottom" />

          <div className="who-officers-row">
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Ms. Monalisa Dash</p>
            </article>
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Dr. Kavita Jain</p>
            </article>
            <article className="who-officer-card">
              <h4>AS&amp;FA</h4>
              <p>Sh. Hoveyda Abbas</p>
            </article>
            <article className="who-officer-card">
              <h4>DDG</h4>
              <p>Shri Satyajit Paul</p>
            </article>
            <article className="who-officer-card">
              <h4>JS</h4>
              <p>Ms. Alarmelmangai D</p>
            </article>
          </div>
        </section>
      ) : null}

      {activeTab === "about" ? (
        <section className="about-wrap">
          <div className="about-card">
            <h2>About Ministry of Ayush</h2>
            <p>
              The Ministry of Ayush was formed on 9 November 2014 to drive the optimal development and
              propagation of India’s traditional systems of healthcare. It focuses on Ayurveda, Yoga,
              Naturopathy, Unani, Siddha, and Homeopathy, while promoting evidence-based practice,
              quality standards, and integration with modern healthcare.
            </p>
            <div className="about-grid">
              <div className="about-block">
                <h3>Vision</h3>
                <p>
                  To position Ayush systems as globally accepted, scientifically validated, and accessible
                  healthcare solutions that improve public health and wellness.
                </p>
              </div>
              <div className="about-block">
                <h3>Mission</h3>
                <ul>
                  <li>Strengthen education, research, and evidence-based practice across Ayush systems.</li>
                  <li>Ensure quality, safety, and standardization of Ayush drugs and services.</li>
                  <li>Promote preventive healthcare, wellness, and lifestyle management.</li>
                  <li>Expand access through public programs, infrastructure, and digital platforms.</li>
                </ul>
              </div>
              <div className="about-block">
                <h3>Key Priorities</h3>
                <ul>
                  <li>Capacity building and skill development for practitioners.</li>
                  <li>Clinical validation and integration with national health programs.</li>
                  <li>Public awareness and international collaboration.</li>
                  <li>Entrepreneurship and innovation in Ayush startups.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "minister" ? (
        <section className="minister-wrap">
          <div className="minister-card">
            <div className="minister-photo-large">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <div className="minister-info">
              <h2>Know the Minister</h2>
              <h3>Shri Prataprao Jadhav</h3>
              <p>
                Hon&apos;ble Minister of State (Independent Charge), Ministry of Ayush and Minister of State in
                the Ministry of Health and Family Welfare, Government of India.
              </p>
              <div className="minister-details">
                <div>
                  <span className="label">Role Focus</span>
                  <span>Policy leadership, Ayush integration, and public health programs</span>
                </div>
                <div>
                  <span className="label">Key Interests</span>
                  <span>Traditional medicine, wellness promotion, quality and research</span>
                </div>
                <div>
                  <span className="label">Office</span>
                  <span>Ministry of Ayush, Government of India</span>
                </div>
              </div>
              <div className="minister-quote">
                <p>
                  “Ayush systems carry India’s heritage of wellness. Our focus is to make them scientific,
                  accessible, and globally trusted.”
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "domains" ? (
        <section className="domains-wrap">
          <div className="domains-card">
            <h2>Ayush Domains</h2>
            <p>
              AYUSH encompasses six systems of traditional healthcare that focus on holistic well-being,
              prevention, and lifestyle management. Each domain offers distinct approaches to diagnosis,
              treatment, and wellness.
            </p>
            <div className="domains-grid">
              <article className="domain-item">
                <h3>Ayurveda</h3>
                <p>
                  India’s ancient system emphasizing balance of doshas, personalized diet, herbal
                  formulations, and therapies for long-term wellness.
                </p>
              </article>
              <article className="domain-item">
                <h3>Yoga</h3>
                <p>
                  A mind-body discipline combining postures, breath control, and meditation to enhance
                  physical strength, mental clarity, and resilience.
                </p>
              </article>
              <article className="domain-item">
                <h3>Naturopathy</h3>
                <p>
                  Focuses on the body’s self-healing capacity through nutrition, hydrotherapy, lifestyle
                  correction, and non-invasive therapies.
                </p>
              </article>
              <article className="domain-item">
                <h3>Unani</h3>
                <p>
                  Based on temperament and humor theory, using herbal, mineral, and regimen-based
                  therapies to restore harmony in the body.
                </p>
              </article>
              <article className="domain-item">
                <h3>Siddha</h3>
                <p>
                  A traditional system from South India focusing on elemental balance, herbal-mineral
                  preparations, and rejuvenation practices.
                </p>
              </article>
              <article className="domain-item">
                <h3>Homeopathy</h3>
                <p>
                  A system of medicine based on the principle of “like cures like,” using highly
                  diluted substances to stimulate healing responses.
                </p>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      {activeTab === "orgchart" ? (
        <section className="who-card-wrap orgchart-wrap">
          <article className="who-main-card orgchart-card">
            <div className="who-main-photo">
              <img src="/Prataprao-Jadhav.jpeg" alt="Shri Prataprao Jadhav" />
            </div>
            <h1>Minister of Ayush</h1>
          </article>

          <div className="who-link-line top" />

          <article className="who-secretary-card orgchart-card">
            <h3>Minister of State</h3>
          </article>

          <div className="who-link-line bottom" />

          <article className="who-secretary-card orgchart-card">
            <h3>Secretary</h3>
          </article>

          <div className="who-link-line bottom" />

          <div className="who-officers-row">
            <article className="who-officer-card">
              <h4>JS (Dr. Kavita Jain)</h4>
            </article>
            <article className="who-officer-card">
              <h4>JS (Ms. Monalisa Dash)</h4>
            </article>
            <article className="who-officer-card">
              <h4>AS &amp; FA</h4>
            </article>
            <article className="who-officer-card">
              <h4>DDG (Satyajit Paul)</h4>
            </article>
            <article className="who-officer-card">
              <h4>JS (Ms. Alarmelmangai D)</h4>
            </article>
          </div>

        </section>
      ) : null}

      {activeTab === "performance" ? (
        <section className="performance-report-wrap">
          <div className="performance-report-card">
            <h2 className="performance-title">Annual Report</h2>
            <div className="performance-table-wrap">
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Sl.No.</th>
                    <th>Session</th>
                    <th>Ministry</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceReports.map((report, index) => (
                    <tr key={`${report.session}-${report.size}`}>
                      <td>{index + 1}.</td>
                      <td>{report.session}</td>
                      <td>{report.ministry}</td>
                      <td>
                        <a className="report-link" href="#" onClick={(event) => event.preventDefault()}>
                          PDF ({report.size})
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default OurTeam;
