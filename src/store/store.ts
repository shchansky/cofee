import { makeAutoObservable, runInAction } from "mobx";

import { Builder } from "./builder";

import { PreparationMethod, CofeeParam } from "./enums";

class Store {
  private _preparationMethod: PreparationMethod | null = null;

  private _state = new Builder();

  private _cookingState: string | null = null;

  private _shugar: null | number = null;

  private _volume: null | number = null;

  private _cookingTimer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public get cookingState() {
    return this._cookingState;
  }

  public get preparationMethods() {
    return Object.values(PreparationMethod);
  }

  public get shugar() {
    return this._shugar;
  }

  public get volume() {
    return this._volume;
  }

  public get preparationMethod(): null | PreparationMethod {
    if (!this._preparationMethod) return null;

    return PreparationMethod[this._preparationMethod];
  }

  public get state() {
    return this._state.state;
  }

  public onSelectPreparationMethod(sort: string) {
    this._preparationMethod = sort as PreparationMethod;

    this._state.addParam(CofeeParam.Sugar);
  }

  public onChangeSugar(count: string) {
    this._shugar = Number(count);
  }

  public onConfirmShugar() {
    this._state.addParam(CofeeParam.Size);
  }

  public onChangeVolume(count: string) {
    this._volume = Number(count);
  }

  public onConfirmVolume() {
    this._state.clear();
  }

  public onConfirmStart() {
    this._cookingState = "Кофе готовится....";
    this._cookingTimer = global.setTimeout(() => {
      this._cookingState = "Кофе готов !!!!!";
    }, 2000);
  }

  public onConfirmReset() {
    this._shugar = null;
    this._volume = null;
    this._state.addParam(CofeeParam.Sugar);
  }

  public reset() {
    this._preparationMethod = null;
    this._state.clear();

    runInAction(() => {
      this._cookingState = null;

      this._shugar = null;
      this._volume = null;

      if (!!this._cookingTimer) {
        clearTimeout(this._cookingTimer);
      }
    });
  }
}

export const store = new Store();
