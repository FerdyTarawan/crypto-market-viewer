import create from 'zustand';

import type { CryptoCurrencyAsset } from 'types/crypto';

interface State {
  cryptoAsset: CryptoCurrencyAsset[];
  addCryptoAsset: (
    newAsset: CryptoCurrencyAsset | CryptoCurrencyAsset[],
  ) => void;
}

export const useStore = create<State>((set) => ({
  addCryptoAsset: (newAsset) =>
    set((state) => ({ cryptoAsset: state.cryptoAsset.concat(newAsset) })),
  cryptoAsset: [],
}));
