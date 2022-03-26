import s from "./../Modal/Modal.module.css";
import styles from './ErrorModal.module.css';
import cn from 'classnames'

const ErrorModal = ({active, errorMessage, hideModal}) => {
    return (
        <div className={cn({[s.active]: active}, s.modalWrapper)} onClick={() => hideModal(null)}>
            <div className={cn({[s.active]: active}, s.modalContent, styles.errorContent)}
                 onClick={e => e.stopPropagation()}>
                <h2>Error</h2>
                <p>{errorMessage}</p>
                <button onClick={() => hideModal(null)}>Ok</button>
            </div>
        </div>
    )
}

export default ErrorModal;