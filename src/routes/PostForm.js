import { createNewPost } from "../api";

const PostForm = () => {
  const handlePostButtonClick = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    const postObject = {
      post: {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        location: formData.get("location"),
      },
    };

    await createNewPost(postObject);
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handlePostButtonClick}>
        <label htmlFor="title"></label>
        <input type="text" name="title" id="title" placeholder="Enter Title" />
        <label htmlFor="description"></label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Enter Description"
        />
        <label htmlFor="price"></label>
        <input type="text" name="price" id="price" placeholder="Enter Price" />
        <label htmlFor="location"></label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter Location"
        />
        <button type="submit" onClick={() => handlePostButtonClick}>
          Create new post!
        </button>
      </form>
    </div>
  );
};

export default PostForm;
