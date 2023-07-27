const router = require('express').Router();
const { Bleet } = require('../../models');
const withAuth = require('../../utils/auth');

//First confirms that the user is logged in through withAuth, and then allows the user to create a new Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBleet = await Bleet.create({
      //takes all of the components of the req body and expands it into individual elements. See dashboard.js for where the post fetch is happening. It posts it with the user ID of whoever is logged into the session where the bleet occurred. 
      ...req.body,
      user_id: req.session.user_id,
    });
    //if the post req passes, the newBleet object is created, otherwise, throw an error
    res.status(200).json(newBleet);
  } catch (err) {
    res.status(400).json(err);
  }
});

//takes a bleet id as a parameter and deletes that object if the user is logged in with the same user id as the bleet, and where the bleet id is the same as the parameter.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bleetData = await Bleet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!bleetData) {
      res.status(404).json({ message: 'No bleet found with this id!' });
      return;
    }

    res.status(200).json(bleetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
