FROM --platform=$BUILDPLATFORM node:20-alpine AS base

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

FROM base AS development

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start:dev"]

FROM base AS production

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]



