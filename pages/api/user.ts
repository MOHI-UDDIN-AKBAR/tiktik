// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { allUsersQuery } from "../../utils/Queries";
import { client } from "../../utils/client";

type Data = {
  name: string;
  picture: string;
  sub: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const data = await client.fetch(allUsersQuery());
    // console.log(data);
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.json([]);
    }
  }
}
