FROM nginx

WORKDIR /usr/share/nginx/html

# source - target
COPY build/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]