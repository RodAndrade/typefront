import AuthSignInService from '@lib/db/auth/sign-in';
import UsersServices from '@lib/db/users';
import { APIProvider } from '@providers/api';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data: {
    token: string;
  };
};

export default APIProvider.handler(async (req, res) => {
  const loggedUser = req?.session;
  if (!loggedUser?.id) {
    return res.status(401).json({
      data: null,
    });
  }

  const user = await UsersServices.get(loggedUser.id);
  return res.status(200).json({
    data: user,
  });
}, true);
