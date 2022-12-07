import * as React from "react"
import ReactPlayer from "react-player"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
}

export const TrailerModal = ({ youtubeId, setIsModalOpen }) => {

  return (
    <section className="trailer-modal-main-container">
      <Modal
        open={true}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${youtubeId}`}
            playing={true}
            controls={true}
            height={"65vh"}
            width={"55vw"}
          />
        </Box>
      </Modal>
    </section>
  )
}
