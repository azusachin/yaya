import { useLanguage } from "./LanguageContext.jsx";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <div>
        <h4>{language === "zh" ? "陈韵雅的化学实验室" : "Yunya Chen's Chemistry Lab"}</h4>
        <p>
          {language === "zh"
            ? "面向高中生的可视化实验教学平台。"
            : "A visual lab platform for high school chemistry."}
        </p>
      </div>
      <div className="footer__links">
        <span>{language === "zh" ? "实验安全" : "Lab Safety"}</span>
        <span>{language === "zh" ? "教学支持" : "Teaching Support"}</span>
        <span>{language === "zh" ? "联系邮箱" : "Contact"}</span>
      </div>
    </footer>
  );
};

export default Footer;
