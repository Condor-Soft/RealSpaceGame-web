import {
    NavLink,
} from "reactstrap";
import './notFound.css';

export default function NotFound() {
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops, La página que buscas no pudo ser encontrada!</h2>
                <NavLink href="/login">Regresar</NavLink>
            </div>
        </div>
    );
}
  