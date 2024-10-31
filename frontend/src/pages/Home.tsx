import { Container, Row, Col } from "react-bootstrap";
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

export default function Home() {
  // Recupero articoli e prodotti
  const { data: products, isLoading: loadingProducts, error: errorProducts } = useGetProductsQuery();
  const { data: posts, isLoading: loadingPosts, error: errorPosts } = useGetPostsQuery();

  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [randomArticles, setRandomArticles] = useState<Blog[]>([]);


  useEffect(() => {
    if (products) {
      setRandomProducts(getRandomItems(products, 3));
    }
    if (posts) {
      setRandomArticles(getRandomItems(posts, 3));
    }
  }, [products, posts]);

  return (
    <Container className="full-width">
      <h1 className="home-title mt-3">
        <strong>ASTRO</strong>
      </h1>

      <h2 className="home-subtitle">
        [Der. del gr. àstron, da astèr "stella", lat. astrum] [ASF] Denomin.
        generica di qualsiasi oggetto luminoso sulla sfera celeste: stelle, Sole, pianeti, comete, ecc.
      </h2>
      <Canvas
        camera={{
          fov: 100,
          near: 0.1,
          far: 200,
          //position: [15, 5, 5],
        }}
      >
        <HomeBackground/>
      </Canvas>

      {/* Sezione articoli */}
      <section className="blog-section">
        <h2>Articoli del Blog</h2>
        {loadingPosts ? (
          <LoadingBox />
        ) : errorPosts ? (
          <MessageBox variant="danger">{getError(errorPosts as unknown as ApiError)}</MessageBox>
        ) : (
          <div className="blog-grid">
            {randomArticles.map((post) => (
              <Link to={`/blog/${post._id}`} className="blog-card" key={post._id}>
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
        <div className="text-end">
          <Link to="/blog">Scopri di più &rarr;</Link>
        </div>
      </section>

      {/* Sezione prodotti */}
      <section className="products-section">
        <h2>Prodotti del Negozio</h2>
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox variant="danger">{getError(errorProducts as unknown as ApiError)}</MessageBox>
        ) : (
          <Row>
            {randomProducts.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mt-3">
              <ProductItem product={product} />
            </Col>
            ))}
          </Row>
        )}
        <div className="text-end">
          <Link to="/shop">Scopri di più &rarr;</Link>
        </div>
      </section>
    </Container>
  );
}