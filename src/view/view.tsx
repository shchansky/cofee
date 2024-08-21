import React from "react";
import { observer } from "mobx-react-lite";
import * as Markup from "./view.styles";
import { machine, CofeeParam } from "../state";

export const View = observer(() => {
  return (
    <>
      {!machine.preparationMethod ? (
        <div>
          <div>Выберите способ приготовления</div>
          <Markup.Menu>
            {machine.preparationMethods.map((method) => (
              <button onClick={() => machine.onSelectPreparationMethod(method)}>
                {method}
              </button>
            ))}
          </Markup.Menu>
        </div>
      ) : (
        <div>Выбран - {machine.preparationMethod}</div>
      )}

      <hr />

      <div>
        {machine.state === CofeeParam.Sugar ? (
          <div>
            <div>Сколько сахара ?</div>
            <div>
              <input
                type="number"
                value={Number(machine.shugar)}
                onChange={(ev) => machine.onChangeSugar(ev.target.value)}
              />
            </div>
            <div>
              <button
                onClick={machine.onConfirmShugar}
                disabled={!machine.shugar}
              >
                Хорош
              </button>
            </div>
          </div>
        ) : machine.state === CofeeParam.Size ? (
          <div>
            <div>Сколько в граммах ?</div>
            <div>
              <input
                type="number"
                value={Number(machine.volume)}
                onChange={(ev) => machine.onChangeVolume(ev.target.value)}
              />
            </div>
            <div>
              <button
                onClick={machine.onConfirmVolume}
                disabled={!machine.volume}
              >
                Хорош
              </button>
            </div>
          </div>
        ) : null}

        {!!machine.volume &&
          !!machine.shugar &&
          !machine.state &&
          !machine.cookingState && (
            <div>
              <div>Сахара - {machine.shugar}</div>
              <div>Объем - {machine.volume}</div>
              <div>Вы уверены ?</div>
              <div>
                <button onClick={machine.onConfirmStart}>Да</button>
                <button onClick={machine.onConfirmReset}>Нет</button>
              </div>
            </div>
          )}

        {machine.cookingState && <div>{machine.cookingState}</div>}
      </div>

      <hr />

      <button onClick={machine.reset}>Отмена</button>
    </>
  );
});
