import { useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

export default function Food(props) {
    const [Eatenquantity, setEatenquantity] = useState(100);
    const [food, setfood] = useState({});
    const [foodInitial, setfoodInitial] = useState({});

    let LoggedData=useContext(UserContext);

    useEffect(() => {
        setfood(props.food);
        setfoodInitial(props.food);
    }, [props.food])

    //   function handleInput(event){
    //      setquantity(Number(event.target.value ))
    //   }

    function calculate(event) {

        if (event.target.value.length != 0) {
            let quantity = Number(event.target.value);
            setEatenquantity(quantity);


            let copyFood = { ...food };

            copyFood.protein = (foodInitial.protein * quantity) / 100;
            copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
            copyFood.fat = (foodInitial.fat * quantity) / 100;
            copyFood.fiber = (foodInitial.fiber * quantity) / 100;
            copyFood.calories = (foodInitial.calories * quantity) / 100;


            setfood(copyFood);

        }
    }

    return (
        <div className="food">
            <div className="food-img">
                {/* <img className="food-image" src={food.imageUrl} alt={food.name} /> */}


            </div>
            <h2 className="nutriant">{food.name} ({food.calories} Kcal for {Eatenquantity}G )</h2>
            <div className="nutriant">
                <p className="-title">Protein</p>
                <p className="-value">{food.protein}g</p>
            </div>
            <div className="nutriant">
                <p className="-title">Carbs</p>
                <p className="-value">{food.carbohydrates}g</p>
            </div>
            <div className="nutriant">
                <p className="-title">Fibre</p>
                <p className="-value">{food.fiber}g</p>
            </div>
            <div className="nutriant">
                <p className="-title">Fat</p>
                <p className="-value">{food.fat}g</p>
            </div>
            <div className="track-control">

                <input className="inp" type="number" onChange={calculate} 
                placeholder="Enter Qty in gms" />
                {/* <button className="btn" onClick={calculate}>Calculate</button> */}
                <button className="btn">Track</button>

            </div>



        </div>
    )
}