# Dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /lab_report

# Copy package.json and install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
