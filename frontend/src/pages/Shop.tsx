import { Col, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>ASTRO-Shop</title>
      </Helmet>

      <h1 className="shop-title mt-3">
        <strong>Che lo spazio sia con te</strong>
      </h1>

      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3} className="mt-3">
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}
