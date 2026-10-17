
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem.jsx";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export default function News({ category }) {
  // Store the news articles
  const [articles, setArticles] = useState([]);

  // Track loading
  const [loading, setLoading] = useState(true);

  // Store error messages
  const [error, setError] = useState("");

  // Get news from the API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        const url =
          `https://newsapi.org/v2/top-headlines` +
          `?country=us&category=${category}` +
          `&pageSize=12&apiKey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Could not load news");
        }

        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4">
        Top {category} Headlines
      </h4>

      {loading && <p>Loading news...</p>}

      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {articles.map((article, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              url={article.url}
              source={article.source?.name}
              date={article.publishedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
