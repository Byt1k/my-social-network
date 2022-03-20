import s from "./Pagination.module.css";
import React from "react";

const Pagination = ({totalCount, pageSize, onChangePage, currentPage}) => {
    let pageCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div className={s.pagination}>
            {
                pages.map(p => {
                    return <button onClick={() => onChangePage(p)} key={p}
                                   className={currentPage === p ? s.active : ''}>{p}</button>
                })
            }
        </div>
    )
}

export default Pagination;