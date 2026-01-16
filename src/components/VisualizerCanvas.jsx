import { useLanguage } from "./LanguageContext.jsx";
import ExperimentVisual from "./ExperimentVisual.jsx";

const VisualizerCanvas = ({ experimentId }) => {
  const { language } = useLanguage();

  return (
    <div className="visualizer">
      <ExperimentVisual experimentId={experimentId} language={language} />
    </div>
  );
};

export default VisualizerCanvas;
