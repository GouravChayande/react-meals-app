import React from "react";

import HeaderCardButton from "./HeaderCardButton";
import styles from "./Header.module.css";
import mealImg from "../../Assets/meals.jpg";

const Header = (props) => {
	return (
		<React.Fragment>
			<header className={styles.header}>
				<h1>Meals App</h1>
				<HeaderCardButton onClick={props.onShowCart} />
			</header>
			<div className={styles["main-image"]}>
				<img src={mealImg} alt="Tasty food" />
			</div>
		</React.Fragment>
	);
};

export default Header;
