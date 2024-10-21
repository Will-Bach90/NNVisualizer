import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_layers, output_size):
        # Create a list of weight matrices for each layer
        self.weights = []
        self.biases = []

        # First hidden layer
        previous_size = input_size
        for hidden_size in hidden_layers:
            self.weights.append(np.random.randn(previous_size, hidden_size))
            self.biases.append(np.zeros((1, hidden_size)))
            previous_size = hidden_size
        
        # Output layer
        self.weights.append(np.random.randn(previous_size, output_size))
        self.biases.append(np.zeros((1, output_size)))

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def sigmoid_derivative(self, z):
        return z * (1 - z)

    def forward(self, X):
        self.activations = []
        self.z_values = []

        # Forward pass through hidden layers
        a = X
        for W, b in zip(self.weights[:-1], self.biases[:-1]):
            z = np.dot(a, W) + b
            a = self.sigmoid(z)
            self.z_values.append(z)
            self.activations.append(a)

        # Forward pass through output layer
        z = np.dot(a, self.weights[-1]) + self.biases[-1]
        output = self.sigmoid(z)
        self.z_values.append(z)
        self.activations.append(output)
        return output

    def compute_loss(self, y_true, y_pred):
        return np.mean(np.square(y_true - y_pred))

    def backward(self, X, y_true, learning_rate=0.1):
        # Initialize gradients for weights and biases
        dW = [np.zeros_like(W) for W in self.weights]
        db = [np.zeros_like(b) for b in self.biases]

        # Calculate gradient for the output layer (last layer)
        loss_gradient = self.activations[-1] - y_true  # (4, 1) shape for XOR data
        dW[-1] = np.dot(self.activations[-2].T, loss_gradient)  # (hidden_size, output_size)
        db[-1] = np.sum(loss_gradient, axis=0, keepdims=True)

        # Backpropagate through hidden layers
        for i in range(len(self.weights) - 2, -1, -1):
            dz = np.dot(loss_gradient, self.weights[i + 1].T) * self.sigmoid_derivative(self.activations[i])
            dW[i] = np.dot(self.activations[i-1].T, dz) if i > 0 else np.dot(X.T, dz)
            db[i] = np.sum(dz, axis=0)

            # Update the loss_gradient for the next layer
            loss_gradient = dz

        # Update weights and biases with gradients
        for i in range(len(self.weights)):
            self.weights[i] -= learning_rate * dW[i]
            self.biases[i] -= learning_rate * db[i]

    def train(self, X, y, epochs=100, learning_rate=0.1):
        losses = []
        for epoch in range(epochs):
            y_pred = self.forward(X)
            loss = self.compute_loss(y, y_pred)
            losses.append(loss)
            self.backward(X, y, learning_rate)
        return losses

