import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../components/utils/store";

function Shipping() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  if (!userInfo) {
    router.push(`/login?redirect=/shipping`);
  }
  return (
    <div>
      <h1>Shipping</h1>
    </div>
  );
}

export default Shipping;
