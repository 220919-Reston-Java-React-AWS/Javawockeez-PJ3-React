# Use a Node 18 base image
FROM node:16-alpine

# Set the working directory to /social-meida-react-main inside the container
WORKDIR /social-media-react-main

# Set the working directory to /social-meida-react-main inside the container
# WORKDIR /social-media-react-main
# # Copy app files
COPY . .
# # ==== BUILD =====
# # Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# # Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running
EXPOSE 8080
# Start the app
CMD [ "npx", "serve", "build" ]