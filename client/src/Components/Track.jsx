import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import Food from "./Food";
//import { useEffect } from "react";


export default function Track() {
    const [foodItems, setfoodItems] = useState([]);
    const [food, setfood] = useState(null);
    const LoggedData = useContext(UserContext);

    // useEffect(() => {
    //     console.log(food);
    // })





    function searchfood(event) {
        if (event.target.value !== "") {
            fetch(`http://localhost:8000/foods/${event.target.value}`, {
                method: "GET",
                headers: {

                    "Authorization": "Bearer " + LoggedData.loggedUser.token
                }
            })

                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.message === undefined) {
                        setfoodItems(data);
                    }
                    else {
                        setfoodItems([]);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            setfoodItems([]);
        }


    }

    return (
        
        <section className="container track-container">
            <Header/>
            <div className="search">
                <input className="track-inp" onChange={searchfood} placeholder="Search foods" />

            </div>
            {

                (foodItems.length !== 0) ?
                    (
                        <div className="search-item">
                            {
                                foodItems.map((item) => {
                                    return (
                                        <p className="item" onClick={() => {
                                            setfood(item);
                                        }} key={item._id}>{item.name}</p>
                                    )
                                })
                            }

                        </div>) : null

            }
            {    food!==null?
                <Food food={food}/>:null
            }
            

                   </section>



    )
}