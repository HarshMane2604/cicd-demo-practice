FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Run nginx in foreground and dynamically bind to PORT assigned by Railway
CMD sed -i -e 's/listen       80;/listen       '"${PORT:-80}"';/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

