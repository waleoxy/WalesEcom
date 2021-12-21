import { useRouter } from "next/router";
import React from "react";

function Shipping() {
  const router = useRouter();
  router.push("/login");
  return (
    <div>
      <h1>Shipping</h1>
    </div>
  );
}

export default Shipping;
