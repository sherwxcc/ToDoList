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
        .orderBy("id", "asc");
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

  async editTask(task, index, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex("todolist")
        .where("user_id", userID)
        .andWhere("id", index)
        .update({ task: task });
    } catch (err) {
      throw new Error("User does not exist, cannot edit!");
    }
  }

  async deleteTask(index, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex("todolist")
        .where("user_id", userID)
        .andWhere("id", index)
        .del();
    } catch (err) {
      throw new Error("User does not exist, cannot delete!");
    }
  }
}

module.exports = TodoService;
