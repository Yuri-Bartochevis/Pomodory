FROM nginx
MAINTAINER Yuri-bartochevis

# mv configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY certificate/* /etc/nginx/certificate/
COPY alexa/* /etc/nginx/alexa/

EXPOSE 80