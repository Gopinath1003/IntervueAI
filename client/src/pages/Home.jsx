import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  BarChart2,
  Mic,
  FileText,
  BookOpen,
  Target,
  ChevronRight,
  Star,
  Play,
  Globe,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

/* ── Utility ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ── Typewriter hook ── */
const INTERVIEW_LINES = [
  { role: "ai", text: "Tell me about a time you optimised a slow SQL query." },
  {
    role: "user",
    text: "I identified a missing index on a JOIN column using EXPLAIN…",
  },
  { role: "ai", text: "Great. What indexing strategy did you choose and why?" },
  {
    role: "user",
    text: "A composite index on (user_id, created_at) reduced query time by 94%.",
  },
  {
    role: "ai",
    text: "Excellent answer! Score: 92/100 ✦ Strong depth of reasoning.",
  },
];

function useTypewriter(lines) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const current = lines[lineIdx].text;
    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((d) => [...d, lines[lineIdx]]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines]);

  const typing =
    lineIdx < lines.length
      ? { ...lines[lineIdx], text: lines[lineIdx].text.slice(0, charIdx) }
      : null;

  return { displayed, typing };
}

/* ── Sub-components ── */

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const loggedIn = !!token;

  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 shadow-xl" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
              <img src="/logo.png" alt="IntervueAI Logo" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              IntervueAI
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              "Home",
              "Features",
              "How It Works",
              "Analytics",
              "Testimonials",
            ].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm bg-linear-to-r from-indigo-500 to-violet-600 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="text-sm text-slate-400 hover:text-white px-4 py-2 cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="text-sm bg-linear-to-r from-indigo-500 to-violet-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/5 px-4 pt-4 pb-6 flex flex-col gap-4">
          {["Features", "How It Works", "Analytics", "Testimonials"].map(
            (l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-slate-300 hover:text-white text-sm py-1"
                onClick={() => setOpen(false)}
              >
                {l}
              </a>
            ),
          )}
          <button className="mt-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
}

function InterviewTerminal() {
  const { displayed, typing } = useTypewriter(INTERVIEW_LINES);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayed, typing]);

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Glow halo */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl border border-white/10 bg-[#111118]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-slate-500 font-mono">
            IntervueAI · Live Session
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono">Active</span>
          </span>
        </div>

        {/* Messages */}
        <div className="p-4 flex flex-col gap-3 min-h-[280px] max-h-[320px] overflow-y-auto scrollbar-none">
          {displayed.map((line, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${line.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${line.role === "ai" ? "bg-gradient-to-br from-indigo-500 to-violet-600" : "bg-gradient-to-br from-cyan-500 to-blue-600"}`}
              >
                {line.role === "ai" ? (
                  <Bot size={13} className="text-white" />
                ) : (
                  "U"
                )}
              </div>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed
                ${
                  line.role === "ai"
                    ? "bg-white/[0.06] text-slate-200 rounded-tl-none border border-white/[0.08]"
                    : "bg-indigo-600/30 text-indigo-100 rounded-tr-none border border-indigo-500/20"
                }`}
              >
                {line.text}
              </div>
            </div>
          ))}

          {typing && (
            <div
              className={`flex gap-2.5 ${typing.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${typing.role === "ai" ? "bg-gradient-to-br from-indigo-500 to-violet-600" : "bg-gradient-to-br from-cyan-500 to-blue-600"}`}
              >
                {typing.role === "ai" ? (
                  <Bot size={13} className="text-white" />
                ) : (
                  "U"
                )}
              </div>
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed
                ${
                  typing.role === "ai"
                    ? "bg-white/[0.06] text-slate-200 rounded-tl-none border border-white/[0.08]"
                    : "bg-indigo-600/30 text-indigo-100 rounded-tr-none border border-indigo-500/20"
                }`}
              >
                {typing.text}
                <span className="inline-block w-0.5 h-3 bg-current ml-0.5 animate-pulse align-middle" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-2">
          <div className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-slate-500 font-mono">
            Type your answer or speak…
          </div>
          <button className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Mic size={12} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: <Bot size={22} />,
    label: "AI Question Generation",
    desc: "Dynamic interview questions tailored to your selected role, skill level, and target company.",
    color: "from-indigo-500 to-violet-600",
  },

  {
    icon: <BarChart2 size={22} />,
    label: "Smart Analytics",
    desc: "Track scores, identify strengths, and monitor performance trends through detailed visual insights.",
    color: "from-cyan-500 to-blue-600",
  },

  {
    icon: <Mic size={22} />,
    label: "Voice Support",
    desc: "Practice naturally with speech-to-text technology for realistic interview simulations.",
    color: "from-violet-500 to-purple-600",
  },

  {
    icon: <FileText size={22} />,
    label: "Real-Time Feedback",
    desc: "Receive instant AI-powered evaluation with actionable suggestions after every answer.",
    color: "from-emerald-500 to-teal-600",
  },

  {
    icon: <BookOpen size={22} />,
    label: "Session History",
    desc: "Access previous interviews, review feedback, and measure your growth over time.",
    color: "from-orange-500 to-amber-600",
  },

  {
    icon: <Target size={22} />,
    label: "Multi-Role Practice",
    desc: "Prepare for Java, React, Python, Data Analyst, and many other technical roles.",
    color: "from-pink-500 to-rose-600",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Choose Your Role",
    desc: "Pick your target job title. We support 30+ engineering and analyst roles with curated question banks.",
    icon: <Target size={20} />,
  },
  {
    n: "02",
    title: "Take the Interview",
    desc: "Answer AI-generated questions via text or voice in a realistic, timed interview environment.",
    icon: <Mic size={20} />,
  },
  {
    n: "03",
    title: "Get AI Feedback",
    desc: "Receive an instant score, a breakdown of strengths and gaps, and a personalised improvement plan.",
    icon: <Sparkles size={20} />,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer @ Google",
    avatar: "PS",
    rating: 5,
    quote:
      "IntervueAI completely changed how I prepared for technical rounds. The instant feedback loop meant I improved faster in two weeks than in months of solo prep.",
  },
  {
    name: "Arjun Mehta",
    role: "Data Analyst @ Flipkart",
    avatar: "AM",
    rating: 5,
    quote:
      "The voice interview mode is a game-changer. Practising spoken answers and getting scored on clarity and depth built real confidence before my final rounds.",
  },
  {
    name: "Sneha Iyer",
    role: "React Developer @ Razorpay",
    avatar: "SI",
    rating: 5,
    quote:
      "The role-specific questions are impressively accurate. Every session felt like a real interview, and the AI feedback was more actionable than any human mock I'd tried.",
  },
];

function StatCard({ target, suffix, label, active }) {
  const val = useCounter(target, 2200, active);
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-black text-white tabular-nums">
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-slate-400">{label}</div>
    </div>
  );
}

/* ── Main Page ── */
export default function IntervueAI() {
  const [statsRef, statsVisible] = useInView(0.3);
  const [featRef, featVisible] = useInView(0.1);
  const [howRef, howVisible] = useInView(0.15);
  const [ctaRef, ctaVisible] = useInView(0.2);

  return (
    <div
      className="min-h-screen bg-[#0A0A0F] text-white antialiased overflow-x-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/12 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/6 rounded-full blur-[140px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
              <Zap size={11} />
              AI-Powered Interview Training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight">
              Master Interviews
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                with AI Practice
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
              Generate role-specific questions, receive instant AI feedback,
              practise with your voice, and watch your confidence compound —
              session after session.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5">
                Start Interview <ChevronRight size={16} />
              </button>
              <button className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.07] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200">
                <Play size={14} className="text-indigo-400" /> View Demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, zIndex: 4 - i }}
                  >
                    {["P", "A", "S", "R"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-semibold">2,400+</span>{" "}
                students placed this month
              </div>
            </div>
          </div>

          {/* Right — Live Terminal */}
          <div className="lg:pl-8">
            <InterviewTerminal />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 relative" ref={featRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-600/8 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Everything you need
            </p>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Built for serious candidates
            </h2>

            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Six purpose-built tools that cover every dimension of interview
              prep — from question generation to post-session analytics.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Large Card */}
            <div
              className={`md:col-span-2 bg-[#111118]/80 border border-white/[0.08] rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1
        ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mb-6">
                {FEATURES[0].icon}
              </div>

              <h3 className="text-3xl font-bold text-white mb-3">
                {FEATURES[0].label}
              </h3>

              <p className="text-slate-400 max-w-md leading-relaxed">
                {FEATURES[0].desc}
              </p>

              <div className="absolute right-8 top-8 w-32 h-32 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <div className="text-indigo-400 scale-[2] opacity-70">
                  {FEATURES[0].icon}
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div
              className={`bg-[#111118]/80 border border-white/[0.08] rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1
        ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-6">
                {FEATURES[1].icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {FEATURES[1].label}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {FEATURES[1].desc}
              </p>
            </div>

            {/* Voice Support */}
            <div
              className={`bg-[#111118]/80 border border-white/[0.08] rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1
        ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white mb-6">
                {FEATURES[2].icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {FEATURES[2].label}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {FEATURES[2].desc}
              </p>
            </div>

            {/* Feedback */}
            <div
              className={`bg-[#111118]/80 border border-white/[0.08] rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1
        ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-6">
                {FEATURES[3].icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {FEATURES[3].label}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {FEATURES[3].desc}
              </p>
            </div>

            {/* History */}
            <div
              className={`bg-[#111118]/80 border border-white/[0.08] rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1
        ${featVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white mb-6">
                {FEATURES[4].icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {FEATURES[4].label}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {FEATURES[4].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-24 border-y border-white/[0.05] relative"
        ref={howRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Simple process
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Three steps to interview-ready
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 md:gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center text-center transition-all duration-500
                  ${howVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/25 flex items-center justify-center mb-5">
                  <div className="text-indigo-400">{s.icon}</div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-black text-white">
                    {s.n}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANALYTICS PREVIEW ── */}
      <section id="analytics" className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">
              Track every gain, spot every gap
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Your personal analytics dashboard surfaces exactly where you
              improved and where to focus next — so every session is deliberate,
              not random.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Session-by-session score trajectory",
                "Per-topic heatmaps across 12 skill axes",
                "Speaking pace & clarity metrics for voice mode",
                "Exportable PDF reports for mentors or coaches",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle
                    size={15}
                    className="text-cyan-400 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/15 to-indigo-600/15 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative rounded-2xl border border-white/10 bg-[#111118]/90 p-6 backdrop-blur-xl shadow-2xl">
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    Dashboard
                  </p>
                  <p className="text-white font-bold mt-0.5">Your Progress</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <TrendingUp size={11} /> +18% this week
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {
                    label: "Total Interviews",
                    value: "24",
                    sub: "+3 this week",
                  },
                  { label: "Avg Score", value: "82%", sub: "↑ from 71%" },
                  { label: "Best Role", value: "React", sub: "94/100" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                    <p className="text-xl font-black text-white">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div>
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wide">
                  Score trend
                </p>
                <div className="flex items-end gap-1.5 h-20">
                  {[55, 62, 58, 70, 74, 68, 80, 78, 85, 82, 90, 94].map(
                    (v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm transition-all duration-500"
                        style={{
                          height: `${v}%`,
                          background:
                            i >= 9
                              ? "linear-gradient(to top, #6366f1, #8b5cf6)"
                              : "rgba(255,255,255,0.07)",
                        }}
                      />
                    ),
                  )}
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-slate-600">
                  <span>Jan</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Social proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Candidates who made it
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/[0.07] bg-[#111118]/60 backdrop-blur-sm hover:border-white/12 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-20 border-y border-white/[0.05] relative overflow-hidden"
        ref={statsRef}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-violet-600/5 to-cyan-600/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-12 sm:gap-8">
          <StatCard
            target={10000}
            suffix="+"
            label="Interviews Conducted"
            active={statsVisible}
          />
          <StatCard
            target={95}
            suffix="%"
            label="User Satisfaction Rate"
            active={statsVisible}
          />
          <StatCard
            target={500}
            suffix="+"
            label="Questions Generated Daily"
            active={statsVisible}
          />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-cyan-600/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] rounded-full" />
        </div>

        <div
          className={`relative max-w-3xl mx-auto px-4 sm:px-6 text-center transition-all duration-700
          ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
            <Sparkles size={11} /> No credit card required
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5">
            Ready to crack your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              next interview?
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of students who used IntervueAI to walk into their
            interviews with confidence — and walk out with offers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5">
              Start Practising Now <ArrowRight size={16} />
            </button>
            <button className="flex items-center gap-2 border border-white/15 hover:border-white/25 bg-white/[0.05] hover:bg-white/[0.08] text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <span className="text-white font-bold">IntervueAI</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              {["Features", "Analytics", "History", "Contact"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {l}
                </a>
              ))}
              <a
                href="#"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Globe size={14} /> GitHub
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/[0.05] text-center text-xs text-slate-600">
            © 2026 IntervueAI. All rights reserved. Built with ❤️ for every
            placement aspirant.
          </div>
        </div>
      </footer>
    </div>
  );
}
