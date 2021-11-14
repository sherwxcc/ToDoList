class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  async listTask(userId) {
    try {
      let taskQuery = await this.knex
        .select("id", "task")
        .from("todolist")
        .where("user_id", userId)
        .orderBy("id", "desc");
      let todoData = {};
      let todoArr = [];
      taskQuery.forEach((item) => {
        todoArr.push({
          id: item.id,
          task: item.task,
        });
      });
      todoData[userId] = todoArr;
      return todoData[userId];
    } catch (err) {
      throw new Error("User does not exist, cannot list!");
    }
  }

  async addTask(task, userId) {
    try {
      return this.knex.insert({ task: task, user_id: userId }).into("todolist");
    } catch (err) {
      throw new Error("User does not exist, cannot add!");
    }
  }

  async editTask(task, taskId, userId) {
    try {
      return this.knex("todolist")
        .where("user_id", userId)
        .andWhere("id", taskId)
        .update({ task: task });
    } catch (err) {
      throw new Error("User does not exist, cannot edit!");
    }
  }

  async deleteTask(taskId, userId) {
    try {
      return this.knex("todolist")
        .where("user_id", userId)
        .andWhere("id", taskId)
        .del();
    } catch (err) {
      throw new Error("User does not exist, cannot delete!");
    }
  }
}

module.exports = TodoService;
