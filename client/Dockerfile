FROM node:18.4 as alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]