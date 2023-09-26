import cn from "classnames";
import * as React from "react";
import { SetURLSearchParams } from "react-router-dom";
import Button from "components/Button";
import { QUERY_PARAM_PAGE } from "config/searchParams";
import { PRODUCTS_PER_PAGE } from "store/ProductsStore";
import ArrowLeft from "styles/svg/arrowLeft.svg";
import styles from "./Pagination.module.scss";

export type PaginationProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  itemsLength: number;
  pagesToShow: number;
};

const Pagination: React.FC<PaginationProps> = ({
  searchParams,
  setSearchParams,
  itemsLength,
  pagesToShow = 3,
}) => {
  const curPage = parseInt(searchParams.get(QUERY_PARAM_PAGE) || "1");
  const totalPages = Math.ceil(itemsLength / PRODUCTS_PER_PAGE);

  const goToPage = React.useCallback(
    (page: number) => () => {
      searchParams.set(QUERY_PARAM_PAGE, String(page));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const prevPage = React.useCallback(() => {
    if (curPage > 1) {
      goToPage(curPage - 1)();
    }
  }, [curPage, goToPage]);

  const nextPage = React.useCallback(() => {
    if (curPage < totalPages) {
      goToPage(curPage + 1)();
    }
  }, [curPage, goToPage, totalPages]);

  const renderPageNumbers = React.useMemo(() => {
    const pageNumbers = [];
    let startPage = curPage - Math.floor(pagesToShow / 2);
    let endPage = curPage + Math.floor(pagesToShow / 2);

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(pagesToShow, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - pagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={goToPage(i)}
          className={cn(
            styles.pagination__page,
            curPage === i && styles.pagination__page_active
          )}
        >
          <span className={styles.pagination__page__text}>{i}</span>
        </Button>
      );
    }

    return pageNumbers;
  }, [curPage, goToPage, pagesToShow, totalPages]);

  return (
    totalPages > 1 && (
      <div className={styles.pagination}>
        <Button
          className={styles.pagination__button}
          onClick={prevPage}
          disabled={curPage === 1}
        >
          <ArrowLeft style={{ strokeWidth: "1.5" }} />
        </Button>
        {curPage - pagesToShow >= 0 && totalPages > pagesToShow && (
          <>
            <Button
              onClick={goToPage(1)}
              className={cn(
                styles.pagination__page,
                curPage === 1 && styles.pagination__page_active
              )}
            >
              <span className={styles.pagination__page__text}>1</span>
            </Button>
            {curPage - pagesToShow > 0 && (
              <span className={styles.pagination__page__text}>...</span>
            )}
          </>
        )}
        {renderPageNumbers}
        {curPage + pagesToShow / 2 <= totalPages &&
          totalPages > pagesToShow && (
            <>
              {totalPages - pagesToShow / 2 > curPage + 1 && (
                <span className={styles.pagination__page__text}>...</span>
              )}
              <Button
                onClick={goToPage(totalPages)}
                className={cn(
                  styles.pagination__page,
                  curPage === totalPages && styles.pagination__page_active
                )}
              >
                <span className={styles.pagination__page__text}>
                  {totalPages}
                </span>
              </Button>
            </>
          )}
        <Button
          className={styles.pagination__button}
          onClick={nextPage}
          disabled={curPage >= totalPages}
        >
          <ArrowLeft
            style={{ transform: "rotate(180deg)", strokeWidth: "1.5" }}
          />
        </Button>
      </div>
    )
  );
};

export default React.memo(Pagination);
