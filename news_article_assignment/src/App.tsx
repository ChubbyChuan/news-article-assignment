import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsForm from './component/NewsForm.tsx';
import ArticlesPage from './component/ArticlesPage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';


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