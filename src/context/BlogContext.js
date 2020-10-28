import React, { createContext } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  return <BlogContext.Provider value={5}>
    {children}
  </BlogContext.Provider>;
};
