/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const ProductInfiniteScroll = ({ all_products }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const PRODUCTS_PER_PAGE = 10; // Number of products to load per scroll

  useEffect(() => {
    // Load initial products
    const initialProducts = all_products.slice(0, PRODUCTS_PER_PAGE);
    setDisplayedProducts(initialProducts);
  }, [all_products]);

  const loadMoreProducts = useCallback(() => {
    if (loading) return;

    setLoading(true);
    const start = page * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const moreProducts = all_products.slice(start, end);

    setDisplayedProducts((prev) => [...prev, ...moreProducts]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [all_products, page, loading]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMoreProducts();
      }
    },
    [loading, loadMoreProducts]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div className="flex flex-col items-center w-full bg-slate-100 h-1/2 overflow-hidden font-serif p-3 rounded-2xl shadow-xl shadow-slate-800 scroll-smooth">
      <h1 className="text-xl pb-3 font-semibold">Products</h1>
      <div className="flex flex-col gap-2 overflow-auto h-full w-full no-scrollbar">
        {displayedProducts.map((product, index) => (
          <>
            <Link to={`/admin/view/product/${index}`}>
              <div
                key={index}
                className="flex items-center gap-5 justify-center border rounded-xl shadow-inner p-2"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-[64px] w-[64px] rounded-full"
                />
                <p className="truncate">{product.name}</p>
              </div>
            </Link>
          </>
        ))}
        <div ref={loader} className="h-10 flex justify-center items-center">
          {loading && <p>Loading more products...</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductInfiniteScroll;
