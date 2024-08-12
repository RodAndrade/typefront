import UsersServices from '@lib/db/users';
import { APIProvider } from '@providers/api';

export default APIProvider.handler(
  async (req, res) => {
    const id = Number(req?.query?.id);
    const user = req?.session;
    const status = String(req?.body?.status);

    if (!user || user?.id === id || !status) {
      return res.status(401).json({ message: '' });
    }

    await UsersServices.changeUserStatus(id, status as any, user.isSupport);

    return res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        status,
      },
    });
  },
  {
    auth: true,
    method: 'PUT',
  },
);
