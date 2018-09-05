import { observable } from 'mobx';

class SuperStore {
  @observable public appEntered: boolean = false;
}

export const superStore = new SuperStore();