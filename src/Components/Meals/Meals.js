import React from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
    return ( 
        <React.Fragment>
            <MealsSummary></MealsSummary>
            <AvailableMeals></AvailableMeals>
        </React.Fragment>

     );
}
 
export default Meals;