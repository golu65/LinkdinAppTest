import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../context/slices/postSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const newPost = {
      id: Math.random().toString(),
      title,
      description,
      image: file ? URL.createObjectURL(file) : "",
      likes: 0,
      comments: [], // Ensure this matches the Post interface
      isLiked: false, // Ensure this matches the Post interface
    };

    dispatch(addPost(newPost));
    setTitle("");
    setDescription("");
    setFile(null);
    navigate("/feed"); // Navigate to the feed page after posting
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create a Post
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button variant="contained" component="label">
            Upload Photo
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {file && <Typography variant="body2">{file.name}</Typography>}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;
