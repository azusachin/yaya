import { useMemo, useState } from "react";
import ExperimentVisual from "./ExperimentVisual.jsx";
import { useLanguage } from "./LanguageContext.jsx";

const VisualizationPanel = ({ experiment }) => {
  const { language } = useLanguage();
  const [dropped, setDropped] = useState([]);

  const reagents = useMemo(() => {
    return experiment.reagents?.[language] ?? [];
  }, [experiment, language]);

  const handleDrop = (event) => {
    event.preventDefault();
    const reagent = event.dataTransfer.getData("text/plain");
    if (!reagent || dropped.includes(reagent)) {
      return;
    }
    setDropped((prev) => [...prev, reagent]);
  };

  const reset = () => setDropped([]);

  const reactionStatus = useMemo(() => {
    if (dropped.length === 0) {
      return language === "zh" ? "请拖放试剂开始模拟" : "Drag reagents to start";
    }
    if (dropped.length < reagents.length) {
      return language === "zh" ? "继续添加试剂观察变化" : "Add more reagents";
    }
    return language === "zh" ? "反应进行中：观察可视化变化" : "Reaction in progress";
  }, [dropped, reagents, language]);

  return (
    <div className="visual-panel">
      <ExperimentVisual experimentId={experiment.id} language={language} />
      <div className="visual-panel__controls">
        <div className="visual-panel__reagents">
          <h4>{language === "zh" ? "可拖放试剂" : "Draggable reagents"}</h4>
          <div className="reagent-list">
            {reagents.map((reagent) => (
              <span
                key={reagent}
                className="reagent"
                draggable
                onDragStart={(event) => event.dataTransfer.setData("text/plain", reagent)}
              >
                {reagent}
              </span>
            ))}
          </div>
        </div>
        <div className="visual-panel__drop">
          <div className="drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
            <p>{reactionStatus}</p>
            <div className="drop-items">
              {dropped.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <button className="link button" type="button" onClick={reset}>
            {language === "zh" ? "重置模拟" : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;
