import { ShowPreview } from "./show-preview.jsx"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"

export const ShowSuggestionList = ({ shows, onSelectShow }) => {
  return (
    <section className="show-suggestion-list-container">
      <h1>You may also like</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="main-swiper-container"
      >
        {shows.map((show) => {
          return (
            <SwiperSlide key={show.id}>
              <ShowPreview show={show} onSelectShow={onSelectShow} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  )
}
