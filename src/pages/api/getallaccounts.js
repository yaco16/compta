import {getAllAccounts} from '../../lib/queries';

export default async function handler(req, res) {
  const data = await getAllAccounts()
  res.status(200).json(data)
}
