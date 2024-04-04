FROM node:20.12.0-slim
WORKDIR /usr/src/app
ENV PORT 8080
COPY package*.json ./
RUN npm install --only=production
COPY . ./
CMD ["npm", "start"]