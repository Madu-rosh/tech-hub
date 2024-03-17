// src/components/PostList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define an interface for the post structure
interface IPost {
  _id: string;
  title: string;
  content: string;
  // Include any other fields that your posts might have
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Specify the expected return type of your axios call
        const { data } = await axios.get<IPost[]>(
          "http://localhost:5000/api/posts"
        ); // Update with your API endpoint
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box>
      {posts.map((post) => (
        <Box key={post._id} my={2}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <Button onClick={() => navigate(`/posts/${post._id}`)}>
            Read More
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PostList;
