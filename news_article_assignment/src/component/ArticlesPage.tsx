import React from "react";
import { Link } from "react-router-dom";

const ArticlesPage: React.FC = () => {
  return (
    <div>
      <h1>Articles</h1>
      <p>Display the articles placeholder</p>
      <Link to="/">Back to Form</Link>
    </div>
  );
};

export default ArticlesPage;
