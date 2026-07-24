import { useMemo, useState } from 'react';

export function usePagination(items, itemsPerPage = 5) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, page, itemsPerPage]);

  return { page, setPage, totalPages, pageItems };
}
