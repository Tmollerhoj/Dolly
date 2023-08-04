const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bleetRoutes = require('./bleetRoutes');
const followerRoutes = require('./followerRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/bleets', bleetRoutes);
router.use('/followers', followerRoutes);
router.use('/comments', commentRoutes);


module.exports = router;