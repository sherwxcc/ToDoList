class TodoService {
  constructor(knex) {
    this.knex = knex;
  }

  async getUserID(user) {
    try {
      let userQuery = await this.knex
        .select("id")
        .from("users")
        .where("username", user);
      return userQuery[0].id;
    } catch (err) {
      throw new Error("User does not exist");
    }
  }

  async listTask(user) {
    try {
      let userID = await this.getUserID(user);
      let todoQuery = await this.knex
        .select("id", "task")
        .from("todolist")
        .where("user_id", userID)
        .orderBy("id", "asc");
      let todoData = {};
      let todoArr = [];
      todoQuery.forEach((item) => {
        todoArr.push({
          id: item.id,
          task: item.task,
        });
      });
      todoData[user] = todoArr;
      return todoData[user];
    } catch (err) {
      throw new Error("User does not exist, cannot list!");
    }
  }

  async addTask(task, user) {
    try {
      let userID = await this.getUserID(user);
      return this.knex.insert({ task: task, user_id: userID }).into("todolist");
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
