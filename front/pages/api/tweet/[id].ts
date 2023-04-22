import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method == "DELETE") {
    try {
      const response = await axios.delete(`http://proxy:80/tweet/${id}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      if (response.data.status) {
        return res
          .status(response.data.status)
          .send({ message: response.data.msg });
      }
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res.status(405).send({ message: "Method Not Allowed" });
  }
}
