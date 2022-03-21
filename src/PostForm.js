import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { newPost } from "./api";
import { useAuth } from "./use-auth.js";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  let auth = useAuth();
  let history = useHistory();

  const handlePostButtonClick = (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);

    const postObject = {
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
      },
    };

    newPost(postObject);

    setTitle(formData.get("title"));
    setDescription(formData.get("description"));
    setPrice(formData.get("price"));
    setLocation(formData.get("location"));
  };

  return (
    <div>
      <h2>Search Post</h2>
      <form>
        <label htmlFor="searchbar"></label>
        <input type="text" name="searchbar" placeholder="Search Posts" />
      </form>
      <div>
        {auth.username ? (
          <>
            <h2>Create New Post</h2>
            <form onSubmit={handlePostButtonClick}>
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
              <button type="submit">Create new post!</button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostForm;
