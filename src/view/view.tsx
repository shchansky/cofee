import React from "react";
import { observer } from "mobx-react-lite";
import * as Markup from "./view.styles";
import { store, CofeeParam } from "../store";

export const View = observer(() => {
  return (
    <>
      {!store.preparationMethod ? (
        <div>
          <div>Выберите способ приготовления</div>
          <Markup.Menu>
            {store.preparationMethods.map((method) => (
              <button onClick={() => store.onSelectPreparationMethod(method)}>
                {method}
              </button>
            ))}
          </Markup.Menu>
        </div>
      ) : (
        <div>Выбран - {store.preparationMethod}</div>
      )}

      <hr />

      <div>
        {store.state === CofeeParam.Sugar ? (
          <div>
            <div>Введите колическтво сахара ?</div>
            <div>
              <input
                type="number"
                value={Number(store.shugar)}
                onChange={(ev) => store.onChangeSugar(ev.target.value)}
              />
            </div>
            <div>
              <button
                onClick={store.onConfirmShugar}
                disabled={!store.shugar}
              >
                Хорош
              </button>
            </div>
          </div>
        ) : store.state === CofeeParam.Size ? (
          <div>
            <div>Введите объем</div>
            <div>
              <input
                type="number"
                value={Number(store.volume)}
                onChange={(ev) => store.onChangeVolume(ev.target.value)}
              />
            </div>
            <div>
              <button
                onClick={store.onConfirmVolume}
                disabled={!store.volume}
              >
                Хорош
              </button>
            </div>
          </div>
        ) : null}

        {!!store.volume &&
          !!store.shugar &&
          !store.state &&
          !store.cookingState && (
            <div>
              <div>Сахара - {store.shugar}</div>
              <div>Объем - {store.volume}</div>
              <div>Вы уверены ?</div>
              <div>
                <button onClick={store.onConfirmStart}>Да</button>
                <button onClick={store.onConfirmReset}>Нет</button>
              </div>
            </div>
          )}

        {store.cookingState && <div>{store.cookingState}</div>}
      </div>

      <hr />

      <button onClick={store.reset}>Отмена</button>
    </>
  );
});
