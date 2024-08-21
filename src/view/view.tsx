import React from "react";
import { observer } from "mobx-react-lite";
import * as Markup from "./view.styles";
import { store } from "../store";

export const View = observer(() => {
  const handleSetSugar = (ev: React.ChangeEvent<HTMLInputElement>) => {
    store.setSugar(ev.target.value);
  };

  const handleSetVolume = (ev: React.ChangeEvent<HTMLInputElement>) => {
    store.setVolume(ev.target.value);
  };

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
        {!store.cookingState && !!store.preparationMethod && (
          <div>
            <div>Введите колическтво сахара ?</div>
            <div>
              <input
                type="number"
                value={Number(store.shugar)}
                onChange={handleSetSugar}
              />
            </div>

            <div>Введите объем</div>

            <div>
              <input
                type="number"
                value={Number(store.volume)}
                onChange={handleSetVolume}
              />
            </div>

            <div>
              <button
                disabled={!store.isReadyCooking}
                onClick={store.onCookingStart}
              >
                Приготовить
              </button>
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
