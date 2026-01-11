import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";
import LanguageToggle from "./LanguageToggle.jsx";

const Header = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const title = language === "zh" ? "高中化学实验室" : "High School Chemistry Lab";
  const subtitle =
    language === "zh"
      ? "可视化实验与学习中心"
      : "Visual Experiments & Learning Hub";

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <Link className="brand" to="/">
            {title}
          </Link>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="header__actions">
          {location.pathname !== "/" && (
            <Link className="link" to="/">
              {language === "zh" ? "返回首页" : "Back to Home"}
            </Link>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
