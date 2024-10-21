# Neural Network Visualizer and Trainer

Allows users to define custom neural network architectures, upload datasets, and train the  
neural network with real-time progress updates and loss visualization.

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
   git clone https://github.com/will-bach90/neural-network-trainer.git
   cd neural-network-trainer
