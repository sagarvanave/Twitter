# Twitter

This is simple twitter application with below basic functionalities


* Ability to tweet
* Ability to search a person (using his handle to simplify things) and follow
* All tweets of the person one follows should come in feed
* Registration/Authentication mechanism
* Ability to search tweets
* Ability to hashtag tweets and search using that

## Project dependencies
just install `Node.js` in your system

## Installation & Run
```bash
# Download this project
git clone https://github.com/sagarvanave/Twitter.git
```

## After downloading or cloning

```shell
# Go to Twitter directory
cd Twitter

# Install dependancies
npm i or npm install

# Run project (you can use node or nodemon to run this project)
node app.js or nodemon app.js

```

Now you can see that Twitter application is running on `http://localhost:3003`. Application provides the below routes:

* `loginRoutes`: Used for login user
* `registerRoutes`: Used for registering new user
* `searchRoute`: Used for searching tweets and users
* `userRoutes`: Used for follow and unfollow operations
* `homeRoutes`: It's basically the twitter homepage and it includes all funcationalities like add new tweet, display previous tweets, search tweets etc.
* `logoutRoutes`: It's used for session destroy

## Project folder structure

1. `routes`: All routing files are present inside this so that we can use these files during the project execution
2. `schemas`: It contains all models that are used in project
3. `views`: It contains all UI pages. I have used handlebars event engine to create user interface.  
4. `public`: It contains all static files like images,css and js files

## Deployment process on server

To deploy application on Amazon's EC2 instance please see the below steps

1. Create AWS account
2. Launch `EC2` instance
3. Go to instance shell
4. yum install git
5. yum install curl
6. curl -o -https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh| bash
7. export NVM_DIR="$HOME/.nvm"
8. nvm install node
9. nvm ls 
10. nvm install v14.19.3
11. nvm use v14.19.3
13. npm install pm2 -git
14. pm2 start app.js --name twitter
15. ip and port whitelisting (whitelisting your port i.e 3003)


## Author

[Sagar Vanave](https://www.linkedin.com/in/sagar-vanave-0934a8b9/)
