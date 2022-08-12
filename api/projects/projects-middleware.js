// add middlewares here related to projects

const Projects = require("./projects-model");

const validateProjectId = (req, res, next) => {
  Projects.get(req.params.id).then((project) => {
    if (project == null) {
      res
        .status(404)
        .json({ message: `No project exists with id ${req.params.id}` });
    } else {
      req.project = project;
      next();
    }
  });
};

const validateProject = (req, res, next) => {
  if (req.method === "POST") {
    if (req.body.name == null || req.body.description == null) {
      res
        .status(400)
        .json({ message: "project must include name and description." });
    } else {
      next();
    }
  } else if (req.method === "PUT") {
    if (
      req.body.name == null ||
      req.body.description == null ||
      req.body.completed == null
    ) {
      res.status(400).json({
        message: "project must include name, description, and completed.",
      });
    } else {
      next();
    }
  }
};

module.exports = { validateProjectId, validateProject };
