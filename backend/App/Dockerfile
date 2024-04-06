# Use official Node.js image as base image
FROM node:latest

# Set working directory in the container
WORKDIR /usr/src/app

# Create a non-root user with UID within the specified range
RUN adduser --disabled-password --gecos '' --uid 15000 appuser

# Set ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Switch to the non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 8081

# Command to run your application
CMD ["node", "server.js"]
