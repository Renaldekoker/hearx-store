FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prod
############
### prod ###
############
FROM nginx
## From 'builder' copy website to default nginx public folder
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/hearx-shop /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
