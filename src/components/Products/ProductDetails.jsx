import React from "react";
import { useParams, Link } from "react-router-dom";
import ProductData from "./ProductData.jsx";
import "./Details.css"
import Products from "./Products";

const ProductDetail = () => {
    const { id } = useParams();
    const product = ProductData.find((item) => item.id === parseInt(id));

    if (!product) {
        return <h2 className="text-center text-red-500 mt-10">Product Not Found</h2>;
    }

    return (
        <div className="container mx-auto mt-10 flex flex-col items-center">
            <img
                src={product.img}
                alt={product.title}
                className="h-[300px] w-[200px] object-cover rounded-md"
            />
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
            <p className="text-gray-600 mt-2">Color: {product.color}</p>
            <p className="flex items-center gap-1 mt-2">
                Rating: {product.rating} ⭐
            </p>
            <p className="text-lg font-semibold">Price: {product.price}</p>
            <Link to="/" className="mt-5 text-blue-500 underline">
                {/* ← Back to Products */}
                <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-blue-600 transition">
                    Buy Now
                </button>

            </Link>

        </div>
        
    );
};
<Products/>

export default ProductDetail;
