import nc from "next-connect";
import db from "../../../components/utils/db";
import Order from "../../../model/Order";
import { onError } from "../../../components/utils/error";
import { isAuth } from "../../../components/utils/auth";

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});
export default handler;
