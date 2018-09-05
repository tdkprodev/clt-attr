import { observable } from 'mobx';

class SuperStore {
  @observable appEntered: boolean = false;
}

export const superStore = new SuperStore();