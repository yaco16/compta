import {getAllUsers} from '../../lib/queries';

export default async function handler(req, res) {
  const data = await getAllUsers()
  res.status(200).json(data)
}
