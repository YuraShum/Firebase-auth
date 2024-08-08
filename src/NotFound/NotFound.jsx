import { Link } from "react-router-dom";
import './NotFound'

export default function NotFound(){
    return(
        <div className="pages-not-found">
            <h2>Sorry, the page you were looking for was not found.</h2>
            <Link to='/'>Return to home</Link>
        </div>
    )
}