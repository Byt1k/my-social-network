import s from "./Pagination.module.css"
import {FC} from "react"

type PropsType = {
    totalCount: number
    pageSize: number
    onChangePage: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}

const Pagination: FC<PropsType> = ({
                                       totalCount,
                                       pageSize,
                                       onChangePage,
                                       currentPage,
                                       portionSize = 5
                                   }) => {
    // portionSize - кол-во отображаемых страниц без первой и последней

    const pageCount = Math.ceil(totalCount / pageSize)
    const pages: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    // количество отображаемых страниц рядом с текущей
    const countElementsNearby = Math.floor(portionSize / 2)

    const leftBtn: Array<JSX.Element> = []
    const rightBtn: Array<JSX.Element> = []
    for (let i = 1; i <= countElementsNearby; i++) {
        if (currentPage + i < pages.length) {
            rightBtn.push(<button onClick={() => onChangePage(currentPage + i)}>{currentPage + i}</button>)
        }
        if (currentPage - i > 0) {
            leftBtn.unshift(<button onClick={() => onChangePage(currentPage - i)}>{currentPage - i}</button>)
        }
    }

    return (
        <div className={s.pagination}>
            <button disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>Prev</button>
            {currentPage > countElementsNearby + 1 && <button onClick={() => onChangePage(1)}>1</button>}
            {currentPage > countElementsNearby + 2 && <p>...</p>}
            {
                <>
                    {leftBtn}
                    <button className={s.active}>{currentPage}</button>
                    {rightBtn}
                </>
            }
            {currentPage + countElementsNearby + 1 < pages.length && <p>...</p>}
            {currentPage < pages.length && <button onClick={() => onChangePage(pages.length)}>{pages.length}</button>}
            <button disabled={currentPage === pages.length}
                    onClick={() => onChangePage(currentPage + 1)}>Next
            </button>
        </div>
    )
}

export default Pagination