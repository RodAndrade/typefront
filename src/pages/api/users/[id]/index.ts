import UsersServices from '@lib/db/users';
import { APIProvider } from '@providers/api';

export default APIProvider.handler(
  async (req, res) => {
    const id = Number(req?.query?.id);
    const user = await UsersServices.get(id, req?.session?.isSupport);

    return res.status(200).json({
      data: user,
    });
  },
  {
    auth: true,
    method: 'DELETE',
  },
);
