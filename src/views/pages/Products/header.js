import React, { useEffect, useState } from "react";
import { useCartContext } from "../../../redux/context/cartContext";
import { useLocation, useNavigate } from "react-router-dom";

function Header({
  isSearch,
  setLoading,
  searchData,
  setIsSearch,
  setSearchData,
  setSortOption,
  searchProductData,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCartContext();

  const [categoryData, setCategoryData] = useState([]);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const getCategoryData = async () => {
    const response = await fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .catch((error) => console.log(error));

    setCategoryData(response);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <>
      <nav
        // style={{
        //   position: "sticky",
        //   top: "0",
        //   zIndex: "1030",
        //   backgroundColor: "#fff",
        // }}
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none"
                href="mailto:info@company.com"
              >
                info@company.com
              </a>
              <i className="fa fa-phone mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none"
                href="tel:010-020-0340"
              >
                010-020-0340
              </a>
            </div>
            <div>
              <a className="text-light" target="_blank" rel="sponsored">
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://www.instagram.com/"
                target="_blank"
              >
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://twitter.com/"
                target="_blank"
              >
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </a>
              <a
                className="text-light"
                href="https://www.linkedin.com/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav
        // style={{
        //   position: "sticky",
        //   top: "0",
        //   zIndex: "1030",
        //   backgroundColor: "#fff",
        // }}
        className="navbar navbar-expand-lg navbar-light shadow"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <a
            className="navbar-brand text-success logo h1 align-self-center"
            href="/home"
          >
            TrendCart
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>

                <li
                  className="nav-item position-relative"
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                >
                  <a className="nav-link">Category</a>
                  {isCategoryHovered && (
                    <div className="dropdown-menu show">
                      {categoryData?.slice(0, 16)?.map((category, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            navigate("/category-wise-products", {
                              state: { products: category?.url },
                            });
                          }}
                        >
                          {category?.name}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/products">
                    Products
                  </a>
                </li>
              </ul>
            </div>

            <div className="navbar align-self-center d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center col-7 col-sm-auto pr-3">
                <div className="input-group me-2">
                  <input
                    type="text"
                    className="form-control"
                    id="inputModalSearch"
                    name="q"
                    disabled={
                      location.pathname !== "/home" &&
                      location.pathname !== "/products"
                    }
                    value={searchData}
                    onChange={(e) => {
                      setSearchData(e?.target?.value);
                      setIsSearch(true);
                    }}
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i
                      onClick={() => {
                        if (
                          isSearch &&
                          (location.pathname === "/home" ||
                            location.pathname === "/products")
                        )
                          searchProductData();
                        setSortOption(null);
                        setLoading(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className="fa fa-fw fa-search"
                    />
                  </div>
                </div>
              </div>

              <a
                className="nav-icon position-relative text-decoration-none ms-3"
                href="/cart"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark"></i>
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cart?.length}
                </span>
              </a>

              <a
                className="nav-icon position-relative text-decoration-none ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("UserData");
                  navigate("/login");
                }}
              >
                <i className="fa fa-fw fa-sign-out-alt text-dark"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
