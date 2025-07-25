import { getAllUsers, getUserById } from '../services/users';

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
    res.status(404).json({
      message: 'User not found',
    });
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}`,
    data: user,
  });
};
