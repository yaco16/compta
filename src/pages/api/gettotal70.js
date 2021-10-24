import {getTotal70} from '../../lib/queries';

export default async function handler(req, res) {
  console.log('req.body', req.body)
  const data = await getTotal70(req.body.account1, req.body.account2)
  res.status(200).json(data[0])
}
