import Header from "./Header"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import Food from "./Food";
//import { useEffect } from "react";


export default function Track() {
    const [foodItems, setfoodItems] = useState([]);
    const [food, setfood] = useState(null);
    const [searchValue, setSearchValue] = useState(""); // Add state for input value
    const LoggedData = useContext(UserContext);

    // useEffect(() => {
    //     console.log(food);
    // })





    function searchfood(event) {
        const value = event.target.value;
        setSearchValue(value); // Control the input

        if (event.target.value !== "") {
            fetch(`${import.meta.env.VITE_API_URL}/foods/${event.target.value}`, {
                method: "GET",
                headers: {

                    "Authorization": "Bearer " + LoggedData.loggedUser.token
                }
            })

                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    if (data.message === undefined) {
                        setfoodItems(data);
                    }
                    else {
                        setfoodItems([]);
                    }
                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        else {
            setfoodItems([]);
        }


    }

    function clearSearch() {
        setSearchValue("");
        setfoodItems([]);
    }

    return (

        <section className="container track-container">
            <Header />
            <div className="search">
                <input className="track-inp" onChange={searchfood} value={searchValue} placeholder="Search foods" />
                {searchValue && (
                    <button className="clear-btn" onClick={clearSearch}>
                        &times;
                    </button>
                )}

                {(foodItems.length !== 0) ? (
                    <div className="search-item">
                        {
                            foodItems.map((item) => {
                                return (
                                    <p className="item" onClick={() => {
                                        setfood(item);
                                        setfoodItems([]); // Clear items
                                        setSearchValue(""); // Clear input
                                    }} key={item._id}>{item.name}</p>
                                )
                            })
                        }
                    </div>
                ) : null}
            </div>
            {food !== null ?
                <Food food={food} /> : null
            }


        </section>



    )
}