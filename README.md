# React Authentication Example

This repo goes along with the blog post React Authentication in Depth

![Completed Project](https://github.com/dabit3/react-authentication-in-depth/blob/master/src/assets/authdemo.jpg?raw=true)


## This project features:    
- User sign up
- User sign in
- 2 factor authentication
- Real world auth flow using React Router
- Protected routes
- Redirects for unauthorized users
- TOTP    


## Getting started    

1. clone the project    

```
git clone https://github.com/dabit3/react-authentication-in-depth.git
```

2. install dependencies using npm or yarn    

```
yarn || npm i
```

3. Start project    

```
npm start
```

## Setting up AWS services    
If you do not have your AWS services already created, follow these steps. If you already have your services set up, just configure your aws-exports.js file.    

1. from the root of the project, create awsmobile project    

```
awsmobile init
```

2. add user sign-in / authentication (Amazon Cognito)    

```
awsmobile user-signin enable
```

3. push new services to console    

```
awsmobile push
```
