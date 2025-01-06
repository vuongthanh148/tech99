FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV POSTGRES_HOST=db

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]