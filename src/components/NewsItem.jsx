const fallbackImage =
  "https://via.placeholder.com/400x220?text=No+Image";

export default function NewsItem({ title, description, imageUrl, url, source, date }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl || fallbackImage}
        className="card-img-top"
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => (e.target.src = fallbackImage)}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">{source}</span>
        <h6 className="card-title">{title}</h6>
        <p className="card-text small text-muted">
          {description ? description.slice(0, 100) + "..." : ""}
        </p>
        <p className="card-text">
          <small className="text-muted">
            {new Date(date).toLocaleDateString()}
          </small>
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark mt-auto"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
