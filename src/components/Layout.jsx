import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import LanguageContext from "./LanguageContext.jsx";
import Header from "./Header.jsx";

const Layout = () => {
  const [language, setLanguage] = useState("zh");
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <div className="app">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default Layout;
