import Router from "@koa/router";
import { getHandler, postHandler } from "./routes/zkdb.js";

const router = new Router();
router.prefix("/zkdb");
router.get("/:userPubKey", getHandler);
router.get("/", (ctx) => {
  ctx.body = "Welcome to MVS zkDB";
});
router.post("/:userPubKey", postHandler);
export default router;
