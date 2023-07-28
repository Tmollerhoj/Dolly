const User = require('./User');
const Follower = require('./Follower');
const Comment = require('./Comment');
const Bleet = require('./Bleet');

User.hasMany(Bleet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Bleet.belongsTo(User, {
    foreignKey: 'user_id',
});

Bleet.hasMany(Comment, {
    foreignKey: 'bleet_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Bleet, {
    foreignKey: 'bleet_id',

});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Follower, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Follower, {
    foreignKey: 'follower_id',
    onDelete: 'CASCADE',
});

Follower.belongsTo(User, {
    foreignKey: 'user_id',
});

Follower.belongsTo(User, {
    foreignKey: 'follower_id',
});

module.exports = { User, Follower, Comment, Bleet };

