import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const ScrollUpBtn = () => {

    const onClickScrollUp = () => {
        window.scrollTo(0, 0)
    }

    return <section className="main-scroll-up-btn-container" onClick={onClickScrollUp}>
        <KeyboardArrowUpIcon />
    </section>
}