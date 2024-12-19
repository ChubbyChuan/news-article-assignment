import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsArticle } from "../model/model";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewsForm: React.FC = () => {
  // -- Routing ---
  const navigate = useNavigate();

  // --- State Management ---
  const [formData, setFormData] = useState<NewsArticle>({
    title: "",
    summary: "",
    date: "",
    publisher: "",
  });

  // --- Error handling ---
  const [errors, setErrors] = useState<Partial<NewsArticle>>({});

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

    // Validation checks -> Instantiating an instance of "NewError"
    const newErrors: Partial<NewsArticle> = {};

    if (!formData.title) newErrors.title = "Title is required"; 
    // Take the negative of it. Eg. If form in "Title" is null -> string will append it to the newError Array
    
    if (!formData.summary) newErrors.summary = "Summary is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.publisher) newErrors.publisher = "Publisher is required";

    if (Object.keys(newErrors).length > 0) { //If there is no error in the newError array -> then send out
      setErrors(newErrors); // if not, save the setError into the "errors"
    } else {
      // Placeholder for Axio post request
      console.log("Form submitted with values:", formData);

      // Reset form after submit
      setFormData({
        title: "",
        summary: "",
        date: "",
        publisher: "",
      });
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Create/Update News Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}  //Check if the error.title exist
          />
          {errors.title && (            //if error.title + form.invalid Triggered -> then display whatever is in "error"
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
