# Create NEM Server

Create Node-Express server with MongoDB (mongoose) database.

Create NEM server works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/mhebd/nem_server/issues/new).<br>

## Quick Overview

```sh
npx create_nem_server my_server
cd my_server
npm start or yarn start
```

### Get Started Immediately

You **don’t** need to install or configure tools like Express, Bcryptjs, Jsonwebtoken, Mongoose.<br>
They are already installed so that you can focus on the code.<br>
Also, You **don’t** need to create User Model and Router. It is already created.<br>

**You will need just two things, MongoDB connection string and password. Just copy that and past it on the .env file with this format.**

```sh
PORT = 5000
CON_STRING = your_mongodb_connection_string
SECRET = some_secret_text
EXPIRES = token_expires_time || 30d
```

And now, you’re good to go.

## Creating an Server

**You’ll need to have Node 12.0.0 or later version on your local development machine**. We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new server, you may follow the following methods:

### npx

```sh
npx create_nem_server my_server
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 9+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### Folder Structure


It will create a directory called `my_server` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my_server
├── README.md
├── app.js
├── node_modules
├── package.json
├── .gitignore
├── config
│   ├── .env
├── controler
│   ├── user.js
├── db
│   ├── database.js
├── middleware
│   ├── error.js
│   ├── auth.js
├── model
│   ├── User.js
├── route
    ├── user.js
```

No configuration or complicated folder structures, only the files you need to build your server app.<br>
Once the installation is done, you can open your project folder:

```sh
cd my_server
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Philosophy

- **No Configuration Required:** You don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

