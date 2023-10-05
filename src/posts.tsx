import { useQuery } from "react-query";
import React, { useEffect } from "react";
import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const usePostStore = create(
  devtools((set) => ({
    posts: [] as Post[],
    setPosts: (posts: Post[]) => set(() => ({ posts }))
  }))
);

export const Posts = () => {
  const { posts, setPosts } = usePostStore();

  const { data, isLoading, isError } = useQuery("posts", async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error Fetching</p>;
  }

  return (
    <ul>
      {posts?.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
