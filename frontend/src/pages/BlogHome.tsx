import "../styles/Blog.css";
import { useGetPostsQuery } from "../hooks/blogHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function BlogHome() {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !posts ? (
    <MessageBox variant="danger">Blogs Not Found</MessageBox>
  ) : (
    <div className="home full-width">
      <Helmet>
        <title>ASTRO-Blog</title>
      </Helmet>
      <h1 style={{ color: "#be2ed6" }}>
        <strong>Alla scoperta dello spazio</strong>
      </h1>
      <div className="blog-grid">
        {posts!.map((post) => (
          <Link to={`/blog/${post._id}`} className="blog-card">
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
    </div>
  );
}
