import nc from "next-connect";
import { isAuth } from "../../../../components/utils/auth";
import db from "../../../../components/utils/db";
import { onError } from "../../../../components/utils/error";
import Order from "../../../../model/Order";

const handler = nc(onError);
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "Order paid", order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Order not found" });
  }
});
export default handler;
