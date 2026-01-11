import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import LanguageContext from "./LanguageContext.jsx";
import Header from "./Header.jsx";
import LoadingOverlay from "./LoadingOverlay.jsx";

const Layout = () => {
  const [language, setLanguage] = useState("zh");
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <div className="app">
        <LoadingOverlay />
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default Layout;
