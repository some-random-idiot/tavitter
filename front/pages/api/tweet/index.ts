import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const response = await axios.post(
        "http://proxy:80/tweet/",
        req.body,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      if (response.data.status) {
        return res
          .status(response.data.status)
          .send({ message: response.data.msg });
      }
      return res.status(200).json(response.data);
    } catch (error) {
      // console.error(error);
      return res.status(400).send(error);
    }
  } else if (req.method == "GET") {
    try {
      const response = await axios.get("http://proxy:80/tweet/", {
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
