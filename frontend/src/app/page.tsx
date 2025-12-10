"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  Code,
  Award,
  BadgeCheck,
  GraduationCap,
  Linkedin,
  Github,
  Link as LinkIcon,
} from "lucide-react";
import info from '@/data/personal-information.json';
import experience from '@/data/experience.json';
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              { info.name }
            </h1>
            <nav className="hidden gap-4 md:flex">
              <a
                href="#about"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                About
              </a>
              <a
                href="#experience"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Experience
              </a>
              <a
                href="#skills"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Projects
              </a>
              <a
                href="#certifications"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Certifications
              </a>
              <a
                href="#education"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Education
              </a>
              <a
                href="#contact"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-4xl font-bold text-white">
            { info.initials }
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            { info.name }
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            { info.tagline }
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <a
              href={"mailto:" + info.email}
              className="flex items-center gap-2 transition-colors hover:text-blue-600"
            >
              <Mail className="h-4 w-4" />
              { info.email }
            </a>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              { info.mobile }
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              { info.location }
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl space-y-10 px-6 pb-16">
        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h3 className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <User className="h-6 w-6 text-blue-600" />
            About Me
          </h3>
          { info.about.map((p, i) => (
          <p key={i} className="mb-4 text-lg leading-relaxed text-gray-700">
            { p }
          </p>
          ))}

          <p className="text-lg font-medium leading-relaxed text-gray-700">
            Career Objective: { info.career_objective }
          </p>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-24 space-y-6">
          <h3 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Briefcase className="h-6 w-6 text-blue-600" />
            Experience
          </h3>

          { experience.map((exp, i) => (
          <div key={i} className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl">
            <div className="mb-4 flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-800">
                  { exp.role } ({ exp.job_type })
                </h4>
                <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">
                  { exp.company } &bull; { exp.location }
                </p>
              </div>
              <span className="mt-2 font-medium text-gray-500 md:mt-0">
                { exp.duration }
              </span>
            </div>
            <p className="mb-4 text-gray-700">
              { exp.details }
            </p>
            { exp?.achievements && exp?.achievements?.length > 0 && (
              <ul className="space-y-2 text-gray-700">
                { exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-600">▹</span>
                  { achievement }
                </li>
                ))}
              </ul>
            )}
          </div>
          ))}
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24 space-y-6">
          <h3 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Code className="h-6 w-6 text-blue-600" />
            Skills
          </h3>

          {/* Languages */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-gray-800">Languages</h4>
            <div className="flex flex-wrap gap-3">
              {["PHP", "TypeScript", "JavaScript", "SQL", "HTML/CSS"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Frameworks */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-gray-800">Frameworks</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "Laravel",
                "Angular",
                "Vue",
                "React",
                "React Native",
                "Ionic",
                "Electron JS",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-gray-800">Databases</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "MySQL",
                "PostgreSQL",
                "MongoDB",
                "NoSQL",
                "Supabase",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-gray-800">Tools</h4>
            <div className="flex flex-wrap gap-3">
              {["CI/CD", "Git", "AWS", "OpenAI API"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="mb-4 text-xl font-bold text-gray-800">Expertise</h4>
            <div className="flex flex-wrap gap-3">
              {["API Design", "Web Deployment", "Mobile App Development"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 space-y-6">
          <h3 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Award className="h-6 w-6 text-blue-600" />
            Recent Projects
          </h3>

          {/* Techlify Accounting */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Techlify Accounting
              </h4>
              <a
                href="https://techlify.com/products/techlify-accounting/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                Product Link
              </a>
            </div>
            <p className="mb-4 text-gray-700">
              Contributed to the development of a cloud-based accounting platform
              built with Laravel and Angular, enabling businesses to automate
              invoicing, inventory, bookkeeping, and financial reporting. Led
              full-stack development tasks including designing REST APIs,
              implementing core accounting logic, and building responsive UI
              modules.
            </p>
          </div>

          {/* Techlify Works */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Techlify Works
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://techlify.com/products/techlify-works/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
                >
                  <LinkIcon className="h-4 w-4" />
                  Product Link
                </a>
              </div>
            </div>
            <p className="mb-4 text-gray-700">
              Contributed full-stack development (Laravel backend and Angular
              frontend) for a construction-workflow suite aimed at replacing
              spreadsheets and paperwork with a unified, real-time workspace.
              Built modules to manage jobs, milestones, employee scheduling,
              inventory integration, and cost tracking, enabling teams to monitor
              performance on live dashboards and streamline approvals.
            </p>
          </div>

          {/* Techlify Smart Dealership */}
          <div className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Techlify Smart Dealership
              </h4>
              <a
                href="https://techlify.com/products/auto-dealership-software/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                Product Link
              </a>
            </div>
            <p className="mb-4 text-gray-700">
              Developed a comprehensive auto-dealer management platform built
              with Laravel (backend) and Angular (frontend), streamlining sales,
              inventory, finance, and customer service for automotive dealerships.
              Designed and implemented REST APIs to manage vehicle stock,
              financing deals, and customer records, and built dynamic UI
              components for real-time dashboards, alerts, audit logs, and
              document generation.
            </p>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="scroll-mt-24 space-y-6">
          <h3 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <BadgeCheck className="h-6 w-6 text-blue-600" />
            Certifications
          </h3>

          {/* Machine Learning */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Machine Learning
              </h4>
              <a
                href="https://www.coursera.org/account/accomplishments/specialization/N2PE41VK1GCM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              Stanford University &bull; DeepLearning.AI &bull; Coursera &bull;
              Issued Dec 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Supervised Machine Learning: Regression and Classification,
              Advanced Learning Algorithms, Unsupervised Learning, Recommenders,
              Reinforcement Learning
            </p>
          </div>

          {/* Unsupervised Learning Algorithms */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Unsupervised Learning, Recommenders, Reinforcement Learning
              </h4>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/9ZG92RIZHYKE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              Stanford University &bull; DeepLearning.AI &bull; Coursera &bull;
              Issued Dec 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Reinforcement Learning, Unsupervised Learning, Recommenders
            </p>
          </div>

          {/* Advanced Learning Algorithms */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Advanced Learning Algorithms
              </h4>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/8OH7PHFKS3FP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              DeepLearning.AI &bull; Coursera &bull; Issued Oct 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Deep Learning, Artificial Neural Networks, TensorFlow, Supervised
              Learning, Random Forest, Classification and Regression Trees
              (CART), Machine Learning, Decision Tree Learning.
            </p>
          </div>

          {/* Supervised ML */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Supervised Machine Learning: Regression and Classification
              </h4>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/CFD27Q25MCCA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              DeepLearning.AI &bull; Coursera &bull; Issued Oct 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Scikit-learn, Supervised Learning, Regression Analysis, NumPy,
              CART, Jupyter, Predictive Modeling, Feature Engineering,
              Statistical Modeling, Applied Machine Learning.
            </p>
          </div>

          {/* Angular Routing */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Learn Angular Routing by building a Cocktails Application
              </h4>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/V8F0ID69TCZ6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              Coursera &bull; Issued Nov 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Angular, Auth Guard, Lazy Loading, Routing, Authorization, API
              Integration, Typescript
            </p>
          </div>

          {/* Junior Angular Developer */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-gray-800">
                Certified Junior Angular Developer
              </h4>
              <a
                href="https://api.certificates.dev/certificates/a06976cd-e514-4f0f-8580-7ffb6777b03d/download?signature=0cfa58150d36636cc9a59e846fa6918b9b2948854c5961342296b7d6284e3571"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                <LinkIcon className="h-4 w-4" />
                See Credentials
              </a>
            </div>
            <p className="mb-2 font-medium text-gray-700">
              Certificates.dev &bull; Issued Nov 2025
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Angular, Lazy Loading, Routing, Authorization, Typescript
            </p>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-24 space-y-6">
          <h3 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            Education
          </h3>

          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h4 className="text-2xl font-bold text-gray-800">
              Bachelor of Engg. in IT
            </h4>
            <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-semibold text-transparent">
              Gujarat Technological University
            </p>
            <p className="mb-4 text-gray-600">2009 – 2013</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-blue-600">▹</span> Built core
                foundations in software engineering, data structures, databases,
                and web technologies.
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h3 className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800">
            <Mail className="h-6 w-6 text-blue-600" />
            Get In Touch
          </h3>
          <p className="mb-8 text-lg text-gray-700">
            I&apos;m always open to discussing new opportunities, collaborations,
            or just having a chat about technology, AI, and product engineering.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:bbdangar.36@gmail.com"
              className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">bbdangar.36@gmail.com</p>
              </div>
            </a>
            <a
              href="https://wa.me/919726884692"
              className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">WhatsApp / Phone</p>
                <p className="text-gray-600">+91 97268 84692</p>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/bbdangar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <Linkedin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">LinkedIn</p>
                <p className="text-gray-600">linkedin.com/in/bbdangar</p>
              </div>
            </a>
            <a
              href="https://github.com/bbdangar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            >
              <Github className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">GitHub</p>
                <p className="text-gray-600">github.com/bbdangar</p>
              </div>
            </a>
          </div>
        </section>
      </main>
      
      {/* Floating chat widget */}
      <ChatWidget />
    </div>
  );
}
