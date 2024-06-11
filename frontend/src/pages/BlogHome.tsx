import "../styles/Blog.css";
import { useGetPostsQuery } from "../hooks/blogHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function BlogHome() {
    /*
    const { id } = useParams<{ id:string }>();
        const [blog, setBlog] = useState<Blog | null>(null);

        useEffect(() => {
            axios.get(`/api/blogs/${id}`).then((response) => {
                setBlog(response.data);
            });
        }, [id]);

        if (!blog) return <div>Caricamento...</div>;
    */
        const { data: posts, isLoading, error } = useGetPostsQuery();

        return isLoading ? (
            <LoadingBox /> 
          ) : error ? (
            <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
          ) : !posts ? (
            <MessageBox variant="danger">Blogs Not Found</MessageBox>
          ) : (
          <div className="home">
            <Helmet>
              <title>ASTRO-Blog</title>
            </Helmet>
            <h1>Blog</h1>
            {posts!.map((post) => (
              <div className="blog-grid" key={post._id}>
                <Link to={`/blog/${post._id}`} className="post-card">
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="post-content">
                      <h2>{post.title}</h2>
                      <p>{post.date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        );
}