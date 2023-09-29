# Use the official Node image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy configuration files and dependencies
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

# Install dependencies
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the source code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose the server port
EXPOSE 3001

# Start the server
CMD ["node", "backend/server.js"]
