import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsForm from "./component/NewsForm.tsx";
import ArticlesPage from "./component/ArticlesPage.tsx"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsForm />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
