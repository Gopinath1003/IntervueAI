import { useState, useEffect, useRef } from "react";

const features = [
  { icon: "🤖", color: "#4f8ef720", iconColor: "#4f8ef7", title: "AI Mock Interviews", desc: "Conduct realistic interviews with an AI that adapts questions based on your responses, just like a real interviewer." },
  { icon: "⚙️", color: "#8b5cf620", iconColor: "#8b5cf6", title: "Technical Interview Practice", desc: "Tackle system design, database queries, and algorithm problems with curated question banks from top companies." },
  { icon: "💻", color: "#22d3ee20", iconColor: "#22d3ee", title: "Coding Assessment", desc: "Write and run code in a live environment. Get instant feedback on efficiency, readability, and edge case coverage." },
  { icon: "🧠", color: "#f59e0b20", iconColor: "#f59e0b", title: "Aptitude Test Preparation", desc: "Sharpen quantitative reasoning, logical thinking, and verbal skills with timed practice tests and detailed explanations." },
  { icon: "🎤", color: "#ec489920", iconColor: "#ec4899", title: "HR Interview Simulator", desc: "Practice behavioral questions using the STAR framework. Get scored on clarity, relevance, and emotional intelligence." },
  { icon: "📊", color: "#10b98120", iconColor: "#10b981", title: "Performance Analytics", desc: "Track improvement over time. Identify weak spots, celebrate strengths, and follow a personalized study plan." },
];

const steps = [
  { n: 1, title: "Create Account", desc: "Sign up in 30 seconds. Tell us your target role and experience level." },
  { n: 2, title: "Select Interview Type", desc: "Choose from technical, behavioral, coding, aptitude, or a full-stack simulation." },
  { n: 3, title: "Take AI Interview", desc: "Answer adaptive questions in real time. Your AI interviewer responds like a human." },
  { n: 4, title: "Get Detailed Feedback", desc: "Receive a scored report with specific improvement points and next-session goals." },
];

const categories = [
  { icon: "🖥️", title: "Software Development", desc: "OOP concepts, design patterns, architecture decisions, and technology deep dives." },
  { icon: "🌲", title: "Data Structures & Algorithms", desc: "Trees, graphs, dynamic programming, sorting — with complexity analysis coaching." },
  { icon: "🌐", title: "Web Development", desc: "React, Node, CSS, REST APIs, performance optimization, and browser internals." },
  { icon: "🔢", title: "Aptitude & Reasoning", desc: "Speed math, logical sequences, verbal reasoning, and data interpretation tests." },
  { icon: "🤝", title: "HR & Behavioral", desc: "Situational judgment, leadership stories, conflict resolution, and culture fit." },
  { icon: "💬", title: "Communication Skills", desc: "Clarity, confidence, filler-word detection, pacing, and structured storytelling." },
];

const testimonials = [
  { initials: "AK", av: "#4f8ef720", avC: "#4f8ef7", name: "Arjun Kumar", role: "Software Engineer, Google", text: "IntervueAI caught patterns in my answers that I never noticed. After 2 weeks of daily practice, I cleared the Google technical round on my first attempt." },
  { initials: "PR", av: "#8b5cf620", avC: "#8b5cf6", name: "Priya Reddy", role: "Product Manager, Flipkart", text: "The HR simulator is uncannily realistic. It pushed back on my vague answers and forced me to structure my stories better. My confidence going into interviews skyrocketed." },
  { initials: "RS", av: "#22d3ee20", avC: "#22d3ee", name: "Rahul Sharma", role: "Backend Engineer, Amazon", text: "The coding environment is smooth and the AI feedback on time complexity helped me write better solutions under pressure. Landed a role at a FAANG company after 3 weeks." },
];


const navLinks = ["Home","Features","Practice","Dashboard","Pricing","Contact"];
const footerCols = {
  Product: ["Features","Pricing","Dashboard","Changelog","Roadmap"],
  Resources: ["Blog","Interview Tips","Question Bank","Resume Builder","Documentation"],
  Company: ["About Us","Careers","Press Kit","Partnerships","Contact"],
  Legal: ["Privacy Policy","Terms of Service","Cookie Policy","GDPR"],
};

/* ─── HOOKS ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── SUB-COMPONENTS ────────────────────────────────────────── */
function Navbar({ open, setOpen }) {
  return (
    <>
      <nav className="iNav" role="navigation" aria-label="Main navigation">
        <span className="iLogo">IntervueAI</span>
        <ul className="iNavLinks" role="list">
          {navLinks.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <div className="iNavCtas">
          <button className="btnGhost navSignIn">Sign In</button>
          <button className="btnPrimary">Get Started</button>
          <button
            className="iHamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >{open ? "✕" : "☰"}</button>
        </div>
      </nav>
      <div className={`mobileMenu${open ? " open" : ""}`} aria-hidden={!open}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
        ))}
        <button className="btnPrimary" style={{ width: "fit-content" }}>Get Started</button>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="iHero" id="home" aria-label="Hero">
      <div className="iHeroGrid">
        {/* Left */}
        <div>
          <div className="heroBadge">
            <span className="badgeDot" aria-hidden="true" />
            AI-Powered Interview Coaching
          </div>
          <h1 className="iH1">
            Master Your Next<br />
            <span className="gradText">Interview</span> with AI
          </h1>
          <p className="heroSub">
            Practice technical, aptitude, HR, and coding interviews with real-time AI feedback,
            personalized insights, and performance tracking.
          </p>
          <div className="heroCtas">
            <button className="btnLg btnLgPrimary">Start Free Interview</button>
            <button className="btnLg btnLgGhost">▶ Watch Demo</button>
          </div>
          <div className="heroStats" role="list" aria-label="Key statistics">
            {[["50K+","Interviews practiced"],["94%","Success rate"],["200+","Companies covered"]].map(([n,l]) => (
              <div key={l} role="listitem">
                <div className="statNum">{n}</div>
                <div className="statLabel">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Visual */}
        <div className="heroVisual" aria-hidden="true">
          <div className="orbWrap">
            <div className="orbRing2" />
            <div className="orbRing" />
            <div className="aiOrb">🤖</div>

            <div className="floatCard" style={{ top: "-10px", right: "-20px", animation: "fcFloat 5s ease-in-out infinite" }}>
              <div className="fcLabel">Interview Score</div>
              <div className="fcScore">92%</div>
            </div>
            <div className="floatCard" style={{ bottom: "80px", left: "-70px", animation: "fcFloat 5s ease-in-out infinite 1.5s" }}>
              <div className="fcLabel">Communication</div>
              <div className="fcVal" style={{ fontSize: ".85rem" }}>
                <span className="fcDot" style={{ background: "#22c55e" }} />Excellent
              </div>
              <div className="fcBar"><div className="fcBarFill" style={{ width: "88%" }} /></div>
            </div>
            <div className="floatCard" style={{ top: "110px", left: "-75px", animation: "fcFloat 5s ease-in-out infinite 3s" }}>
              <div className="fcLabel">Coding Performance</div>
              <div className="fcVal" style={{ fontSize: ".85rem" }}>
                <span className="fcDot" style={{ background: "#4f8ef7" }} />85 / 100
              </div>
              <div className="fcBar"><div className="fcBarFill" style={{ width: "85%" }} /></div>
            </div>
            <div className="floatCard" style={{ bottom: "10px", right: "-15px", maxWidth: "140px", animation: "fcFloat 5s ease-in-out infinite 4.5s" }}>
              <div className="fcLabel">AI Suggestion</div>
              <div style={{ fontSize: ".75rem", color: "var(--text2)" }}>Improve STAR method answers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="iSectionBg reveal" id="features" aria-labelledby="feat-heading">
      <div className="sectionMax">
        <div className="sectionHeaderCenter">
          <div className="sectionLabel">What you get</div>
          <h2 className="sectionTitle" id="feat-heading">
            Everything you need to <span className="gradText">land the job</span>
          </h2>
          <p className="sectionSub">
            From mock interviews to performance analytics — IntervueAI equips you with every tool to walk in confident.
          </p>
        </div>
        <div className="featGrid">
          {features.map(f => (
            <article className="featCard" key={f.title}>
              <div className="featIcon" style={{ background: f.color, color: f.iconColor }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="iSection reveal" id="how-it-works" aria-labelledby="how-heading">
      <div className="sectionMax">
        <div className="sectionHeaderCenter">
          <div className="sectionLabel">The process</div>
          <h2 className="sectionTitle" id="how-heading">
            From signup to <span className="gradText2">offer letter</span>
          </h2>
          <p className="sectionSub">Four steps between you and your next dream role.</p>
        </div>
        <div className="stepsRow" role="list">
          {steps.map(s => (
            <div className="step" role="listitem" key={s.n}>
              <div className="stepNum" aria-hidden="true">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="iSectionBg reveal" id="practice" aria-labelledby="cats-heading">
      <div className="sectionMax">
        <div className="sectionHeader">
          <div className="sectionLabel">Practice categories</div>
          <h2 className="sectionTitle" id="cats-heading">
            Choose your <span className="gradText">challenge</span>
          </h2>
          <p className="sectionSub">Targeted practice for every stage of the interview process.</p>
        </div>
        <div className="catsGrid">
          {categories.map(c => (
            <div className="catCard" key={c.title}>
              <div className="catIcon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <button className="btnSm">Start Practice</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="iSectionBg reveal" aria-labelledby="testi-heading">
      <div className="sectionMax">
        <div className="sectionHeaderCenter">
          <div className="sectionLabel">Success stories</div>
          <h2 className="sectionTitle" id="testi-heading">
            From practice to <span className="gradText2">placement</span>
          </h2>
        </div>
        <div className="testiGrid">
          {testimonials.map(t => (
            <article className="testiCard" key={t.name}>
              <div className="stars" aria-label="5 stars">★★★★★</div>
              <p className="testiText">"{t.text}"</p>
              <div className="testiAuthor">
                <div className="avatar" style={{ background: t.av, color: t.avC }} aria-hidden="true">{t.initials}</div>
                <div>
                  <div className="authorName">{t.name}</div>
                  <div className="authorRole">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="iSection reveal" aria-label="Call to action">
      <div className="ctaBanner">
        <h2>Ready to Ace Your<br /><span className="gradText">Dream Job Interview?</span></h2>
        <p>Join thousands of candidates who practice smarter, not harder.</p>
        <button className="btnLg btnLgPrimary">Start Practicing Now — It's Free</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="iFooter" id="contact" role="contentinfo">
      <div className="footerGrid">
        <div className="footerBrand">
          <span className="iLogo">IntervueAI</span>
          <p className="footerBrandP">AI-powered interview coaching for the modern job seeker. Practice smart, land faster.</p>
          <div className="socialLinks" aria-label="Social media">
            {[["𝕏","Twitter"],["in","LinkedIn"],["⌥","GitHub"],["▶","YouTube"]].map(([icon, label]) => (
              <a key={label} href="#" className="socialLink" aria-label={label}>{icon}</a>
            ))}
          </div>
        </div>
        {Object.entries(footerCols).map(([heading, links]) => (
          <div className="footerCol" key={heading}>
            <h4>{heading}</h4>
            <ul>{links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="footerBottom">
        <p>© 2026 IntervueAI. All rights reserved.</p>
        <p style={{ color: "var(--text3)" }}>📧 hello@intervueai.com &nbsp;|&nbsp; Karur, Tamil Nadu, India</p>
      </div>
    </footer>
  );
}

/* ─── ROOT ──────────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <>
      <Navbar open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Categories />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
