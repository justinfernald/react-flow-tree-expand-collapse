import { makeAutoObservable } from 'mobx';

import TodoModel from './TodoModel';

export default class TodoListModel {
  constructor() {
    makeAutoObservable(this);
  }

  todos: TodoModel[] = [];

  get unfinishedTodoCount(): number {
    return this.todos.reduce((sum, todo) => sum + (todo.finished ? 0 : 1), 0);
  }

  addTodo(title: string): void {
    this.todos.push(new TodoModel(title));
  }

  removeTodo(todo: TodoModel) {
    this.todos = this.todos.filter((t) => t !== todo);
  }
}
