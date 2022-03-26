import s from "./Modal.module.css";
import closeModalImg from '../../../assets/images/close.svg'
import cn from 'classnames'

const Modal = ({active, setActive, children}) => {
   return (
        <div className={cn({[s.active]: active}, s.modalWrapper)} onClick={() => setActive(false)}>
            <div className={cn({[s.active]: active}, s.modalContent)} onClick={e => e.stopPropagation()}>
                <img src={closeModalImg} alt="icon" className={s.close} onClick={() => setActive(false)}/>
                {children}
            </div>
        </div>
    )
}

export  default Modal;