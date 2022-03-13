// "use strict";

// const express = require("express");
// const userRouter = express.Router();
// const { User } = require("../../models/index");
// const bearer = require("../../middleware/bearer");
// const acl = require('../../middleware/acl');

// userRouter.get("/users", bearer(User), async (req, res) => {
//   res.send("you can read the data");
// });
// userRouter.post("/users", bearer(User), acl("create"), (req, res) => {
//   res.send("new data was created");
// });
// userRouter.put("/users", bearer(User), acl("update"), (req, res) => {
//   res.send("data updated");
// });
// userRouter.delete("/users", bearer(User), acl("delete"), (req, res) => {
//   res.send("data deleted");
// });

// module.exports = userRouter;
