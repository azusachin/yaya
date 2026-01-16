import { useLanguage } from "./LanguageContext.jsx";

const PlaceholderPage = ({ titleZh, titleEn, descriptionZh, descriptionEn }) => {
  const { language } = useLanguage();

  return (
    <section className="page">
      <div className="page__header">
        <div>
          <h2>{language === "zh" ? titleZh : titleEn}</h2>
          <p>{language === "zh" ? descriptionZh : descriptionEn}</p>
        </div>
      </div>
      <div className="card">
        <p>
          {language === "zh"
            ? "该模块正在建设中，将提供更多学习资源。"
            : "This module is in progress and will include more resources soon."}
        </p>
      </div>
    </section>
  );
};

export default PlaceholderPage;
