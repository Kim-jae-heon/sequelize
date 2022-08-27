const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

User.init(sequelize); //연결객체인 sequelize를 init. 모델과 mysql을 연결.
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
