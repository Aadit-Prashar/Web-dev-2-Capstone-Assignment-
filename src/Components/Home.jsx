import { useState, useEffect } from "react";
import ProductCard from "./Productcard";

export default function Home({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(["All", ...data]);
      })
      .catch(() => console.log("Could not load categories"));
  }, []);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      activeCategory === "All"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        // Map API data to our product format
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          rating: Math.round(item.rating.rate),
          reviews: item.rating.count,
          image: item.image,
          category: item.category,
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, [activeCategory]);

  // Filter by search
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#f3f3f3", minHeight: "100vh" }}>

      {/* Hero Banner */}
      {!searchQuery && (
        <div style={{
          background: "linear-gradient(135deg, #131921, #232f3e)",
          color: "white",
          padding: "40px 24px",
          textAlign: "center",
          marginBottom: "24px"
        }}>
          <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>
            Welcome to <span style={{ color: "#ff9900" }}>ShopKart</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: "16px" }}>
            Discover amazing deals on top products 🛒
          </p>
        </div>
      )}

      {/* Search Header */}
      {searchQuery !== "" && (
        <div style={{ padding: "20px 24px 0", fontSize: "18px", fontWeight: "600", color: "#0f1111" }}>
          Results for: <span style={{ color: "#ff9900" }}>"{searchQuery}"</span>
        </div>
      )}

      <div style={{ padding: "16px 24px 24px" }}>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                background: activeCategory === cat ? "#131921" : "white",
                color: activeCategory === cat ? "#ff9900" : "#333",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "13px",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
            <p style={{ color: "#555", fontSize: "16px" }}>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ textAlign: "center", padding: "60px", color: "#B12704" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>❌</div>
            <p style={{ fontSize: "16px" }}>{error}</p>
            <button
              onClick={() => setActiveCategory(activeCategory)}
              style={{
                marginTop: "12px",
                padding: "8px 20px",
                background: "#ff9900",
                border: "none",
                borderRadius: "4px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Count */}
        {!loading && !error && (
          <p style={{ fontSize: "14px", color: "#555", marginBottom: "16px" }}>
            Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <span style={{ textTransform: "capitalize" }}> in {activeCategory}</span>
            )}
          </p>
        )}

        {/* No Results */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ color: "#0f1111", marginBottom: "6px" }}>No results found</h3>
            <p>Try a different search or category.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px"
          }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}