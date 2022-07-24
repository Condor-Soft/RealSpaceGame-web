import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import RecoverPassword from "./pages/Login/RecoverPassword";
import AdminLayout from "layouts/Admin/Admin.js";
import NotFound from "./pages/NotFound/NotFound";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from './config/firebase';
 
export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/recover-password">
                        <RecoverPage />
                    </Route>
                    
                    <PrivateRoute path="/admin" >
                        <ProtectedPage />
                    </PrivateRoute>

                    <Route path="*"><NotFound /></Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    onAuthStateChanged(authentication, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return {
        user
    };
}

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function ProtectedPage() {
    return(
        <AdminLayout />
    );
}

function LoginPage() {
    let history = useHistory();
    let auth = useAuth();

    return (
        <Login auth={auth} history={history}/>
    );
}

function RegisterPage() {
    let history = useHistory();
    let auth = useAuth();
  
    return (
        <Register auth={auth} history={history}/>
    );
}

function RecoverPage() {
    let history = useHistory();
  
    return (
      <RecoverPassword history={history}/>
    );
}
