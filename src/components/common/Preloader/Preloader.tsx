// @ts-ignore
import preloader from "../../../assets/images/preloader1.svg"
// @ts-ignore
import s from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.preloader} role={'preloader'}>
            <img src={preloader} alt="preloader"/>
        </div>
    )
}

export default Preloader