/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopcontext";
import Breadcrums from "../components/braedcrums";
import { ProductDisplay } from "../components/productDisplay";
import { Descriptionbox } from "../components/descriptionbox";
import { RelatedProducts } from "../components/relatedProducts";

export default function Product() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const callProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/product/getProduct/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error fetching product: ${res.statusText}`);
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    callProduct();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error state
  }

  return (
    <>
      {product && (
        <>
          <Breadcrums product={product} />
          <div className="flex flex-col justify-around items-center">
            <ProductDisplay product={product} />
            <Descriptionbox />
            <RelatedProducts product={product} />
          </div>
        </>
      )}
    </>
  );
}
