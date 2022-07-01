import React, { useContext, useState } from "react";

import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
	const [checkout, setCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmitting, setDidSubmitting] = useState(false);
	const [error, setError] = useState();
	const cartCnt = useContext(CartContext);

	const totalAmount = `$${cartCnt.totalAmount.toFixed(2)}`;
	const hasItems = cartCnt.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCnt.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHander = (id) => {
		cartCnt.removeItem(id);
	};

	const cartItems = (
		<ul className={styles["cart-items"]}>
			{cartCnt.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={cartItemAddHandler.bind(null, item)}
					onRemove={cartItemRemoveHander.bind(null, item.id)}
				></CartItem>
			))}
		</ul>
	);

	const orderHandler = () => {
		setCheckout(true);
	};

	const subitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		const fetchData = async () => {
			const response = await fetch(
				"https://meals-b48e5-default-rtdb.firebaseio.com/orders.json",
				{
					method: "POST",
					body: JSON.stringify({ user: userData, orderedItems: cartCnt.items }),
				}
			).then();
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			setIsSubmitting(false);
			setDidSubmitting(true);
			cartCnt.clearCart();
		};
		fetchData().catch((error) => {
			setError(error.message);
			setIsSubmitting(false);
			setDidSubmitting(false);
		});
	};

	const modalActions = (
		<div className={styles.actions}>
			<button className={styles["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{checkout && (
				<Checkout onConfirm={subitOrderHandler} onCancel={props.onClose} />
			)}
			{!checkout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSumbitModalContent = (
		<React.Fragment>
			<p>Successfully sent order!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmitting && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmitting && didSumbitModalContent}
			{!isSubmitting && !didSubmitting && error && <p>{error}</p>}
		</Modal>
	);
};

export default Cart;
