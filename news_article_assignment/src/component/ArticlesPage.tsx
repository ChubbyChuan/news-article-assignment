import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button, Row, Col } from 'react-bootstrap';
import { Article } from "../model/model";
import axios from 'axios';

const ArticlesPage: React.FC = () => {

  const mockArticles = [
    {
      id: 1,
      title: "Introduction to React",
      summary: "Learn the basics of React, a JavaScript library for building user interfaces.",
      date: "2024-12-18T12:00:00Z",
      publisher: "Tech World"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      summary: "Explore advanced patterns and techniques in React for building scalable applications.",
      date: "2024-12-17T15:30:00Z",
      publisher: "React Mastery"
    },
    {
      id: 3,
      title: "Understanding Redux in React",
      summary: "Dive deep into state management with Redux in React applications.",
      date: "2024-12-15T09:45:00Z",
      publisher: "JS Insights"
    },
    {
      id: 4,
      title: "Web Development Best Practices",
      summary: "A guide to best practices in modern web development using JavaScript and React.",
      date: "2024-12-14T10:00:00Z",
      publisher: "Web Dev Academy"
    },
    {
      id: 5,
      title: "Mastering TypeScript",
      summary: "Understand the fundamentals of TypeScript and how it enhances JavaScript development.",
      date: "2024-12-13T14:30:00Z",
      publisher: "Code School"
    }
  ];

  // -- Routing ---
  const navigate = useNavigate();

  // --- State Management ---
  const [articles, setArticles] = useState<Article[]>([]);

  // Start getting information when the component mounts
  useEffect(() => {
    setArticles(mockArticles);
    // axios
    //   .get('https://localhost:8080/articles') 
    //   .then((response) => {
    //     setArticles(response.data); // Assuming the response data contains the array of articles
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching articles:', error);
    //   });
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (confirmDelete) {
      axios
        .delete(`https://localhost:8080/articles/${id}`)
        .then((response) => {
          alert(`Article with ID ${id} has been deleted successfully.`);
          setArticles(articles.filter((article) => article.id !== id)); // Update state to reflect the deletion
        })
        .catch((error) => {
          console.error('Error deleting article:', error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <Row>
        {articles.map((article) => (
          <Col key={article.id} sm={12} md={8} lg={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {article.publisher}
                </Card.Subtitle>
                <Card.Text>{article.summary}</Card.Text>
                <Card.Footer className="text-muted">
                  Published on: {new Date(article.date).toLocaleDateString()}
                </Card.Footer>
                <Link to="/" state={{ article }}>
                  <Button variant="primary">Update Entry</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(article.id)}>Delete Entry</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <button
        type="button"
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/")}
      >
        Go to Create/Update Page
      </button>
    </div>
  );
};

export default ArticlesPage;
