import s from "./Pagination.module.css";
import React, {useState} from "react";

const Pagination = ({totalCount, pageSize, onChangePage, currentPage, portionSize = 10}) => {
    let pageCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorderPortion = (portionNumber - 1) * portionSize + 1;
    let rightBorderPortion = portionNumber * portionSize;

    return (
        <div className={s.pagination}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
            {
                pages
                    .filter(p => p >= leftBorderPortion && p <= rightBorderPortion)
                    .map(p => {
                    return <button onClick={() => onChangePage(p)} key={p}
                                   className={currentPage === p ? s.active : ''}>{p}</button>
                })
            }
            {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
        </div>
    )
}

export default Pagination;