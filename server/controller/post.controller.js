/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import mongoose from 'mongoose';
import Post from '../mongodb/models/post.js';
import User from '../mongodb/models/user.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPosts = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = '',
    postType = '',
  } = req.query;

  const query = {};

  if (postType !== '') {
    query.postType = postType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: 'i' };
  }

  try {
    const count = await Post.countDocuments({ query });

    const posts = await Post.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
    // res
    //   .status(500)
    //   .json({ message: 'Fetching posts failed, please try again later' });
  }
};

const getPostDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const postExists = await Post.findOne({ _id: id }).populate('creator');

    if (postExists) res.status(200).json(postExists);
    else res.status(404).json({ message: 'Post does not exist' });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get the post details, please try again later',
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, postType, location, price, photo, email } =
      req.body;

    // Start a new session
    const session = await mongoose.startSession();
    session.startTransaction();

    // Retrieve user by email
    const user = await User.findOne({ email }).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create a new post
    const newPost = await Post.create({
      title,
      description,
      postType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    // Update the user's allPosts field with the new post
    user.allPosts.push(newPost._id);
    await user.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    // Send response
    res.status(200).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    // res.status(500).json({ message: 'Failed to create post, please try again later' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, postType, location, price, photo } = req.body;

    let photoUrl = '';
    if (photo) {
      photoUrl = await cloudinary.uploader.upload(photo);
    }

    // Update a new post
    await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        postType,
        location,
        price,
        photo: photoUrl?.url || photo,
      }
    );

    // Send response
    res.status(200).json({ message: 'Post created successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create post, please try again later' });
  }
};

const deletePost = async (req, res) => {
  let toDeletePost;

  try {
    const { id } = req.params;

    toDeletePost = await Post.findById({ _id: id }).populate('creator');
    if (!toDeletePost) {
      throw new Error('Post not found');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    toDeletePost.remove({ session });
    toDeletePost.creator.allPosts.pull(toDeletePost);

    await toDeletePost.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to delete post, please try again later' });
  }
};

export { getAllPosts, getPostDetail, createPost, updatePost, deletePost };
