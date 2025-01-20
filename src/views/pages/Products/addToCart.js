import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../redux/context/cartContext";
import Header from "./header";
import Footer from "./footer";

function AddToCart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCartContext();

  const calculateSubtotal = (price, quantity) => (price * quantity).toFixed(2);
  const calculateTotal = () => {
    return cart
      ?.reduce((total, item) => total + item?.price * 1, 0)
      ?.toFixed(2);
  };

  return (
    <>
      <Header />
      <link
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} className="text-center">
                Subtotal
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item?.id}>
                <td data-th="Product">
                  <div
                    className="row"
                    onClick={() => {
                      navigate("/product-detail", { state: { item } });
                    }}
                  >
                    <div className="col-sm-2 hidden-xs">
                      <img
                        style={{ height: "100px", width: "100px" }}
                        src={item?.images[0] || "http://placehold.it/100x100"}
                        alt={item?.title}
                        className="img-responsive"
                      />
                    </div>
                    <div className="col-sm-10">
                      <h4 className="nomargin">{item?.title}</h4>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                </td>
                <td data-th="Price">${item?.price.toFixed(2)}</td>
                <td data-th="Quantity">
                  <input
                    type="number"
                    className="form-control text-center"
                    value={1}
                    readOnly
                  />
                </td>
                <td data-th="Subtotal" className="text-center">
                  ${calculateSubtotal(item?.price, 1)}
                </td>
                <td className="actions" data-th="">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item?.id)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <Button onClick={() => navigate("/home")}>
                  Continue Shopping
                </Button>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <strong>Total ${calculateTotal()}</strong>
              </td>
              <td>
                <a href="#" className="btn btn-success btn-block">
                  Checkout <i className="fa fa-angle-right"></i>
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default AddToCart;
