import { useParams } from "react-router-dom";
import "../styles/BlogPost.css";
import { useGetPostDetailsByIdQuery } from "../hooks/blogHooks";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import { Card } from "react-bootstrap";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  console.log("Fetched Post ID:", id);
  const { data: post, isLoading, error } = useGetPostDetailsByIdQuery(id!);
  console.log("Fetched Post Data:", post);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !post ? (
    <MessageBox variant="danger">Post Not Found</MessageBox>
  ) : (
    <div className="blog-post-header">
      <img src={post.imageUrl} alt={post.title} className="blog-post-image" />
      <h1>{post.title}</h1>
      <div className="blog-post-meta">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="blog-post-author-image"
        />
        <span>
          Scritto da {post.author.name} ·{" "}
          <span>
            {format(new Date(post.date), "EEEE d LLLL yyyy", { locale: it })}
          </span>
        </span>
      </div>
      <Card className="blog-post-content">
        <Card.Body>
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>
              {paragraph.split("\n").map((line, i) => (
                <span
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: line.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong>$1</strong>"
                    ),
                  }}
                />
              ))}
            </p>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}
