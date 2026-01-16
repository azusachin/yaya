import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext.jsx";

const LoadingOverlay = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="loading">
      <div className="loading__spinner" />
      <p>{language === "zh" ? "实验加载中..." : "Loading experiments..."}</p>
    </div>
  );
};

export default LoadingOverlay;
