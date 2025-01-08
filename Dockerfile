# Stage 0: Build the React application
FROM node:23 AS build

# Set the working directory
WORKDIR /app

# Copy for dependency installation
COPY package.json package-lock.json ./

# Install dependencies. NPM has an issue with parcel, so we use yarn
RUN yarn install

# Copy the rest of the application source code
COPY public public
COPY src src

# Build the React application for production
RUN npm run build

# Stage 1: Serve the built files with Nginx
FROM nginx:alpine

# Copy the React build from the first stage to the Nginx HTML directory
COPY --from=build app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
