import { useState, useEffect } from "react";
import { getMe, deletePost } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();
  let location = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getMe();
      setPosts(result.posts);
    }
    fetchData();
  }, []);

  function handleDelete(id) {
    deletePost(id);

    // WHAT TO DO AFTER A MUTATION:
    //    We could grab our posts and refresh them after deleting
    //    const posts = await getPosts();
    //    setPosts(posts);

    // Or we can assume that the delete op will succeed and remove the post right away
    const newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
    navigate("/profile" + location.search);
  }

  //haven't figured out how to stop posts from coming back after refreshing page.......

  return (
    <main>
      <h2>My Post</h2>
      <div className="cards">
        {posts.map((post) => (
          <article className="card" key={post._id}>
            <>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{post.price}</p>
              <p>{post.location}</p>
              <p>{post.willDeliver}</p>
            </>
            <button>Edit</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </article>
        ))}
      </div>
    </main>
  );
}
