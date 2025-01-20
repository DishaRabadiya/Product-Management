import Header from "./header";
import Footer from "./footer";
import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../redux/context/cartContext";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCartContext();
  const { reloadCart } = useCartContext();

  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem("UserData"));

  function isTokenExpired(token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expiry = decodedToken.exp * 1000;
      return Date.now() > expiry;
    } catch (error) {
      console.error("Invalid token format:", error);
      return true;
    }
  }

  // const refreshAccessToken = async () => {
  //   try {
  //     const userData = JSON.parse(localStorage.getItem("UserData"));
  //     const response = await fetch("https://dummyjson.com/auth/refresh", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         refreshToken: userData?.refreshToken,
  //         expiresInMins: 30,
  //       }),
  //       credentials: "include",
  //     }).then((res) => res.json());

  //     if (response?.accessToken) {
  //       const updatedUserData = {
  //         ...userData,
  //         accessToken: response.accessToken,
  //       };
  //       localStorage.setItem("UserData", JSON.stringify(updatedUserData));
  //       alert("New Token Generated");
  //       return response.accessToken; // Return the new access token
  //     } else {
  //       throw new Error("Failed to refresh token");
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     return null; // Indicate token refresh failure
  //   }
  // };

  const getProductData = async () => {
    if (tokenData?.accessToken && !isTokenExpired(tokenData.accessToken)) {
      if (isSearching) return;
      const response = await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .catch((error) => console.log(error));
      setProductData(response?.products);
      setLoading(false);
    } else {
      localStorage.removeItem("UserData");
      navigate("/login");
      // refreshAccessToken();
    }
  };

  // Search Product Data
  const searchProductData = async (e) => {
    setIsSearch(false);
    e?.preventDefault();
    setIsSearching(true);
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchData}`
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
    setLoading(false);
    setProductData(response?.products);

    const searchModalElement = document.querySelector("#templatemo_search");
    if (searchModalElement) {
      const modalInstance =
        Modal.getInstance(searchModalElement) || new Modal(searchModalElement);
      modalInstance.hide();
    }
  };

  // Sorting Products
  const sortProducts = (products, option) => {
    if (!option) return products;

    return products.sort((a, b) => {
      switch (option) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "ratingAsc":
          return a.rating - b.rating;
        case "ratingDesc":
          return b.rating - a.rating;
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (sortOption === name) {
      setSortOption(null);
    } else {
      setSortOption(name);
    }
  };

  const handleSort = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  useEffect(() => {
    reloadCart();
  }, []);

  useEffect(() => {
    handleSort();
  }, [sortOption]);

  useEffect(() => {
    getProductData();
  }, [isSearching]);

  return (
    <>
      <Header
        isSearch={isSearch}
        setLoading={setLoading}
        searchData={searchData}
        setIsSearch={setIsSearch}
        setSearchData={setSearchData}
        setSortOption={setSortOption}
        searchProductData={searchProductData}
      />

      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            onSubmit={searchProductData}
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                value={searchData}
                onChange={(e) => setSearchData(e?.target?.value)}
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Category List */}
      {location?.pathname === "/home" ? (
        <section className="container py-5">
          <div className="row text-center pt-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Categories of The Month</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 p-5 mt-3">
              <a
                onClick={() => {
                  navigate("/category-wise-products", {
                    state: {
                      products:
                        "https://dummyjson.com/products/category/beauty",
                    },
                  });
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 8px rgba(99,98,98,0.6)",
                  }}
                  src={`${process.env.REACT_APP_PUBLIC_URL}/assets/img/beauty.webp`}
                  className="rounded-circle img-fluid border"
                />
              </a>
              <h5 className="text-center mt-3 mb-3">Beauty Products</h5>
              <p className="text-center">
                <a
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/category-wise-products", {
                      state: {
                        products:
                          "https://dummyjson.com/products/category/beauty",
                      },
                    });
                  }}
                >
                  Go Shop
                </a>
              </p>
            </div>
            <div className="col-12 col-md-4 p-5 mt-3">
              <a
                onClick={() => {
                  navigate("/category-wise-products", {
                    state: {
                      products:
                        "https://dummyjson.com/products/category/fragrances",
                    },
                  });
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 8px rgba(99,98,98,0.6)",
                  }}
                  src={`${process.env.REACT_APP_PUBLIC_URL}/assets/img/fragrances.webp`}
                  className="rounded-circle img-fluid border"
                />
              </a>
              <h2 className="h5 text-center mt-3 mb-3">Fragrances</h2>
              <p className="text-center">
                <a
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/category-wise-products", {
                      state: {
                        products:
                          "https://dummyjson.com/products/category/fragrances",
                      },
                    });
                  }}
                >
                  Go Shop
                </a>
              </p>
            </div>
            <div className="col-12 col-md-4 p-5 mt-3">
              <a
                onClick={() => {
                  navigate("/category-wise-products", {
                    state: {
                      products:
                        "https://dummyjson.com/products/category/groceries",
                    },
                  });
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 8px rgba(99,98,98,0.6)",
                  }}
                  src={`${process.env.REACT_APP_PUBLIC_URL}/assets/img/groceries.jpg`}
                  className="rounded-circle img-fluid border"
                />
              </a>
              <h2 className="h5 text-center mt-3 mb-3">Groceries</h2>
              <p className="text-center">
                <a
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/category-wise-products", {
                      state: {
                        products:
                          "https://dummyjson.com/products/category/groceries",
                      },
                    });
                  }}
                >
                  Go Shop
                </a>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section class="bg-light">
        <div class="container py-5">
          <div class="row text-center py-3">
            <div class="col-lg-6 m-auto">
              <h1 class="h1">
                {location?.pathname === "/products" ? "Featured" : "Trending"}{" "}
                Products
              </h1>
            </div>
          </div>

          {/* CheckBox Sorting */}
          {location?.pathname === "/products" ? (
            <div className="d-flex justify-content-center mb-4">
              <div className="d-flex">
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="priceAsc"
                    checked={sortOption === "priceAsc"}
                    onChange={handleCheckboxChange}
                  />
                  Price: Low to High
                </label>
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="priceDesc"
                    checked={sortOption === "priceDesc"}
                    onChange={handleCheckboxChange}
                  />
                  Price: High to Low
                </label>
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="ratingAsc"
                    checked={sortOption === "ratingAsc"}
                    onChange={handleCheckboxChange}
                  />
                  Rating: Low to High
                </label>
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="ratingDesc"
                    checked={sortOption === "ratingDesc"}
                    onChange={handleCheckboxChange}
                  />
                  Rating: High to Low
                </label>
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="nameAsc"
                    checked={sortOption === "nameAsc"}
                    onChange={handleCheckboxChange}
                  />
                  Name: A to Z
                </label>
                <label className="me-5">
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    name="nameDesc"
                    checked={sortOption === "nameDesc"}
                    onChange={handleCheckboxChange}
                  />
                  Name: Z to A
                </label>
              </div>
            </div>
          ) : null}

          {/* Products List */}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div class="row">
              {(location?.pathname === "/home"
                ? productData?.slice(0, 12)
                : sortProducts(productData, sortOption)
              )?.map((item, index) => {
                return (
                  <div key={index} class="col-12 col-md-4 mb-4">
                    <div class="card h-100">
                      <div
                        onClick={() =>
                          navigate("/product-detail", { state: { item } })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          style={{
                            height: "360px",
                            width: "100%",
                            objectFit: "contain",
                          }}
                          src={item?.images[0]}
                          class="card-img-top"
                          alt="..."
                        />
                      </div>
                      <div class="card-body">
                        <ul className="list-unstyled d-flex justify-content-between">
                          <li>
                            {Array(5)
                              .fill(0)
                              .map((_, index) => {
                                const rating = item?.rating || 0;
                                if (index < Math.floor(rating)) {
                                  return (
                                    <i
                                      key={index}
                                      className="text-warning fa fa-star"
                                    ></i>
                                  ); // Full star
                                } else if (index < rating) {
                                  return (
                                    <i
                                      key={index}
                                      className="text-warning fa fa-star-half-alt"
                                    ></i>
                                  ); // Half star
                                } else {
                                  return (
                                    <i
                                      key={index}
                                      className="text-muted fa fa-star"
                                    ></i>
                                  ); // Empty star
                                }
                              })}
                          </li>
                          <li className="text-muted text-right">
                            ${item?.price}
                          </li>
                        </ul>

                        <div
                          onClick={() =>
                            navigate("/product-detail", { state: { item } })
                          }
                          class="h2 text-decoration-none text-dark"
                        >
                          {item?.title}
                        </div>
                        <p class="card-text">{item.description}</p>

                        <div className="col">
                          <button
                            className="btn btn-success btn-lg"
                            name="submit"
                            value="addtocard"
                            onClick={() => {
                              addToCart(item);
                              navigate("/cart");
                            }}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
