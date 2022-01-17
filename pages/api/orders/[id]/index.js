import nc from "next-connect";
import { isAuth } from "../../../../components/utils/auth";
import db from "../../../../components/utils/db";
import Order from "../../../../model/Order";

const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});
export default handler;
