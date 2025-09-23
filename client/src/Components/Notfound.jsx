import { Link } from "react-router-dom"
export default function Notfound(){
    return(
        <section className="container">
        <div className="not-found" >
            <h1>404 NOT FOUND</h1>
           <p><Link to='/register'>Register to Countinue</Link></p> 
        </div>
        </section>
        
    )
}