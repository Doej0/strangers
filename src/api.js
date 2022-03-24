const path = "https://strangers-things.herokuapp.com/api/2112-FTB-ET-WEB-PT";
const token = localStorage.getItem("strangers_things_JWT");

export function register(user, password) {
  return fetch(`${path}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: user,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.token;
    })
    .catch(console.error);
}

export function login(user, password) {
  return fetch(`${path}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: user,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.token;
    })
    .catch(console.error);
}

export function getMe() {
  return fetch(`${path}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch(console.error);
}

export function testMe() {
  return fetch(`${path}/test/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch(console.error);
}

export function testData() {
  return fetch(`${path}/test/data`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.message;
    })
    .catch(console.error);
}

export function getPosts() {
  return fetch(`${path}/posts`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.posts;
    })
    .catch(console.error);
}

export function createNewPost(
  title,
  description,
  price,
  location,
  willDeliver
) {
  return fetch(`${path}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.post;
    })
    .catch(console.error);
}

export function editPost(
  postId,
  title,
  description,
  price,
  location,
  willDeliver
) {
  return fetch(`${path}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.post;
    })
    .catch(console.error);
}

export function deletePost(postId) {
  fetch(`${path}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}

export function createNewMessage(postId, content) {
  fetch(`${path}/posts/${postId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content: content,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.data.message;
    })
    .catch(console.error);
}
