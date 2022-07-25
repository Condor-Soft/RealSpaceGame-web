import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, CardHeader, Input, CardBody, CardFooter} from "reactstrap";
import { authentication } from "../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/img/logo.png';

function Login({auth, history}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        console.log(user);
        history.push('/admin');
      } else {
        history.push('/login');
      }
    });
  });

  const logIn = () => {
    if(!email){
      toast.info("Ingrese el correo electrónico!", {autoClose: 5000});
    } else if(!password){
      toast.info("Ingrese la contraseña!", {autoClose: 5000});
    } else {
      signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        history.push('/admin');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        if (error.code === "auth/user-not-found") {
          toast.error("Upsss! Usuario no encontrado. Por favor regístrate.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/wrong-password") {
          toast.error("Upsss! Contraseña incorrecta.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/user-disabled") {
          toast.error("Upsss! Tu cuenta se encuentra inhabilitada!.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/internal-error") {
          toast.error("Error interno, por favor comuniquese con el administrador del sistema!.", { position: toast.POSITION.TOP_RIGHT });
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Error en la red, por favor intente más tarde!.", { position: toast.POSITION.TOP_RIGHT });
        } else {
          console.log(error);
        }
      });
    }
  }

  return (
    <Container style={{marginTop: 100,}}>
      <ToastContainer />
      <center>
        <Card
          className="my-2"
          color="info"
          inverse
          style={{
            width: '30rem'
          }}
        >
          <CardHeader>
            <img src={Logo} alt="Logo juego" width={130}/>
            <h4>Iniciar Sesión</h4>
          </CardHeader>
          <CardBody>
            <Input
              className="default"
              id="exampleEmail"
              name="email"
              placeholder="Ingrese el correo electrónico"
              type="email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <br/>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Ingrese la contraseña"
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <p style={{textAlign: 'right',}}>
              <Link to="/recover-password" style={{color: '#000', fontSize: 12, textAlign: 'left',}}>Olvisaste tu contraseña?</Link>
            </p>
            <Button
              color="default"
              onClick={logIn}
            >
              Iniciar Sesión
            </Button>
          </CardBody>
          <CardFooter>
            <p style={{marginTop: 10,}}>
              No tienes una cuenta <Link to="/register" style={{color: '#000'}}>Crear cuenta</Link>
            </p>
          </CardFooter>
        </Card>
      </center>
    </Container>
  );
}
export default Login;
