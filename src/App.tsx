import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  REVERSE = 'reverse',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType | ''>('');

  const resetGoodsOfOrder = () => {
    setVisibleGoods(goodsFromServer);
    setActiveSort('');
  };

  const sortGoodsAlphabetically = () => {
    setVisibleGoods(
      [...goodsFromServer].sort((a, b) => a.localeCompare(b))
    );
    setActiveSort(SortType.ALPHABET);
  };

  const sortGoodsByLength = () => {
    setVisibleGoods(
      [...goodsFromServer].sort((a, b) => a.length - b.length)
    );
    setActiveSort(SortType.LENGTH);
  }

  const reverseGoodsOrder = () => {
    setVisibleGoods(
      [...visibleGoods].reverse()
    );
    setActiveSort(SortType.REVERSE)
  }

  return (
  <div className="section content">
    <div className="buttons">
      <button
        onClick={sortGoodsAlphabetically}
        type="button"
        className={`button is-info ${activeSort === SortType.ALPHABET ? '' : 'is-light'}`}
      >
        Sort alphabetically
      </button>

      <button
        onClick={sortGoodsByLength}
        type="button"
        className={`button is-success ${activeSort === SortType.LENGTH ? '' : 'is-light'}`}
      >
        Sort by length
      </button>

      <button
        onClick={reverseGoodsOrder}
        type="button"
        className={`button is-warning ${activeSort === SortType.REVERSE ? '' : 'is-light'}`}
      >
        Reverse
      </button>
     {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer) && (
      <button
        onClick={resetGoodsOfOrder}
        type="button"
        className="button is-danger is-light"
      >
        Reset
      </button>
      )}
    </div>

    <ul>
      {visibleGoods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  </div>
  );
};
