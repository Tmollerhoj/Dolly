const router = require('express').Router();
const { Follower } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newFollow = await Follower.create({
        //takes all of the components of the req body and expands it into individual elements. It builds the many-to-many relationship between the follower and the followee  
        ...req.body,
        user_id: req.session.user_id,
      });
      //if the post req passes, the newBleet object is created, otherwise, throw an error
      res.status(200).json(newFollow);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//DELETE ROUTE ONLY FOR IF THERE IS OPTION TO UNFOLLOW a Dolly user!

//   router.delete('/:id', withAuth, async (req, res) => {
//     try {
//       const bleetData = await Bleet.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!bleetData) {
//         res.status(404).json({ message: 'No bleet found with this id!' });
//         return;
//       }
  
//       res.status(200).json(bleetData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  module.exports = router;