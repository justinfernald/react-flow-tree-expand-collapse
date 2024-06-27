import { makeAutoObservable } from 'mobx';

export default class TodoModel {
  constructor(public title: string) {
    makeAutoObservable(this);
  }

  id = Math.random();
  finished = false;
}
