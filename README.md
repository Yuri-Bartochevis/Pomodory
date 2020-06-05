# Pomodóry
An Application who supports you during Pomodoro technique. 

The application consists.
 - Nginx as proxy reverse applying SSL certificate  (necessary for alexa console)
 - NodeJs as service to handle amazon requests.
 - PostgreSQL to save user's configuration

##Containers
> $ docker-compose build
> $ docker-compose up


## Docker and Node version 

docker-ce=18.06.1~ce~3-0~ubuntu
nvm = node 12.13.1

## How to generate SSL 

> $  openssl genrsa -out private-key.pem 2048

create cnf file
> $ touch configuration.cnf
```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = BR
ST = Provide your two letter state abbreviation
L = Provide the name of the city in which you are located
O = Provide a name for your organization
CN = Provide a name for the skill

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @subject_alternate_names

[subject_alternate_names]
DNS.1 = Provide your fully qualified domain name
```

now we need to generate .pem file.

```
$ openssl req -new -x509 -days 365 \
            -key private-key.pem \
            -config configuration.cnf \
            -out certificate.pem
```


hope you guys enjoy the application. <3