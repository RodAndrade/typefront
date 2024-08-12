import UsersServices from '@lib/db/users';
import { APIProvider } from '@providers/api';

export default APIProvider.handler(
  async (req, res) => {
    const users = await UsersServices.getAll(req?.session?.isSupport);

    return res.status(200).json({
      data: users,
    });
  },
  {
    auth: true,
    method: 'GET',
  },
);
