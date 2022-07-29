// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { allUsersQuery } from "../../utils/Queries";
import { client } from "../../utils/client";

type Data = {
  name: string;
  picture?: string;
  sub?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    const query = allUsersQuery();
    const data = await client.fetch(query);
    // console.log(data);
    res.status(200).json(data);
  }
}
