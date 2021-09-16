# Based on Node.js, to build and compile Angular
FROM node:14.15.1 as compiler

WORKDIR /app
COPY ./code/ /app/
ARG ENVIRONMENT=dev
RUN npm install
RUN npm run build:$ENVIRONMENT

# Stage based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21.3-alpine
COPY --from=compiler /app/dist/frontend /usr/share/nginx/html
COPY .gitlabci/nginx.conf /etc/nginx/conf.d/default.conf
