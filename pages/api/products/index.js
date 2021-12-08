import nc from "next-connect";
import db from "../../../components/utils/db";
import Product from "../../../model/Product";

const handler = nc();

const productData = async () =>
  await fetch("https://fakestoreapi.com/products").then((res) => res.json());

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(productData);
  await db.disconnect();
  res.send({ message: "seeded " });
});
export default handler;
