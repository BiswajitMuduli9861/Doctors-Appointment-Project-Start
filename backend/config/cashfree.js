import { Cashfree } from "cashfree-pg";

export const cashfree = new Cashfree(
  Cashfree.SANDBOX,   // change to PRODUCTION in live
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_SECRET_KEY
);
