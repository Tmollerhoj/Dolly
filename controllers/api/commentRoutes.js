const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//THIS GET ROUTE IS PURELY FOR TESTING API, 
router.get('/', async (req, res) => {
  try {
    // Get all comments in the db and JOIN with the name of the user who bleeted it. 
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize components of the comment so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass the parsed data and session flag into handlebars homepage template
    res.render('homepage', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//First confirms that the user is logged in through withAuth, and then allows the user to create a new comment on a bleet
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      //takes all of the components of the req body and expands it into individual elements. It posts it with the user ID of whoever is logged into the session where the comment occurred. 
      ...req.body,
      user_id: req.session.user_id,
    });
    //if the post req passes, the newBleet object is created, otherwise, throw an error
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//takes a comment id as a parameter and deletes that object if the user is logged in with the same user id as the comment, and where the comment id is the same as the parameter.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;