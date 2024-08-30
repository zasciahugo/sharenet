# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Vue.js application
RUN npm run build

# Step 7: Use an official Nginx image to serve the content
FROM nginx:stable-alpine

# Step 8: Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Copy the Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Step 10: Expose the port on which the application will run
EXPOSE 80

# Step 11: Start Nginx
CMD ["nginx", "-g", "daemon off;"]