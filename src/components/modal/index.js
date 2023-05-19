import React, { useEffect } from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({onClose, children}){
  useEffect(() => {
    // Закрытие модального окна по нажатию на клавишу Esc
      const close = (e) => {
        if(e.key === "Escape"){
          onClose();
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[onClose]);

  return (
      <div className="Modal">
          <div className="Modal__box">
            <div className="Modal__close" onClick={onClose}>
              <button>Закрыть</button>
            </div>
              {children}
          </div>
      </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {}
};

export default React.memo(Modal);