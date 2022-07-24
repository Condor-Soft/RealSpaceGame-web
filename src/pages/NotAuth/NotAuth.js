import {
    NavLink,
} from "reactstrap";
import './notAuth.css';

export default function NotAuth() {
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>No Auth</h1>
                </div>
                <h2>Oops, debes iniciar sesión para ver el contenido!</h2>
                <NavLink href="/login">Regresar</NavLink>
            </div>
        </div>
    );
}
  