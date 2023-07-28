const sequelize = require('../config/connection');
const { User, Bleet, Comment, Follower } = require('../models');


const userData = require('./userData.json');
const bleetData = require('./bleetData.json');
const commentData = require('./commentData.json');
const followerData = require('./followerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const userDataItem of userData) {

    await User.create(userDataItem, {
      individualHooks: true,
      returning: true,
    });
  }
  await Bleet.bulkCreate(bleetData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });
  await Follower.bulkCreate(followerData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();