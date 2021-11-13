const express = require("express");

class TodoRouter {
  constructor(todoService) {
    this.todoService = todoService;
  }

  router() {
    let router = express.Router();
    router.get("/uid/:uid", this.getTask.bind(this));
    router.post("/", this.postTask.bind(this));
    router.put("/:index", this.putTask.bind(this));
    router.delete("/:index", this.deleteTask.bind(this));
    return router;
  }

  getTask(req, res) {
    this.todoService
      .listTask(req.params.uid)
      .then((tasksData) => {
        res.json(tasksData);
      })
      .catch((err) => {
        console.log(err);
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
      .editTask(req.body.note, req.params.index, req.auth.user)
      .then(() => {
        this.todoService
          .listTask(req.auth.user)
          .then((tasksData) => {
            res.json(tasksData);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
  }

  deleteTask(req, res) {
    this.todoService.deleteNote(req.params.index, req.auth.user).then(() => {
      this.todoService
        .listTask(req.auth.user)
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
