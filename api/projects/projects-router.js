// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");
const Actions = require("./../actions/actions-model");
const { validateProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    res.json(projects);
  });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body).then((project) => {
    res.json(project);
  });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Projects.update(req.params.id, req.body).then((project) => {
    res.json(project);
  });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.params.id).then((num) => res.send("Project deleted."));
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Actions.get().then((actions) => {
    res.json(
      actions.filter((action) => {
        return action.project_id === parseInt(req.params.id);
      })
    );
  });
});

module.exports = router;
