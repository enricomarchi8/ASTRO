import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../hooks/productHooks";
import { useGetPostsQuery } from "../hooks/blogHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError, getRandomItems } from "../utils";
import { ApiError } from "../types/ApiError";
import { useState, useEffect } from "react";

import "../styles/Blog.css";
import { Blog } from "../types/Blog";
import { Product } from "../types/Product";
import { Canvas } from "@react-three/fiber";
import { HomeBackground } from "../components/HomeBackground";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetProductsQuery();
  const {
    data: posts,
    isLoading: loadingPosts,
    error: errorPosts,
  } = useGetPostsQuery();

  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [randomArticles, setRandomArticles] = useState<Blog[]>([]);

  useEffect(() => {
    if (products) {
      setRandomProducts(getRandomItems(products, 4));
    }
    if (posts) {
      setRandomArticles(getRandomItems(posts, 2));
    }
  }, [products, posts]);

  return (
    <div className="page-container">
      <Helmet>
        <title>ASTRO</title>
      </Helmet>
      <div className="hero-section full-width">
        <h1 className="home-title mt-3">
          <strong>ASTRO</strong>
        </h1>

        <h2 className="home-subtitle">
          [Der. del gr. àstron, da astèr "stella", lat. astrum] [ASF] Denomin.
          generica di qualsiasi oggetto luminoso sulla sfera celeste: stelle,
          Sole, pianeti, comete, ecc.
        </h2>
        <Canvas
          camera={{
            fov: 100,
            near: 0.1,
            far: 200,
          }}
        >
          <HomeBackground />
        </Canvas>
      </div>

      <Container className="content-section text-center">
        {/* Sezione prodotti */}
        <section className="products-section">
          <Card className="h-100" style={{ backgroundColor: "#be2ed6" }}>
            <Card.Body>
              <h2 className="text-white">
                <strong>Che lo spazio sia con te</strong>
              </h2>
              {loadingProducts ? (
                <LoadingBox />
              ) : errorProducts ? (
                <MessageBox variant="danger">
                  {getError(errorProducts as unknown as ApiError)}
                </MessageBox>
              ) : (
                <Row>
                  {randomProducts.map((product) => (
                    <Col
                      key={product.slug}
                      xs={6}
                      sm={6}
                      md={6}
                      lg={3}
                      className="mt-3"
                    >
                      <ProductItem product={product} />
                    </Col>
                  ))}
                </Row>
              )}
              <div>
                <Button href="/shop" variant="light" className="mt-4">
                  Scopri di più
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Sezione articoli */}
        <section className="blog-section full-width">
          <h2 style={{ color: "#be2ed6" }}>
            <strong>Alla scoperta dello spazio</strong>
          </h2>
          {loadingPosts ? (
            <LoadingBox />
          ) : errorPosts ? (
            <MessageBox variant="danger">
              {getError(errorPosts as unknown as ApiError)}
            </MessageBox>
          ) : (
            <div className="blog-grid ms-3 me-3">
              {randomArticles.map((post) => (
                <Link
                  to={`/blog/${post._id}`}
                  className="blog-card"
                  key={post._id}
                >
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="blog-content">
                    <p>
                      {format(new Date(post.date), "EEEE d LLLL yyyy", {
                        locale: it,
                      })}
                    </p>
                    <h2>{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div>
            <Button href="/blog" variant="dark" className="mt-4">
              Scopri di più
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
