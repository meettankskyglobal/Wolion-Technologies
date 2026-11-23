import { useLayoutEffect } from 'react';
import lionLogo from '../assets/logo/lion_logo.svg';
import { initializeSiteEffects } from '../script.js';

const navigation = [
  ['About', 'about'],
  ['Solutions', 'solutions'],
  ['Industries', 'industries'],
  ['Why Wolion', 'why-wolion']
];

const industries = [
  'Information Technology',
  'Healthcare',
  'Financial Services',
  'Retail & E-commerce',
  'Manufacturing',
  'Professional Services',
  'Startups & Emerging Businesses'
];

const differentiators = [
  {
    title: 'People-first',
    description: 'We keep people and role requirements at the center of recruitment.'
  },
  {
    title: 'Flexible solutions',
    description: 'Staffing models and technology support can be shaped around the need.'
  },
  {
    title: 'Technology-driven',
    description: 'We use practical digital thinking to support delivery and operations.'
  },
  {
    title: 'Long-term relationships',
    description: 'We value clear communication and dependable ongoing collaboration.'
  }
];

const approach = ['Understand', 'Plan', 'Deliver', 'Support'];

function LogoLink({ href, label }) {
  return (
    <a className="brand" href={href} aria-label={label}>
      <img src={lionLogo} alt="" width="50" height="50" />
      <span>WOLION <b>TECHNOLOGIES</b></span>
    </a>
  );
}

function Header({ home = false, showNavigation = true }) {
  const homeHref = `${import.meta.env.BASE_URL}index.html`;
  const sectionHref = section => home ? `#${section}` : `${homeHref}#${section}`;

  return (
    <header className="site-header" id="top">
      <div className="container nav-wrap">
        <LogoLink href={home ? '#top' : `${homeHref}#top`} label="Wolion Technologies home" />
        {showNavigation && (
          <>
            <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
            <nav className="primary-nav" id="primary-nav" aria-label="Primary navigation">
              {navigation.map(([label, section]) => (
                <a key={section} href={sectionHref(section)}>{label}</a>
              ))}
              <a className="nav-cta" href={sectionHref('contact')}>Contact</a>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

function Footer({ home = false, minimal = false }) {
  const homeHref = `${import.meta.env.BASE_URL}index.html`;
  const sectionHref = section => home ? `#${section}` : `${homeHref}#${section}`;

  if (minimal) {
    return (
      <footer className="site-footer">
        <div className="container footer-bottom">
          <p>© <span id="year"></span> Wolion Technologies.</p>
          <div className="footer-contact">
            <a href="mailto:Info@woliontechnologies.com">Info@woliontechnologies.com</a>
            <a href="https://www.linkedin.com/company/woliontechnologies/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <a href="#top" className="back-top" aria-label="Back to top">↑</a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <LogoLink href={home ? '#top' : `${homeHref}#top`} label="Wolion Technologies home" />
          <p>Workforce and technology solutions shaped around business needs.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href={sectionHref('about')}>About</a>
          <a href={sectionHref('solutions')}>Solutions</a>
          <a href={sectionHref('industries')}>Industries</a>
          <a href={sectionHref('why-wolion')}>Why Wolion</a>
          <a href={sectionHref('contact')}>Contact</a>
        </div>
        <div>
          <h3>Information</h3>
          <a href={`${import.meta.env.BASE_URL}privacy.html`}>Privacy Policy</a>
          <a href={`${import.meta.env.BASE_URL}terms.html`}>Terms &amp; Conditions</a>
        </div>
        <div>
          <h3>Connect</h3>
          <a href="mailto:Info@woliontechnologies.com">Info@woliontechnologies.com</a>
          <a href="https://www.linkedin.com/company/woliontechnologies/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© <span id="year"></span> Wolion Technologies. All rights reserved.</p>
        <a href={home ? '#top' : `${homeHref}#top`} className="back-top" aria-label="Back to top">↑</a>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header home />
      <main id="main">
        <section className="hero">
          <div className="hero-glow"></div>
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span></span>People. Technology. Possibility.</div>
              <h1>Right people.<br /><em>Real impact.</em></h1>
              <p>Building possibilities through people, technology and operations.</p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">Let’s Work Together <span>↗</span></a>
                <a className="button ghost" href="#solutions">Explore Our Solutions</a>
              </div>
            </div>
            <div className="hero-visual" role="img" aria-label="Wolion Technologies logo with people, technology, and operations service areas">
              <canvas className="hero-led-canvas" aria-hidden="true"></canvas>
              <div className="core"><img src={lionLogo} alt="" /></div>
              <div className="node node-one"><b>People</b><small>Talent network</small></div>
              <div className="node node-two"><b>Technology</b><small>Digital products</small></div>
              <div className="node node-three"><b>Operations</b><small>Workflow support</small></div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <div className="about-copy reveal">
              <span className="kicker">About Wolion</span>
              <h2>Connecting people, technology,<br /><em>and business needs.</em></h2>
              <p>Wolion Technologies supports organizations with workforce solutions and practical technology services, shaped around the work they need to get done.</p>
              <p>We start by understanding the requirement, then bring together the right people and capabilities to support a clear, workable path forward.</p>
            </div>
          </div>
        </section>

        <section className="section solutions-section" id="solutions">
          <div className="container">
            <div className="section-heading split reveal">
              <div><span className="kicker">Our solutions</span><h2>People and technology,<br /><em>working together.</em></h2></div>
              <p>Focused support across hiring needs and digital delivery.</p>
            </div>
            <div className="solutions-grid">
              <article className="solution-card reveal">
                <span className="solution-icon" aria-hidden="true">01</span>
                <h3>Workforce Solutions</h3>
                <p>Recruitment support for technical and non-technical roles, with staffing models to fit your needs.</p>
                <ul>
                  <li>IT staffing and recruitment</li>
                  <li>Non-IT staffing and recruitment</li>
                  <li>Contract and permanent staffing</li>
                  <li>Recruitment support</li>
                </ul>
              </article>
              <article className="solution-card reveal">
                <span className="solution-icon" aria-hidden="true">02</span>
                <h3>Technology Solutions</h3>
                <p>Practical digital capabilities to help teams build, connect, and improve their systems.</p>
                <ul>
                  <li>Software development</li>
                  <li>Cloud and DevOps</li>
                  <li>Data and analytics</li>
                  <li>Quality assurance and testing</li>
                  <li>Integration and modernization</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section industries" id="industries">
          <div className="container">
            <div className="section-heading centered reveal">
              <span className="kicker">Industries</span>
              <h2>Experience across<br /><em>diverse business needs.</em></h2>
            </div>
            <div className="industry-grid">
              {industries.map((industry, index) => (
                <div className="industry reveal" key={industry}>
                  <span>{String(index + 1).padStart(2, '0')}</span><b>{industry}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why-wolion">
          <canvas className="why-led-canvas" aria-hidden="true"></canvas>
          <div className="container">
            <div className="section-heading split reveal">
              <div><span className="kicker">Why Wolion</span><h2>Practical support.<br /><em>Built around your needs.</em></h2></div>
              <p>Flexible workforce and technology solutions, grounded in your business requirements.</p>
            </div>
            <div className="why-grid">
              {differentiators.map(({ title, description }, index) => (
                <article className="why-card reveal" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="approach">
          <div className="container">
            <div className="section-heading split reveal">
              <div><span className="kicker">Our approach</span><h2>Clear steps.<br /><em>Steady progress.</em></h2></div>
              <p>A straightforward process keeps the work aligned from first conversation to ongoing support.</p>
            </div>
            <ol className="approach-steps">
              {approach.map((step, index) => (
                <li className="reveal" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span><h3>{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy reveal">
              <span className="kicker">Contact Wolion</span>
              <h2>Let’s talk about<br /><em>what you need.</em></h2>
              <p>For a business inquiry or candidate inquiry, send us a note. We’ll use the details to understand where to direct your request.</p>
              <div className="contact-paths">
                <a href="#inquiry-type" data-inquiry="Business inquiry"><span>Business inquiry</span><b>Discuss workforce or technology needs →</b></a>
                <a href="#inquiry-type" data-inquiry="Candidate inquiry"><span>Candidate inquiry</span><b>Share a candidate or career question →</b></a>
              </div>
            </div>
            <div className="form-panel reveal">
              <form data-integrated-form="" id="contact-form">
                <div className="form-grid">
                  <div className="field"><label htmlFor="contact-name">Name *</label><input id="contact-name" name="name" required autoComplete="name" /></div>
                  <div className="field"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" required autoComplete="email" /></div>
                  <div className="field"><label htmlFor="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" /></div>
                  <div className="field">
                    <label htmlFor="inquiry-type">Inquiry type *</label>
                    <select id="inquiry-type" name="inquiry_type" required>
                      <option value="">Choose an inquiry</option>
                      <option>Business inquiry</option>
                      <option>Candidate inquiry</option>
                    </select>
                  </div>
                  <div className="field full"><label htmlFor="contact-message">Message *</label><textarea id="contact-message" name="message" required maxLength={3000} placeholder="How can we help?" /></div>
                  <div className="consent-group field full">
                    <label className="consent-option" htmlFor="privacy-consent">
                      <input id="privacy-consent" name="privacy_consent" type="checkbox" value="accepted" required />
                      <span>I have read and agree to the <a href={`${import.meta.env.BASE_URL}privacy.html`} target="_blank" rel="noopener noreferrer">Privacy Policy</a>. *</span>
                    </label>
                    <label className="consent-option" htmlFor="terms-consent">
                      <input id="terms-consent" name="terms_consent" type="checkbox" value="accepted" required />
                      <span>I have read and agree to the <a href={`${import.meta.env.BASE_URL}terms.html`} target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>. *</span>
                    </label>
                  </div>
                  <div className="field full">
                    <button className="button primary" type="submit" data-label="Send inquiry">Send inquiry <span>→</span></button>
                    <p className="form-status" data-form-status="" role="status" aria-live="polite"></p>
                  </div>
                </div>
              </form>
              <p className="form-integration-note">Form submission requires a configured secure form endpoint. No inquiry will be reported as submitted until the endpoint is connected.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer home />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumbs"><a href={import.meta.env.BASE_URL}>Home</a> / Privacy Policy</div>
            <h1>Privacy <em>Policy</em></h1>
            <p>This policy describes the general handling of information submitted through this website. It should be reviewed and completed by the business before production use.</p>
          </div>
        </section>
        <section className="section">
          <div className="container legal-copy">
            <h2>Information you provide</h2>
            <p>Website forms may collect names, email addresses, telephone numbers, company details, service interests, messages, and files such as resumes. Information should be provided only when needed for an inquiry or candidate interest submission.</p>
            <h2>How information is used</h2>
            <p>Submitted information may be used to respond to an inquiry, assess a candidate inquiry, or support a prospective business relationship. Personal data should not be used for unrelated purposes without appropriate notice or consent.</p>
            <h2>File uploads</h2>
            <p>Resume submissions should be restricted to permitted file types and reasonable size limits. The configured submission provider must scan, retain, and delete uploads according to the organization's retention and security practices.</p>
            <h2>Security</h2>
            <p>The production form endpoint must use HTTPS, validate and sanitize server-side input, apply spam protection and rate limits, and keep provider secrets outside frontend code.</p>
            <h2>Retention and requests</h2>
            <p>The organization should publish verified retention periods and a process for privacy requests. No verified contact method has been included in this initial implementation.</p>
            <h2>Policy updates</h2>
            <p>This policy may be updated as the production website and its data practices are finalized.</p>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}

function TermsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumbs"><a href={import.meta.env.BASE_URL}>Home</a> / Terms &amp; Conditions</div>
            <h1>Terms &amp; <em>Conditions</em></h1>
            <p>These terms govern use of this website. The business should have legal counsel review the final production terms.</p>
          </div>
        </section>
        <section className="section">
          <div className="container legal-copy">
            <h2>Website use</h2>
            <p>Content is provided for general information about Wolion Technologies and its service areas. It should not be considered a service guarantee or a binding proposal.</p>
            <h2>Service descriptions</h2>
            <p>Any scope, timeline, deliverable, or commercial term requires separate written agreement. References to healthcare billing services do not imply certification or compliance status unless independently verified and stated.</p>
            <h2>Website information</h2>
            <p>Descriptions on this website summarize Wolion Technologies service areas and are provided for general information. Any specific scope or engagement requires separate discussion and written agreement.</p>
            <h2>Candidate submissions</h2>
            <p>Submitting candidate interest does not create an employment application, guarantee review, or establish that a vacancy exists.</p>
            <h2>Acceptable use</h2>
            <p>Users must not misuse forms, attempt unauthorized access, introduce malicious code, scrape protected data, or interfere with the operation of the website.</p>
            <h2>Updates</h2>
            <p>Terms may be updated as services, policies, or the production implementation change.</p>
          </div>
        </section>
      </main>
      <Footer minimal />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <Header showNavigation={false} />
      <main className="not-found">
        <div>
          <h1>404</h1>
          <h2>This page has moved.</h2>
          <p>The page you requested could not be found.</p>
          <a className="button primary" href={`${import.meta.env.BASE_URL}index.html`}>Return Home <span>→</span></a>
        </div>
      </main>
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.toLowerCase();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '').toLowerCase();
  const isHome = pathname === '/' || pathname === basePath || pathname === `${basePath}/`
    || pathname === `${basePath}/index.html` || pathname.endsWith('/index.html');
  const page = pathname.endsWith('/privacy.html')
    ? 'privacy'
    : pathname.endsWith('/terms.html')
      ? 'terms'
      : pathname.endsWith('/404.html')
        ? 'not-found'
        : isHome
          ? 'home'
          : 'not-found';

  useLayoutEffect(() => {
    const titles = {
      home: 'Right people. Real impact. | Wolion Technologies',
      privacy: 'Privacy Policy | Wolion Technologies',
      terms: 'Terms & Conditions | Wolion Technologies',
      'not-found': 'Page Not Found | Wolion Technologies'
    };
    document.title = titles[page];
    initializeSiteEffects();
  }, [page]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wolion Technologies',
    url: new URL(import.meta.env.BASE_URL, window.location.origin).href,
    logo: lionLogo,
    description: 'Business solutions across workforce services, recruitment, healthcare revenue-cycle support, software development, and career support.'
  };

  return (
    <>
      {page === 'home' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      )}
      {page === 'home' && <HomePage />}
      {page === 'privacy' && <PrivacyPage />}
      {page === 'terms' && <TermsPage />}
      {page === 'not-found' && <NotFoundPage />}
    </>
  );
}
