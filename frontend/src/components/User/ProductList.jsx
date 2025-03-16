import Product from "./Product";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function ProductList() {
  const products = [
    {
      name: "Samsung Galaxy S24 Ultra",
      category: "Smartphones",
      brand: "Samsung",
      description: "Powerful flagship smartphone with advanced AI features.",
      avgRating: 4.6,
      reviewCount: 1890,
      company: "Samsung",
    },
    {
      name: "Sony WH-1000XM5",
      category: "Headphones",
      brand: "Sony",
      description: "Industry-leading noise-canceling wireless headphones.",
      avgRating: 4.8,
      reviewCount: 3210,
      company: "Sony",
    },
    {
      name: "MacBook Pro 16 M3",
      category: "Laptops",
      brand: "Apple",
      description: "High-performance laptop with M3 chip and Liquid Retina display.",
      avgRating: 4.9,
      reviewCount: 2780,
      company: "Apple",
    },
    {
      name: "Dell XPS 15",
      category: "Laptops",
      brand: "Dell",
      description: "Sleek and powerful laptop with an edge-to-edge display.",
      avgRating: 4.5,
      reviewCount: 1540,
      company: "Dell",
    },
    {
      name: "Google Pixel 8 Pro",
      category: "Smartphones",
      brand: "Google",
      description: "AI-powered flagship phone with the best camera experience.",
      avgRating: 4.7,
      reviewCount: 2100,
      company: "Google",
    },
    {
      name: "Bose QuietComfort Earbuds II",
      category: "Earbuds",
      brand: "Bose",
      description: "Premium wireless earbuds with unbeatable noise cancellation.",
      avgRating: 4.6,
      reviewCount: 2750,
      company: "Bose",
    },
    {
      name: "LG C3 OLED TV",
      category: "Televisions",
      brand: "LG",
      description: "4K OLED TV with stunning picture quality and Dolby Vision.",
      avgRating: 4.8,
      reviewCount: 3600,
      company: "LG",
    },
    {
      name: "PlayStation 5",
      category: "Gaming Consoles",
      brand: "Sony",
      description: "Next-gen gaming console with ultra-fast SSD and ray tracing.",
      avgRating: 4.9,
      reviewCount: 4500,
      company: "Sony",
    },
    {
      name: "Xbox Series X",
      category: "Gaming Consoles",
      brand: "Microsoft",
      description: "Powerful next-gen console with 4K gaming and Game Pass.",
      avgRating: 4.7,
      reviewCount: 3400,
      company: "Microsoft",
    },
    {
      name: "Samsung Galaxy Watch 6",
      category: "Smartwatches",
      brand: "Samsung",
      description: "Advanced health tracking and AMOLED display smartwatch.",
      avgRating: 4.5,
      reviewCount: 1250,
      company: "Samsung",
    },
  ];

  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  // Filter products based on search query and category selection
  const filteredProducts = products.filter(
    (prd) =>
      (selected === "All" || prd.category === selected) &&
      prd.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>

        

      <div className="pt-40 flex justify-center">
        <SearchBar setQuery={setQuery} selected={selected} setSelected={setSelected} />
      </div>

      <div className="pt-20 grid grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prd) => (
            <Product
              key={prd.name}
              name={prd.name}
              category={prd.category}
              brand={prd.brand}
              description={prd.description}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-black">No products found.</p>
        )}
      </div>
    </div>
  );
}
