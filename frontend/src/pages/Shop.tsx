import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import ProductModal from "../components/ProductModal";
import { useEffect, useState } from "react";

export default function Shop() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setIsAdmin(userInfo.isAdmin);
    }
  }, []);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row className="text-center mb-3">
      <Helmet>
        <title>ASTRO - Shop</title>
      </Helmet>

      <h1 className="shop-title mt-3" style={{ color: "#be2ed6" }}>
        <strong>Che lo spazio sia con te</strong>
      </h1>

      {isAdmin && (
        <Row>
          <Col className="d-flex justify-content-end">
            <ProductModal name="Nuovo prodotto" />
          </Col>
        </Row>
      )}

      {products!.map((product) => (
        <Col key={product.slug} xs={6} sm={6} md={4} lg={3} className="mt-3">
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
