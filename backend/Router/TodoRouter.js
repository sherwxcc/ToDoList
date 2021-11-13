const express = require("express");

class TodoRouter {
  constructor(todoService) {
    this.todoService = todoService;
  }

  router() {
    let router = express.Router();
    router.get("/todo", this.getTask.bind(this));
    router.post("/todo", this.postTask.bind(this));
    router.put("/todo/:index", this.putTask.bind(this));
    router.delete("/todo/:index", this.deleteTask.bind(this));
    return router;
  }

  getTask(req, res) {
    this.todoService
      .listTask(req.auth.user)
      .then((tasksData) => {
        res.json(tasksData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  postTask(req, res) {
    this.todoService.addTask(req.body.note, req.auth.user).then(() => {
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
