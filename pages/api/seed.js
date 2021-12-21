import nc from "next-connect";
import { data } from "../../components/utils/data";
import db from "../../components/utils/db";
import userData from "../../components/utils/userData";
import Product from "../../model/Product";
import User from "../../model/user";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(userData.users);
  await Product.deleteMany();
  await Product.insertMany(data);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});
export default handler;
