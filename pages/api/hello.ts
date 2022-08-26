// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '../../modules/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method} = req;

  const {db} = await connectToDatabase();

  switch (method) {
    case 'GET':
      res.status(200).json(
        { data: await db.collection('test').find().toArray() })
      break;

    case 'POST':
      res.status(200).json(
        { id: (await db.collection('test').insertOne({
            test: 'yatta!'
          }) ).insertedId.toString() 
        })
      break;

    default:
      res.status(405).end('method not allowed!');
  }
}
