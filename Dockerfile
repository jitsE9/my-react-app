# ---------- Stage 1: Build the React App ----------
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Build the app
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.25.3

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config (uncomment if using React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
