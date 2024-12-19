import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Article } from "../model/model"; // Ensure you import Article
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const NewsForm: React.FC = () => {
  // -- Routing ---
  const navigate = useNavigate();

  // Retrieve the state from /articlepage
  const location = useLocation();
  const article = location.state?.article;

  // --- State Management ---
  const [formData, setFormData] = useState<Article>({
    id: 0, // Default value for id if it is creating.
    title: "",
    summary: "",
    date: "",
    publisher: "",
  });

  // --- Error handling ---
  const [errors, setErrors] = useState<Partial<Article>>({});

  // UseEffect to pre-fill the form when an article is passed (i.e., for editing)
  useEffect(() => {
    if (article) {
      setFormData({
        id: article.id,  // Pre-fill the ID as well if editing
        title: article.title,
        summary: article.summary,
        date: article.date,
        publisher: article.publisher,
      });
    }
  }, [article]);

  // --- Handle Form Input Changes ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // --- Handle Submit ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks -> Instantiating an instance of "ArticleError"
    const newErrors: Partial<Article> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.summary) newErrors.summary = "Summary is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.publisher) newErrors.publisher = "Publisher is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // If id is more than 0, it is an update. Post with path id variable
      const url = formData.id === 0 ?  'https://localhost:8080/articles': `https://localhost:8080/articles/${article.id}`;
 
      axios.post(url, formData)
        .then((response) => {
          console.log('Article submitted successfully:', response.data);
          alert('Entry has been submitted successfully. Entry Id: ' + response.data.id);
          setFormData({
            id: 0,
            title: "",
            summary: "",
            date: "",
            publisher: "",
          });
          navigate("/articles"); // Navigate back to articles page after submission
        })
        .catch((error) => {
          console.error('Error submitting article:', error);
          alert('Error submitting article: ' + error.message);
        });
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">{article ? "Update News Article" : "Create News Article"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}  
          />
          {errors.title && (
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="summary">
          <Form.Label>Article Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            isInvalid={!!errors.summary} 
          />
          {errors.summary && (
            <Form.Control.Feedback type="invalid">
              {errors.summary}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Article Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            isInvalid={!!errors.date}
          />
          {errors.date && (
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="publisher">
          <Form.Label>Article Publisher</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter publisher name"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            isInvalid={!!errors.publisher}
          />
          {errors.publisher && (
            <Form.Control.Feedback type="invalid">
              {errors.publisher}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <button
        type="button"
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/articles")}
      >
        Go to Articles Page
      </button>
    </div>
  );
};

export default NewsForm;
