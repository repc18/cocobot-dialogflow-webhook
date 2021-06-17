const router = require("express").Router();
const controller = require("../controllers/controller");

module.exports = (app) => {
  // apply the webhook handler to the route
  router.post("/webhook", controller.webhookHandler);

  app.use("/", router);
};
