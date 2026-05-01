import ProductCard from "./Productcard";

const products = [
  { id: 1, name: "Wireless Earbuds Pro", price: 29.99, rating: 4, reviews: 1240, image: "https://placehold.co/200" },
  { id: 2, name: "Smart Watch Series 5", price: 49.99, rating: 5, reviews: 3087, image: "https://placehold.co/200" },
  { id: 3, name: "Mechanical Keyboard RGB", price: 19.99, rating: 4, reviews: 876, image: "https://placehold.co/200" },
  { id: 4, name: "Portable Speaker", price: 89.99, rating: 3, reviews: 421, image: "https://placehold.co/200" },
];

export default function Home() {
  return (
    <div style={{ padding: "24px", background: "#f3f3f3", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "16px", color: "#0f1111" }}>Featured Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}