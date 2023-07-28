const sequelize = require('../config/connection');
const { User, Bleet, Comment, Follower } = require('../models');


const userData = require('./userData.json');
const bleetData = require('./bleetData.json');
const commentData = require('./commentData.json');
const followerData = require('./followerData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const bleet of bleetData) {
      await Bleet.create({
        ...bleet,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    for (const follower of followerData) {
        await Follower.create({
          ...follower,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      }
  
    process.exit(0);
  };

  seedDatabase();