import { useState, useContext, useEffect } from "react"
import { setCurrentPage } from "../../../reducers/hotelsReducer"
import { HotelsDispatchContext, HotelsContext } from "../../SearchForm"

const Pagination = ({ searchResults }) => {
    console.log(searchResults.pagination);

    const dispatch = useContext(HotelsDispatchContext)
    const state = useContext(HotelsContext)

    let [currentPageNumber, setCurrentPageNumber] = useState(searchResults.pagination.currentPage)

    let [pageNumberLimit, setPageNumber] = useState(7)
    let [maxPageNumberLimit, setMaxPageNumberLimit] = useState(7)
    let [minPageNumberLimit, setMinPageNumbeLimit] = useState(1)


   
   // localStorage.setItem('currentPageKey', JSON.stringify(state.currentPage))

    useEffect(() => {
        dispatch(setCurrentPage(currentPageNumber))
        //  if (searchResults.pagination.currentPage === 1) {
        //     setCurrentPageNumber(1)
        //     setMaxPageNumberLimit(7)
        //     setMinPageNumbeLimit(1)
        // }
        //  window.scrollTo(0, 0)
    }, [currentPageNumber])


    const countOfPages = Math.round(searchResults.totalCount / 25)
    const arrOfPages = [...Array(countOfPages + 1).keys()].slice(1)

    // const indexOfLastPage = currentPageNumber * itemsPerPage
    // const indexOfFirstPage = indexOfLastPage - itemsPerPage
    // const currentItems = arrOfPages.slice(indexOfFirstPage, indexOfLastPage)


    const onBtnPrevClick = () => {
        // if (currentPageNumber > 1) setCurrentPageNumber(currentPageNumber - 1)
        setCurrentPageNumber(currentPageNumber - 1)

        if (currentPageNumber % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumbeLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const onBtnNextClick = () => {
        setCurrentPageNumber(currentPageNumber + 1)
        if (currentPageNumber < 10) setCurrentPageNumber(currentPageNumber + 1)
        if (currentPageNumber + 2 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumbeLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    console.log(minPageNumberLimit, maxPageNumberLimit, currentPageNumber);

    const onBtnPrevClick2 = () => {
      setCurrentPageNumber(Math.ceil(pageNumberLimit * (minPageNumberLimit/pageNumberLimit)-1))

            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumbeLimit(minPageNumberLimit - pageNumberLimit)
        
    }

    const onBtnNextClick2 = () => {
        
         setCurrentPageNumber(Math.ceil(pageNumberLimit * (minPageNumberLimit/pageNumberLimit +1)))

            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumbeLimit(minPageNumberLimit + pageNumberLimit)

           
    }

    let pageIncrementBtn = null;
    if(maxPageNumberLimit  === pageNumberLimit) pageIncrementBtn = null;
    else pageIncrementBtn = <button onClick={onBtnPrevClick2}> &hellip; </button>
    
    
    let pageDecrementBtn = null;
    if (arrOfPages.length > maxPageNumberLimit) {
        pageDecrementBtn = <button onClick={onBtnNextClick2}> &hellip; </button>
    }

     console.log(arrOfPages);

    return (
        <div className="pagination">

            <button disabled={currentPageNumber === arrOfPages[0]} onClick={onBtnPrevClick}>Prev</button>
            {pageIncrementBtn}
            {
                arrOfPages.map((page) => {
                    if (page <= maxPageNumberLimit && page >= minPageNumberLimit) {
                        return <button className={(searchResults.pagination.currentPage === page) ? 'buttonChecked' : ''}
                            onClick={() => setCurrentPageNumber(page)}
                            key={page}>
                            {page}
                        </button>
                    } else {
                        return null;
                    }
                })
            }
            {pageDecrementBtn}
            <button disabled={currentPageNumber === arrOfPages[arrOfPages.length - 1]} onClick={onBtnNextClick} >Next</button>

        </div>
    )
}
export default Pagination


