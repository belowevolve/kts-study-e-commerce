import cn from "classnames";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { SetURLSearchParams } from "react-router-dom";
import Button from "components/Button";
import PaginationStore from "store/PaginationStore";
import ArrowLeft from "styles/svg/arrowLeft.svg";
import { useLocalStore } from "utils/useLocalStore";
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
  const paginationStore = useLocalStore(
    () =>
      new PaginationStore(
        searchParams,
        setSearchParams,
        itemsLength,
        pagesToShow
      )
  );
  const curPage = paginationStore.curPage;
  const totalPages = paginationStore.totalPages;
  const renderPageNumbers = React.useMemo(() => {
    const pageNumbers: React.JSX.Element[] = [];
    const { startPage, endPage } = paginationStore.startEndPages;

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => paginationStore.goToPage(i)}
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
  }, [curPage, paginationStore]);

  return (
    totalPages > 1 && (
      <div className={styles.pagination}>
        <Button
          className={styles.pagination__button}
          onClick={paginationStore.prevPage}
          disabled={curPage === 1}
        >
          <ArrowLeft style={{ strokeWidth: "1.5" }} />
        </Button>
        {curPage - pagesToShow >= 0 && totalPages > pagesToShow && (
          <>
            <Button
              onClick={() => paginationStore.goToPage(1)}
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
                onClick={() => paginationStore.goToPage(totalPages)}
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
          onClick={paginationStore.nextPage}
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

export default observer(Pagination);
