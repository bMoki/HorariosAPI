FROM node:14.17-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
ENV REACT_APP_BACKEND_URL=http://localhost:8080
CMD ["npm","start"]
