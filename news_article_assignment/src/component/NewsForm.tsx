// src/components/NewsForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewsArticle {
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

const NewsForm: React.FC = () => {
  const [formData, setFormData] = useState<NewsArticle>({
    title: "",
    summary: "",
    date: "",
    publisher: "",
  });

  const [errors, setErrors] = useState<Partial<NewsArticle>>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<NewsArticle> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof NewsArticle] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting article:", formData); // Replace with database logic
      alert("Article submitted successfully!");
      setFormData({ title: "", summary: "", date: "", publisher: "" }); // Clear form
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Create/Update News Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Article Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>
        <div>
          <label>
            Article Summary:
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
            />
          </label>
          {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
        </div>
        <div>
          <label>
            Article Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </label>
          {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
        </div>
        <div>
          <label>
            Publisher Of Article:
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              required
            />
          </label>
          {errors.publisher && <p style={{ color: "red" }}>{errors.publisher}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate("/articles")}>Go to Articles Page</button>
    </div>
  );
};

export default NewsForm;
