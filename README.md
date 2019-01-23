# sso-exam
> Single Sign On (SSO) Example with JSON Web Token (JWT)

## Usage
```
$ npm install

$ npm start

// Service provider
http://localhost:3000/info // SERVER 1
http://localhost:3001/info // SERVER 2
http://localhost:3002/info // SERVER 3


// Identity provider
http://localhost:11666/login?redirect_url=http://localhost:3000/info
```

![d](https://image.slidesharecdn.com/enterprisesinglesignon-webinar-140704005138-phpapp02/95/enterprise-single-sign-on-8-638.jpg?cb=1404435248)
> https://www.slideshare.net/wso2.org/enterprise-single-sign-on-webinar