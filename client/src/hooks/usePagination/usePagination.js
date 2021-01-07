import React, { useState, useMemo, useCallback } from 'react';

export const usePagination = ({
  itemsPerPage = 2,
  initialPage = 1,
  itemsAmount = 0,
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const pagesAmount = useMemo(() => Math.ceil(itemsAmount / itemsPerPage), [
    itemsAmount,
    itemsPerPage,
  ]);

  const nextPage = () => {
    if (currentPage >= pagesAmount) return;

    setCurrentPage((page) => page + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage((page) => page - 1);
  };

  const goToPage = useCallback(
    (pageNumber) => {
      if (pageNumber < 1) setCurrentPage(1);
      if (pageNumber > pagesAmount) setCurrentPage(pagesAmount);

      setCurrentPage(pageNumber);
    },
    [setCurrentPage, pagesAmount]
  );

  const PageLinks = useCallback(
    ({ ...args }) => {
      const pages = [];
      for (let i = 1; i <= pagesAmount; i++) {
        pages.push(
          <li
            style={{ padding: '0 0.5em', cursor: 'pointer' }}
            key={`page${i}`}
            onClick={() => goToPage(i)}
          >
            {currentPage === i ? (
              <strong style={{ textDecoration: 'underline' }}>{i}</strong>
            ) : (
              i
            )}
          </li>
        );
      }
      return <ul {...args}>{pages}</ul>;
    },
    [pagesAmount, currentPage, goToPage]
  );

  return {
    currentPage,
    itemsPerPage,
    pagesAmount,
    nextPage,
    previousPage,
    goToPage,
    PageLinks,
  };
};
