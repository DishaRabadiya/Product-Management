import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../redux/context/cartContext";
import Header from "./header";
import Footer from "./footer";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const productData = location?.state?.products;

  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = async () => {
    const response = await fetch(`${productData}`)
      .then((res) => res.json())
      .catch((error) => console.log(error));
    setCategoryData(response?.products);
  };

  useEffect(() => {
    getCategoryData();
  }, [productData]);

  return (
    <>
      <Header />

      <div class="row">
        {categoryData?.map((item, index) => {
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
                    <li className="text-muted text-right">${item?.price}</li>
                  </ul>

                  <div class="h2 text-decoration-none text-dark">
                    {item?.title}
                  </div>
                  <p class="card-text">{item.description}</p>
                  <p class="text-muted">Reviews {item?.reviews?.length}</p>

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

      <Footer />
    </>
  );
}

export default Category;
