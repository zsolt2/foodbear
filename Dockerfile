FROM node:17.9.0-alpine

ENV BACKEND_HOST=
ENV BACKEND_PORT=
ENV PORT=

WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@13.3.1
RUN npm install
EXPOSE $PORT
CMD cd /app && npm run start