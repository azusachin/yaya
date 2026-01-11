import { useParams } from "react-router-dom";
import { experiments } from "../data/experiments.js";
import { useLanguage } from "./LanguageContext.jsx";
import ExperimentVisual from "./ExperimentVisual.jsx";

const ExperimentPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const experiment = experiments.find((item) => item.id === id);

  if (!experiment) {
    return (
      <div className="page">
        <h2>{language === "zh" ? "未找到实验" : "Experiment not found"}</h2>
      </div>
    );
  }

  return (
    <section className="page">
      <div className="detail">
        <div>
          <h2>{experiment.title[language]}</h2>
          <p className="equation">{experiment.equation[language]}</p>
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
        </div>
        <div className="detail__visual">
          <h3>{language === "zh" ? "可视化实验" : "Visualization"}</h3>
          <ExperimentVisual experimentId={experiment.id} />
          <p className="visual__note">
            {language === "zh"
              ? "提示：点击可视化区域以重置粒子动画。"
              : "Tip: click the visualization to reset particle motion."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperimentPage;
