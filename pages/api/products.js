// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { products } from "./fakeDB";

export default (req, res) => {
  res.statusCode = 200

  res.json(products)
}
