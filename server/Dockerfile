FROM node:18.4 as alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY ./ ./
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3100
CMD ["npm", "run", "start"]