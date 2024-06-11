import { useParams } from 'react-router-dom';
import "../styles/BlogPost.css";
import { useGetPostDetailsByIdQuery } from '../hooks/blogHooks';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';
import { Card } from 'react-bootstrap';

export default function BlogPost() {
  /*
  const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
      axios.get('/api/blogs').then((response) => {
        setBlogs(response.data);
      });
    }, []);
    */
    const { id } = useParams<{id: string}>();
    console.log("Fetched Post ID:", id);
    //const { id } = params
    const {
      data: post,
      isLoading,
      error,
    } = useGetPostDetailsByIdQuery(id!);
    console.log("Fetched Post Data:", post);

    return isLoading ? (
      <LoadingBox /> 
    ) : error ? (
      <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !post ? (
      <MessageBox variant="danger">Post Not Found</MessageBox>
    ) : (
      <div className="blog-post-header">
          <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
              <img src="" alt={post.author} className="blog-post-author-image"/>
              <span>By {post.author} - {post.date}</span>
           </div>
          <Card className="blog-post-content">
              <Card.Body>
                  <div dangerouslySetInnerHTML={{ __html: post.content}}></div>
                </Card.Body>
             </Card>    
      </div>
        
    );
}

