import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import FormComponent from "./components/FormComponent";
import LossChart from "./components/LossChart";
import { io } from "socket.io-client";

function App() {
  const [formData, setFormData] = useState(null);  // To store form data for training
  const [uploadedFile, setUploadedFile] = useState(null);  // To store uploaded file data
  const [losses, setLosses] = useState([]);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("progress", (data) => {
      setCurrentEpoch(data.epoch);
      setLosses((prevLosses) => [...prevLosses, data.loss]);  // Update losses
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const handleFormSubmit = async (submittedFormData) => {
  //   setFormData(submittedFormData);  // Save form data
  //   setIsTraining(true);
    
  //   const response = await fetch("http://localhost:5000/train", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...submittedFormData, fileData: uploadedFile }),  // Send the fileData along with formData
  //   });
  //   const data = await response.json();
  //   setIsTraining(false);
  //   console.log(data.status);
  // };
  const handleFormSubmit = async (submittedFormData) => {
    setIsTraining(true);
    const response = await fetch("http://localhost:5000/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedFormData),
    });
    
    const data = await response.json();
    setIsTraining(false);
    setLosses(data.losses);  // Ensure this line correctly updates the losses state
  };

  const handleFileUpload = async (fileData) => {
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: fileData,
    });
    const data = await response.json();
    setUploadedFile(data);  // Store the uploaded file data in state
  };

  return (
    <div className="container">
      <h1 className="text-center">Neural Network Trainer with File Upload</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <FormComponent onSubmit={handleFormSubmit} />
      {isTraining && formData && (
        <div className="progress mt-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(currentEpoch / formData.epochs) * 100}%` }}
            aria-valuenow={currentEpoch}
            aria-valuemin="0"
            aria-valuemax={formData.epochs}
          >
            Epoch {currentEpoch}
          </div>
        </div>
      )}
      {losses.length > 0 && (
        <div className="mt-4">
          <LossChart losses={losses} />
        </div>
      )}
    </div>
  );
}

export default App;
