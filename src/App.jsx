import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import ExperimentPage from "./components/ExperimentPage.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import ExperimentsPage from "./components/ExperimentsPage.jsx";
import PlaceholderPage from "./components/PlaceholderPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="experiments" element={<ExperimentsPage />} />
        <Route path="experiments/:id" element={<ExperimentPage />} />
        <Route
          path="visuals"
          element={
            <PlaceholderPage
              titleZh="可视化模拟"
              titleEn="Visual Simulations"
              descriptionZh="探索实验动态与分子模型。"
              descriptionEn="Explore dynamic experiments and molecular models."
            />
          }
        />
        <Route
          path="path"
          element={
            <PlaceholderPage
              titleZh="学习路径"
              titleEn="Learning Path"
              descriptionZh="根据章节规划学习顺序与目标。"
              descriptionEn="Plan study sequences and goals by unit."
            />
          }
        />
        <Route
          path="about"
          element={
            <PlaceholderPage
              titleZh="关于我们"
              titleEn="About"
              descriptionZh="了解实验室教学理念与团队。"
              descriptionEn="Learn about our teaching vision and team."
            />
          }
        />
        <Route
          path="contact"
          element={
            <PlaceholderPage
              titleZh="联系"
              titleEn="Contact"
              descriptionZh="欢迎联系获取教学支持。"
              descriptionEn="Reach out for teaching support."
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
