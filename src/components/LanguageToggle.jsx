import { useLanguage } from "./LanguageContext.jsx";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="toggle"
      type="button"
      onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
    >
      {language === "zh" ? "English" : "中文"}
    </button>
  );
};

export default LanguageToggle;
