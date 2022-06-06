import { useContext } from "react";

import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
	const cartCnt = useContext(CartContext);

	const totalAmount = `$${cartCnt.totalAmount.toFixed(2)}`;
	const hasItems = cartCnt.items.length > 0;

	const cartItemAddHandler= (item) => {
		cartCnt.addItem({...item,amount:1});
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
					onAdd={cartItemAddHandler.bind(null,item)}
					onRemove={cartItemRemoveHander.bind(null,item.id)}
				></CartItem>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
