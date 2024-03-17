import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";

interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

interface IComment {
  _id: string;
  content: string;
  post: string;
  author: string;
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postData = await axios.get<IPost>(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPost(postData.data);

        const commentsData = await axios.get<IComment[]>(
          `http://localhost:5000/api/comments/${postId}`
        );
        setComments(commentsData.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
        Back to Posts
      </Button>
      <Card variant="outlined" sx={{ my: 4, transition: "none" }}>
        {" "}
        {/* Remove hover animation */}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {post?.tags?.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            )) || []}
          </Stack>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Author: {post.author} -{" "}
            {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom>
        Comments:
      </Typography>
      {comments.length > 0 ? (
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment._id}>
              <ListItem alignItems="flex-start">
                <Typography variant="body2">{comment.content}</Typography>
                <Typography variant="caption" sx={{ display: "block" }}>
                  {moment(comment.createdAt).fromNow()}
                </Typography>
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography>No comments yet.</Typography>
      )}
    </Box>
  );
};

export default PostDetail;
