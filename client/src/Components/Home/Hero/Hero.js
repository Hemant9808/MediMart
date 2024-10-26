import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
const Hero = () => {
  const [open, setOpen] = React.useState(false);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploading(true);
      fileupload(acceptedFiles[0]);
    },
  });
  const fileupload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
       //"http://localhost:4000/product/upload-image",
        "https://medimart-nayg.onrender.com/product/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("image upload response", response);
      setUploading(false);
    setUploadedImage((prevImages) => [...prevImages, { url: response.data }]);
     addPrescription(response.data);
    } catch (error) {
      setUploading(false);
    }
   
  };
  
  const addPrescription = async(path) => {
    const data ={url:path}
    const response = await axios.post(
      "https://medimart-nayg.onrender.com/product/addPrescription",
      data,
      {
        headers:{
          authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE1NzFmZWM4M2VlM2E4OGJjNzI4YSIsImlhdCI6MTcyNjQxMzc1OX0.QH1quEr3Hakn0Ku4h7GSLbAlyrr1tj3QkEeeH9OooC0",
          "Content-Type": "application/json",
        }
      }
    );
    console.log("addPrescription",response);
    
  };

  return (
    <section>
      <div className="w-full px-3 antialiased lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="container py-24 mx-auto text-center sm:px-4 font-sans">
            <h1 className="text-4xl font-semibold font-display leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none">
              <span className="relative inline-block text-gray-800 tracking-normal">
                Your medication, delivered
              </span>
            </h1>
            <div className="max-w-lg mx-auto mt-6 sm:mt-8 text-sm text-center text-gray-600 tracking-wide sm:text-base md:max-w-xl md:text-lg xl:text-xl">
              Say goodbye to all your healthcare worries with us
            </div>
            <div className="relative flex items-center max-w-md mx-auto mt-12 overflow-hidden text-center rounded-full shadow-3xl">
              {/* Search functionality for a medicine */}
              <input
                type="text"
                name="search"
                placeholder="Search your medicine from here"
                className="w-full h-12 px-6 py-2 font-medium text-teal-800 placeholder-gray-500 tracking-wide focus:outline-none"
              />
              <span className="relative top-0 right-0 block ">
                <button type="button" className="hero-search-button">
                  Search
                </button>
              </span>
            </div>

            <div className="mt-12 text-base tracking-wider text-teal-300">
              Take care of your healthcare now!
            </div>
            <button
              onClick={() => setOpen(true)}
              className="bg-teal-400 text-white rounded-full p-2 px-6 mt-[2rem] text-[1.3rem]"
            >
              {" "}
              Upload prescription
            </button>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Upload prescription</DialogTitle>
              <div className="  p-[2rem]">
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #cccccc",
                    borderRadius: "4px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                  <Typography variant="body1" sx={{ color: "#000000" }}>
                    Drag and drop images here, or click to select files
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </Box>
              </div>

              <DialogActions>
                <Button className="bg-teal-400" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-teal-400"
                  onClick={() => setOpen(false)}
                  variant="contained"
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
