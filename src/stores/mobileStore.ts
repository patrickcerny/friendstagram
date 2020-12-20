import { observable, action, makeAutoObservable } from "mobx";

export class MobileStore {
  @observable isMobile: boolean = false;

  @action setMobile: (value: boolean) => void = (value: boolean) => {
    this.isMobile = value;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const mobileStore = new MobileStore();
