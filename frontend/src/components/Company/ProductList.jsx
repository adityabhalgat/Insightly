import { useState } from "react";
import Product from "./Product";

export default function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "UltraBoost Running Shoes",
      category: "Shoes",
      brand: "Adidas",
      description: "High-performance running shoes with superior comfort and energy return.",
      avgRating: 4.7,
      reviewCount: 1200,
    },
    {
      id: 2,
      name: "Superstar Classic Sneakers",
      category: "Shoes",
      brand: "Adidas",
      description: "Timeless design with a leather upper and rubber shell toe.",
      avgRating: 4.5,
      reviewCount: 850,
    },
    {
      id: 3,
      name: "NMD R1 Lifestyle Sneakers",
      category: "Shoes",
      brand: "Adidas",
      description: "Urban-style sneakers with responsive cushioning and sock-like fit.",
      avgRating: 4.6,
      reviewCount: 950,
    },
    {
      id: 4,
      name: "Stan Smith Originals",
      category: "Shoes",
      brand: "Adidas",
      description: "Minimalist tennis-inspired sneakers with a clean and classic look.",
      avgRating: 4.8,
      reviewCount: 1300,
    },
    {
      id: 5,
      name: "ZX 750 Retro Sneakers",
      category: "Shoes",
      brand: "Adidas",
      description: "A mix of modern comfort and classic design for everyday wear.",
      avgRating: 4.4,
      reviewCount: 700,
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));

    //==========================================
    // API CALL REMOVE PRODUCT FROM TABLE HERE
    //==========================================

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {products.map((prd) => (
        <Product key={prd.id} product={prd} onDelete={handleDelete} />
      ))}
    </div>
  );
}
