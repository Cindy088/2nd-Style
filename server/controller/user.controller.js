/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import User from '../mongodb/models/user.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Fetching users failed, please try again later' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json(userExists);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Something happened, failed to create user' });
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { id } = req.params;
    const userPosts = await User.findOne({ _id: id }).populate('allPosts');

    if (userPosts) res.status(200).json(userPosts);
    else res.status(404).send('User not found');
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user posts, please try again later' });
  }
};

export {
  getAllUsers,
  createUser,
  getUserInfoByID,
};
