# Twitter Clone

![Twitter Clone](twitter-clone-screenshot.png)

This is a Twitter clone built using Node.js, CSS, Handlebars, deployed on Heroku, and using JawsDB for the database.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Twitter clone is a web application that mimics the basic functionalities of the popular social media platform, Twitter. Users can sign up, log in, post tweets, follow other users, like tweets, and see a timeline of the tweets from users they follow.

## Features

- User registration and authentication
- Post tweets and view the timeline
- Follow and unfollow other users
- Like and unlike tweets
- User profile pages

## Installation

To run this application locally, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:Tmollerhoj/Dolly.git
cd twitter-clone
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the necessary environment variables (e.g., database credentials, session secrets, etc.) in the `.env` file.

4. Set up the database:

   - Use the provided SQL schema to set up the necessary tables in your database.
   - Connect the application to your database by updating the database configuration.

5. Start the application:

```bash
npm start
```

6. Open your web browser and visit: `http://localhost:3001`.

## Usage

- Register a new account or log in if you already have an account.
- On the homepage, you can see tweets from the users you follow.
- You can post new tweets from your profile page or view and interact with tweets from other users.

## Technologies

The following technologies were used to build this Twitter clone:

- Node.js: Backend server and application logic.
- CSS: Styling and layout.
- Handlebars: Templating engine for generating dynamic HTML.
- Heroku: Cloud platform for deployment.
- JawsDB: MySQL database hosting on Heroku.

## Deployment

This Twitter clone is deployed on Heroku and can be accessed at [https://dolly-bleeter-6a4dd49c0ee0.herokuapp.com/
](https://dolly-bleeter-6a4dd49c0ee0.herokuapp.com/).

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify this code as per the terms of the license.

## Credits

Foundation for views, controllers, and boilerplate code comes from the BCS mini-project from Unit 14 on Model-View-Controller.
