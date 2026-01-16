import { createContext, useContext } from "react";

const LanguageContext = createContext({
  language: "zh",
  setLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
