# Use official Node.js image as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the current directory into the container
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the app using the default React server
CMD ["npm", "start"]
