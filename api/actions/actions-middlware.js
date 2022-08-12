// add middlewares here related to actions

const Actions = require("./actions-model");

const validateActionId = (req, res, next) => {
  Actions.get(req.params.id).then((action) => {
    if (action == null) {
      res
        .status(404)
        .json({ message: `No action exists with id ${req.params.id}` });
    } else {
      req.action = action;
      next();
    }
  });
};

const validateAction = (req, res, next) => {
  if (req.method === "POST") {
    if (
      req.body.notes == null ||
      req.body.description == null ||
      req.body.project_id == null
    ) {
      res.status(400).json({
        message: "Actions must include notes, description, and project_id",
      });
    } else {
      next();
    }
  } else if (req.method === "PUT") {
    if (
      req.body.notes == null ||
      req.body.description == null ||
      req.body.project_id == null ||
      req.body.completed == null
    ) {
      res.status(400).json({
        message:
          "Actions must include notes, description, completed, and project_id",
      });
    } else {
      next();
    }
  }
};

module.exports = { validateActionId, validateAction };
