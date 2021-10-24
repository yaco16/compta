import {getcounts7} from '../../lib/queries';

export default async function handler(req, res) {
  const data = await getcounts7()
  res.status(200).json(data)
}
