import React, { useState, useEffect } from "react";
import "./carousel.css";
import favourite from "../../assets/favorite.svg";
import favouriteClicked from "../../assets/favoriteClicked.svg";

interface Image {
  src: string;
}

interface Variant {
  price: number;
}

interface Product {
  id: number;
  title: string;
  images: Image[];
  variants: Variant[];
}

const Carousel = () => {
  const url = "https://jeval.com.au/collections/hair-care/products.json?page=1";
  const [products, setProducts] = useState<Product[]>([]);
  const [slides, setSlides] = useState<Product[][]>();
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    fetchInfo();
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const fetchInfo = () => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setProducts(d.products);
        setSlides(create2DArray(d.products));
      });
  };

  function create2DArray(products: Product[]) {
    let result = [];
    let currentSubarray: Product[] = [];
    let arrays = [wishlist, products];

    arrays.forEach((array) => {
      array.forEach((element) => {
        currentSubarray.push(element);

        if (currentSubarray.length === 3) {
          result.push([...currentSubarray]);
          currentSubarray = [];
        }
      });
    });

    if (currentSubarray.length > 0) {
      result.push([...currentSubarray]);
    }

    return result;
  }

  const toggleWishlist = (product: Product) => {
    if (!wishlist.includes(product)) {
      setWishlist((wishlist) => [...wishlist, product]);

      removeFromProducts(product);
    } else {
      let list = wishlist.filter(function (obj) {
        return obj.id !== product.id;
      });
      setWishlist(list);
      addToProducts(product);
    }
    setSlides(create2DArray(products));
  };

  const removeFromProducts = (product: Product) => {
    let prods = products.filter((obj) => {
      return obj.id !== product.id;
    });

    setProducts(prods);
  };

  const addToProducts = (product: Product) => {
    setProducts([...products, product]);
  };

  const isProductInWishlist = (product: Product) =>
    wishlist.some((item) => item.id === product.id);

  return (
    <div className="carousel">
      <div
        id="carouselDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {slides?.length &&
            slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselDark"
                data-bs-slide-to={index.toString()}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
        </div>
        <div className="carousel-inner">
          {slides?.length &&
            slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval={10000}
              >
                <div className="the_row">
                  {index === 0 ? (
                    <>
                      <div className="the_col">
                        <h2>Daily routine</h2>
                        <p>
                          Perfect for if you're looking for soft, nourished
                          skin, our moisturizing body washes are made with
                          skin-natural nutrients that work with your skin to
                          replenish moisture. With a light formula, the bubbly
                          lather leaves your skin feeling cleansed and cared
                          for. And by choosing relaxing fragrances you can add a
                          moment of calm to the end of your day.
                        </p>
                      </div>
                      {slide.slice(0, 2).map((product, productIndex) => (
                        <div className="the_col text-center" key={productIndex}>
                          <div className="wishlist-icon">
                            <img
                              src={
                                isProductInWishlist(product)
                                  ? favouriteClicked
                                  : favourite
                              }
                              alt="Wishlist"
                              onClick={() => toggleWishlist(product)}
                            />
                          </div>
                          <img
                            className="img-fluid"
                            src={product.images[0]?.src || ""}
                            alt="product"
                          />
                          <h2>{product.title}</h2>
                          <p>
                            <span>${product.variants[0]?.price || 0}</span>
                          </p>
                        </div>
                      ))}
                    </>
                  ) : (
                    slide.map((product, productIndex) => (
                      <div className="the_col text-center" key={productIndex}>
                        <div className="wishlist-icon">
                          <img
                            src={
                              isProductInWishlist(product)
                                ? favouriteClicked
                                : favourite
                            }
                            alt="Wishlist"
                            onClick={() => toggleWishlist(product)}
                          />
                        </div>
                        <img
                          className="img-fluid"
                          src={product.images[0]?.src || ""}
                          alt="product"
                        />
                        <h2>{product.title}</h2>
                        <p>${product.variants[0]?.price || 0}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev d-none d-lg-block"
          type="button"
          data-bs-target="#carouselDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next d-none d-lg-block"
          type="button"
          data-bs-target="#carouselDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
