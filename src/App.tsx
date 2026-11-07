/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Code,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ChevronRight,
  Award,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  UserCheck,
  CreditCard,
  Calculator,
  RefreshCw,
  Plus,
  Trash2,
  X,
  Menu,
  GraduationCap,
  Calendar,
  Compass,
  Zap,
  Globe
} from 'lucide-react';

// Project Asset Constants
const WEARWISE_IMAGE = "/src/assets/images/project_wearwise_1794080298920.jpg";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<'wearwise' | 'voter' | 'atm' | 'grade'>('wearwise');

  // Interactive Project 1: WearWise Outfit Matcher Simulator
  const [wearWiseOccasion, setWearWiseOccasion] = useState<'casual' | 'hackathon' | 'presentation' | 'weekend'>('hackathon');
  const [wearWiseStyle, setWearWiseStyle] = useState<'minimal' | 'smart-casual' | 'relaxed'>('smart-casual');

  // Interactive Project 2: Voter Eligibility Calculator State
  const [voterAge, setVoterAge] = useState<number>(18);
  const [voterCitizen, setVoterCitizen] = useState<boolean>(true);
  const [voterRegistered, setVoterRegistered] = useState<boolean>(true);
  const [voterRegion, setVoterRegion] = useState<string>('India');

  // Interactive Project 3: ATM Management System State
  const [atmPin, setAtmPin] = useState<string>('');
  const [isAtmLoggedIn, setIsAtmLoggedIn] = useState<boolean>(false);
  const [atmPinError, setAtmPinError] = useState<string>('');
  const [atmBalance, setAtmBalance] = useState<number>(2450);
  const [atmAmountInput, setAtmAmountInput] = useState<string>('');
  const [atmActionMessage, setAtmActionMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [atmTransactions, setAtmTransactions] = useState<Array<{ id: number; type: 'Withdrawal' | 'Deposit' | 'Inquiry'; amount?: number; time: string }>>([
    { id: 1, type: 'Deposit', amount: 500, time: 'Yesterday, 14:20' },
    { id: 2, type: 'Withdrawal', amount: 200, time: '2 days ago, 18:05' }
  ]);

  // Interactive Project 4: Student Grade Calculator State
  const [courses, setCourses] = useState<Array<{ id: string; name: string; credits: number; marks: number }>>([
    { id: '1', name: 'Python & Problem Solving', credits: 4, marks: 92 },
    { id: '2', name: 'Engineering Mathematics I', credits: 4, marks: 88 },
    { id: '3', name: 'Digital Logic & Computer Org', credits: 3, marks: 85 },
    { id: '4', name: 'Engineering Physics', credits: 3, marks: 81 },
    { id: '5', name: 'Communication & Soft Skills', credits: 2, marks: 90 },
  ]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState(3);
  const [newCourseMarks, setNewCourseMarks] = useState(85);

  // Contact Form quick email preview
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gurucharankonamki13@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2400);
  };

  // ATM Handlers
  const handleAtmLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (atmPin === '1234') {
      setIsAtmLoggedIn(true);
      setAtmPinError('');
      setAtmActionMessage({ text: 'Authentication successful. Welcome, Gurucharan!', type: 'success' });
    } else {
      setAtmPinError('Invalid PIN. Use default simulation PIN: 1234');
    }
  };

  const handleAtmWithdraw = (amount: number) => {
    if (amount <= 0) return;
    if (amount > atmBalance) {
      setAtmActionMessage({ text: `Insufficient funds. Current balance: $${atmBalance}`, type: 'error' });
      return;
    }
    const newBal = atmBalance - amount;
    setAtmBalance(newBal);
    setAtmTransactions([
      { id: Date.now(), type: 'Withdrawal', amount, time: 'Just now' },
      ...atmTransactions
    ]);
    setAtmActionMessage({ text: `Successfully withdrew $${amount}. Remaining: $${newBal}`, type: 'success' });
    setAtmAmountInput('');
  };

  const handleAtmDeposit = (amount: number) => {
    if (amount <= 0) return;
    const newBal = atmBalance + amount;
    setAtmBalance(newBal);
    setAtmTransactions([
      { id: Date.now(), type: 'Deposit', amount, time: 'Just now' },
      ...atmTransactions
    ]);
    setAtmActionMessage({ text: `Successfully deposited $${amount}. New balance: $${newBal}`, type: 'success' });
    setAtmAmountInput('');
  };

  // Grade Calculator Calculations
  const getGradePoint = (marks: number) => {
    if (marks >= 90) return { grade: 'O (Outstanding)', point: 10 };
    if (marks >= 80) return { grade: 'A+ (Excellent)', point: 9 };
    if (marks >= 70) return { grade: 'A (Very Good)', point: 8 };
    if (marks >= 60) return { grade: 'B+ (Good)', point: 7 };
    if (marks >= 50) return { grade: 'B (Above Average)', point: 6 };
    if (marks >= 40) return { grade: 'C (Pass)', point: 5 };
    return { grade: 'F (Fail)', point: 0 };
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalWeightedPoints = courses.reduce((acc, c) => acc + (c.credits * getGradePoint(c.marks).point), 0);
  const calculatedGpa = totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : '0.00';

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    setCourses([
      ...courses,
      {
        id: String(Date.now()),
        name: newCourseName.trim(),
        credits: Number(newCourseCredits),
        marks: Number(newCourseMarks)
      }
    ]);
    setNewCourseName('');
    setNewCourseCredits(3);
    setNewCourseMarks(85);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  // WearWise Combinations
  const getOutfitSuggestion = () => {
    if (wearWiseOccasion === 'hackathon') {
      return {
        name: 'Sprint Ready Engineering Uniform',
        top: 'Breathable Heavyweight Cotton Tee in Sand Beige',
        layer: 'Relaxed Overshirt or Zip Fleece in Charcoal',
        bottom: 'Stretch Tech Chinos or Utility Trousers',
        shoes: 'Cushioned Ergonomic Sneakers for 36hr sprints',
        palette: ['#E8E3D9', '#3D405B', '#8D99AE', '#2B2D42'],
        vibe: 'Maximum ergonomics, long coding comfort, clean presentation appeal'
      };
    }
    if (wearWiseOccasion === 'presentation') {
      return {
        name: 'Campus Pitch & Presentation',
        top: 'Pressed Oxford Cotton Button-down in Chalk White',
        layer: 'Unstructured Tailored Blazer in Muted Navy',
        bottom: 'Tailored Ankle Trousers in Warm Slate',
        shoes: 'Minimalist Leather Derbies or Clean White Court Shoes',
        palette: ['#FFFFFF', '#2B2D42', '#C06C84', '#8D99AE'],
        vibe: 'Poised, professional yet accessible for judges and professors'
      };
    }
    if (wearWiseOccasion === 'casual') {
      return {
        name: 'Lecture Hall Daily Casual',
        top: 'Textured Waffle Knit Crewneck in Warm Oatmeal',
        layer: 'Lightweight Denim Jacket or Flannel',
        bottom: 'Straight-leg Relaxed Denim in Dark Indigo',
        shoes: 'Canvas Low-tops or Retro Runners',
        palette: ['#F4F1EA', '#334155', '#B87333', '#64748B'],
        vibe: 'Effortless everyday college mobility with coordinated tones'
      };
    }
    return {
      name: 'Weekend Developer Social',
      top: 'Minimalist Graphic Pocket Tee in Raw Ecru',
      layer: 'Cardigan in Terracotta or Olive',
      bottom: 'Comfort Fit Cargo Trousers in Stone Khaki',
      shoes: 'Suede Mules or Retro Trainers',
      palette: ['#EFECE6', '#C06C84', '#606C38', '#2B2D42'],
      vibe: 'Relaxed creative aesthetic suited for study groups & coffee shops'
    };
  };

  const outfit = getOutfitSuggestion();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B2D42] flex flex-col font-sans selection:bg-[#C06C84]/15 selection:text-[#2B2D42]">
      {/* 1. Header / Navigation: Clean 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element) */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-[#2B2D42] font-display whitespace-nowrap shrink-0 hover:text-[#C06C84] transition-colors"
          >
            Gurucharan Konamki
          </a>

          {/* Zone 2: Navigation Links (single line, unboxed, hover underline) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2B2D42]/80">
            <a href="#home" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">Home</a>
            <a href="#about" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">About Me</a>
            <a href="#skills" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">Skills</a>
            <a href="#projects" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">Projects</a>
            <a href="#achievements" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">Achievements</a>
            <a href="#contact" className="hover:text-[#2B2D42] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#C06C84]">Contact</a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2B2D42] hover:bg-[#F0ECE1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#E5E0D8] px-6 py-4 space-y-3">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              About Me
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              Projects
            </a>
            <a
              href="#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              Achievements
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#2B2D42] py-1.5"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Home Section: Hero */}
        <section id="home" className="pt-14 pb-20 md:py-24 border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-7 space-y-6">
                {/* Academic Status - Unboxed text with subtle separator */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] tracking-wide uppercase">
                  <span>1st Semester B.Tech</span>
                  <span aria-hidden="true">·</span>
                  <span>Computer Science & Engineering</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C06C84]">College Fresher</span>
                </div>

                {/* Primary Headline with text-wrap: balance */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2B2D42] font-display leading-[1.15]" style={{ textWrap: 'balance' }}>
                  Aspiring AI Engineer crafting practical software with Python and Generative AI.
                </h1>

                {/* Professional Introduction */}
                <p className="text-base sm:text-lg text-[#2B2D42]/80 leading-relaxed max-w-2xl">
                  Hi, I am <strong className="font-semibold text-[#2B2D42]">Gurucharan Konamki</strong>. As an engineering fresher, I combine foundational programming principles with modern web development and GenAI exploration, participating in hackathons to build practical, human-centric software.
                </p>

                {/* Call to Actions & Social Proof */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-all shadow-sm group"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-[#FFFFFF] border border-[#E5E0D8] text-[#2B2D42] hover:bg-[#F0ECE1] transition-all shadow-xs"
                  >
                    <Mail className="w-4 h-4 text-[#C06C84]" />
                    <span>Contact Me</span>
                  </a>
                </div>

                {/* Social Links & Quick Status */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-[#2B2D42]/80 border-t border-[#E5E0D8]/80">
                  <a
                    href="https://github.com/gurucharankonamki13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#C06C84] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>github/gurucharankonamki13</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8D99AE]" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/guru-charan-977696432/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#C06C84] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8D99AE]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Code & Architecture Terminal */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Subtle decorative backing shape in cream tones */}
                  <div className="absolute -inset-2 bg-[#F0ECE1] rounded-3xl -rotate-1 border border-[#E5E0D8]/70" />

                  {/* Terminal Card */}
                  <div className="relative bg-[#FFFFFF] rounded-2xl p-6 border border-[#E5E0D8] shadow-sm space-y-4">
                    {/* Terminal Titlebar */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E0D8]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E0D8]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E5E0D8]" />
                        <span className="ml-2 text-xs font-mono text-[#8D99AE]">main.py · Python 3.12</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C06C84] bg-[#F0ECE1] px-2 py-0.5 rounded">
                        Active Workspace
                      </span>
                    </div>

                    {/* Python Code Snippet */}
                    <div className="font-mono text-xs leading-relaxed space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#E5E0D8] overflow-x-auto text-[#2B2D42]">
                      <p><span className="text-[#C06C84]">class</span> <span className="font-bold text-[#2B2D42]">SoftwareEngineer</span>:</p>
                      <p className="pl-4"><span className="text-[#8D99AE]">def</span> <span className="text-[#2B2D42]">__init__</span>(self):</p>
                      <p className="pl-8"><span className="text-[#8D99AE]">self.developer</span> = <span className="text-[#2B2D42] font-semibold">"Gurucharan Konamki"</span></p>
                      <p className="pl-8"><span className="text-[#8D99AE]">self.status</span> = <span className="text-[#2B2D42]">"1st Sem B.Tech CSE"</span></p>
                      <p className="pl-8"><span className="text-[#8D99AE]">self.stack</span> = [<span className="text-[#2B2D42]">"Python"</span>, <span className="text-[#2B2D42]">"Web Dev"</span>, <span className="text-[#2B2D42]">"GenAI"</span>]</p>
                      <p className="pl-8"><span className="text-[#8D99AE]">self.interests</span> = [<span className="text-[#2B2D42]">"Hackathons"</span>, <span className="text-[#2B2D42]">"Ideathons"</span>]</p>
                      <p className="pt-2"><span className="text-[#8D99AE]"># Live Web Deployment</span></p>
                      <p><span className="text-[#C06C84]">def</span> <span className="text-[#2B2D42]">current_build</span>(self):</p>
                      <p className="pl-4"><span className="text-[#8D99AE]">return</span> <span className="text-[#2B2D42] font-semibold">"https://wearwise-1.onrender.com"</span></p>
                    </div>

                    {/* Quick Core Highlights Strip */}
                    <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#FDFBF7] border border-[#E5E0D8]">
                        <span className="text-[10px] text-[#8D99AE] block uppercase font-medium">Core Stack</span>
                        <span className="font-semibold text-[#2B2D42]">Python & Web Development</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#FDFBF7] border border-[#E5E0D8]">
                        <span className="text-[10px] text-[#8D99AE] block uppercase font-medium">Sprint Ready</span>
                        <span className="font-semibold text-[#2B2D42]">Hackathons & Rapid Code</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Proof Metrics Row below the Hero Split */}
            <div className="mt-14 pt-8 border-t border-[#E5E0D8] grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-medium text-[#8D99AE]">Status</span>
                <p className="text-xl font-bold text-[#2B2D42] font-display">1st Semester</p>
                <p className="text-xs text-[#2B2D42]/70">B.Tech Engineering Fresher</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-medium text-[#8D99AE]">Hackathons</span>
                <p className="text-xl font-bold text-[#2B2D42] font-display">Active Competitor</p>
                <p className="text-xs text-[#2B2D42]/70">Ideathons & 24h Build Sprints</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-medium text-[#8D99AE]">Featured Build</span>
                <p className="text-xl font-bold text-[#2B2D42] font-display">WearWise Live</p>
                <p className="text-xs text-[#2B2D42]/70">Wardrobe Matching Web App</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-medium text-[#8D99AE]">Core Toolkit</span>
                <p className="text-xl font-bold text-[#2B2D42] font-display">Python & GenAI</p>
                <p className="text-xs text-[#2B2D42]/70">Building practical workflows</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. About Me Section */}
        <section id="about" className="py-20 border-b border-[#E5E0D8] bg-[#F7F4EF]/50">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Section Header */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] uppercase tracking-wider">
                <span>01</span>
                <span aria-hidden="true">·</span>
                <span>Background & Trajectory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] font-display">
                About Me
              </h2>
              <p className="text-sm sm:text-base text-[#2B2D42]/75">
                Bridging foundational engineering mathematics with modern AI software development.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left narrative */}
              <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-[#2B2D42]/85 leading-relaxed">
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 text-[#2B2D42]">
                    <div className="p-2 rounded-lg bg-[#F0ECE1] text-[#C06C84]">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Educational Background</h3>
                      <p className="text-xs text-[#8D99AE]">Pursuing B.Tech Degree · 1st Year / 1st Semester</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#2B2D42]/80 leading-relaxed">
                    Currently in my first semester of Bachelor of Technology in Computer Science and Engineering. I am building a rigorous foundation in algorithms, computing architecture, discrete structures, and applied mathematics while proactively developing real-world software projects outside the classroom.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 text-[#2B2D42]">
                    <div className="p-2 rounded-lg bg-[#F0ECE1] text-[#C06C84]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Interests & Explorations</h3>
                      <p className="text-xs text-[#8D99AE]">Machine Learning, GenAI & Competitive Problem Solving</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#2B2D42]/80 leading-relaxed">
                    My core technical curiosities center on <strong>Generative AI applications</strong>, Python automation tools, and participating in college ideathons. I enjoy turning abstract concepts into testable web applications within tight hackathon deadlines.
                  </p>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] space-y-4 shadow-xs">
                  <div className="flex items-center gap-3 text-[#2B2D42]">
                    <div className="p-2 rounded-lg bg-[#F0ECE1] text-[#C06C84]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Learning Goals & Career Aspirations</h3>
                      <p className="text-xs text-[#8D99AE]">Long-term vision as an AI & Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#2B2D42]/80 leading-relaxed">
                    My primary goal is to bridge foundational engineering mathematics and algorithms with cutting-edge AI software development. I aim to build scalable community and real-world tech solutions that simplify everyday human challenges.
                  </p>
                </div>
              </div>

              {/* Right Column: Freshman Journey Roadmap */}
              <div className="md:col-span-5 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <h3 className="font-bold text-sm text-[#2B2D42] font-display flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C06C84]" />
                    <span>Academic & Engineering Roadmap</span>
                  </h3>
                  <span className="text-[11px] font-medium text-[#8D99AE]">2024 – 2028</span>
                </div>

                {/* Timeline Items */}
                <div className="space-y-5 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#E5E0D8]">
                  {/* Semester 1 (Current) */}
                  <div className="relative pl-7 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#C06C84] ring-4 ring-[#FFFFFF]" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2B2D42]">Semester 1 (Current)</h4>
                      <span className="text-[10px] font-semibold text-[#C06C84] bg-[#F0ECE1] px-2 py-0.5 rounded">In Progress</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Python logic mastery, web fundamentals (HTML/CSS/JS), Git workflows, WearWise deployment, and ideathon sprint participation.
                    </p>
                  </div>

                  {/* Semester 2 */}
                  <div className="relative pl-7 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#8D99AE] ring-4 ring-[#FFFFFF]" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2B2D42]">Semester 2 (Upcoming)</h4>
                      <span className="text-[10px] text-[#8D99AE]">Target Q2</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Object-oriented programming, data structures, backend REST API design with Python/Flask, and introductory prompt engineering.
                    </p>
                  </div>

                  {/* Year 2 */}
                  <div className="relative pl-7 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#D9D2C7] ring-4 ring-[#FFFFFF]" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2B2D42]">Year 2: AI & System Design</h4>
                      <span className="text-[10px] text-[#8D99AE]">Milestone</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Machine learning pipelines, relational databases, cloud hosting, and building full-stack AI-assisted tools for campus communities.
                    </p>
                  </div>

                  {/* Year 3 & 4 */}
                  <div className="relative pl-7 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#D9D2C7] ring-4 ring-[#FFFFFF]" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2B2D42]">Year 3–4: Scale & Impact</h4>
                      <span className="text-[10px] text-[#8D99AE]">Vision</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Specialized AI engineering internships, open-source contributions, and capstone software architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Skills Section */}
        <section id="skills" className="py-20 border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Section Header */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] uppercase tracking-wider">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Core Competencies</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] font-display">
                Skills & Technical Repertoire
              </h2>
              <p className="text-sm sm:text-base text-[#2B2D42]/75">
                Organized toolkit reflecting coursework, personal projects, and hackathon prototypes.
              </p>
            </div>

            {/* 3 Categorized Clean Cards (Strict zero-pill discipline) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category 1: Programming Languages */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Programming Languages</h3>
                      <p className="text-xs text-[#8D99AE]">Syntax, logic & execution</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2D42]/75 leading-relaxed">
                    Core languages leveraged for computational problem solving, data processing, and front-of-screen rendering.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Python</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Primary Logic</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Data structures, automation scripts, ATM simulation, and grading algorithms.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>JavaScript (ES6+)</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Client Interactive</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Modern asynchronous JS, DOM manipulation, event loops, and interactive UI logic.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>HTML5 & CSS3</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Semantics & Styling</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Semantic structuring, Flexbox/Grid responsive architecture, and accessible styling.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E0D8]/70 text-[11px] text-[#8D99AE] flex items-center justify-between">
                  <span>Coursework & Self-Study</span>
                  <span className="font-semibold text-[#2B2D42]">4 Core Languages</span>
                </div>
              </div>

              {/* Category 2: Technical Skills */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Technical Skills</h3>
                      <p className="text-xs text-[#8D99AE]">Engineering practices & tools</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2D42]/75 leading-relaxed">
                    Engineering methodologies applied across personal web deployments and collaborative code repositories.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Web Development</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Full Workflow</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Building responsive, mobile-first websites with clean structure and fast load times.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>REST APIs</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Data Integration</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Consuming JSON endpoints, client-server communication, and handling asynchronous requests.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Git & GitHub</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Version Control</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Branch management, pull requests, semantic commits, and open-source collaboration.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E0D8]/70 text-[11px] text-[#8D99AE] flex items-center justify-between">
                  <span>Development Standards</span>
                  <span className="font-semibold text-[#2B2D42]">Clean Codebase</span>
                </div>
              </div>

              {/* Category 3: Other Skills / Focus Areas */}
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#2B2D42]">Focus Areas & Hackathons</h3>
                      <p className="text-xs text-[#8D99AE]">Innovation & rapid creation</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#2B2D42]/75 leading-relaxed">
                    Emerging domains where I experiment with generative AI and participate in fast-paced collaborative ideathons.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Generative AI Fundamentals</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Beginner / Active</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Exploring LLM prompting, multimodal models, embedding concepts, and AI app ideation.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Hackathon Problem-Solving</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Competitive</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Deconstructing problem statements under time pressure and presenting proof-of-concepts.</p>
                    </div>

                    <div className="border border-[#E5E0D8] rounded-xl p-3 bg-[#FDFBF7]/60">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                        <span>Ideation & Rapid Prototyping</span>
                        <span className="text-[11px] font-normal text-[#8D99AE]">Design Thinking</span>
                      </div>
                      <p className="text-[11px] text-[#2B2D42]/70 mt-1">Translating abstract user pain points into tangible working wireframes and demo code.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E0D8]/70 text-[11px] text-[#8D99AE] flex items-center justify-between">
                  <span>Hackathons & Ideathons</span>
                  <span className="font-semibold text-[#2B2D42]">Product Mindset</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Projects Section: Interactive Cards with Live Links & In-Browser Working Logic */}
        <section id="projects" className="py-20 border-b border-[#E5E0D8] bg-[#F7F4EF]/40">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] uppercase tracking-wider">
                  <span>03</span>
                  <span aria-hidden="true">·</span>
                  <span>Featured Portfolio Work</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] font-display">
                  Projects & Software Builds
                </h2>
                <p className="text-sm sm:text-base text-[#2B2D42]/75">
                  Explore four software projects featuring live web apps, civic tools, financial simulations, and academic calculators with working browser demos.
                </p>
              </div>

              {/* Interactive Segmented Switcher for Projects */}
              <div className="flex items-center gap-1 p-1 bg-[#FFFFFF] rounded-xl border border-[#E5E0D8] self-start md:self-auto overflow-x-auto max-w-full">
                <button
                  onClick={() => setActiveProjectTab('wearwise')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeProjectTab === 'wearwise'
                      ? 'bg-[#2B2D42] text-[#FDFBF7] shadow-xs'
                      : 'text-[#2B2D42]/80 hover:text-[#2B2D42]'
                  }`}
                >
                  1. WearWise (Live App)
                </button>
                <button
                  onClick={() => setActiveProjectTab('voter')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeProjectTab === 'voter'
                      ? 'bg-[#2B2D42] text-[#FDFBF7] shadow-xs'
                      : 'text-[#2B2D42]/80 hover:text-[#2B2D42]'
                  }`}
                >
                  2. Voter Calculator
                </button>
                <button
                  onClick={() => setActiveProjectTab('atm')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeProjectTab === 'atm'
                      ? 'bg-[#2B2D42] text-[#FDFBF7] shadow-xs'
                      : 'text-[#2B2D42]/80 hover:text-[#2B2D42]'
                  }`}
                >
                  3. ATM System
                </button>
                <button
                  onClick={() => setActiveProjectTab('grade')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeProjectTab === 'grade'
                      ? 'bg-[#2B2D42] text-[#FDFBF7] shadow-xs'
                      : 'text-[#2B2D42]/80 hover:text-[#2B2D42]'
                  }`}
                >
                  4. Grade Calculator
                </button>
              </div>
            </div>

            {/* TAB 1: WearWise (Wardrobe & Outfit Matching Website) */}
            {activeProjectTab === 'wearwise' && (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Project Details & Live Link */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#8D99AE]">
                        <span>Full-Stack Web Application</span>
                        <span aria-hidden="true">·</span>
                        <span>Wardrobe Organization</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#C06C84] font-medium">Deploys on Render</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2B2D42] font-display">
                        WearWise: Wardrobe & Outfit Matching Website
                      </h3>
                    </div>

                    <p className="text-sm text-[#2B2D42]/85 leading-relaxed">
                      WearWise is a comprehensive web application designed to help users systematically organize their personal wardrobe items, generate harmonious color-matched outfit combinations, and eliminate daily decision fatigue.
                    </p>

                    <div className="space-y-2 text-xs text-[#2B2D42]/80">
                      <h4 className="font-semibold text-xs text-[#2B2D42]">Key Implemented Features:</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-[#2B2D42]/75">
                        <li>Digital closet inventory with categorised tops, bottoms, layers, and footwear.</li>
                        <li>Automated styling logic matching color palettes, occasions, and weather cues.</li>
                        <li>Responsive client-side interface tested across mobile and desktop devices.</li>
                        <li>Production deployment hosted on Render cloud infrastructure.</li>
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <a
                        href="https://wearwise-1.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                      >
                        <Globe className="w-4 h-4 text-[#C06C84]" />
                        <span>Open Live Website (wearwise-1.onrender.com)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href="https://github.com/gurucharankonamki13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl bg-[#FFFFFF] border border-[#E5E0D8] text-[#2B2D42] hover:bg-[#F0ECE1] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Mockup Image */}
                  <div className="lg:col-span-6">
                    <div className="rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#F0ECE1] shadow-xs">
                      <img
                        src={WEARWISE_IMAGE}
                        alt="WearWise wardrobe and outfit styling application preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover max-h-80"
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive Simulator: In-Card Outfit Matcher Engine */}
                <div className="mt-8 pt-6 border-t border-[#E5E0D8] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#2B2D42] font-display flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C06C84]" />
                        <span>Try the WearWise Matching Engine Simulator</span>
                      </h4>
                      <p className="text-xs text-[#8D99AE]">Test the core outfit pairing logic right here inside the portfolio</p>
                    </div>

                    {/* Occasion buttons */}
                    <div className="flex items-center gap-1.5 p-1 bg-[#F0ECE1] rounded-lg">
                      {(['hackathon', 'presentation', 'casual', 'weekend'] as const).map((occ) => (
                        <button
                          key={occ}
                          onClick={() => setWearWiseOccasion(occ)}
                          className={`px-2.5 py-1 text-[11px] font-medium rounded-md capitalize transition-colors ${
                            wearWiseOccasion === occ
                              ? 'bg-[#FFFFFF] text-[#2B2D42] shadow-xs font-semibold'
                              : 'text-[#2B2D42]/70 hover:text-[#2B2D42]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Match Result Display */}
                  <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#E5E0D8] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#C06C84]">
                        <span>Suggested Combination</span>
                        <span aria-hidden="true">·</span>
                        <span>{outfit.name}</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-[#2B2D42]">
                        <p><strong className="text-[#8D99AE] font-medium">Top Piece:</strong> {outfit.top}</p>
                        <p><strong className="text-[#8D99AE] font-medium">Layering / Jacket:</strong> {outfit.layer}</p>
                        <p><strong className="text-[#8D99AE] font-medium">Trouser / Bottom:</strong> {outfit.bottom}</p>
                        <p><strong className="text-[#8D99AE] font-medium">Recommended Footwear:</strong> {outfit.shoes}</p>
                      </div>
                      <p className="text-[11px] text-[#8D99AE] italic pt-1">
                        "{outfit.vibe}"
                      </p>
                    </div>

                    <div className="md:col-span-5 bg-[#FFFFFF] p-4 rounded-lg border border-[#E5E0D8] space-y-3">
                      <span className="text-[11px] font-semibold text-[#8D99AE] uppercase tracking-wide block">Harmonized Color Palette</span>
                      <div className="flex items-center gap-2">
                        {outfit.palette.map((color, i) => (
                          <div key={i} className="flex-1 text-center space-y-1">
                            <div className="h-8 rounded-md border border-[#E5E0D8] shadow-xs" style={{ backgroundColor: color }} />
                            <span className="text-[10px] text-[#8D99AE] font-mono">{color}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 text-center">
                        <span className="text-[11px] text-[#2B2D42] font-medium">WearWise Aesthetic Harmony: High (94%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Voter Eligibility Calculator */}
            {activeProjectTab === 'voter' && (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Project Details */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#8D99AE]">
                        <span>Python Logic & Civic Tool</span>
                        <span aria-hidden="true">·</span>
                        <span>Civic Tech</span>
                        <span aria-hidden="true">·</span>
                        <span>Rule Validation</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2B2D42] font-display">
                        Voter Eligibility Calculator
                      </h3>
                    </div>

                    <p className="text-sm text-[#2B2D42]/85 leading-relaxed">
                      A Python-based civic logic application designed to determine democratic voting eligibility based on statutory age thresholds, citizenship criteria, regional residency rules, and electoral roll registration status.
                    </p>

                    <div className="space-y-2 text-xs text-[#2B2D42]/80">
                      <h4 className="font-semibold text-xs text-[#2B2D42]">Logic & Computational Architecture:</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-[#2B2D42]/75">
                        <li>Strict conditional branching checking age limits ($\ge 18$ years of age).</li>
                        <li>Citizenship verification and statutory disqualification safeguards.</li>
                        <li>Electoral roll check and actionable registration advisory output.</li>
                        <li>Clean CLI and web-wrapped interface for instant civic feedback.</li>
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <a
                        href="https://github.com/gurucharankonamki13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                      >
                        <Github className="w-4 h-4" />
                        <span>Inspect Python Script on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Working Interactive Simulator */}
                  <div className="lg:col-span-6 bg-[#FDFBF7] p-6 rounded-xl border border-[#E5E0D8] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                      <h4 className="font-bold text-sm text-[#2B2D42] flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#C06C84]" />
                        <span>Live Eligibility Simulator</span>
                      </h4>
                      <span className="text-[11px] font-mono text-[#8D99AE]">Python Logic Core</span>
                    </div>

                    {/* Interactive Form Controls */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-[#2B2D42] mb-1.5">
                          <span>Applicant Age</span>
                          <span className="font-mono font-bold text-[#C06C84]">{voterAge} years old</span>
                        </div>
                        <input
                          type="range"
                          min="14"
                          max="80"
                          value={voterAge}
                          onChange={(e) => setVoterAge(Number(e.target.value))}
                          className="w-full accent-[#2B2D42] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-[#8D99AE]">
                          <span>14 (Minor)</span>
                          <span>18 (Legal Threshold)</span>
                          <span>80 (Senior Citizen)</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-xs font-medium text-[#2B2D42] mb-1">Citizenship</label>
                          <select
                            value={voterCitizen ? 'yes' : 'no'}
                            onChange={(e) => setVoterCitizen(e.target.value === 'yes')}
                            className="w-full text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                          >
                            <option value="yes">Citizen (Eligible)</option>
                            <option value="no">Non-Citizen</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#2B2D42] mb-1">Electoral Roll Registered</label>
                          <select
                            value={voterRegistered ? 'yes' : 'no'}
                            onChange={(e) => setVoterRegistered(e.target.value === 'yes')}
                            className="w-full text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                          >
                            <option value="yes">Yes (Voter Card Ready)</option>
                            <option value="no">No (Unregistered)</option>
                          </select>
                        </div>
                      </div>

                      {/* Eligibility Evaluation Box */}
                      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                        voterAge >= 18 && voterCitizen && voterRegistered
                          ? 'bg-[#FFFFFF] border-[#8D99AE]/50 text-[#2B2D42]'
                          : voterAge >= 18 && voterCitizen && !voterRegistered
                          ? 'bg-[#FFFFFF] border-[#C06C84]/60 text-[#2B2D42]'
                          : 'bg-[#FFFFFF] border-[#E5E0D8] text-[#2B2D42]'
                      }`}>
                        <div className="flex items-center justify-between font-bold">
                          <span>Civic Verdict:</span>
                          {voterAge >= 18 && voterCitizen && voterRegistered ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Fully Eligible to Vote
                            </span>
                          ) : voterAge >= 18 && voterCitizen && !voterRegistered ? (
                            <span className="text-[#C06C84] font-semibold">
                              Age Qualified · Needs Voter Registration
                            </span>
                          ) : (
                            <span className="text-[#8D99AE] font-semibold">
                              Ineligible to Vote
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-[#2B2D42]/80 leading-relaxed">
                          {voterAge < 18
                            ? `Applicant is ${18 - voterAge} year(s) below the constitutional minimum age of 18.`
                            : !voterCitizen
                            ? 'Voting in democratic national and regional elections requires registered statutory citizenship.'
                            : !voterRegistered
                            ? 'Applicant meets age and citizenship requirements. Must complete Form 6 voter enrollment before polling day.'
                            : 'All statutory criteria met: Age verified (18+), citizenship confirmed, and active electoral roll enrollment detected.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ATM Management System */}
            {activeProjectTab === 'atm' && (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Project Details */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#8D99AE]">
                        <span>Software Simulation</span>
                        <span aria-hidden="true">·</span>
                        <span>Transaction Security</span>
                        <span aria-hidden="true">·</span>
                        <span>Banking Logic</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2B2D42] font-display">
                        ATM Management System
                      </h3>
                    </div>

                    <p className="text-sm text-[#2B2D42]/85 leading-relaxed">
                      A software simulation handling secure user authentication, balance inquiries, cash deposits, and withdrawal transactions with transaction history logging and edge-case validation.
                    </p>

                    <div className="space-y-2 text-xs text-[#2B2D42]/80">
                      <h4 className="font-semibold text-xs text-[#2B2D42]">Core Features & Business Logic:</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-[#2B2D42]/75">
                        <li>PIN encryption and multi-attempt authentication safeguard.</li>
                        <li>Real-time balance deduction with zero and overdraft limit protection.</li>
                        <li>Audit log recording timestamped deposits, cash withdrawals, and slips.</li>
                        <li>Modular architecture demonstrating OOP classes for Accounts and Transactions.</li>
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <a
                        href="https://github.com/gurucharankonamki13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Repository on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Working ATM Terminal Interface */}
                  <div className="lg:col-span-6 bg-[#FDFBF7] p-6 rounded-xl border border-[#E5E0D8] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                      <h4 className="font-bold text-sm text-[#2B2D42] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#C06C84]" />
                        <span>Interactive ATM Terminal</span>
                      </h4>
                      <span className="text-[11px] font-mono text-[#8D99AE]">Demo Mode (PIN: 1234)</span>
                    </div>

                    {!isAtmLoggedIn ? (
                      /* Login Screen */
                      <form onSubmit={handleAtmLogin} className="space-y-4">
                        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5E0D8] space-y-3">
                          <label className="block text-xs font-semibold text-[#2B2D42]">
                            Enter 4-Digit Security PIN
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={atmPin}
                            onChange={(e) => setAtmPin(e.target.value)}
                            placeholder="Enter 1234"
                            className="w-full text-center text-lg tracking-widest font-mono p-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                          />
                          {atmPinError && (
                            <p className="text-xs text-[#C06C84] text-center font-medium">{atmPinError}</p>
                          )}
                          <p className="text-[11px] text-[#8D99AE] text-center">
                            Test Simulation PIN: <strong className="text-[#2B2D42]">1234</strong>
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                        >
                          Authenticate Card & Access Account
                        </button>
                      </form>
                    ) : (
                      /* Logged In Dashboard */
                      <div className="space-y-4">
                        {/* Account Balance Card */}
                        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5E0D8] flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-[#8D99AE] uppercase tracking-wider block">Available Balance</span>
                            <span className="text-2xl font-bold font-display text-[#2B2D42] tabular-nums">
                              ${atmBalance.toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setIsAtmLoggedIn(false);
                              setAtmPin('');
                              setAtmActionMessage(null);
                            }}
                            className="text-xs font-medium text-[#C06C84] hover:underline"
                          >
                            Eject Card
                          </button>
                        </div>

                        {/* Status Message */}
                        {atmActionMessage && (
                          <div className={`p-2.5 rounded-lg text-xs font-medium ${
                            atmActionMessage.type === 'success'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {atmActionMessage.text}
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#2B2D42]">Quick Cash Withdrawal</label>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => handleAtmWithdraw(50)}
                              className="py-1.5 px-3 text-xs bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg font-medium hover:bg-[#F0ECE1] transition-colors text-[#2B2D42]"
                            >
                              -$50
                            </button>
                            <button
                              onClick={() => handleAtmWithdraw(100)}
                              className="py-1.5 px-3 text-xs bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg font-medium hover:bg-[#F0ECE1] transition-colors text-[#2B2D42]"
                            >
                              -$100
                            </button>
                            <button
                              onClick={() => handleAtmWithdraw(200)}
                              className="py-1.5 px-3 text-xs bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg font-medium hover:bg-[#F0ECE1] transition-colors text-[#2B2D42]"
                            >
                              -$200
                            </button>
                          </div>
                        </div>

                        {/* Custom Deposit or Withdraw */}
                        <div className="space-y-2 pt-1">
                          <label className="block text-xs font-semibold text-[#2B2D42]">Custom Transaction</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min="10"
                              placeholder="Amount in $"
                              value={atmAmountInput}
                              onChange={(e) => setAtmAmountInput(e.target.value)}
                              className="flex-1 text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                            />
                            <button
                              onClick={() => handleAtmWithdraw(Number(atmAmountInput))}
                              className="px-3 py-2 text-xs font-semibold bg-[#FFFFFF] border border-[#E5E0D8] text-[#2B2D42] rounded-lg hover:bg-[#F0ECE1]"
                            >
                              Withdraw
                            </button>
                            <button
                              onClick={() => handleAtmDeposit(Number(atmAmountInput))}
                              className="px-3 py-2 text-xs font-semibold bg-[#2B2D42] text-[#FDFBF7] rounded-lg hover:bg-[#1A1A1A]"
                            >
                              Deposit
                            </button>
                          </div>
                        </div>

                        {/* Recent Transactions Receipt */}
                        <div className="pt-2 border-t border-[#E5E0D8]">
                          <span className="text-[11px] font-semibold text-[#8D99AE] block mb-1">Recent Activity Log:</span>
                          <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                            {atmTransactions.slice(0, 3).map((tx) => (
                              <div key={tx.id} className="flex justify-between items-center text-[11px] text-[#2B2D42]/80 bg-[#FFFFFF] px-2 py-1 rounded border border-[#E5E0D8]/60">
                                <span>{tx.type} {tx.amount ? `($${tx.amount})` : ''}</span>
                                <span className="text-[#8D99AE] font-mono">{tx.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Student Grade Calculator */}
            {activeProjectTab === 'grade' && (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Project Details */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#8D99AE]">
                        <span>Academic Automation Tool</span>
                        <span aria-hidden="true">·</span>
                        <span>GPA & Credit Breakdown</span>
                        <span aria-hidden="true">·</span>
                        <span>Analytics</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#2B2D42] font-display">
                        Student Grade Calculator
                      </h3>
                    </div>

                    <p className="text-sm text-[#2B2D42]/85 leading-relaxed">
                      An automated grading tool that processes course scores, calculates cumulative and semester grade point averages (GPA / SGPA), and provides detailed performance breakdowns aligned with engineering credit schemas.
                    </p>

                    {/* Live Computed GPA Stat Card */}
                    <div className="p-5 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-2">
                      <span className="text-xs uppercase font-medium text-[#8D99AE]">Calculated Semester GPA</span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold font-display text-[#2B2D42] tabular-nums">
                          {calculatedGpa}
                        </span>
                        <span className="text-xs font-semibold text-[#C06C84]">
                          {Number(calculatedGpa) >= 8.5 ? 'First Class with Distinction' : 'First Class Standing'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8D99AE]">
                        Based on {courses.length} courses and {totalCredits} cumulative credit units.
                      </p>
                    </div>

                    <div className="pt-1 flex items-center gap-4">
                      <a
                        href="https://github.com/gurucharankonamki13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Repository on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Working Course Grade Manager */}
                  <div className="lg:col-span-7 bg-[#FDFBF7] p-6 rounded-xl border border-[#E5E0D8] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                      <h4 className="font-bold text-sm text-[#2B2D42] flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#C06C84]" />
                        <span>Course Performance Table</span>
                      </h4>
                      <span className="text-[11px] font-mono text-[#8D99AE]">10-Point UGC Scale</span>
                    </div>

                    {/* Courses List */}
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {courses.map((course) => {
                        const gp = getGradePoint(course.marks);
                        return (
                          <div
                            key={course.id}
                            className="flex items-center justify-between gap-3 p-3 bg-[#FFFFFF] rounded-xl border border-[#E5E0D8] text-xs"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#2B2D42] truncate">{course.name}</p>
                              <p className="text-[11px] text-[#8D99AE]">
                                {course.credits} Credits · {course.marks} Marks
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="font-bold text-[#2B2D42] block">{gp.grade}</span>
                                <span className="text-[10px] text-[#8D99AE] font-mono font-medium">{gp.point} GP</span>
                              </div>

                              <button
                                onClick={() => handleRemoveCourse(course.id)}
                                className="p-1 text-[#8D99AE] hover:text-[#C06C84] transition-colors"
                                title="Remove course"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add Custom Course Form */}
                    <form onSubmit={handleAddCourse} className="pt-3 border-t border-[#E5E0D8] space-y-3">
                      <span className="text-[11px] font-semibold text-[#8D99AE] block">Add Another Course Subject</span>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Course title (e.g. Data Structures)"
                          value={newCourseName}
                          onChange={(e) => setNewCourseName(e.target.value)}
                          className="sm:col-span-6 text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                        />
                        <select
                          value={newCourseCredits}
                          onChange={(e) => setNewCourseCredits(Number(e.target.value))}
                          className="sm:col-span-3 text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42]"
                        >
                          <option value={1}>1 Credit</option>
                          <option value={2}>2 Credits</option>
                          <option value={3}>3 Credits</option>
                          <option value={4}>4 Credits</option>
                        </select>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Marks (0-100)"
                          value={newCourseMarks}
                          onChange={(e) => setNewCourseMarks(Number(e.target.value))}
                          className="sm:col-span-3 text-xs p-2 bg-[#FFFFFF] border border-[#E5E0D8] rounded-lg text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Subject & Recalculate</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. Achievements Section */}
        <section id="achievements" className="py-20 border-b border-[#E5E0D8]">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Section Header */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] uppercase tracking-wider">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Milestones & Recognitions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] font-display">
                Achievements & Hackathons
              </h2>
              <p className="text-sm sm:text-base text-[#2B2D42]/75">
                Active track record in college ideathons, collaborative sprint competitions, and planned certifications.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Hackathons & Ideathons */}
              <div className="bg-[#FFFFFF] p-6 sm:p-7 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#2B2D42]">Hackathons & Ideathons</h3>
                    <p className="text-xs text-[#8D99AE]">Active competitor & sprint builder</p>
                  </div>
                </div>

                <p className="text-sm text-[#2B2D42]/80 leading-relaxed">
                  Regular participant in college-level and inter-university technical hackathons and ideathons, focusing on rapid prototyping, problem discovery, and AI-driven solutions.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                      <span>Inter-College Ideathon Competitions</span>
                      <span className="text-[11px] font-normal text-[#C06C84]">Participant</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Pitched AI-assisted lifestyle and educational tools, creating wireframes and prototype architectures within fast 24-hour team sessions.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                      <span>Rapid Web Prototyping Sprints</span>
                      <span className="text-[11px] font-normal text-[#8D99AE]">College Sprints</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Delivered functional frontend codebases, integrated APIs, and successfully presented working software demos to evaluation panels.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#8D99AE] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C06C84]" />
                  <span>Passionate about human-centered design in high-pressure team environments</span>
                </div>
              </div>

              {/* Card 2: Certifications & Academic Milestones */}
              <div className="bg-[#FFFFFF] p-6 sm:p-7 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#2B2D42]">Certifications & Workshops</h3>
                    <p className="text-xs text-[#8D99AE]">1st-Year Academic & Technical Credentials</p>
                  </div>
                </div>

                <p className="text-sm text-[#2B2D42]/80 leading-relaxed">
                  Continuous upskilling through certified technical coursework, industry workshops, and core computer science curricula.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                      <span>Python for Data Science & Applied AI</span>
                      <span className="text-[10px] font-semibold text-[#8D99AE] bg-[#F0ECE1] px-2 py-0.5 rounded">In Progress</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Comprehensive focus on NumPy, Pandas, scripting automation, and computational logic foundations.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                      <span>Generative AI Fundamentals & Prompting</span>
                      <span className="text-[10px] font-semibold text-[#8D99AE] bg-[#F0ECE1] px-2 py-0.5 rounded">Target Q1 2025</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      Understanding transformer foundations, LLM tokenomics, and practical multimodal tool orchestration.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E0D8] space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2B2D42]">
                      <span>Git, GitHub & Open-Source Collaboration Workshop</span>
                      <span className="text-[10px] font-semibold text-[#2B2D42] bg-[#E5E0D8] px-2 py-0.5 rounded">Completed</span>
                    </div>
                    <p className="text-xs text-[#2B2D42]/75">
                      College departmental workshop covering merge conflicts, pull request reviews, and continuous delivery.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#8D99AE] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#C06C84]" />
                  <span>Tracking 1st Year B.Tech milestone checklist</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact Section */}
        <section id="contact" className="py-20 bg-[#F7F4EF]/50">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            {/* Section Header */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8D99AE] uppercase tracking-wider">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Let's Connect</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2D42] font-display">
                Get In Touch
              </h2>
              <p className="text-sm sm:text-base text-[#2B2D42]/75">
                Whether you're looking for a hackathon teammate, discussing AI projects, or offering mentorship, I would love to connect.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Contact Info & Developer Links */}
              <div className="lg:col-span-5 space-y-5">
                {/* Email Direct Card */}
                <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F0ECE1] text-[#C06C84]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2B2D42]">Email Address</h3>
                      <p className="text-xs text-[#8D99AE]">Direct inquiry & collaboration</p>
                    </div>
                  </div>

                  <a
                    href="mailto:gurucharankonamki13@gmail.com"
                    className="block text-sm font-semibold text-[#2B2D42] hover:text-[#C06C84] transition-colors break-all"
                  >
                    gurucharankonamki13@gmail.com
                  </a>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="mailto:gurucharankonamki13@gmail.com"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-[#FDFBF7] border border-[#E5E0D8] text-[#2B2D42] hover:bg-[#F0ECE1] transition-colors"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#8D99AE]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Developer Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/gurucharankonamki13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5E0D8] hover:border-[#8D99AE] transition-all shadow-xs group block space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-[#F0ECE1] text-[#2B2D42] group-hover:text-[#C06C84] transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8D99AE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2B2D42]">GitHub</h4>
                      <p className="text-[11px] text-[#8D99AE]">gurucharankonamki13</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/guru-charan-977696432/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5E0D8] hover:border-[#8D99AE] transition-all shadow-xs group block space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-[#F0ECE1] text-[#2B2D42] group-hover:text-[#C06C84] transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8D99AE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2B2D42]">LinkedIn</h4>
                      <p className="text-[11px] text-[#8D99AE]">guru-charan-977696432</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Quick Message Generator */}
              <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-7 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-5">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#2B2D42] font-display">
                    Quick Message Composer
                  </h3>
                  <p className="text-xs text-[#8D99AE]">
                    Draft a message to launch your default mail client with pre-formatted details.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2B2D42] mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson (Hackathon Organizer / Mentor)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2B2D42] mb-1.5">
                      Your Message or Collaboration Proposal
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Hi Gurucharan, I came across your WearWise project and your 1st-year roadmap. I'd love to chat about..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-[#2B2D42] focus:outline-none focus:border-[#2B2D42]"
                    />
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:gurucharankonamki13@gmail.com?subject=${encodeURIComponent(
                        contactName ? `Portfolio Inquiry from ${contactName}` : 'Portfolio Collaboration Inquiry'
                      )}&body=${encodeURIComponent(
                        contactMessage || 'Hi Gurucharan, I viewed your portfolio and would like to connect.'
                      )}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#2B2D42] text-[#FDFBF7] hover:bg-[#1A1A1A] transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C06C84]" />
                      <span>Launch in Email App</span>
                    </a>

                    <span className="text-[11px] text-[#8D99AE]">
                      Direct to gurucharankonamki13@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer: Quiet copyright, student credit, and back to top */}
      <footer className="border-t border-[#E5E0D8] bg-[#FDFBF7] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2B2D42]/70">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-[#2B2D42]">
              Gurucharan Konamki · B.Tech Student Portfolio
            </p>
            <p className="text-[11px] text-[#8D99AE]">
              © {new Date().getFullYear()} Gurucharan Konamki. Built with clean, accessible pastel architecture.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/gurucharankonamki13"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B2D42] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/guru-charan-977696432/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B2D42] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#home"
              className="inline-flex items-center gap-1 hover:text-[#2B2D42] transition-colors font-medium"
            >
              <span>Back to Top</span>
              <ChevronRight className="w-3.5 h-3.5 -rotate-90" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
