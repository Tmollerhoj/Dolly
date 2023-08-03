const router = require('express').Router();
const { Bleet, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all bleets in the db and JOIN with the name of the user who bleeted it. 
    const bleetData = await Bleet.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize components of the bleet so the template can read it
    const bleets = bleetData.map((bleet) => bleet.get({ plain: true }));

    // Pass the parsed data and session flag into handlebars homepage template
    console.log(bleets)
    res.render('homepage', {
      bleets,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//for if the user searches for a single bleet by id, and include the name of the user who created that bleet. 
router.get('/bleet/:id', async (req, res) => {
  try {
    const bleetData = await Bleet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }, { 
          model: Comment 
        }
      ],
    });

    const bleet = bleetData.get({ plain: true });

    //renders to the bleet handlebars template
    res.render('bleet', {
      ...bleet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This confirms that the user has been authorized to access their own profile through the authorization
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID, and include all bleets from that user. 
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: bleet }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;