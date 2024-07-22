import ReactModal, { Styles } from 'react-modal'
import styles from './Modal.module.scss'





interface IModal {
  isOpen: boolean
  label?: string
  style?: Styles
  className?: string
  overlayClassName?: string
  onAfterOpen?: () => void
  onRequestClose?: () => void
  onAfterClose?: () => void
  children: any
}





const Modal = ({ children, isOpen, label, style, className, overlayClassName, onAfterOpen, onRequestClose, onAfterClose }:IModal) => {
  className = `${className || ''} ${styles.modal}`
  overlayClassName = `${overlayClassName || ''} ${styles.overlay}`

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={label}
      style={style}
      className={className}
      overlayClassName={overlayClassName}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  )
}





export default Modal