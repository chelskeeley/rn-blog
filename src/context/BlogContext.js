import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "delete_blogpost":
      return state.filter((post) => post.id !== action.payload);

    case "edit_blogpost":
      return state.map((blogpost) => {
        return blogpost.id === action.payload.id ? action.payload : blogpost;
      });

    case "get_blogposts":
      return action.payload;

    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });

    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    // ideally we wont delete on the server AND locally (we want a single source of truth)
    // for now this saves us from having to re-pull blogposts from the server
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    // ideally we wont edit on the server AND locally (we want a single source of truth)
    // for now this saves us from having to re-pull blogposts from the server
    await jsonServer.put(`/blogposts/${id}`, {
      title,
      content
    });

    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    callback();
  };
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
