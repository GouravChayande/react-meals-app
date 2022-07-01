import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://meals-b48e5-default-rtdb.firebaseio.com/meals.json"
			).then();

			if (!response.ok) {
				throw new Error("Something went wrong");
			}

			const responseData = await response.json();

			const Meals = [];
			for (const key in responseData) {
				Meals.push({
					id: key,
					name: responseData[key].name,
					price: responseData[key].price,
					description: responseData[key].description,
				});
			}
			setMeals(Meals);
			setLoading(false);
		};
		fetchData().catch((error) => {
			setError(error.message);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<section className={styles.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles.MealsError}>
				<p>{error}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		></MealItem>
	));

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
