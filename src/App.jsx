import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import ExperimentPage from "./components/ExperimentPage.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="experiments/:id" element={<ExperimentPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
