import AuthSignInService from '@lib/db/auth/sign-in';
import { APIProvider } from '@providers/api';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data: {
    token: string;
  };
};

export default APIProvider.handler(
  async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const authSignInService = new AuthSignInService(req.body);
    const token = await authSignInService.execute();

    return res.status(200).json({
      data: {
        token,
      },
    });
  },
);
