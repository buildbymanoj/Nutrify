import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import Header from "./Header"

export default function Diet() {

    let LoggedData = useContext(UserContext)
    let [items, setitems] = useState([]);
    const [date, setdate] = useState(new Date());

    let [total, settotal] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalFat: 0,
        totalCarbs: 0,
        totalFiber: 0
    })

    useEffect(() => {

        // console.log(LoggedData);

        fetch(`${import.meta.env.VITE_API_URL}/track/${LoggedData.loggedUser.userid}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${LoggedData.loggedUser.token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setitems(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [date])

    useEffect(() => {
        calculateTotal();
    }, [items])

    function calculateTotal() {
        let totalcopy = {
            totalCalories: 0,
            totalProtein: 0,
            totalFat: 0,
            totalCarbs: 0,
            totalFiber: 0
        };

        items.forEach((item) => {
            totalcopy.totalCalories += item.details.calories;
            totalcopy.totalProtein += item.details.protein;
            totalcopy.totalFat += item.details.fat;
            totalcopy.totalCarbs += item.details.carbohydrates;
            totalcopy.totalFiber += item.details.fiber;

        })
        settotal(totalcopy)
    }






    return (
        <section className="container diet-container">
            <Header />
            <input type="date" onChange={(event) => {
                setdate(new Date(event.target.value))
            }} />

            {
                items.map((item) => {


                    return (
                        <div className="diet-item" key={item._id}>
                            <h2> {item.foodid.name} ({item.foodid.calories} for {item.quantity} G)</h2>
                            <p>Protein {item.foodid.protein} g Fat {item.foodid.fat} g Carbs {item.foodid.carbohydrates} g Fiber {item.foodid.fiber} g</p>

                        </div>

                    )

                })
            }

            <div className="diet-item">
                <h2> {total.totalCalories} Kcal </h2>
                <p>Protein {total.totalProtein} g Fat {total.totalFat} g Carbs {total.totalCarbs} g Fiber {total.totalFiber} g</p>

            </div>
        </section>
    )
}
