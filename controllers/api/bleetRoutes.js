const router = require('express').Router();
const { Bleet, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBleet = await Bleet.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBleet);
  } catch (err) {
    res.status(400).json(err);
  }
});

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
