import { useParams } from "react-router-dom";
import { experiments } from "../data/experiments.js";
import { useLanguage } from "./LanguageContext.jsx";
import VisualizationPanel from "./VisualizationPanel.jsx";
import { useMemo } from "react";
import Seo from "./Seo.jsx";

const ExperimentPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const experiment = experiments.find((item) => item.id === id);
  const sections = useMemo(
    () => [
      { key: "overview", zh: "简介", en: "Overview" },
      { key: "visual", zh: "可视化模拟", en: "Simulation" },
      { key: "reaction", zh: "反应解释", en: "Reaction" },
      { key: "safety", zh: "安全提示", en: "Safety" }
    ],
    []
  );

  if (!experiment) {
    return (
      <div className="page">
        <h2>{language === "zh" ? "未找到实验" : "Experiment not found"}</h2>
      </div>
    );
  }

  return (
    <section className="page">
      <Seo
        title={experiment.title[language]}
        description={`${experiment.principle[language]} ${experiment.equation[language]}`}
      />
      <div className="detail">
        <div>
          <h2>{experiment.title[language]}</h2>
          <p className="equation">{experiment.equation[language]}</p>
          <div className="detail__section">
            <h3>{language === "zh" ? "所属章节" : "Unit"}</h3>
            <p>{experiment.unit?.[language] ?? (language === "zh" ? "未标注" : "Not specified")}</p>
          </div>
          <div className="detail__section">
            <h3>{language === "zh" ? "实验原理" : "Principle"}</h3>
            <p>{experiment.principle[language]}</p>
          </div>
          <div className="detail__section">
            <h3>{language === "zh" ? "实验步骤" : "Procedure"}</h3>
            <ol>
              {experiment.steps[language].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="detail__section">
            <h3>{language === "zh" ? "反应解释" : "Reaction Notes"}</h3>
            <p>{experiment.explanation?.[language] ?? experiment.principle[language]}</p>
          </div>
          <div className="detail__section">
            <h3>{language === "zh" ? "实验器具" : "Apparatus"}</h3>
            <ul>
              {(experiment.apparatus?.[language] ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="detail__visual">
          <h3>{language === "zh" ? "可视化实验" : "Visualization"}</h3>
          <VisualizationPanel experiment={experiment} />
          <p className="visual__note">
            {language === "zh"
              ? "提示：点击可视化区域以重置粒子动画。"
              : "Tip: click the visualization to reset particle motion."}
          </p>
          <div className="step-map">
            <h4>{language === "zh" ? "学习路径" : "Learning path"}</h4>
            <div className="step-map__list">
              {sections.map((section) => (
                <span key={section.key}>
                  {language === "zh" ? section.zh : section.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="detail__section detail__safety">
        <h3>{language === "zh" ? "安全提示" : "Safety Notes"}</h3>
        <ul>
          {(experiment.safety?.[language] ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperimentPage;
