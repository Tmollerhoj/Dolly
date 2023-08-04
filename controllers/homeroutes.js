const router = require('express').Router();
const { Bleet, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const bleetData = await Bleet.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const bleets = bleetData.map((bleet) => bleet.get({ plain: true }));

    console.log(bleets)
    res.render('homepage', {
      bleets,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bleet/:id', async (req, res) => {
  try {
    const bleetData = await Bleet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }, { 
          model: Comment,
          include: [
            {
            model: User,
            attributes: ['username']
          }
          ]
        }
      ],
    });

    const bleet = bleetData.get({ plain: true });
    console.log(bleet)
    res.render('bleet', {
      ...bleet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try { 
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bleet }],
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
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;