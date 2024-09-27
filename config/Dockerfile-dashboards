FROM node:latest
WORKDIR /usr/src/app
COPY ../dashboards/package* .
RUN npm install
COPY ../dashboards .

EXPOSE 5173

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev", "--","--host", "0.0.0.0"]
