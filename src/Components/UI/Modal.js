import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
	return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const PortalElement = document.getElementById("overlays");

const Modal = (props) => {
	return (
		<React.Fragment>
			{ReactDom.createPortal(<Backdrop onClose={props.onClose}/>,PortalElement)}
			{ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,PortalElement)}
		</React.Fragment>
	);
};

export default Modal;
