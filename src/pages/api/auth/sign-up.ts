import { APIProvider } from '@providers/api';
import AuthSignUpService from '@lib/db/auth/sign-up';

import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data: {
    id: unknown;
  };
};

export default APIProvider.handler(
  async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const createUserService = new AuthSignUpService(req.body);
    const userId = await createUserService.execute();

    return res.status(200).json({
      data: {
        id: userId,
      },
    });
  },
);
