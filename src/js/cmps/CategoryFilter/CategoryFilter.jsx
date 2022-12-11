import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

export const CategoryFilter = ({ categories, onChangeGenereFilter }) => {
  const [scrollEnd, setScrollEnd] = useState({
    isLeftEnd: true,
    isRightEnd: false,
  })
  const { filterBy } = useSelector((storeState) => storeState.showModule)

  const elementRef = useRef(null)

  const onChangePage = (diff) => {
    if (!elementRef.current) return
    elementRef.current.scrollLeft += (elementRef.current.offsetWidth - 50) * diff
    const calc = Math.abs(elementRef.current.scrollLeft) === elementRef.current.scrollWidth - elementRef.current.clientWidth
    if (calc) {
      setScrollEnd({ isLeftEnd: false, isRightEnd: true })
    } else if (elementRef.current.scrollLeft === 0) {
      setScrollEnd({ isLeftEnd: true, isRightEnd: false })
    } else {
      setScrollEnd({ isLeftEnd: false, isRightEnd: false })
    }
  }

  return (
    <section className="main-category-filter-container main-layout">
      <div ref={elementRef} className="categories-container">
        {categories.map((category) => (
          <button
            className={category.genereId === filterBy.genereId ? "active" : ""}
            key={category.genereId}
            onClick={() => onChangeGenereFilter(category)}
          >
            {category.genereName}
          </button>
        ))}
      </div>
      <button
        className="prev-page-btn"
        style={{ display: scrollEnd.isLeftEnd ? "none" : "block" }}
        onClick={() => onChangePage(-1)}
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        className="next-page-btn"
        style={{ display: scrollEnd.isRightEnd ? "none" : "block" }}
        onClick={() => onChangePage(1)}
      >
        <ArrowForwardIosIcon />
      </button>
    </section>
  )
}
