FROM node:14

WORKDIR /app

ENV PORT=3001

# Install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3001
CMD ["npm", "start"]
