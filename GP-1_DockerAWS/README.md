
## Run Command: (you need a docker image)

```
$ touch Dockerfile
```

#### Add the following text to the dockerfile using textedit or notepad++

```
# Use Node.js to build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine

# Copy built React files to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```



## Run command: (Create a docker ignore I promise you its worth it)

```
touch .dockerignore
```

#### Add to docker ignore to save it from crashing:

```
node_modules
npm-debug.log
build
.dockerignore
Dockerfile
```

## Run the following commands, (Install react version 18)

```
npm install react@18 react-dom@18
```

## Build the docker game

```
docker build -t my-react-game .
```

### NOW YOU CAN TEST IT:

```
docker run -p 3000:3000 my-react-game
```

*One you verify it's working, (by going to localhost:3000) go ahead and push the image (DON'T DO THIS GROUP WE ALREADY DID IT IM JUST WALKING US THROUGH STEPS)*

### Members skip the the end of this, you don't need to push it to docker.

## Login to docker

```
docker login
```
    *//docker tag my-react-game kronaeon/my-react-game:latest* 

## Tag the docker game image

```
docker tag my-react-game your-user-name/my-react-game:latest
```

    *//docker push kronaeon/my-react-game:latest*

## Push the docker image!

```
docker push your-user-name/my-react-game:latest
```


### Members of group 7!

```
docker run -p 3000:3000 my-react-game
```






