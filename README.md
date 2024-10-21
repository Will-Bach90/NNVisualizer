Allows users to define custom neural network architectures, upload datasets, 
and train the neural network with real-time progress updates and loss visualization.

## Features
- Define custom neural network architectures:
  - Input size, number of hidden layers, neurons per hidden layer, and output size.
  - Support for activation functions like Sigmoid.
- Real-time progress updates via WebSockets (Flask-SocketIO).
- Visualize the loss during training using **Chart.js**.
- Upload custom datasets (CSV files) and train the neural network on the provided data.

## Tech Stack
- **Frontend**: React, Bootstrap, Chart.js, react-file-drop
- **Backend**: Flask, Flask-SocketIO, NumPy, Pandas
- **WebSocket Communication**: Flask-SocketIO
- **Data Visualization**: Chart.js
- **File Upload**: react-file-drop, Flask

## Installation

### Requirements
- Docker
- Docker Compose

### Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/will-bach90/nnvisualizer.git
   cd neural-network-trainer
   ```

2. **Build and start the containers**:

   Make sure you have Docker and Docker Compose installed. To build and run the containers, run:

   ```bash
   docker-compose up --build
   ```

3. **Access the application**:

   Once the containers are running, you can access the app in your browser at:

   ```
   http://localhost:3000
   ```

## Usage

### 1. Define Your Neural Network Architecture
You can define your neural network by specifying:
- Input size: The number of input features.
- Hidden layers: You can dynamically add or remove hidden layers, specifying the number of neurons in each layer.
- Output size: The number of output neurons (e.g., 1 for binary classification).

### 2. Train the Neural Network
Once you've defined your neural network:
- Click **Train** to begin training the neural network.
- A real-time progress bar will show the current epoch.
- The loss will be visualized dynamically using a line chart.

### 4. Real-Time Updates
- Training progress is displayed in real-time via WebSocket communication between the frontend and backend.
- After training is complete, the final loss is displayed.

## File Structure

```bash
neural-network-trainer/
├── backend/
│   ├── app.py               # Flask app and routes
│   ├── neural_network.py     # Custom neural network implementation
│   └── requirements.txt      # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormComponent.js   # Handles form submission for neural network definition
│   │   │   ├── LossChart.js       # Loss visualization using Chart.js
│   │   │   └── FileUpload.js      # File upload component for custom datasets
│   │   ├── App.js                 # Main React component
│   └── package.json               # Frontend dependencies
├── docker-compose.yml         # Docker Compose configuration for frontend and backend
└── README.md                  # Project documentation
```

## Development

### Running in Development Mode

To make changes to the project, you can run the frontend and backend separately in development mode:

1. **Run the backend** (Flask):

   In the `backend/` directory:
   ```bash
   flask run
   ```

2. **Run the frontend** (React):

   In the `frontend/` directory:
   ```bash
   npm start
   ```

3. **Access the app**:

   Visit `http://localhost:3000` to access the frontend.

## Future Enhancements
- Allow users to upload their own files.
- Add more activation functions (ReLU, Tanh).
- Implement additional optimizers (SGD, Adam).
- Include a confusion matrix or other advanced metrics for classification tasks.
- Support multi-class classification and regression tasks.
