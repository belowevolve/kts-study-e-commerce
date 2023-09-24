import cn from "classnames";
import * as React from "react";
import { SetURLSearchParams } from "react-router-dom";
import Button from "components/Button";
import Text, { TextView, TextWeight } from "components/Text";
import { QUERY_PARAM_PAGE } from "config/searchParams";
import { PRODUCTS_PER_PAGE } from "store/ProductStore";
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

  const renderPageNumbers = () => {
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
          <Text view={TextView.p18} weight={TextWeight.medium}>
            {i}
          </Text>
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__button}
        onClick={prevPage}
        disabled={curPage === 1}
      >
        <ArrowLeft style={{ strokeWidth: "1.5" }} />
      </Button>
      {curPage - pagesToShow >= 0 && (
        <>
          <Button
            onClick={goToPage(1)}
            className={cn(
              styles.pagination__page,
              curPage === 1 && styles.pagination__page_active
            )}
          >
            <Text view={TextView.p18} weight={TextWeight.medium}>
              1
            </Text>
          </Button>
          <Text view={TextView.p18} weight={TextWeight.medium}>
            ...
          </Text>
        </>
      )}
      {renderPageNumbers()}
      {curPage + pagesToShow <= totalPages + 1 && (
        <>
          <Text view={TextView.p18} weight={TextWeight.medium}>
            ...
          </Text>
          <Button
            onClick={goToPage(totalPages)}
            className={cn(
              styles.pagination__page,
              curPage === totalPages && styles.pagination__page_active
            )}
          >
            <Text view={TextView.p18} weight={TextWeight.medium}>
              {totalPages}
            </Text>
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
  );
};

export default React.memo(Pagination);
