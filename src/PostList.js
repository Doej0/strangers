import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "./api";
import { useAuth } from "./use-auth.js";
import "./Posts.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  let auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      setPosts(response.data.posts);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className="card" key={post._id}>
          <h2>{post.title}</h2>
          <h5>{post.description}</h5>
          <p>{post.author.username}</p>
          <p>{post.location}</p>
          {auth.username ? (
            <Link to="/profile/message">
              <button className="message">Send message</button>
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default PostList;
