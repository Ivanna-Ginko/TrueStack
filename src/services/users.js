import { usersCollection } from '../db/models/users.js';

export const getAllUsers = async () => {
  const users = await usersCollection.find();
  return users;
};

export const getUserById = async (userId) => {
  const user = await usersCollection.findById(userId);
  return user;
};
