# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /backend

# Install Flask and other dependencies
COPY Pipfile Pipfile.lock /backend/
RUN pip install pipenv && pipenv install --system

# Copy the current directory contents into the container at /app
COPY . /backend

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
# ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["python", "app.py"]
