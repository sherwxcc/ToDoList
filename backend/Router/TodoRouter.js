const express = require("express");

class TodoRouter {
  constructor(todoService) {
    this.todoService = todoService;
  }

  router() {
    let router = express.Router();
    router.get("/:uid", this.getTask.bind(this));
    router.post("/", this.postTask.bind(this));
    router.put("/:taskid", this.putTask.bind(this));
    router.delete("/:uid/:taskid", this.deleteTask.bind(this));
    return router;
  }

  getTask(req, res) {
    this.todoService
      .listTask(req.params.uid)
      .then((tasksData) => {
        res.json(tasksData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  postTask(req, res) {
    this.todoService.addTask(req.body.task, req.body.userId).then(() => {
      this.todoService
        .listTask(req.body.userId)
        .then((tasksData) => {
          res.json(tasksData);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }

  putTask(req, res) {
    this.todoService
      .editTask(req.body.task, req.params.taskid, req.body.userId)
      .then(() => {
        this.todoService
          .listTask(req.body.userId)
          .then((tasksData) => {
            res.json(tasksData);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
  }

  deleteTask(req, res) {
    this.todoService.deleteTask(req.params.taskid, req.params.uid).then(() => {
      this.todoService
        .listTask(req.params.uid)
        .then((tasksData) => {
          res.json(tasksData);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }
}

module.exports = TodoRouter;
