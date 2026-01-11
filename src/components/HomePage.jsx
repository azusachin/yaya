import { useMemo, useState } from "react";
import { experiments } from "../data/experiments.js";
import { useLanguage } from "./LanguageContext.jsx";
import SearchBar from "./SearchBar.jsx";
import TagFilter from "./TagFilter.jsx";
import ExperimentCard from "./ExperimentCard.jsx";

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

  return (
    <section className="page">
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
    </section>
  );
};

export default HomePage;
