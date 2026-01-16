import { useLanguage } from "./LanguageContext.jsx";

const SearchBar = ({ value, onChange }) => {
  const { language } = useLanguage();

  return (
    <label className="search">
      <span>{language === "zh" ? "搜索实验" : "Search"}</span>
      <input
        type="search"
        placeholder={language === "zh" ? "输入关键词或标签" : "Type keywords or tags"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};

export default SearchBar;
