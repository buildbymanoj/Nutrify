import { useState } from "react"

export default function Food({food}) {
  const [grams,setgrams]=useState(100);
    return(
    <div className="food">
        <div className="food-img">
            {/* <img className="food-image" src={food.imageUrl} alt={food.name} /> */}


        </div>
        <h2 className="nutriant">{food.name} ({food.calories} Kcal for {grams}G )</h2>
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

        <input className="inp" type="number" placeholder="Enter Qty in gms" />
        <button className="btn">Track this Food</button>

    </div>
    )
}