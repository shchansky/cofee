import { makeAutoObservable, runInAction } from "mobx";

import { Builder } from "./builder";

import { CofeeSort, CofeeParam } from "./enums";

class Machine {
  private _selectedSort: CofeeSort | null = null;

  private _state = new Builder();

  private _cookStart = false;

  private _cookFinish = false;

  private _shugar: null | number = null;

  private _volume: null | number = null;

  private _timer: NodeJS.Timeout | null = null;

  public get cookStart() {
    return this._cookStart;
  }

  public get cookFinish() {
    return this._cookFinish;
  }

  public get sort() {
    return Object.entries(CofeeSort);
  }

  public get shugar() {
    return this._shugar;
  }

  public get volume() {
    return this._volume;
  }

  public get selectedSort(): null | CofeeSort {
    if (!this._selectedSort) return null;

    return CofeeSort[this._selectedSort];
  }

  constructor() {
    makeAutoObservable(this);
  }

  public get state() {
    return this._state.state;
  }

  public onSelectSort = (sort: string) => {
    this._selectedSort = sort as CofeeSort;

    this._state.addParam(CofeeParam.Sugar);
  };

  ///////////////////////////
  public onChangeSugar = (count: string) => {
    this._shugar = Number(count);
  };

  public onSelectShugar = () => {
    this._state.addParam(CofeeParam.Size);
  };
  ///////////////////////////

  ///////////////////////////
  public onChangeVolume = (count: string) => {
    this._volume = Number(count);
  };

  public onSelectVolume = () => {
    this._state.clear();
  };
  ///////////////////////////

  //////////////

  public onCookStart = () => {
    this._cookStart = true;
    this._timer = global.setTimeout(() => {
      this._cookStart = false;
      this._cookFinish = true;
    }, 2000);
  };

  public onCookReset = () => {
    this._shugar = null;
    this._volume = null;
    this._state.addParam(CofeeParam.Sugar);
  };

  /////////////////

  public reset = () => {
    this._selectedSort = null;
    this._state.clear();

    runInAction(() => {
      this._cookFinish = false;
      this._cookStart = false;

      this._shugar = null;
      this._volume = null;

      if (!!this._timer) {
        clearTimeout(this._timer);
      }
    });
  };
}

export const machine = new Machine();
