import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPosts, createNewMessage } from "../api";

export default function Post() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await getPosts();
      setPost(result.find((post) => post._id === params.postId));
    }
    fetchData();
  }, [params]);

  return (
    <main>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{post.price}</p>
      <p>{post.location}</p>
      <p>{post.willDeliver}</p>
      <button
        onClick={() => {
          createNewMessage(post._id, "a message");
          navigate("/posts" + location.search);
        }}
      >
        Create message
      </button>
    </main>
  );
}
