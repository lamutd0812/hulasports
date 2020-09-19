import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        props.show ?
            <div className={classes.modal}>
                <div className={classes.content}>
                    {props.message}
                </div>
                <div className={classes.btn} onClick={props.modalClosed}>
                    OK
                </div>
            </div> : null
    );
};

export default Modal;