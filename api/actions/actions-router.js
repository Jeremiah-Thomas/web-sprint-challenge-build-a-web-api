// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

const { validateActionId, validateAction } = require("./actions-middlware");
const { json } = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get().then((actions) => res.json(actions));
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body).then((action) => {
    res.json(action);
  });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body).then((action) => {
    res.json(action);
  });
});

router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id).then(res.send("Action removed"));
});

module.exports = router;
