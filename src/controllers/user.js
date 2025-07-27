import {
  getAllUsers,
  getCreatedArticlesOfUser,
  getUserById,
} from '../services/users.js';
import createHttpError from 'http-errors';

export const getUsersController = async (req, res, next) => {
  const users = await getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found users',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}`,
    data: user,
  });
};

export const getCreatedArticlesOfUserController = async (req, res) => {
  // change after auth implementation
  const userId = req.user?._id || '6881563901add19ee16fcff2';

  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await getCreatedArticlesOfUser({
    userId,
    page,
    perPage,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found created articles',
    data: result,
  });
};
