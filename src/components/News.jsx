import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem.jsx";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const PAGE_SIZE = 12;

export default function News({ category }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch articles from News API using the Fetch API
  const fetchNews = async (pageNo) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${pageNo}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(data.message || "Could not load news");
    }
    return data;
  };

  // Load the first page whenever the category changes
  useEffect(() => {
    setLoading(true);
    setError("");
    setArticles([]);
    setPage(1);

    fetchNews(1)
      .then((data) => {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  // Load the next page when the user scrolls down
  const loadMore = async () => {
    const nextPage = page + 1;
    try {
      const data = await fetchNews(nextPage);
      setArticles((prev) => prev.concat(data.articles));
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4">
        Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h4>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" />
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={loadMore}
        hasMore={articles.length < totalResults}
        loader={
          <div className="text-center my-4">
            <div className="spinner-border spinner-border-sm" role="status" />
          </div>
        }
      >
        <div className="row g-4">
          {articles.map((a, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={a.url + index}>
              <NewsItem
                title={a.title}
                description={a.description}
                imageUrl={a.urlToImage}
                url={a.url}
                source={a.source.name}
                date={a.publishedAt}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
