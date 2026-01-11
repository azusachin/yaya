import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <section className="page not-found">
      <h2>{language === "zh" ? "页面未找到" : "Page not found"}</h2>
      <p>
        {language === "zh"
          ? "你访问的页面不存在，返回首页继续探索实验。"
          : "The page does not exist. Return home to explore experiments."}
      </p>
      <Link className="button" to="/">
        {language === "zh" ? "返回首页" : "Back Home"}
      </Link>
    </section>
  );
};

export default NotFound;
