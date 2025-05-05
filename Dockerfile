FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install @mdx-js/react @mdx-js/loader @mdx-js/mdx

# Copy the rest of the application
COPY . .

# Build the application
CMD ["npm", "run", "build"] 