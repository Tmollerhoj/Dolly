const router = require('express').Router();
const { User, Bleet, Follower } = require('../../models');

//GET ROUTE FOR TESTING IN INSOMNIA
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Bleet }, {model: Follower}]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //POST ROUTE FOR TESTING IN INSOMNIA
// // //Creates a new user when submitted through the fetch request from signupFormHandler in the login.js
// router.post('/', async (req, res) => {
//     /* Template for testing post route 
//   {
//     "username": "Leroy",
//     "email": "leroy@jenkins.com",
//     "password": "LEROYYYYYYJENKINSSSSS"
//   }
//   */
//   try {
//     const userData = await User.create(req.body);

//     //saves the session as it begins through logging in the user that just signed up.
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


//Creates a new user when submitted through the fetch request from signupFormHandler in the login.js
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    //saves the session as it begins through logging in the user that just signed up.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//if a user wants to login through the login page, this function makes sure the login creds match a single user from the dn
router.post('/login', async (req, res) => {
  try {
    //first, make sure that you take the email submitted by user in req matches one email, and alerts if it doesn't match. 
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //makes sure that the password from the user req matches the password of user in the db with that email. It does this through the instance of the model that is called in User.findOne.
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //starts the session and logs the user in. 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//ends the session with logs the user out. 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
