import { useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

export default function Food(props) {
    const [Eatenquantity, setEatenquantity] = useState(100);
    const [food, setfood] = useState({});
    const [foodInitial, setfoodInitial] = useState({});
    const [trackMessage, setTrackMessage] = useState("");

    let LoggedData = useContext(UserContext);

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

    function TrackFoodItem() {
        const today = new Date();
        const formattedDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        
        let trackedItem = {
            userId: LoggedData.loggedUser.userid,
            foodid: food._id,
            details: {
                protein: food.protein,
                carbohydrates: food.carbohydrates,
                fat: food.fat,
                fiber: food.fiber,
                calories: food.calories
            },
            quantity: Eatenquantity,
            eatenDate: formattedDate




        }
        // console.log(trackedItem);
        fetch(`${import.meta.env.VITE_API_URL}/track`, {
            method: "POST",
            body: JSON.stringify(trackedItem),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${LoggedData.loggedUser.token}`

            }
        }
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setTrackMessage("✓ Added successfully!");
                setTimeout(() => setTrackMessage(""), 3000); // Clear message after 3 seconds
            })
            .catch((err) => {
                // console.log(err);
                setTrackMessage("✗ Failed to add. Try again.");
                setTimeout(() => setTrackMessage(""), 3000);
            })

    }

    return (
        <div className="food">
            <div className="food-img">
                <img className="food-image" src={food.imageUrl} alt={food.name} />


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
                <button className="track-btn" onClick={TrackFoodItem}>Track</button>

            </div>
            {trackMessage && (
                <div className={`track-message ${trackMessage.includes('✓') ? 'success' : 'error'}`}>
                    {trackMessage}
                </div>
            )}



        </div>
    )
}