import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Navigate } from "react-router-dom";


export default function Private(props) {

    const LoggedData = useContext(UserContext);

    return (
        LoggedData.loggedUser !== null ?
            <props.Component />
            :
            <Navigate to="/login" />

    )

}