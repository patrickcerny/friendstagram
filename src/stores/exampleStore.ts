import { observable, action } from "mobx";

export class ExampleStore {
  @observable exampleValue: boolean = true;

  @action toggleExampleValue: () => void = () => {
    this.exampleValue = !this.exampleValue;
  };
}

export const exampleStore = new ExampleStore();
