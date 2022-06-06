import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import cartContext from "../../Store/cart-context";
import styles from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
	const cartCnt = useContext(cartContext);
	const [btnHighlight, setBtnHighlight] = useState(false);

	const { items } = cartCnt;

	const cartItemsNo = items.reduce((currNo, item) => {
		return currNo + item.amount;
	}, 0);

	const buttonClasses = `${styles.button} ${btnHighlight ? styles.bump : ""}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnHighlight(true);

		const timer = setTimeout(() => {
			setBtnHighlight(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={buttonClasses} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon></CartIcon>
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{cartItemsNo}</span>
		</button>
	);
};

export default HeaderCardButton;
