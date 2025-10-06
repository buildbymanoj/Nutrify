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
            <div className="date-picker">
                <label>Select Date:</label>
                <input 
                    type="date" 
                    onChange={(event) => {
                        setdate(new Date(event.target.value))
                    }} 
                    className="date-input"
                />
            </div>

            {
                items.map((item) => {


                    return (
                        <div className="diet-item" key={item._id}>
                            <h2> {item.foodid.name} ({item.foodid.calories} kcal for {item.quantity} g)</h2>
                            <p>
                                <span>Protein: {item.foodid.protein} g</span>
                                <span>Fat: {item.foodid.fat} g</span>
                                <span>Carbs: {item.foodid.carbohydrates} g</span>
                                <span>Fiber: {item.foodid.fiber} g</span>
                            </p>
                        </div>
                    )

                })
            }

            <div className="diet-item total-item">
                <h2>Daily Total: {total.totalCalories} kcal</h2>
                <p>
                    <span>Protein: {total.totalProtein} g</span>
                    <span>Fat: {total.totalFat} g</span>
                    <span>Carbs: {total.totalCarbs} g</span>
                    <span>Fiber: {total.totalFiber} g</span>
                </p>
            </div>
        </section>
    )
}
