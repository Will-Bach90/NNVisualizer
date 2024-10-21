import React, { useState } from "react";

function FormComponent({ onSubmit }) {
  const [inputSize, setInputSize] = useState(2);
  const [hiddenLayers, setHiddenLayers] = useState([{ size: 2 }]);
  const [outputSize, setOutputSize] = useState(1);
  const [epochs, setEpochs] = useState(100);

  // Function to add a new hidden layer
  const addHiddenLayer = () => {
    setHiddenLayers([...hiddenLayers, { size: 2 }]);
  };

  // Function to remove a hidden layer
  const removeHiddenLayer = (index) => {
    setHiddenLayers(hiddenLayers.filter((_, i) => i !== index));
  };

  // Handle changes to the hidden layers' sizes
  const handleHiddenLayerChange = (index, size) => {
    const newLayers = [...hiddenLayers];
    newLayers[index].size = parseInt(size, 10); 
    setHiddenLayers(newLayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      input_size: inputSize,
      hidden_layers: hiddenLayers.map(layer => layer.size),
      output_size: outputSize,
      epochs: epochs,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Input Size</label>
        <input
          type="number"
          className="form-control"
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Hidden Layers</label>
        {hiddenLayers.map((layer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="number"
              className="form-control"
              value={layer.size}
              onChange={(e) => handleHiddenLayerChange(index, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => removeHiddenLayer(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addHiddenLayer}>
          Add Hidden Layer
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Output Size</label>
        <input
          type="number"
          className="form-control"
          value={outputSize}
          onChange={(e) => setOutputSize(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Epochs</label>
        <input
          type="number"
          className="form-control"
          value={epochs}
          onChange={(e) => setEpochs(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Train</button>
    </form>
  );
}

export default FormComponent;


