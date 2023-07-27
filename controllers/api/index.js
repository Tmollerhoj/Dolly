//pulls in the Router capabilities to express and sets them as router. imports routes for user reqs and routes for blogpost reqs. 
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bleetRoutes = require('./bleetRoutes');
const followerRoutes = require('./followerRoutes');
const commentRoutes = require('./commentRoutes');

//middleware to use the imported routes and gives them a url path through /api
router.use('/users', userRoutes);
router.use('/bleets', bleetRoutes);
router.use('/followers', followerRoutes);
router.use('/comments', commentRoutes);


module.exports = router;