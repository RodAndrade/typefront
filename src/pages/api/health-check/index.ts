import { APIProvider } from '@providers/api';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data: any;
};

export default APIProvider.handler(
  async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(200).json({
      data: req.body,
    });
  },
);
