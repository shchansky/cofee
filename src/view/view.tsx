import React from "react";
import { observer } from "mobx-react-lite";
import * as Markup from "./view.styles";
import { machine, CofeeParam } from "../state";

export const View = observer(() => {
  console.log(machine.state);

  return (
    <>
      {!machine.selectedSort ? (
        <Markup.Menu>
          {machine.sort.map((sort) => (
            <button onClick={() => machine.onSelectSort(sort[0])}>
              {sort[1]}
            </button>
          ))}
        </Markup.Menu>
      ) : (
        <div>Выбрано - {machine.selectedSort}</div>
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
                onClick={machine.onSelectShugar}
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
                onClick={machine.onSelectVolume}
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
          !machine.cookFinish &&
          !machine.cookStart && (
            <div>
              <div>Сахара - {machine.shugar}</div>
              <div>Объем - {machine.volume}</div>
              <div>Вы уверены ?</div>
              <div>
                <button onClick={machine.onCookStart}>Да</button>
                <button onClick={machine.onCookReset}>Нет</button>
              </div>
            </div>
          )}

        {machine.cookStart && <div>Кофе готовиться....</div>}
        {machine.cookFinish && <div>Кофе ГОТОВ!!!!</div>}
      </div>

      <hr />

      <button onClick={machine.reset}>Отмена</button>
    </>
  );
});
