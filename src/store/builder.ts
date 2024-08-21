import { makeAutoObservable } from "mobx";

import {CofeeParam} from "./enums"

type Param = {
  caption: string;
  value: number;
};

export class Builder {
  private _state: CofeeParam| null = null;

  public get state() {
    return this._state;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public addParam = (param: CofeeParam) => {
    this._state = param;
  };

  public clear = () => {
    this._state = null;
  };
}
