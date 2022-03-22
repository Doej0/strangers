//request needed from strangers things API

const baseURL = "https://strangers-things.herokuapp.com";
const COHORT_NAME = "2112-FTB-ET-WEB-PT";

export const registerUser = async (userObject) => {
  const url = `${baseURL}/api/${COHORT_NAME}/users/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  console.log(response);

  const json = await response.json();
  console.log(json);

  localStorage.setItem("stranger_things_JWT", json.data.token);

  return json;
};

export const loginUser = async (userObject) => {
  const url = `${baseURL}/api/${COHORT_NAME}/users/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  const json = await response.json();
  console.log(json);

  localStorage.setItem("stranger_things_JWT", json.data.token);
};

export const getMe = async () => {
  const url = `${baseURL}/api/${COHORT_NAME}/users/me`;
  const response = await fetch(url);

  const json = await response.json();
  return json;
};

export const testMe = async () => {
  // URL that we're gonna reach out to
  const url = `${baseURL}/api/${COHORT_NAME}/test/me`;
  const token = localStorage.getItem("stranger_things_JWT");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  //Take the body we got back and convert it to JS Object
  const json = await response.json();
  console.log(json);

  return json.success;
};

export const getPosts = async () => {
  // URL that we're gonna reach out to
  const url = `${baseURL}/api/${COHORT_NAME}/posts`;

  // Grab the body given back by the API
  const response = await fetch(url);
  console.log(response);

  // Take the body we got back and convert it to JS Object
  const json = await response.json();
  console.log(json);

  return json;
};

export const newPost = async (postObject) => {
  const url = `${baseURL}/api/${COHORT_NAME}/posts`;
  const token = localStorage.getItem("stranger_things_JWT");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postObject),
  });
  console.log(response);

  const json = await response.json();
  return json;
};

export const editPost = async (newPost) => {
  const url = `${baseURL}/api/${COHORT_NAME}/posts`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  const json = await response.json();
  console.log(json);
  return json;
};

export const deletePostById = async (postId) => {
  const url = `${baseURL}/api/${COHORT_NAME}/${postId}`;
  const token = localStorage.getItem("stranger_things_JWT");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  console.log(json);
  return json;
};

export const newMessage = async (postId, userObject) => {
  const url = `${baseURL}/api/${COHORT_NAME}/posts/${postId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  const json = await response.json();
  return json;
};
