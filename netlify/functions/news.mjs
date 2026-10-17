// Netlify Function: calls News API on the server so the API key stays secret
// and the free plan works on the live site.

const ALLOWED_CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default async (request) => {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return json({ status: "error", message: "NEWS_API_KEY is not set on Netlify" }, 500);
  }

  // Read the values sent by the React app
  const { searchParams } = new URL(request.url);
  let category = searchParams.get("category") || "general";
  if (!ALLOWED_CATEGORIES.includes(category)) category = "general";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(20, Number(searchParams.get("pageSize")) || 12);

  const apiUrl =
    `https://newsapi.org/v2/top-headlines?country=us` +
    `&category=${category}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": apiKey, "User-Agent": "NewsKart" },
    });
    const data = await response.json();
    return json(data, response.status);
  } catch (err) {
    return json({ status: "error", message: "Could not reach News API" }, 502);
  }
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
