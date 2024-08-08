import { Link, Outlet } from "react-router-dom";
import './HomePage.scss'

export default function HomePage(){
    return(
        <div className="home-container">
                <Link to='login' className="circle">
                    <p>Login...</p>
                </Link>
        </div>
    )
}