import { createSelector } from '@reduxjs/toolkit';

export const selectTransactions = createSelector(
  [state => state.transactions.transactions],
  transactions => transactions
);
export const selectCategories = createSelector(
  [state => state.transactions.categories],
  categories => categories
);
export const selectSummary = state => state.transactions.summary;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;

//* ========================= generalized selector =========================
export const selectTransactionsObj = createSelector(
  [
    selectTransactions,
    selectCategories,
    selectSummary,
    selectIsLoading,
    selectError,
  ],
  (transactions, categories, summary, loading, error) => {
    return { transactions, categories, summary, loading, error };
  }
);
