import "./style.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Col, Form, Input, Label, Row } from "reactstrap";

function Login() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFunction = async (data) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data?.uname,
        password: data?.password,
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    if (response?.accessToken) {
      toast.success("Login Successfull");
      localStorage.setItem("UserData", JSON.stringify(response));
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } else {
      toast.error("Invalid UserName or Password");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center vh-100">
        <Row className="m-5 w-100">
          <Col md="4" className=""></Col>
          <Col md="4">
            <Card className="p-2 main">
              <p className="fw-bold main-class">Login Here</p>
              <Form onSubmit={handleSubmit(handleLoginFunction)}>
                <Col className="p-2">
                  <Label>UserName</Label>
                  <Controller
                    name="uname"
                    control={control}
                    rules={{
                      required: "UserName is Required",
                      validate: (value) =>
                        value.trim() !== "" || "UserName is Required",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter UserName"
                      />
                    )}
                  />
                  {errors.uname && (
                    <span className="error-style">
                      {errors?.uname?.message}
                    </span>
                  )}
                </Col>
                <Col className="p-2">
                  <Label>Password</Label>
                  <Controller
                    name="password"
                    type="password"
                    control={control}
                    rules={{
                      required: "Password is Required",
                      validate: (value) =>
                        value.trim() !== "" || "Password is Required",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter Password"
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="error-style">
                      {errors?.password?.message}
                    </span>
                  )}
                </Col>
                <Col className="p-2">
                  <Button style={{ background: "#006400" }} type="submit">
                    Login
                  </Button>
                </Col>
              </Form>
              {/* <div className="text-center mt-3 mb-1">
                <span>
                  Don't have an account? <a href="/register">Sign up</a>
                </span>
              </div> */}
            </Card>
          </Col>
          <Col md="4" className=""></Col>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
