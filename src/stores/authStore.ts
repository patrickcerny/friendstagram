import { observable, action, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";
//https://www.npmjs.com/package/mobx-persist
export class AuthStore {
  //persist => on reload gleich
  @persist("object") @observable user: any = undefined;

  @persist("object") @observable loggedIn: boolean = false;
  @persist("object") @observable server: string = "";

  @action setUser: (user: any) => void = (user: any) => {
    this.user = user;
  };

  @action setLoggedIn: (value: any) => void = (value: any) => {
    this.loggedIn = value;
  };

  @action logIn = () => {
    this.loggedIn = true;
  };

  @action logOut = () => {
    this.loggedIn = false;
  };

  constructor() {
    makeAutoObservable(this);
  }
}
const hydrate = create();
export const authStore = new AuthStore();
//injected das ganze in localforage api
hydrate("authStore", authStore);
