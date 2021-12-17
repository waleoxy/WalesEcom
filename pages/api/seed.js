import nc from "next-connect";
import { data } from "../../components/utils/data";
import db from "../../components/utils/db";
import Product from "../../model/Product";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});
export default handler;
