import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef,useState } from "react";

const MealItemForm = (props) => {
	const [amountIsValid,setAmountIsvalid] = useState(true);
	const amountInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredNumber = +enteredAmount;

		if(enteredAmount.trim().length === 0 || enteredNumber < 1 || enteredNumber > 5) {
			setAmountIsvalid(false);
			return;
		}

		props.onAddToCart(enteredNumber);
	}

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Enter a valid amount</p>}
		</form>
	);
};

export default MealItemForm;
