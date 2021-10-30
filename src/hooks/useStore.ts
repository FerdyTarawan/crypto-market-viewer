import create from 'zustand';
import { persist } from 'zustand/middleware';

import type { CryptoCurrencyAsset } from 'types/crypto';

export interface State {
  cryptoAsset: CryptoCurrencyAsset[];
  filterTag: string;
  addCryptoAsset: (
    newAsset: CryptoCurrencyAsset | CryptoCurrencyAsset[],
  ) => void;
  setFilterTag: (tag: string) => void;
}

export const useStore = create<State>(
  persist(
    (set) => ({
      addCryptoAsset: (newAsset) =>
        set((state) => ({ cryptoAsset: state.cryptoAsset.concat(newAsset) })),
      cryptoAsset: [],
      filterTag: '',
      setFilterTag: (tag) => set(() => ({ filterTag: tag })),
    }),
    {
      name: 'asset-storage',
    },
  ),
);
