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

const applySort = (goods: string[], sortType: SortType, isReversed: boolean) => {
  let sortedGoods;

  switch(sortType) {
    case SortType.ALPHABET:
      sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      sortedGoods = [...goods].sort((a, b) => a.length - b.length);
      break;
    default:
      return goods;
  }
  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const resetGoodsOfOrder = () => {
    setVisibleGoods(goodsFromServer);
    setActiveSort('');
  };

  const sortGoodsAlphabetically = () => {
    setVisibleGoods(applySort(goodsFromServer, SortType.ALPHABET, isReversed));
    setActiveSort(SortType.ALPHABET);
    setIsReversed(false);
  };

  const sortGoodsByLength = () => {
    setVisibleGoods(applySort(goodsFromServer, SortType.LENGTH, isReversed));
    setActiveSort(SortType.LENGTH);
    setIsReversed(false);
  }

  const reverseGoodsOrder = () => {
    setIsReversed(prev => !prev);
    setVisibleGoods(prev => [...prev].reverse());
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
