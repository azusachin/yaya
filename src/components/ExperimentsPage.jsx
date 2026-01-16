import { useMemo, useState } from "react";
import { experiments } from "../data/experiments.js";
import { useLanguage } from "./LanguageContext.jsx";
import ExperimentCard from "./ExperimentCard.jsx";
import SearchBar from "./SearchBar.jsx";
import TagFilter from "./TagFilter.jsx";
import Seo from "./Seo.jsx";

const ExperimentsPage = () => {
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
      <Seo
        title={language === "zh" ? "实验集" : "Experiment Library"}
        description={
          language === "zh"
            ? "高中化学实验集：按单元与标签快速检索。"
            : "Experiment library with unit and tag filters."
        }
      />
      <div className="page__header">
        <div>
          <h2>{language === "zh" ? "实验集" : "Experiment Library"}</h2>
          <p>
            {language === "zh"
              ? "覆盖高一前三单元实验，支持搜索与标签筛选。"
              : "Experiments for Units 1-3 with search and tag filters."}
          </p>
        </div>
        <span className="badge">{filtered.length}</span>
      </div>

      <div className="filters">
        <SearchBar value={query} onChange={setQuery} />
        <TagFilter tags={tags} activeTag={activeTag} onSelect={setActiveTag} />
      </div>

      <div className="grid">
        {filtered.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </section>
  );
};

export default ExperimentsPage;
