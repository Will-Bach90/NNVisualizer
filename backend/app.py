from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from neural_network import NeuralNetwork
import numpy as np
import os
import pandas as pd

UPLOAD_FOLDER = './uploads'

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins="*") 
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    input_size = data['input_size']
    hidden_layers = data['hidden_layers']
    output_size = data['output_size']
    epochs = data['epochs']

    # Example XOR-like data
    X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    y = np.array([[0], [1], [1], [0]])

    # Initialize and train the neural network
    nn = NeuralNetwork(input_size, hidden_layers, output_size)

    # Train with progress updates
    nn.train(X, y, epochs=epochs)

    return jsonify({'status': 'Training complete!'})

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Read the CSV and return the contents as JSON (for simplicity)
    df = pd.read_csv(file_path)
    return df.to_json(orient='records')

@socketio.on('connect')
def handle_connect():
    print("Client connected")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
