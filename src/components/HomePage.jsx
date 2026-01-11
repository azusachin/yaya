import { useMemo, useState } from "react";
import { experiments } from "../data/experiments.js";
import { useLanguage } from "./LanguageContext.jsx";
import SearchBar from "./SearchBar.jsx";
import TagFilter from "./TagFilter.jsx";
import ExperimentCard from "./ExperimentCard.jsx";
import FeedbackForm from "./FeedbackForm.jsx";
import Seo from "./Seo.jsx";

const HomePage = () => {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const tags = useMemo(() => {
    const allTags = new Set();
    experiments.forEach((experiment) => {
      experiment.tags.forEach((tag) => allTags.add(tag));
    });
    return ["all", ...Array.from(allTags)];
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return experiments.filter((experiment) => {
      const matchesTag = activeTag === "all" || experiment.tags.includes(activeTag);
      const text = `${experiment.title.zh} ${experiment.title.en} ${experiment.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !normalized || text.includes(normalized);
      return matchesTag && matchesQuery;
    });
  }, [query, activeTag]);

  const modules = useMemo(
    () => [
      {
        zh: "高一必修实验模块",
        en: "Grade 10 Core Labs",
        description: {
          zh: "覆盖前三单元关键实验与安全规范。",
          en: "Core experiments across Units 1-3 with safety focus."
        }
      },
      {
        zh: "实验技能训练",
        en: "Lab Skills Training",
        description: {
          zh: "强化溶液配制、分离提纯与气体收集。",
          en: "Practice solutions, separations, and gas collection."
        }
      },
      {
        zh: "实验探究与拓展",
        en: "Inquiry Extension",
        description: {
          zh: "引导学生提出问题并设计实验方案。",
          en: "Encourage inquiry and experiment design."
        }
      }
    ],
    []
  );

  return (
    <section className="page">
      <Seo
        title={language === "zh" ? "陈韵雅的化学实验室" : "Yunya Chen's Chemistry Lab"}
        description={
          language === "zh"
            ? "高中化学实验室：可视化实验、步骤讲解与安全提示。"
            : "High school chemistry lab with visuals, step-by-step guidance, and safety notes."
        }
      />
      <div className="hero">
        <div>
          <h1>
            {language === "zh"
              ? "欢迎光临陈韵雅的化学实验室"
              : "Welcome to Yunya Chen's Chemistry Lab"}
          </h1>
          <p>
            {language === "zh"
              ? "通过动态可视化实验与双语资料，快速掌握核心概念。"
              : "Learn faster with dynamic simulations and bilingual resources."}
          </p>
        </div>
        <div className="hero__panel">
          <div>
            <span className="stat">3</span>
            <p>{language === "zh" ? "精选实验" : "Curated Experiments"}</p>
          </div>
          <div>
            <span className="stat">8</span>
            <p>{language === "zh" ? "关键标签" : "Key Tags"}</p>
          </div>
        </div>
      </div>

      <div className="hero__actions">
        <a className="button" href="/experiments">
          {language === "zh" ? "开始学习" : "Start Learning"}
        </a>
        <a className="button button--ghost" href="/experiments">
          {language === "zh" ? "查看实验导航" : "View Experiments"}
        </a>
      </div>

      <div className="banner">
        <div>
          <h2>{language === "zh" ? "化学实验可视化课堂" : "Visual Chemistry Classroom"}</h2>
          <p>
            {language === "zh"
              ? "可视化反应过程、步骤指引与安全提示，帮助你直观理解化学变化。"
              : "Visualize reactions, steps, and safety guidance for deeper understanding."}
          </p>
        </div>
        <div className="banner__graphic" aria-hidden="true">
          <span className="orb orb--blue" />
          <span className="orb orb--pink" />
          <span className="orb orb--green" />
        </div>
      </div>

      <div className="modules">
        {modules.map((module) => (
          <article key={module.zh} className="module-card">
            <h3>{language === "zh" ? module.zh : module.en}</h3>
            <p>{language === "zh" ? module.description.zh : module.description.en}</p>
          </article>
        ))}
      </div>

      <div className="filters">
        <SearchBar value={query} onChange={setQuery} />
        <TagFilter tags={tags} activeTag={activeTag} onSelect={setActiveTag} />
      </div>

      <div className="unit">
        <h2>{language === "zh" ? "高一第一学期 第一单元" : "Grade 10 Semester 1 Unit 1"}</h2>
        <p>
          {language === "zh"
            ? "物质及其变化（江苏教材）：本单元常见实验按章节整理如下。"
            : "Matter and its changes (Jiangsu textbooks): experiments organized by unit."}
        </p>
      </div>

      <div className="grid">
        {filtered.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>

      <FeedbackForm />
    </section>
  );
};

export default HomePage;
