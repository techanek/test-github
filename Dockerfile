# Use a lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (leverage Docker layer caching)
COPY package*.json ./
RUN npm ci --only=production || npm install --only=production

# Bundle app source
COPY . .

# Expose ports for main app and sidecar
EXPOSE 8080 9000

# Ensure start script is executable
RUN chmod +x ./start.sh

# Start both services
CMD ["./start.sh"]
