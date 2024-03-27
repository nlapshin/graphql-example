const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

const userDetailSchema = new mongoose.Schema({
  userId: ObjectId,
  detail: String
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema);

module.exports = {
  User,
  UserDetail
};
