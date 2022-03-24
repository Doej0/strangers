import { useState, useEffect } from "react";
import {
  Outlet,
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getPosts, createNewPost } from "../api";

function QueryLink({ to, ...props }) {
  let location = useLocation();
  return <Link to={to + location.search} {...props} />;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  let loc = useLocation();
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getPosts();
      setPosts(result);
    }
    fetchData();
  }, []);

  const handleCreatePost = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);

    setTitle(formData.get("title"));
    setDescription(formData.get("description"));
    setPrice(formData.get("price"));
    setLocation(formData.get("location"));
    if (formData.get("willDeliver")) {
      setWillDeliver(true);
    }

    await createNewPost(title, description, price, location, willDeliver);

    navigate("/posts" + loc.search);
  };

  return (
    <main className="wrapper">
      <nav className="posts-nav">
        <h3>Create a new post</h3>
        <form onSubmit={handleCreatePost}>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
          />
          <label htmlFor="description"></label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
          />
          <label htmlFor="price"></label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter Price"
          />
          <label htmlFor="location"></label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter Location"
          />
          <label htmlFor="willDeliver">Will deliver? </label>
          <input type="checkbox" name="willDeliver" id="willDeliver" />
          <input type="submit" value="Create New Post" />
        </form>

        <input
          type="text"
          placeholder="Search..."
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {posts
          .filter((post) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let title = post.title.toLowerCase();
            return title.startsWith(filter.toLowerCase());
          })
          .map((post) => (
            <QueryLink
              className="post-link"
              to={`/posts/${post._id}`}
              key={post._id}
            >
              {post.title}
            </QueryLink>
          ))}
      </nav>
      <Outlet />
    </main>
  );
}
