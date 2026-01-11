import { Link, NavLink, useLocation } from "react-router-dom";
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
  const navItems = [
    { to: "/", zh: "主页", en: "Home" },
    { to: "/experiments", zh: "实验集", en: "Experiments" },
    { to: "/visuals", zh: "可视化模拟", en: "Visuals" },
    { to: "/path", zh: "学习路径", en: "Learning Path" },
    { to: "/about", zh: "关于", en: "About" },
    { to: "/contact", zh: "联系", en: "Contact" }
  ];

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <Link className="brand" to="/">
            {title}
          </Link>
          <p className="subtitle">{subtitle}</p>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav__link nav__link--active" : "nav__link")}
            >
              {language === "zh" ? item.zh : item.en}
            </NavLink>
          ))}
        </nav>
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
