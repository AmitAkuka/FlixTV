import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export const CategoryFilter = ({ categories, onChangeGenereFilter }) => {
  const [isRightEnd, setIsRightEnd] = useState(false)
  const { filterBy } = useSelector((storeState) => storeState.showModule)

  const elementRef = useRef(null)

  const onChangePage = (diff) => {
    if (!elementRef.current) return
    elementRef.current.scrollLeft += (elementRef.current.offsetWidth - 50) * diff
    if (Math.abs(elementRef.current.scrollLeft) ===
        (elementRef.current.scrollWidth - elementRef.current.clientWidth)){
        setIsRightEnd(true)
      }
    if (elementRef.current.scrollLeft === 0) setIsRightEnd(false)
  }

  return <section className="main-category-filter-container main-layout">
      <div ref={elementRef} className="categories-container">
        {categories.map((category) => (
          <button
            className={category.genereId === filterBy.genereId ? 'active' : ''}
            key={category.genereId}
            onClick={() => onChangeGenereFilter(category)}
          >
            {category.genereName}
          </button>
        ))}
      </div>
        <button className="prev-page-btn" style={{display: (isRightEnd) ? 'block' : 'none'}} onClick={() => onChangePage(-1)}>
          <ArrowBackIosNewIcon />
        </button>
        <button className="next-page-btn" style={{display: (isRightEnd) ? 'none' : 'block'}} onClick={() => onChangePage(1)}>
          <ArrowForwardIosIcon />
        </button>
    </section>
}
