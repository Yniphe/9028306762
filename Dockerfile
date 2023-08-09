FROM node:20-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

# Open port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "start:prod" ]