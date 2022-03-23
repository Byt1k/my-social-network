import s from "./Modal.module.css";
import closeModalImg from '../../../assets/images/close.svg'

const Modal = ({active, setActive, children}) => {
   return (
        <div className={active ? `${s.modalWrapper} ${s.active}` : s.modalWrapper} onClick={() => setActive(false)}>
            <div className={active ? `${s.modalContent} ${s.active}` : s.modalContent} onClick={e => e.stopPropagation()}>
                <img src={closeModalImg} alt="icon" className={s.close} onClick={() => setActive(false)}/>
                {children}
            </div>
        </div>
    )
}

export  default Modal;