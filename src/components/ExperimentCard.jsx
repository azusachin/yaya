import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext.jsx";

const ExperimentCard = ({ experiment }) => {
  const { language } = useLanguage();

  return (
    <article className="card">
      <div className="card__header">
        <h3>{experiment.title[language]}</h3>
        <p>{experiment.principle[language]}</p>
      </div>
      <div className="card__tags">
        {experiment.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link className="link" to={`/experiments/${experiment.id}`}>
        {language === "zh" ? "查看实验" : "View Experiment"}
      </Link>
    </article>
  );
};

export default ExperimentCard;
