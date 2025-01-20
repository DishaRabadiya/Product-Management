import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../redux/context/cartContext";

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useCartContext();

  const productData = location?.state?.item;

  const [selectedImage, setSelectedImage] = useState(productData?.images[0]);

  return (
    <>
      <Header />

      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img
                  className="card-img img-fluid"
                  style={{
                    height: "560px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={selectedImage}
                  alt="Product Image"
                  id="product-detail"
                />
              </div>
              <div className="row">
                <div className="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <i className="text-dark fas fa-chevron-left" />
                    <span className="sr-only">Previous</span>
                  </a>
                </div>

                <div
                  id="multi-item-example"
                  className="col-10 carousel slide carousel-multi-item"
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner product-links-wap"
                    role="listbox"
                  >
                    {productData?.images?.map((image, index) => {
                      if (index % 3 === 0) {
                        return (
                          <div
                            className={`carousel-item ${
                              index === 0 ? "active" : ""
                            }`}
                            key={index}
                          >
                            <div className="row">
                              {productData.images
                                .slice(index, index + 3)
                                .map((img, subIndex) => (
                                  <div className="col-4" key={subIndex}>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e?.preventDefault();
                                        setSelectedImage(img);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        // border:
                                        //   img === selectedImage
                                        //     ? "2px solid #28a745"
                                        //     : "none",
                                      }}
                                    >
                                      <img
                                        className="card-img img-fluid"
                                        src={img}
                                        alt={`Product Image ${
                                          index + subIndex + 1
                                        }`}
                                      />
                                    </a>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                <div className="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="next"
                  >
                    <i className="text-dark fas fa-chevron-right" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">{productData?.title}</h1>
                  <p className="h3 py-2">${productData?.price}</p>
                  <p className="py-2">
                    <i>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => {
                          const rating = productData?.rating || 0;
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
                    </i>
                    <span className="list-inline-item text-dark">
                      Rating {productData?.rating} |{" "}
                      {productData?.reviews?.length} Comments
                    </span>
                  </p>
                  {productData?.brand ? (
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <h6>Brand:</h6>
                      </li>
                      <li className="list-inline-item">
                        <p className="text-muted">
                          <strong>{productData?.brand}</strong>
                        </p>
                      </li>
                    </ul>
                  ) : null}

                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Category:</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{productData?.category}</strong>
                      </p>
                    </li>
                  </ul>
                  <h6>Description:</h6>
                  <p>{productData?.description}</p>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Avaliability Status :</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{productData?.availabilityStatus}</strong>
                      </p>
                    </li>
                  </ul>
                  <h6>Specification:</h6>
                  <ul className="list-unstyled pb-3">
                    <li>{productData?.shippingInformation}</li>
                    <li>{productData?.returnPolicy}</li>
                    <li>{productData?.warrantyInformation}</li>
                  </ul>
                  <form action="" method="GET">
                    <input
                      type="hidden"
                      name="product-title"
                      defaultValue="Activewear"
                    />
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item text-right">
                            Quantity
                            <input
                              type="hidden"
                              name="product-quanity"
                              id="product-quanity"
                              defaultValue={1}
                            />
                          </li>
                          <li className="list-inline-item">
                            <span className="btn btn-success" id="btn-minus">
                              -
                            </span>
                          </li>
                          <li className="list-inline-item">
                            <span className="badge bg-secondary" id="var-value">
                              1
                            </span>
                          </li>
                          <li className="list-inline-item">
                            <span className="btn btn-success" id="btn-plus">
                              +
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col">
                        <button
                          className="btn btn-success btn-lg"
                          name="submit"
                          value="addtocard"
                          onClick={() => {
                            addToCart(productData);
                            navigate("/cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetail;
