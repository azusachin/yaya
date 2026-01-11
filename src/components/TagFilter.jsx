import { useLanguage } from "./LanguageContext.jsx";

const TagFilter = ({ tags, activeTag, onSelect }) => {
  const { language } = useLanguage();

  return (
    <div className="tags">
      <span className="tags__label">
        {language === "zh" ? "标签筛选" : "Filter by tag"}
      </span>
      <div className="tags__list">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={tag === activeTag ? "tag tag--active" : "tag"}
            onClick={() => onSelect(tag)}
          >
            {tag === "all" ? (language === "zh" ? "全部" : "All") : tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
