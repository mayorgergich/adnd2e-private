FROM node:18-alpine

WORKDIR /opt/adnd2e-private

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install @mdx-js/react @mdx-js/loader @mdx-js/mdx

# Copy the rest of the application
COPY . .

# Set correct permissions
RUN chown -R appuser:appgroup /opt/adnd2e-private

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3030

# Start the application
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"] 